"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisService = void 0;
const http_status_1 = require("../constants/http-status");
const app_error_1 = require("../errors/app-error");
const cache_1 = require("../utils/cache");
const analysis_ml_service_1 = require("../service/analysis-ml.service");
const prisma_1 = __importDefault(require("../config/prisma"));
const winston_logger_1 = __importDefault(require("../utils/winston.logger"));
function toIsoDate(date) {
    return date.toISOString();
}
function getStartDate(lookbackDays = 180) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - lookbackDays);
    return startDate;
}
function clusterLabel(cluster) {
    if (cluster.index === -1)
        return "Lain-lain";
    return `Cluster ${cluster.index + 1}`;
}
class AnalysisService {
    constructor(analysisRepo, categoryRepo, transactionRepo, forecastService) {
        this.analysisRepo = analysisRepo;
        this.categoryRepo = categoryRepo;
        this.transactionRepo = transactionRepo;
        this.forecastService = forecastService;
        this.getLatestRun = async (userId) => {
            const run = await this.analysisRepo.findLatestPendingRun(userId);
            if (!run)
                return null;
            return {
                runId: run.id,
                status: run.status,
                totalTransactions: run.totalTransactions,
                kOptimal: run.kOptimal,
                silhouetteScore: run.silhouetteScore,
                durationMs: run.durationMs,
                clusters: run.clusters.map(cluster => ({
                    id: cluster.id,
                    index: cluster.index,
                    name: cluster.name,
                    suggestedName: cluster.suggestedName,
                    color: cluster.color,
                    size: cluster.transactions?.length || 0,
                    totalAmount: cluster.transactions?.reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0) || 0,
                    representativeDescriptions: [],
                    members: cluster.transactions?.map((t) => ({
                        id: t.id,
                        description: t.description,
                        amount: Number(t.amount),
                        date: toIsoDate(t.date)
                    })) || []
                })),
                preAssignedSummary: run.wcssValues?.preAssigned ? {
                    count: run.wcssValues.preAssigned.length
                } : undefined
            };
        };
        this.getStats = async (userId, startDate, endDate) => {
            const start = startDate ? new Date(startDate) : getStartDate(30);
            const end = endDate ? new Date(endDate) : new Date();
            const transactions = await prisma_1.default.transaction.findMany({
                where: {
                    userId,
                    date: { gte: start, lte: end }
                },
                select: {
                    amount: true,
                    type: true,
                    date: true
                }
            });
            const statsMap = new Map();
            transactions.forEach((t) => {
                const dateStr = t.date.toISOString().split('T')[0];
                const current = statsMap.get(dateStr) || { income: 0, expense: 0 };
                if (t.type === 'INCOME')
                    current.income += Number(t.amount);
                else
                    current.expense += Math.abs(Number(t.amount));
                statsMap.set(dateStr, current);
            });
            return Array.from(statsMap.entries()).map(([date, values]) => ({
                date,
                ...values
            })).sort((a, b) => a.date.localeCompare(b.date));
        };
        this.getCategoryBreakdown = async (userId, startDate, endDate) => {
            const start = startDate ? new Date(startDate) : getStartDate(30);
            const end = endDate ? new Date(endDate) : new Date();
            const categories = await prisma_1.default.category.findMany({
                where: { userId },
                include: {
                    transactions: {
                        where: {
                            date: { gte: start, lte: end },
                            type: 'EXPENSE'
                        },
                        select: { amount: true }
                    }
                }
            });
            return categories
                .map((cat) => ({
                id: cat.id,
                name: cat.name,
                color: cat.color,
                totalAmount: cat.transactions.reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0)
            }))
                .filter((cat) => cat.totalAmount > 0)
                .sort((a, b) => b.totalAmount - a.totalAmount);
        };
        this.run = async (payload, userId) => {
            const existingRun = await this.analysisRepo.findLatestPendingRun(userId);
            if (existingRun && existingRun.status === "waiting_confirmation") {
                return this.getLatestRun(userId);
            }
            const lookbackDays = payload.lookbackDays ?? 3650;
            const kMin = payload.kMin ?? 2;
            const kMax = payload.kMax ?? 12;
            const startDate = getStartDate(lookbackDays);
            const endDate = new Date();
            const transactions = await this.transactionRepo.findForAnalysis(userId, startDate, endDate);
            if (transactions.length < 50) {
                throw new app_error_1.AppError(`Minimal 50 transaksi (tanpa kategori) diperlukan. Saat ini: ${transactions.length}`, http_status_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            const existingCategories = await this.categoryRepo.getAll(userId);
            const existingCategoriesForML = existingCategories.map(c => ({
                id: c.id,
                name: c.name,
                keywords: c.aiKeywords ?? [],
            }));
            const run = await this.analysisRepo.createRun({
                userId,
                totalTransactions: transactions.length,
                status: "running",
            });
            try {
                const mlResult = await analysis_ml_service_1.AnalysisMLService.runPipeline(transactions.map((transaction) => ({
                    id: transaction.id,
                    description: transaction.description,
                    amount: Number(transaction.amount),
                    date: toIsoDate(transaction.date),
                })), existingCategoriesForML, kMin, kMax);
                const transactionMap = new Map(transactions.map(t => [t.id, t]));
                winston_logger_1.default.info(`Detected ${mlResult.preAssigned.length} transactions for pre-assignment. Deferring update until confirmation.`);
                const persistedClusters = [];
                for (const cluster of mlResult.clusters) {
                    const suggestedName = cluster.suggested_name;
                    const createdCluster = await this.analysisRepo.createCluster({
                        userId,
                        analysisRunId: run.id,
                        name: clusterLabel(cluster),
                        suggestedName,
                        color: cluster.index === -1 ? "#9CA3AF" : "#888888",
                        index: cluster.index,
                        silhouetteScore: mlResult.silhouette_score,
                        wcss: null,
                    });
                    const transactionIds = cluster.members.map((member) => member.transaction_id);
                    await this.transactionRepo.updateCluster(transactionIds, createdCluster.id);
                    const detailedMembers = transactionIds.map(id => {
                        const t = transactionMap.get(id);
                        return {
                            id: t?.id ?? id,
                            description: t?.description ?? "Unknown",
                            amount: Number(t?.amount ?? 0),
                            date: t?.date ? toIsoDate(t.date) : undefined
                        };
                    });
                    persistedClusters.push({
                        id: createdCluster.id,
                        index: cluster.index,
                        name: createdCluster.name,
                        suggestedName: createdCluster.suggestedName,
                        color: createdCluster.color,
                        size: cluster.size,
                        totalAmount: cluster.total_amount,
                        representativeDescriptions: cluster.representative_descriptions,
                        members: detailedMembers,
                    });
                }
                await this.analysisRepo.updateRun(run.id, {
                    status: "waiting_confirmation",
                    kOptimal: mlResult.k_optimal,
                    silhouetteScore: mlResult.silhouette_score,
                    wcssValues: {
                        elbowData: mlResult.elbow_data,
                        clusters: mlResult.clusters,
                        preAssigned: mlResult.preAssigned,
                    },
                    durationMs: mlResult.duration_ms,
                });
                return {
                    runId: run.id,
                    status: "waiting_confirmation",
                    totalTransactions: transactions.length,
                    kOptimal: mlResult.k_optimal,
                    silhouetteScore: mlResult.silhouette_score,
                    durationMs: mlResult.duration_ms,
                    elbowData: mlResult.elbow_data,
                    clusters: persistedClusters,
                    preAssignedSummary: {
                        count: mlResult.preAssigned.length,
                        byCategory: mlResult.preAssigned.reduce((acc, pa) => {
                            acc[pa.categoryName] = (acc[pa.categoryName] ?? 0) + 1;
                            return acc;
                        }, {}),
                    },
                };
            }
            catch (error) {
                winston_logger_1.default.error("Analysis run failed", error);
                await this.analysisRepo.updateRun(run.id, {
                    status: "failed",
                    errorMessage: error instanceof Error ? error.message : "Unknown analysis error",
                    completedAt: new Date(),
                });
                throw error;
            }
        };
        this.confirm = async (payload) => {
            const run = await this.analysisRepo.findRunWithClusters(payload.runId, payload.userId);
            if (!run) {
                throw new app_error_1.AppError("Analysis run tidak ditemukan", http_status_1.HttpStatus.NOT_FOUND);
            }
            const preAssigned = run.wcssValues.preAssigned || [];
            if (preAssigned.length > 0) {
                const preAssignMap = new Map();
                for (const pa of preAssigned) {
                    const arr = preAssignMap.get(pa.categoryId) ?? [];
                    arr.push(pa.transactionId);
                    preAssignMap.set(pa.categoryId, arr);
                }
                for (const [categoryId, txIds] of preAssignMap.entries()) {
                    await this.transactionRepo.updateCategoryByTransactionIds(txIds, categoryId);
                }
                winston_logger_1.default.info(`Confirmed pre-assignment for ${preAssigned.length} transactions.`);
            }
            const analysisMeta = run.wcssValues.clusters ?? [];
            const allTransactions = run.clusters.flatMap(c => c.transactions || []);
            const transactionMap = new Map(allTransactions.map((t) => [t.id, t]));
            const createdCategories = [];
            let topCategoryId = null;
            let topCategoryAmount = -1;
            for (const mapping of payload.clusterMappings) {
                const clusterPosition = analysisMeta.findIndex((cluster) => cluster.index === mapping.index);
                const clusterMeta = clusterPosition >= 0 ? analysisMeta[clusterPosition] : undefined;
                const cluster = clusterPosition >= 0 ? run.clusters[clusterPosition] : undefined;
                if (!cluster && mapping.index !== -1) {
                    throw new app_error_1.AppError(`Cluster index ${mapping.index} tidak ditemukan`, http_status_1.HttpStatus.NOT_FOUND);
                }
                const category = await this.categoryRepo.upsertByUserAndName({
                    userId: payload.userId,
                    name: mapping.name,
                    type: 'EXPENSE',
                    color: mapping.color,
                    icon: mapping.icon,
                    isAutoGenerated: true,
                    aiConfidence: run.silhouetteScore ?? null,
                    aiKeywords: clusterMeta?.representative_descriptions?.length
                        ? clusterMeta.representative_descriptions
                        : [mapping.name],
                });
                const transactionIds = mapping.transactionIds || (cluster?.transactions.map((transaction) => transaction.id) || []);
                await this.transactionRepo.updateCategoryByTransactionIds(transactionIds, category.id);
                const totalAmount = transactionIds.reduce((sum, id) => {
                    const t = transactionMap.get(id);
                    return sum + Math.abs(Number(t?.amount ?? 0));
                }, 0);
                if (totalAmount > topCategoryAmount) {
                    topCategoryAmount = totalAmount;
                    topCategoryId = category.id;
                }
                createdCategories.push({
                    clusterIndex: mapping.index,
                    categoryId: category.id,
                    categoryName: category.name,
                });
            }
            const forecast = topCategoryId
                ? await this.forecastService.forecastTopCategory(payload.userId, topCategoryId)
                : null;
            await this.analysisRepo.updateRun(run.id, {
                status: "completed",
                completedAt: new Date(),
            });
            cache_1.cacheManager.delPattern(`dashboard:${payload.userId}`);
            return {
                runId: run.id,
                status: "completed",
                createdCategories,
                forecast,
            };
        };
    }
}
exports.AnalysisService = AnalysisService;
//# sourceMappingURL=analysis.service.js.map
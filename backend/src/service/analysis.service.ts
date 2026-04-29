import { HttpStatus } from "@/constants/http-status";
import { AppError } from "@/errors/app-error";
import { AnalysisRepository } from "@/repositories/analysis.repository";
import { CategoryRepository } from "@/repositories/category.repository";
import { TransactionRepository } from "@/repositories/transaction.repository";
import { cacheManager } from "@/utils/cache";
import { AnalysisMLService, MlCluster } from "@/service/analysis-ml.service";
import { ForecastService } from "@/service/forecast.service";
import { RunAnalysisInput, ConfirmAnalysisInput } from "@/schemas/analysis.schema";
import prisma from "@/config/prisma";
import logger from "@/utils/winston.logger";
import { GamificationQueue } from "@/queue/gamification.queue";
import { PushService } from "./push.service";
import { CategoryMap } from "@/constants/app";

function toIsoDate(date: Date) {
    return date.toISOString();
}

function getStartDate(lookbackDays = 180) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - lookbackDays);
    return startDate;
}

function clusterLabel(cluster: MlCluster) {
    if (cluster.index === -1) return "Lain-lain";
    return `Cluster ${cluster.index + 1}`;
}

export class AnalysisService {
    constructor(
        private readonly analysisRepo: AnalysisRepository,
        private readonly categoryRepo: CategoryRepository,
        private readonly transactionRepo: TransactionRepository,
        private readonly forecastService: ForecastService
    ) { }

    public getLatestRun = async (userId: string) => {
        const run = await this.analysisRepo.findLatestPendingRun(userId);
        if (!run) return null;

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
                size: (cluster as any).transactions?.length || 0,
                totalAmount: (cluster as any).transactions?.reduce((sum: number, t: any) => sum + Math.abs(Number(t.amount)), 0) || 0,
                representativeDescriptions: cluster.suggestedName && cluster.suggestedName !== "Unknown" ? [cluster.suggestedName] : [],
                members: (cluster as any).transactions?.map((t: any) => ({
                    id: t.id,
                    description: t.description,
                    amount: Number(t.amount),
                    date: toIsoDate(t.date)
                })) || []
            })),
            preAssignedSummary: (run.wcssValues as any)?.preAssigned ? {
                count: (run.wcssValues as any).preAssigned.length
            } : undefined
        };
    };

    public getStats = async (userId: string, startDate?: string, endDate?: string) => {
        const start = startDate ? new Date(startDate) : getStartDate(30);
        const end = endDate ? new Date(endDate) : new Date();

        const transactions = await prisma.transaction.findMany({
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

        const statsMap = new Map<string, { income: number; expense: number }>();
        transactions.forEach((t: { amount: any; type: string; date: Date }) => {
            const dateStr = t.date.toISOString().split('T')[0];
            const current = statsMap.get(dateStr) || { income: 0, expense: 0 };
            if (t.type === 'INCOME') current.income += Number(t.amount);
            else current.expense += Math.abs(Number(t.amount));
            statsMap.set(dateStr, current);
        });

        return Array.from(statsMap.entries()).map(([date, values]) => ({
            date,
            ...values
        })).sort((a: any, b: any) => a.date.localeCompare(b.date));
    };

    public getCategoryBreakdown = async (userId: string, startDate?: string, endDate?: string) => {
        const start = startDate ? new Date(startDate) : getStartDate(30);
        const end = endDate ? new Date(endDate) : new Date();

        const categories = await prisma.category.findMany({
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
            .map((cat: any) => ({
                id: cat.id,
                name: cat.name,
                color: cat.color,
                totalAmount: cat.transactions.reduce((sum: number, t: any) => sum + Math.abs(Number(t.amount)), 0)
            }))
            .filter((cat: any) => cat.totalAmount > 0)
            .sort((a: any, b: any) => b.totalAmount - a.totalAmount);
    };

    public run = async (payload: RunAnalysisInput, userId: string) => {
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
            throw new AppError(
                `Minimal 50 transaksi (tanpa kategori) diperlukan. Saat ini: ${transactions.length}`,
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        const existingCategories = await this.categoryRepo.getAll(userId);
        const existingCategoriesForML = existingCategories.map(c => ({
            id: c.id,
            name: c.name,
            keywords: (c.aiKeywords as string[]) ?? [],
        }));

        const run = await this.analysisRepo.createRun({
            userId,
            totalTransactions: transactions.length,
            status: "running",
        });

        try {
            const mlResult = await AnalysisMLService.runPipeline(
                transactions.map((transaction) => ({
                    id: transaction.id,
                    description: transaction.description,
                    amount: Number(transaction.amount),
                    date: toIsoDate(transaction.date),
                })),
                existingCategoriesForML,
                kMin,
                kMax,
            );

            const transactionMap = new Map(transactions.map(t => [t.id, t]));

            logger.info(`Detected ${mlResult.preAssigned.length} transactions for pre-assignment. Deferring update until confirmation.`);

            const persistedClusters: any[] = [];

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
                    }, {} as Record<string, number>),
                },
            };
        } catch (error) {
            logger.error("Analysis run failed", error);
            await this.analysisRepo.updateRun(run.id, {
                status: "failed",
                errorMessage: error instanceof Error ? error.message : "Unknown analysis error",
                completedAt: new Date(),
            });
            throw error;
        }
    };

    public runV2 = async (payload: RunAnalysisInput, userId: string) => {
        const existingRun = await this.analysisRepo.findLatestPendingRun(userId);
        if (existingRun && existingRun.status === "waiting_confirmation") {
            return this.getLatestRun(userId);
        }

        const lookbackDays = payload.lookbackDays ?? 3650;
        const startDate = getStartDate(lookbackDays);
        const endDate = new Date();

        const transactions = await this.transactionRepo.findForAnalysis(userId, startDate, endDate);
        if (transactions.length < 1) {
            throw new AppError(
                `Minimal 1 transaksi (tanpa kategori) diperlukan. Saat ini: ${transactions.length}`,
                HttpStatus.UNPROCESSABLE_ENTITY,
            );
        }

        const run = await this.analysisRepo.createRun({
            userId,
            totalTransactions: transactions.length,
            status: "running",
        });

        const transactionMap = new Map(transactions.map(t => [t.id, t]));

        try {
            const mlResult = await AnalysisMLService.runPipelineV2(
                transactions.map((transaction) => ({
                    id: transaction.id,
                    description: transaction.description,
                }))
            );

            // Group predictions into pseudo-clusters by predictedCategory
            const grouped = new Map<string, typeof mlResult.predictions>();
            for (const p of mlResult.predictions) {
                const group = grouped.get(p.predictedCategory) || [];
                group.push(p);
                grouped.set(p.predictedCategory, group);
            }

            const avgOverallConfidence = mlResult.predictions.length > 0
                ? mlResult.predictions.reduce((sum: number, p: any) => sum + (p.confidence || 0), 0) / mlResult.predictions.length
                : 0;

            const persistedClusters: any[] = [];
            let i = 0;

            for (const [categoryName, members] of grouped.entries()) {
                const isLainLain = categoryName.toLowerCase() === "lain-lain" || categoryName.toLowerCase() === "unknown";
                const clusterIndex = isLainLain ? -1 : i;

                const avgConfidence = members.length > 0
                    ? members.reduce((sum: number, m: any) => sum + (m.confidence || 0), 0) / members.length
                    : 0;

                const createdCluster = await this.analysisRepo.createCluster({
                    userId,
                    analysisRunId: run.id,
                    name: isLainLain ? "Lain-lain" : `Cluster ${clusterIndex + 1}`,
                    suggestedName: categoryName,
                    color: isLainLain ? "#9CA3AF" : CategoryMap[categoryName]?.color ?? "#888888",
                    index: clusterIndex,
                    silhouetteScore: avgConfidence,
                    wcss: null,
                });

                const transactionIds = members.map((m: any) => m.transactionId);
                await this.transactionRepo.updateCluster(transactionIds, createdCluster.id);

                const detailedMembers = transactionIds.map((id: any) => {
                    const t = transactionMap.get(id);
                    return {
                        id: t?.id ?? id,
                        description: t?.description ?? "Unknown",
                        amount: Number(t?.amount ?? 0),
                        date: t?.date ? toIsoDate(t.date) : ""
                    };
                });

                const totalAmount = detailedMembers.reduce((sum: number, m: any) => sum + Math.abs(m.amount), 0);

                persistedClusters.push({
                    id: createdCluster.id,
                    index: clusterIndex,
                    name: createdCluster.name,
                    suggestedName: createdCluster.suggestedName,
                    color: createdCluster.color,
                    size: members.length,
                    totalAmount: totalAmount,
                    representativeDescriptions: [categoryName],
                    members: detailedMembers,
                });

                if (!isLainLain) i++;
            }

            await this.analysisRepo.updateRun(run.id, {
                status: "waiting_confirmation",
                kOptimal: grouped.size,
                silhouetteScore: avgOverallConfidence,
                wcssValues: {
                    elbowData: [],
                    clusters: [],
                    preAssigned: [],
                },
                durationMs: mlResult.durationMs,
            });

            await PushService.sendNotificationToUser(userId, 'Clustering Selesai!', 'Hasil sudah siap untuk ditinjau.', { url: '/analysis/lab' })

            return {
                runId: run.id,
                status: "waiting_confirmation",
                totalTransactions: transactions.length,
                kOptimal: grouped.size,
                silhouetteScore: avgOverallConfidence,
                durationMs: mlResult.durationMs,
                elbowData: [],
                clusters: persistedClusters,
                preAssignedSummary: {
                    count: 0,
                    byCategory: {},
                },
            };
        } catch (error) {
            logger.error("Analysis V2 run failed", error);
            await this.analysisRepo.updateRun(run.id, {
                status: "failed",
                errorMessage: error instanceof Error ? error.message : "Unknown analysis error",
                completedAt: new Date(),
            });
            throw error;
        }
    };

    public confirm = async (payload: ConfirmAnalysisInput) => {
        const run = await this.analysisRepo.findRunWithClusters(payload.runId, payload.userId);

        if (!run) {
            throw new AppError("Analysis run tidak ditemukan", HttpStatus.NOT_FOUND);
        }

        const preAssigned = (run.wcssValues as any).preAssigned || [];
        if (preAssigned.length > 0) {
            const preAssignMap = new Map<string, string[]>();
            for (const pa of preAssigned) {
                const arr = preAssignMap.get(pa.categoryId) ?? [];
                arr.push(pa.transactionId);
                preAssignMap.set(pa.categoryId, arr);
            }
            for (const [categoryId, txIds] of preAssignMap.entries()) {
                await this.transactionRepo.updateCategoryByTransactionIds(txIds, categoryId);
            }
            logger.info(`Confirmed pre-assignment for ${preAssigned.length} transactions.`);
        }

        const analysisMeta = (run.wcssValues as any).clusters ?? [];
        const allTransactions = run.clusters.flatMap(c => (c as any).transactions || []);
        const transactionMap = new Map(allTransactions.map((t: any) => [t.id, t]));

        const createdCategories: any[] = [];
        let topCategoryId: string | null = null;
        let topCategoryAmount = -1;

        for (const mapping of payload.clusterMappings) {
            const clusterMeta = analysisMeta.find((cluster: any) => cluster.index === mapping.index);
            const cluster = run.clusters.find((cluster: any) => cluster.index === mapping.index);

            if (!cluster && mapping.index !== -1) {
                throw new AppError(`Cluster index ${mapping.index} tidak ditemukan`, HttpStatus.NOT_FOUND);
            }

            const transactionIds = mapping.transactionIds || (cluster?.transactions.map((transaction: { id: string }) => transaction.id) || []);

            let incomeCount = 0;
            let expenseCount = 0;
            for (const id of transactionIds) {
                const t = transactionMap.get(id);
                if (t?.type === 'INCOME') incomeCount++;
                else if (t?.type === 'EXPENSE') expenseCount++;
            }
            const determinedType = incomeCount > expenseCount ? 'INCOME' : 'EXPENSE';

            const category = await this.categoryRepo.upsertByUserAndName({
                userId: payload.userId,
                name: mapping.name,
                type: determinedType,
                color: CategoryMap[mapping.name]?.color ?? "#888888",
                icon: CategoryMap[mapping.name]?.icon ?? "Ellipsis",
                isAutoGenerated: true,
                aiConfidence: run.silhouetteScore ?? null,
                aiKeywords: clusterMeta?.representative_descriptions?.length
                    ? clusterMeta.representative_descriptions
                    : [mapping.name],
            });

            await this.transactionRepo.updateCategoryByTransactionIds(transactionIds, category.id);

            const totalAmount = transactionIds.reduce(
                (sum: number, id: string) => {
                    const t = transactionMap.get(id);
                    return sum + Math.abs(Number(t?.amount ?? 0));
                },
                0,
            );
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

        const topForecasts = await this.forecastService.getTopForecasts(payload.userId, 3);

        await this.analysisRepo.updateRun(run.id, {
            status: "completed",
            completedAt: new Date(),
        });

        cacheManager.delPattern(`dashboard:${payload.userId}`);

        try {
            const gamificationQueue = new GamificationQueue();
            await gamificationQueue.add('update-gamification', {
                userId: payload.userId,
                action: 'ANALYSIS_CREATED',
                value: 1
            });
        } catch (e) {
            logger.warn("Failed to add gamification queue for analysis:", e);
        }

        try {
            const txOriginalCluster = new Map<string, number>();
            for (const cluster of run.clusters as any[]) {
                for (const tx of cluster.transactions ?? []) {
                    txOriginalCluster.set(tx.id, cluster.index);
                }
            }

            const feedbackCorrections: Array<{ description: string; correctCategory: string }> = [];
            const seen = new Set<string>(); // deduplicate by txId

            for (const mapping of payload.clusterMappings) {
                const originalCluster = run.clusters.find((c: any) => c.index === mapping.index);
                const aiSuggestedName: string | null = (originalCluster as any)?.suggestedName ?? null;

                const clusterWasRenamed = aiSuggestedName
                    ? mapping.name.trim().toLowerCase() !== aiSuggestedName.trim().toLowerCase()
                    : false;

                const txIds = mapping.transactionIds ?? [];
                for (const txId of txIds) {
                    if (seen.has(txId)) continue;

                    const tx = transactionMap.get(txId);
                    if (!tx?.description || !mapping.name) continue;

                    // Was this transaction MOVED from a different cluster?
                    const originalIndex = txOriginalCluster.get(txId);
                    const wasMoved = originalIndex !== undefined && originalIndex !== mapping.index;

                    // Send feedback if: transaction was moved OR its destination cluster was renamed
                    if (wasMoved || clusterWasRenamed) {
                        feedbackCorrections.push({
                            description: tx.description,
                            correctCategory: mapping.name,
                        });
                        seen.add(txId);
                    }
                }
            }

            if (feedbackCorrections.length > 0) {
                logger.info(`[AI Feedback] Sending ${feedbackCorrections.length} corrections (renames + moved transactions) to ML service.`);
                AnalysisMLService.sendFeedback(feedbackCorrections);
            } else {
                logger.info("[AI Feedback] No corrections to send — user accepted all AI suggestions.");
            }
        } catch (fbErr) {
            logger.warn("[AI Feedback] Failed to build feedback payload:", fbErr);
        }

        return {
            runId: run.id,
            status: "completed",
            createdCategories,
            topForecasts,
        };
    };
}
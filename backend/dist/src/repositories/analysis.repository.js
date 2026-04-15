"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class AnalysisRepository {
    constructor() {
        this.createRun = async (data) => {
            return prisma_1.default.analysisRun.create({
                data: {
                    userId: data.userId,
                    totalTransactions: data.totalTransactions,
                    status: data.status || "running",
                },
            });
        };
        this.findRunById = async (runId, userId) => {
            return prisma_1.default.analysisRun.findFirst({
                where: {
                    id: runId,
                    ...(userId ? { userId } : {}),
                },
            });
        };
        this.findRunWithClusters = async (runId, userId) => {
            return prisma_1.default.analysisRun.findFirst({
                where: {
                    id: runId,
                    ...(userId ? { userId } : {}),
                },
                orderBy: {
                    createdAt: "asc",
                },
                include: {
                    clusters: {
                        orderBy: {
                            createdAt: "asc",
                        },
                        include: {
                            transactions: true,
                        },
                    },
                },
            });
        };
        this.updateRun = async (runId, data) => {
            return prisma_1.default.analysisRun.update({
                where: { id: runId },
                data,
            });
        };
        this.createCluster = async (data) => {
            return prisma_1.default.cluster.create({
                data: {
                    userId: data.userId,
                    analysisRunId: data.analysisRunId,
                    name: data.name,
                    suggestedName: data.suggestedName ?? null,
                    color: data.color || "#888888",
                    index: data.index ?? 0,
                    silhouetteScore: data.silhouetteScore ?? null,
                    wcss: data.wcss ?? null,
                },
            });
        };
        this.findLatestPendingRun = async (userId) => {
            return prisma_1.default.analysisRun.findFirst({
                where: {
                    userId,
                    status: {
                        in: ["running", "waiting_confirmation"],
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    clusters: {
                        include: {
                            transactions: true,
                        },
                    },
                },
            });
        };
    }
}
exports.AnalysisRepository = AnalysisRepository;
//# sourceMappingURL=analysis.repository.js.map
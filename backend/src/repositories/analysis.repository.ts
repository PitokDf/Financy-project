import prisma from "@/config/prisma";

export class AnalysisRepository {
    public createRun = async (data: {
        userId: string;
        totalTransactions: number;
        status?: string;
    }) => {
        return prisma.analysisRun.create({
            data: {
                userId: data.userId,
                totalTransactions: data.totalTransactions,
                status: data.status || "running",
            },
        });
    }

    public findRunById = async (runId: string, userId?: string) => {
        return prisma.analysisRun.findFirst({
            where: {
                id: runId,
                ...(userId ? { userId } : {}),
            },
        });
    }

    public findRunWithClusters = async (runId: string, userId?: string) => {
        return prisma.analysisRun.findFirst({
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
    }

    public updateRun = async (runId: string, data: Record<string, any>) => {
        return prisma.analysisRun.update({
            where: { id: runId },
            data,
        });
    }

    public createCluster = async (data: {
        userId: string;
        analysisRunId: string;
        name: string;
        suggestedName?: string | null;
        color?: string;
        index?: number;
        silhouetteScore?: number | null;
        wcss?: number | null;
    }) => {
        return prisma.cluster.create({
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
    }

    public findLatestPendingRun = async (userId: string) => {
        return prisma.analysisRun.findFirst({
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
    }
}

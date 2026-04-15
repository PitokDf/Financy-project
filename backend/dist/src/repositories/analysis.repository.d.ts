export declare class AnalysisRepository {
    createRun: (data: {
        userId: string;
        totalTransactions: number;
        status?: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        completedAt: Date | null;
        status: string;
        totalTransactions: number;
        silhouetteScore: number | null;
        kOptimal: number | null;
        wcssValues: import("@prisma/client/runtime/client").JsonValue | null;
        durationMs: number | null;
        errorMessage: string | null;
    }>;
    findRunById: (runId: string, userId?: string) => Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        completedAt: Date | null;
        status: string;
        totalTransactions: number;
        silhouetteScore: number | null;
        kOptimal: number | null;
        wcssValues: import("@prisma/client/runtime/client").JsonValue | null;
        durationMs: number | null;
        errorMessage: string | null;
    } | null>;
    findRunWithClusters: (runId: string, userId?: string) => Promise<({
        clusters: ({
            transactions: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                description: string;
                amount: number;
                type: import("../generated/prisma/enums").TransactionType;
                date: Date;
                categoryId: string | null;
                clusterId: string | null;
                source: import("../generated/prisma/enums").TransactionSource;
                csvImportId: string | null;
            }[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            userId: string;
            color: string;
            analysisRunId: string;
            suggestedName: string | null;
            index: number;
            silhouetteScore: number | null;
            wcss: number | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        completedAt: Date | null;
        status: string;
        totalTransactions: number;
        silhouetteScore: number | null;
        kOptimal: number | null;
        wcssValues: import("@prisma/client/runtime/client").JsonValue | null;
        durationMs: number | null;
        errorMessage: string | null;
    }) | null>;
    updateRun: (runId: string, data: Record<string, any>) => Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        completedAt: Date | null;
        status: string;
        totalTransactions: number;
        silhouetteScore: number | null;
        kOptimal: number | null;
        wcssValues: import("@prisma/client/runtime/client").JsonValue | null;
        durationMs: number | null;
        errorMessage: string | null;
    }>;
    createCluster: (data: {
        userId: string;
        analysisRunId: string;
        name: string;
        suggestedName?: string | null;
        color?: string;
        index?: number;
        silhouetteScore?: number | null;
        wcss?: number | null;
    }) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        userId: string;
        color: string;
        analysisRunId: string;
        suggestedName: string | null;
        index: number;
        silhouetteScore: number | null;
        wcss: number | null;
    }>;
    findLatestPendingRun: (userId: string) => Promise<({
        clusters: ({
            transactions: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                description: string;
                amount: number;
                type: import("../generated/prisma/enums").TransactionType;
                date: Date;
                categoryId: string | null;
                clusterId: string | null;
                source: import("../generated/prisma/enums").TransactionSource;
                csvImportId: string | null;
            }[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            userId: string;
            color: string;
            analysisRunId: string;
            suggestedName: string | null;
            index: number;
            silhouetteScore: number | null;
            wcss: number | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        completedAt: Date | null;
        status: string;
        totalTransactions: number;
        silhouetteScore: number | null;
        kOptimal: number | null;
        wcssValues: import("@prisma/client/runtime/client").JsonValue | null;
        durationMs: number | null;
        errorMessage: string | null;
    }) | null>;
}
//# sourceMappingURL=analysis.repository.d.ts.map
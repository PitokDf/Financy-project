import { config } from "@/config";
import { HttpStatus } from "@/constants/http-status";
import { Messages } from "@/constants/message";
import { AppError } from "@/errors/app-error";
import { TransactionRepository } from "@/repositories/transaction.repository";
import {
    AnalyzeTransactionsInput,
    CreateTransactionInput,
    GetTransactionsQueryInput,
    UpdateTransactionInput,
} from "@/schemas/transaction.schema";
import { AnalysisStatus } from "@prisma/client";

type TransactionWithCategory = Awaited<ReturnType<typeof TransactionRepository.create>>;

export type TransactionResponse = Omit<TransactionWithCategory, "amount"> & {
    amount: number;
};

export interface PaginatedTransactionsResponse {
    data: TransactionResponse[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

interface MlPipelineTransactionItem {
    id: string;
    description: string;
    amount: number;
    date: string;
}

interface MlClusterMember {
    transaction_id: string;
    description: string;
    amount: number;
    distance_to_centroid: number;
}

interface MlCluster {
    index: number;
    size: number;
    total_amount: number;
    centroid: number[];
    representative_descriptions: string[];
    members: MlClusterMember[];
}

interface MlElbowPoint {
    k: number;
    wcss: number;
}

interface MlPipelineResponse {
    success: boolean;
    k_optimal: number;
    silhouette_score: number;
    elbow_data: MlElbowPoint[];
    clusters: MlCluster[];
    duration_ms: number;
}

interface AnalyzeTransactionsResponse {
    analysisRunId: string;
    totalTransactions: number;
    kOptimal: number;
    silhouetteScore: number;
    durationMs: number;
    clustersCreated: number;
}

const mapTransaction = (transaction: TransactionWithCategory): TransactionResponse => ({
    ...transaction,
    amount: Number(transaction.amount),
});

const extractErrorMessage = (payload: unknown): string => {
    if (!payload || typeof payload !== "object") {
        return "Terjadi kegagalan saat memproses analisis ML";
    }

    const record = payload as Record<string, unknown>;

    if (typeof record.detail === "string") {
        return record.detail;
    }

    if (typeof record.message === "string") {
        return record.message;
    }

    return "Terjadi kegagalan saat memproses analisis ML";
};

const isMlPipelineResponse = (payload: unknown): payload is MlPipelineResponse => {
    if (!payload || typeof payload !== "object") return false;
    const record = payload as Record<string, unknown>;

    return (
        typeof record.success === "boolean" &&
        typeof record.k_optimal === "number" &&
        typeof record.silhouette_score === "number" &&
        typeof record.duration_ms === "number" &&
        Array.isArray(record.elbow_data) &&
        Array.isArray(record.clusters)
    );
};

export class TransactionService {
    constructor(private readonly transactionRepository: typeof TransactionRepository) { }

    public createTransaction = async (userId: string, payload: CreateTransactionInput) => {
        const transaction = await this.transactionRepository.create({
            userId,
            type: payload.type,
            amount: payload.amount,
            description: payload.description,
            date: payload.date,
            categoryId: payload.categoryId ?? null,
            embedding: [],
        });

        return mapTransaction(transaction);
    };

    public getTransactionById = async (userId: string, transactionId: string) => {
        const transaction = await this.transactionRepository.findByIdAndUser(transactionId, userId);

        if (!transaction) {
            throw new AppError(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return mapTransaction(transaction);
    };

    public getTransactions = async (userId: string, query: GetTransactionsQueryInput) => {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const skip = (page - 1) * limit;

        const [transactions, total] = await Promise.all([
            this.transactionRepository.findManyByUser({
                userId,
                skip,
                take: limit,
                type: query.type,
                categoryId: query.categoryId,
                search: query.search,
                startDate: query.startDate,
                endDate: query.endDate,
                sortBy: query.sortBy,
                sortOrder: query.sortOrder,
            }),
            this.transactionRepository.countByUser({
                userId,
                type: query.type,
                categoryId: query.categoryId,
                search: query.search,
                startDate: query.startDate,
                endDate: query.endDate,
            }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: transactions.map(mapTransaction),
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        };
    };

    public updateTransaction = async (
        userId: string,
        transactionId: string,
        payload: UpdateTransactionInput
    ) => {
        await this.getTransactionById(userId, transactionId);

        const transaction = await this.transactionRepository.updateById(transactionId, {
            ...(payload.type ? { type: payload.type } : {}),
            ...(payload.amount !== undefined ? { amount: payload.amount } : {}),
            ...(payload.description !== undefined ? { description: payload.description } : {}),
            ...(payload.date ? { date: payload.date } : {}),
            ...(payload.categoryId !== undefined ? { categoryId: payload.categoryId ?? null } : {}),
        });

        return mapTransaction(transaction);
    };

    public deleteTransaction = async (userId: string, transactionId: string) => {
        await this.getTransactionById(userId, transactionId);

        const deleted = await this.transactionRepository.deleteById(transactionId);

        return mapTransaction(deleted);
    };

    public analyzeTransactions = async (
        userId: string,
        payload: AnalyzeTransactionsInput
    ): Promise<AnalyzeTransactionsResponse> => {
        const candidates = await this.transactionRepository.findUncategorizedExpensesByUser(userId);

        if (candidates.length < 10) {
            throw new AppError("Minimal 10 transaksi expense tanpa kategori untuk analisis", HttpStatus.BAD_REQUEST);
        }

        const analysisRun = await this.transactionRepository.createAnalysisRun({
            userId,
            status: AnalysisStatus.PROCESSING,
            totalTransactions: candidates.length,
        });

        try {
            const mlPayload = {
                transactions: candidates.map((item): MlPipelineTransactionItem => ({
                    id: item.id,
                    description: item.description,
                    amount: item.amount,
                    date: item.date,
                })),
                k_min: payload.kMin,
                k_max: payload.kMax,
            };

            const response = await fetch(`${config.ML_SERVICE_URL}/api/ml/pipeline`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(mlPayload),
            });

            const responsePayload: unknown = await response.json();

            if (!response.ok) {
                const errorMessage = extractErrorMessage(responsePayload);
                throw new AppError(errorMessage, HttpStatus.BAD_GATEWAY);
            }

            if (!isMlPipelineResponse(responsePayload) || responsePayload.success !== true) {
                throw new AppError("Format response ML tidak valid", HttpStatus.BAD_GATEWAY);
            }

            let clustersCreated = 0;

            for (const cluster of responsePayload.clusters) {
                const createdCluster = await this.transactionRepository.createCluster({
                    analysisRunId: analysisRun.id,
                    clusterIndex: cluster.index,
                    centroid: cluster.centroid,
                    size: cluster.size,
                    totalAmount: cluster.total_amount,
                });

                const memberTransactionIds = cluster.members
                    .map((member) => member.transaction_id)
                    .filter((transactionId): transactionId is string => transactionId.length > 0);

                await this.transactionRepository.setTransactionClusterIds(memberTransactionIds, createdCluster.id);
                clustersCreated += 1;
            }

            await this.transactionRepository.updateAnalysisRun(analysisRun.id, {
                status: AnalysisStatus.DONE,
                kOptimal: responsePayload.k_optimal,
                silhouetteScore: responsePayload.silhouette_score,
                wcssValues: responsePayload.elbow_data,
                durationMs: responsePayload.duration_ms,
                completedAt: new Date(),
            });

            return {
                analysisRunId: analysisRun.id,
                totalTransactions: candidates.length,
                kOptimal: responsePayload.k_optimal,
                silhouetteScore: responsePayload.silhouette_score,
                durationMs: responsePayload.duration_ms,
                clustersCreated,
            };
        } catch (error) {
            await this.transactionRepository.updateAnalysisRun(analysisRun.id, {
                status: AnalysisStatus.FAILED,
                errorMessage: error instanceof Error ? error.message : "Analisis gagal diproses",
                completedAt: new Date(),
            });

            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError("Gagal terhubung ke layanan ML", HttpStatus.BAD_GATEWAY);
        }
    };
}

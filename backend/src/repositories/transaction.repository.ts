import prisma from "@/config/prisma";
import { AnalysisStatus, Prisma, TransactionType } from "@prisma/client";

export interface FindTransactionsOptions {
  userId: string;
  skip?: number;
  take?: number;
  type?: TransactionType;
  categoryId?: string;
  search?: string;
  startDate?: Date;
  endDate?: Date;
  sortBy?: "date" | "amount" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface AnalysisCandidateTransaction {
  id: string;
  description: string;
  amount: number;
  date: string;
}

export interface CreateAnalysisRunInput {
  userId: string;
  status: AnalysisStatus;
  totalTransactions: number;
  kOptimal?: number;
  silhouetteScore?: number;
  wcssValues?: unknown;
  durationMs?: number;
  errorMessage?: string;
  completedAt?: Date;
}

export interface CreateClusterInput {
  analysisRunId: string;
  clusterIndex: number;
  centroid: number[];
  size: number;
  totalAmount: number;
}

const baseInclude = {
  category: {
    select: {
      id: true,
      name: true,
    },
  },
} satisfies Prisma.TransactionInclude;

export class TransactionRepository {
  static async create(data: Prisma.TransactionUncheckedCreateInput) {
    return prisma.transaction.create({
      data,
      include: baseInclude,
    });
  }

  static async findByIdAndUser(transactionId: string, userId: string) {
    return prisma.transaction.findFirst({
      where: {
        id: transactionId,
        userId,
      },
      include: baseInclude,
    });
  }

  static async findManyByUser(options: FindTransactionsOptions) {
    const {
      userId,
      skip,
      take,
      type,
      categoryId,
      search,
      startDate,
      endDate,
      sortBy = "date",
      sortOrder = "desc",
    } = options;

    return prisma.transaction.findMany({
      where: {
        userId,
        ...(type ? { type } : {}),
        ...(categoryId ? { categoryId } : {}),
        ...(search
          ? {
              OR: [
                {
                  description: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  category: {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
              ],
            }
          : {}),
        ...(startDate || endDate
          ? {
              date: {
                ...(startDate ? { gte: startDate } : {}),
                ...(endDate ? { lte: endDate } : {}),
              },
            }
          : {}),
      },
      include: baseInclude,
      skip,
      take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
  }

  static async countByUser(options: Omit<FindTransactionsOptions, "skip" | "take" | "sortBy" | "sortOrder">) {
    const { userId, type, categoryId, search, startDate, endDate } = options;

    return prisma.transaction.count({
      where: {
        userId,
        ...(type ? { type } : {}),
        ...(categoryId ? { categoryId } : {}),
        ...(search
          ? {
              OR: [
                {
                  description: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  category: {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
              ],
            }
          : {}),
        ...(startDate || endDate
          ? {
              date: {
                ...(startDate ? { gte: startDate } : {}),
                ...(endDate ? { lte: endDate } : {}),
              },
            }
          : {}),
      },
    });
  }

  static async updateById(transactionId: string, data: Prisma.TransactionUncheckedUpdateInput) {
    return prisma.transaction.update({
      where: { id: transactionId },
      data,
      include: baseInclude,
    });
  }

  static async deleteById(transactionId: string) {
    return prisma.transaction.delete({
      where: { id: transactionId },
      include: baseInclude,
    });
  }

  static async findUncategorizedExpensesByUser(userId: string): Promise<AnalysisCandidateTransaction[]> {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        type: TransactionType.EXPENSE,
        categoryId: null,
      },
      select: {
        id: true,
        description: true,
        amount: true,
        date: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return transactions.map((transaction) => ({
      id: transaction.id,
      description: transaction.description,
      amount: Number(transaction.amount),
      date: transaction.date.toISOString(),
    }));
  }

  static async createAnalysisRun(input: CreateAnalysisRunInput) {
    return prisma.analysisRun.create({
      data: {
        userId: input.userId,
        status: input.status,
        totalTransactions: input.totalTransactions,
        kOptimal: input.kOptimal,
        silhouetteScore: input.silhouetteScore,
        wcssValues: input.wcssValues as Prisma.InputJsonValue | undefined,
        durationMs: input.durationMs,
        errorMessage: input.errorMessage,
        completedAt: input.completedAt,
      },
    });
  }

  static async updateAnalysisRun(analysisRunId: string, input: Omit<CreateAnalysisRunInput, "userId" | "totalTransactions">) {
    return prisma.analysisRun.update({
      where: { id: analysisRunId },
      data: {
        status: input.status,
        kOptimal: input.kOptimal,
        silhouetteScore: input.silhouetteScore,
        wcssValues: input.wcssValues as Prisma.InputJsonValue | undefined,
        durationMs: input.durationMs,
        errorMessage: input.errorMessage,
        completedAt: input.completedAt,
      },
    });
  }

  static async createCluster(input: CreateClusterInput) {
    return prisma.cluster.create({
      data: {
        analysisRunId: input.analysisRunId,
        clusterIndex: input.clusterIndex,
        centroid: input.centroid,
        size: input.size,
        totalAmount: input.totalAmount,
      },
    });
  }

  static async setTransactionClusterIds(transactionIds: string[], clusterId: string) {
    if (transactionIds.length === 0) return;

    await prisma.transaction.updateMany({
      where: {
        id: {
          in: transactionIds,
        },
      },
      data: {
        clusterId,
      },
    });
  }
}

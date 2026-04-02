import prisma from "@/config/prisma";
import { Prisma } from "@prisma/client";

export interface FindImportBatchesOptions {
    userId: string;
    skip?: number;
    take?: number;
    sortBy?: "createdAt" | "fileName" | "totalRows" | "successCount" | "errorCount";
    sortOrder?: "asc" | "desc";
}

export class ImportBatchRepository {
    static async create(data: Prisma.ImportBatchUncheckedCreateInput) {
        return prisma.importBatch.create({ data });
    }

    static async findByIdAndUser(importBatchId: string, userId: string) {
        return prisma.importBatch.findFirst({
            where: { id: importBatchId, userId },
        });
    }

    static async findManyByUser(options: FindImportBatchesOptions) {
        const { userId, skip, take, sortBy = "createdAt", sortOrder = "desc" } = options;

        return prisma.importBatch.findMany({
            where: { userId },
            orderBy: { [sortBy]: sortOrder },
            skip,
            take,
        });
    }

    static async countByUser(userId: string) {
        return prisma.importBatch.count({
            where: { userId },
        });
    }

    static async updateById(importBatchId: string, data: Prisma.ImportBatchUncheckedUpdateInput) {
        return prisma.importBatch.update({
            where: { id: importBatchId },
            data,
        });
    }
}

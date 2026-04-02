import prisma from "@/config/prisma";
import { Prisma } from "@prisma/client";

export interface FindExportLogsOptions {
    userId: string;
    skip?: number;
    take?: number;
    format?: Prisma.ExportLogWhereInput["format"];
    status?: Prisma.ExportLogWhereInput["status"];
    month?: number;
    year?: number;
    sortBy?: "createdAt" | "completedAt" | "month" | "year" | "status";
    sortOrder?: "asc" | "desc";
}

export class ExportLogRepository {
    static async create(data: Prisma.ExportLogUncheckedCreateInput) {
        return prisma.exportLog.create({ data });
    }

    static async findByIdAndUser(exportLogId: string, userId: string) {
        return prisma.exportLog.findFirst({
            where: { id: exportLogId, userId },
        });
    }

    static async findManyByUser(options: FindExportLogsOptions) {
        const { userId, skip, take, format, status, month, year, sortBy = "createdAt", sortOrder = "desc" } = options;

        return prisma.exportLog.findMany({
            where: {
                userId,
                ...(format ? { format } : {}),
                ...(status ? { status } : {}),
                ...(month ? { month } : {}),
                ...(year ? { year } : {}),
            },
            orderBy: { [sortBy]: sortOrder },
            skip,
            take,
        });
    }

    static async countByUser(options: Omit<FindExportLogsOptions, "skip" | "take" | "sortBy" | "sortOrder">) {
        const { userId, format, status, month, year } = options;

        return prisma.exportLog.count({
            where: {
                userId,
                ...(format ? { format } : {}),
                ...(status ? { status } : {}),
                ...(month ? { month } : {}),
                ...(year ? { year } : {}),
            },
        });
    }

    static async updateById(exportLogId: string, data: Prisma.ExportLogUncheckedUpdateInput) {
        return prisma.exportLog.update({
            where: { id: exportLogId },
            data,
        });
    }
}

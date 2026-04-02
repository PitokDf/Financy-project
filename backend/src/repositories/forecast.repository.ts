import prisma from "@/config/prisma";
import { Prisma } from "@prisma/client";

export interface FindForecastsOptions {
    userId: string;
    skip?: number;
    take?: number;
    categoryId?: string;
    targetMonth?: number;
    targetYear?: number;
    sortBy?: "createdAt" | "targetMonth" | "targetYear" | "predictedAmount";
    sortOrder?: "asc" | "desc";
}

const forecastInclude = {
    category: {
        select: {
            id: true,
            name: true,
            icon: true,
            color: true,
        },
    },
} satisfies Prisma.ForecastInclude;

export class ForecastRepository {
    static async create(data: Prisma.ForecastUncheckedCreateInput) {
        return prisma.forecast.create({
            data,
            include: forecastInclude,
        });
    }

    static async findByIdAndUser(forecastId: string, userId: string) {
        return prisma.forecast.findFirst({
            where: { id: forecastId, userId },
            include: forecastInclude,
        });
    }

    static async findDuplicate(userId: string, categoryId: string, targetMonth: number, targetYear: number, ignoreForecastId?: string) {
        return prisma.forecast.findFirst({
            where: {
                userId,
                categoryId,
                targetMonth,
                targetYear,
                ...(ignoreForecastId ? { NOT: { id: ignoreForecastId } } : {}),
            },
        });
    }

    static async findManyByUser(options: FindForecastsOptions) {
        const {
            userId,
            skip,
            take,
            categoryId,
            targetMonth,
            targetYear,
            sortBy = "createdAt",
            sortOrder = "desc",
        } = options;

        return prisma.forecast.findMany({
            where: {
                userId,
                ...(categoryId ? { categoryId } : {}),
                ...(targetMonth ? { targetMonth } : {}),
                ...(targetYear ? { targetYear } : {}),
            },
            orderBy: { [sortBy]: sortOrder },
            skip,
            take,
            include: forecastInclude,
        });
    }

    static async countByUser(options: Omit<FindForecastsOptions, "skip" | "take" | "sortBy" | "sortOrder">) {
        const { userId, categoryId, targetMonth, targetYear } = options;

        return prisma.forecast.count({
            where: {
                userId,
                ...(categoryId ? { categoryId } : {}),
                ...(targetMonth ? { targetMonth } : {}),
                ...(targetYear ? { targetYear } : {}),
            },
        });
    }

    static async updateById(forecastId: string, data: Prisma.ForecastUncheckedUpdateInput) {
        return prisma.forecast.update({
            where: { id: forecastId },
            data,
            include: forecastInclude,
        });
    }

    static async deleteById(forecastId: string) {
        return prisma.forecast.delete({
            where: { id: forecastId },
            include: forecastInclude,
        });
    }
}

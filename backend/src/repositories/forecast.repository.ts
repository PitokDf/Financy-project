import prisma from "@/config/prisma";
import { Prisma } from "generated/prisma/client";

export class ForecastRepository {
    public upsertForecast = async (data: {
        userId: string;
        categoryId: string;
        targetMonth: number;
        targetYear: number;
        predictedAmount: number;
    }) => {
        return prisma.forecast.upsert({
            where: {
                userId_categoryId_targetMonth_targetYear: {
                    userId: data.userId,
                    categoryId: data.categoryId,
                    targetMonth: data.targetMonth,
                    targetYear: data.targetYear,
                },
            },
            create: {
                userId: data.userId,
                categoryId: data.categoryId,
                targetMonth: data.targetMonth,
                targetYear: data.targetYear,
                predictedAmount: new Prisma.Decimal(data.predictedAmount),
            },
            update: {
                predictedAmount: new Prisma.Decimal(data.predictedAmount),
            },
        });
    }

    public getLatestByUserId = async (userId: string) => {
        return prisma.forecast.findFirst({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: { category: true }
        });
    }
}

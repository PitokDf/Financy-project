import prisma from "@/config/prisma";
import { Prisma } from "@/generated/prisma/client";

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

    public upsertForecasts = async (data: Array<{
        userId: string;
        categoryId: string;
        targetMonth: number;
        targetYear: number;
        predictedAmount: number;
    }>) => {
        if (!data.length) return;

        await prisma.$transaction(
            data.map((item) =>
                prisma.forecast.upsert({
                    where: {
                        userId_categoryId_targetMonth_targetYear: {
                            userId: item.userId,
                            categoryId: item.categoryId,
                            targetMonth: item.targetMonth,
                            targetYear: item.targetYear,
                        },
                    },
                    create: {
                        userId: item.userId,
                        categoryId: item.categoryId,
                        targetMonth: item.targetMonth,
                        targetYear: item.targetYear,
                        predictedAmount: new Prisma.Decimal(item.predictedAmount),
                    },
                    update: {
                        predictedAmount: new Prisma.Decimal(item.predictedAmount),
                    },
                }),
            ),
        );
    }

    public getLatestByUserId = async (userId: string) => {
        return prisma.forecast.findFirst({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: { category: true }
        });
    }
}

import prisma from "@/config/prisma";

export class DashboardRepository {
    public getAllTimeStats = async (userId: string) => {
        return prisma.transaction.groupBy({
            by: ['type'],
            where: { userId },
            _sum: { amount: true },
        });
    }

    public getMonthlyStats = async (userId: string, start: Date, end: Date) => {
        return prisma.transaction.groupBy({
            by: ['type'],
            where: {
                userId,
                date: {
                    gte: start,
                    lte: end
                }
            },
            _sum: { amount: true },
        });
    }

    public getTopCategories = async (userId: string, start: Date, end: Date, limit: number = 4) => {
        return prisma.transaction.groupBy({
            by: ['categoryId'],
            where: {
                userId,
                type: 'EXPENSE',
                categoryId: { not: null },
                date: {
                    gte: start,
                    lte: end,
                }
            },
            _sum: { amount: true },
            orderBy: {
                _sum: { amount: 'desc' }
            },
            take: limit,
        });
    }
}

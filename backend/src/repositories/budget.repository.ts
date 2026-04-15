import prisma from "@/config/prisma";

export class BudgetRepository {
    public findAll = async (userId: string) => {
        return prisma.budgetGoal.findMany({
            where: { userId },
            include: { category: true },
            orderBy: { createdAt: "desc" },
        });
    }

    public findById = async (userId: string, id: string) => {
        return prisma.budgetGoal.findUnique({
            where: { userId, id },
            include: { category: true },
        });
    }

    public create = async (userId: string, data: any) => {
        return prisma.budgetGoal.create({
            data: {
                ...data,
                userId,
            },
        });
    }

    public update = async (userId: string, id: string, data: any) => {
        return prisma.budgetGoal.update({
            where: { userId, id },
            data,
        });
    }

    public delete = async (userId: string, id: string) => {
        return prisma.budgetGoal.delete({
            where: { userId, id },
        });
    }

    public findByCategory = async (userId: string, categoryId: string) => {
        return prisma.budgetGoal.findUnique({
            where: {
                userId_categoryId: {
                    userId,
                    categoryId,
                },
            },
        });
    }

    public getSpendingByCategory = async (userId: string, categoryIds: string[], startDate: Date, endDate: Date) => {
        return prisma.transaction.groupBy({
            by: ['categoryId'],
            where: {
                userId,
                type: 'EXPENSE',
                categoryId: { in: categoryIds },
                date: {
                    gte: startDate,
                    lte: endDate
                }
            },
            _sum: {
                amount: true
            }
        });
    }
}

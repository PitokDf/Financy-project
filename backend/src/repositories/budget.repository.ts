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

    public findAllWithCategory = async () => {
        return prisma.budgetGoal.findMany({
            include: { category: true }
        });
    }

    public updateAlertStatus = async (id: string, data: { alertSent80?: boolean, alertSent100?: boolean }) => {
        return prisma.budgetGoal.update({
            where: { id },
            data
        });
    }

    public resetMonthlyAlerts = async (startOfMonth: Date) => {
        return prisma.budgetGoal.updateMany({
            where: {
                updatedAt: { lt: startOfMonth },
                OR: [
                    { alertSent80: true },
                    { alertSent100: true }
                ]
            },
            data: {
                alertSent80: false,
                alertSent100: false
            }
        });
    }
}

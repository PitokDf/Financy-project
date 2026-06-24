import prisma from "@/config/prisma";

export class ScheduledExpenseRepository {
    public getAll = async (userId: string) => {
        return prisma.scheduledExpense.findMany({
            where: { userId },
            include: { category: true },
            orderBy: { dayOfMonth: 'asc' }
        });
    }

    public getById = async (id: string) => {
        return prisma.scheduledExpense.findUnique({
            where: { id },
            include: { category: true }
        });
    }

    public getActiveByDay = async (dayOfMonth: number) => {
        return prisma.scheduledExpense.findMany({
            where: {
                isActive: true,
                dayOfMonth
            },
            include: { user: true, category: true }
        });
    }

    public create = async (data: {
        userId: string;
        description: string;
        amount: number;
        dayOfMonth: number;
        categoryId?: string | null;
    }) => {
        return prisma.scheduledExpense.create({
            data: {
                userId: data.userId,
                description: data.description,
                amount: data.amount,
                dayOfMonth: data.dayOfMonth,
                categoryId: data.categoryId || null
            },
            include: { category: true }
        });
    }

    public update = async (id: string, data: {
        description?: string;
        amount?: number;
        dayOfMonth?: number;
        categoryId?: string | null;
        isActive?: boolean;
    }) => {
        return prisma.scheduledExpense.update({
            where: { id },
            data,
            include: { category: true }
        });
    }

    public markProcessed = async (id: string, now: Date) => {
        return prisma.scheduledExpense.update({
            where: { id },
            data: { lastProcessedAt: now }
        });
    }

    public markNotified = async (id: string, dayOfMonth: number) => {
        return prisma.scheduledExpense.update({
            where: { id },
            data: { lastNotifiedDay: dayOfMonth }
        });
    }

    public delete = async (id: string) => {
        return prisma.scheduledExpense.delete({ where: { id } });
    }
}

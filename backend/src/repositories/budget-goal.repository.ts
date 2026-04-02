import prisma from "@/config/prisma";
import { Prisma } from "@prisma/client";

export interface FindBudgetGoalsOptions {
    userId: string;
    skip?: number;
    take?: number;
    categoryId?: string;
    month?: number;
    year?: number;
    sortBy?: "createdAt" | "month" | "year" | "limitAmount";
    sortOrder?: "asc" | "desc";
}

const budgetGoalInclude = {
    category: {
        select: {
            id: true,
            name: true,
            icon: true,
            color: true,
        },
    },
} satisfies Prisma.BudgetGoalInclude;

export class BudgetGoalRepository {
    static async create(data: Prisma.BudgetGoalUncheckedCreateInput) {
        return prisma.budgetGoal.create({
            data,
            include: budgetGoalInclude,
        });
    }

    static async findByIdAndUser(budgetGoalId: string, userId: string) {
        return prisma.budgetGoal.findFirst({
            where: {
                id: budgetGoalId,
                userId,
            },
            include: budgetGoalInclude,
        });
    }

    static async findDuplicate(userId: string, categoryId: string, month: number, year: number, ignoreBudgetGoalId?: string) {
        return prisma.budgetGoal.findFirst({
            where: {
                userId,
                categoryId,
                month,
                year,
                ...(ignoreBudgetGoalId ? { NOT: { id: ignoreBudgetGoalId } } : {}),
            },
        });
    }

    static async findManyByUser(options: FindBudgetGoalsOptions) {
        const {
            userId,
            skip,
            take,
            categoryId,
            month,
            year,
            sortBy = "createdAt",
            sortOrder = "desc",
        } = options;

        return prisma.budgetGoal.findMany({
            where: {
                userId,
                ...(categoryId ? { categoryId } : {}),
                ...(month ? { month } : {}),
                ...(year ? { year } : {}),
            },
            orderBy: {
                [sortBy]: sortOrder,
            },
            skip,
            take,
            include: budgetGoalInclude,
        });
    }

    static async countByUser(options: Omit<FindBudgetGoalsOptions, "skip" | "take" | "sortBy" | "sortOrder">) {
        const { userId, categoryId, month, year } = options;

        return prisma.budgetGoal.count({
            where: {
                userId,
                ...(categoryId ? { categoryId } : {}),
                ...(month ? { month } : {}),
                ...(year ? { year } : {}),
            },
        });
    }

    static async updateById(budgetGoalId: string, data: Prisma.BudgetGoalUncheckedUpdateInput) {
        return prisma.budgetGoal.update({
            where: { id: budgetGoalId },
            data,
            include: budgetGoalInclude,
        });
    }

    static async deleteById(budgetGoalId: string) {
        return prisma.budgetGoal.delete({
            where: { id: budgetGoalId },
            include: budgetGoalInclude,
        });
    }
}

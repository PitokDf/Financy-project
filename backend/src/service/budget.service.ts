import { BudgetRepository } from "@/repositories/budget.repository";
import { startOfMonth, endOfMonth } from "date-fns";
import { AppError } from "@/errors/app-error";
import { HttpStatus } from "@/constants/http-status";

export class BudgetService {
    constructor(private readonly budgetRepo: BudgetRepository) { }

    public getBudgetsWithProgress = async (userId: string) => {
        const budgets = await this.budgetRepo.findAll(userId);
        
        const now = new Date();
        const start = startOfMonth(now);
        const end = endOfMonth(now);

        const categoryIds = budgets.map(b => b.categoryId);
        const spentAggregates = await this.budgetRepo.getSpendingByCategory(userId, categoryIds, start, end);

        const spentMap = new Map(spentAggregates.map(agg => [agg.categoryId, agg._sum.amount || 0]));

        return budgets.map(budget => ({
            ...budget,
            spentAmount: spentMap.get(budget.categoryId) || 0,
            month: now.getMonth() + 1,
            year: now.getFullYear()
        }));
    }

    public createBudget = async (userId: string, data: any) => {
        const existing = await this.budgetRepo.findByCategory(userId, data.categoryId);
        if (existing) {
            throw new AppError("Anggaran untuk kategori ini sudah ada", HttpStatus.CONFLICT);
        }

        return this.budgetRepo.create(userId, data);
    }

    public updateBudget = async (userId: string, id: string, data: any) => {
        return this.budgetRepo.update(userId, id, data);
    }

    public deleteBudget = async (userId: string, id: string) => {
        return this.budgetRepo.delete(userId, id);
    }
}

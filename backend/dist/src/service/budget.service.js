"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetService = void 0;
const date_fns_1 = require("date-fns");
const app_error_1 = require("../errors/app-error");
const http_status_1 = require("../constants/http-status");
class BudgetService {
    constructor(budgetRepo) {
        this.budgetRepo = budgetRepo;
        this.getBudgetsWithProgress = async (userId) => {
            const budgets = await this.budgetRepo.findAll(userId);
            const now = new Date();
            const start = (0, date_fns_1.startOfMonth)(now);
            const end = (0, date_fns_1.endOfMonth)(now);
            const categoryIds = budgets.map(b => b.categoryId);
            const spentAggregates = await this.budgetRepo.getSpendingByCategory(userId, categoryIds, start, end);
            const spentMap = new Map(spentAggregates.map(agg => [agg.categoryId, agg._sum.amount || 0]));
            return budgets.map(budget => ({
                ...budget,
                spentAmount: spentMap.get(budget.categoryId) || 0,
                month: now.getMonth() + 1,
                year: now.getFullYear()
            }));
        };
        this.createBudget = async (userId, data) => {
            const existing = await this.budgetRepo.findByCategory(userId, data.categoryId);
            if (existing) {
                throw new app_error_1.AppError("Anggaran untuk kategori ini sudah ada", http_status_1.HttpStatus.CONFLICT);
            }
            return this.budgetRepo.create(userId, data);
        };
        this.updateBudget = async (userId, id, data) => {
            return this.budgetRepo.update(userId, id, data);
        };
        this.deleteBudget = async (userId, id) => {
            return this.budgetRepo.delete(userId, id);
        };
    }
}
exports.BudgetService = BudgetService;
//# sourceMappingURL=budget.service.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class BudgetRepository {
    constructor() {
        this.findAll = async (userId) => {
            return prisma_1.default.budgetGoal.findMany({
                where: { userId },
                include: { category: true },
                orderBy: { createdAt: "desc" },
            });
        };
        this.findById = async (userId, id) => {
            return prisma_1.default.budgetGoal.findUnique({
                where: { userId, id },
                include: { category: true },
            });
        };
        this.create = async (userId, data) => {
            return prisma_1.default.budgetGoal.create({
                data: {
                    ...data,
                    userId,
                },
            });
        };
        this.update = async (userId, id, data) => {
            return prisma_1.default.budgetGoal.update({
                where: { userId, id },
                data,
            });
        };
        this.delete = async (userId, id) => {
            return prisma_1.default.budgetGoal.delete({
                where: { userId, id },
            });
        };
        this.findByCategory = async (userId, categoryId) => {
            return prisma_1.default.budgetGoal.findUnique({
                where: {
                    userId_categoryId: {
                        userId,
                        categoryId,
                    },
                },
            });
        };
        this.getSpendingByCategory = async (userId, categoryIds, startDate, endDate) => {
            return prisma_1.default.transaction.groupBy({
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
        };
    }
}
exports.BudgetRepository = BudgetRepository;
//# sourceMappingURL=budget.repository.js.map
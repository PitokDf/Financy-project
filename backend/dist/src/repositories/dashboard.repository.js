"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class DashboardRepository {
    constructor() {
        this.getAllTimeStats = async (userId) => {
            return prisma_1.default.transaction.groupBy({
                by: ['type'],
                where: { userId },
                _sum: { amount: true },
            });
        };
        this.getMonthlyStats = async (userId, start, end) => {
            return prisma_1.default.transaction.groupBy({
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
        };
        this.getTopCategories = async (userId, start, end, limit = 4) => {
            return prisma_1.default.transaction.groupBy({
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
        };
    }
}
exports.DashboardRepository = DashboardRepository;
//# sourceMappingURL=dashboard.repository.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class TransactionRepository {
    constructor() {
        this.getAllPaginated = async (userId, cursor, limit = 20, search, type) => {
            const where = { userId };
            if (type && type !== 'ALL') {
                where.type = type;
            }
            if (search) {
                where.OR = [
                    { description: { contains: search, mode: 'insensitive' } },
                    { category: { name: { contains: search, mode: 'insensitive' } } }
                ];
            }
            const [transactions, incomeAgg, expenseAgg] = await Promise.all([
                prisma_1.default.transaction.findMany({
                    where,
                    take: limit + 1,
                    skip: cursor ? 1 : undefined,
                    cursor: cursor ? { id: cursor } : undefined,
                    include: { category: true },
                    orderBy: [
                        { date: "desc" },
                        { createdAt: "desc" },
                        { id: "desc" }
                    ],
                }),
                prisma_1.default.transaction.aggregate({
                    where: { ...where, type: 'INCOME' },
                    _sum: { amount: true }
                }),
                prisma_1.default.transaction.aggregate({
                    where: { ...where, type: 'EXPENSE' },
                    _sum: { amount: true }
                })
            ]);
            return {
                transactions,
                totalIncome: incomeAgg._sum.amount || 0,
                totalExpense: expenseAgg._sum.amount || 0
            };
        };
        this.create = async (userId, data) => {
            return prisma_1.default.transaction.create({
                data: {
                    ...data,
                    userId,
                },
            });
        };
        this.createCsvImport = async (userId, filename, rowCount) => {
            return prisma_1.default.csvImport.create({
                data: {
                    userId,
                    filename,
                    rowCount,
                    successCount: 0,
                    errorCount: 0
                }
            });
        };
        this.createMany = async (data) => {
            return prisma_1.default.transaction.createMany({
                data
            });
        };
        this.updateCsvImportSuccessCount = async (id, successCount) => {
            return prisma_1.default.csvImport.update({
                where: { id },
                data: { successCount }
            });
        };
        this.delete = async (userId, trxId) => {
            return prisma_1.default.transaction.delete({
                where: {
                    userId,
                    id: trxId,
                },
            });
        };
        this.findForAnalysis = async (userId, startDate, endDate = new Date()) => {
            return prisma_1.default.transaction.findMany({
                where: {
                    userId,
                    date: {
                        gte: startDate,
                        lte: endDate,
                    },
                    type: 'EXPENSE',
                },
                orderBy: [
                    { date: "asc" },
                    { createdAt: "asc" }
                ],
            });
        };
        this.findByCategory = async (userId, categoryId, take = 3) => {
            return prisma_1.default.transaction.findMany({
                where: {
                    userId,
                    categoryId,
                },
                orderBy: [
                    { date: "desc" },
                    { createdAt: "desc" }
                ],
                take,
            });
        };
        this.updateCluster = async (transactionIds, clusterId) => {
            if (!transactionIds.length)
                return { count: 0 };
            return prisma_1.default.transaction.updateMany({
                where: {
                    id: {
                        in: transactionIds,
                    },
                },
                data: {
                    clusterId,
                },
            });
        };
        this.updateCategoryByTransactionIds = async (transactionIds, categoryId) => {
            if (!transactionIds.length)
                return { count: 0 };
            return prisma_1.default.transaction.updateMany({
                where: {
                    id: {
                        in: transactionIds,
                    },
                },
                data: {
                    categoryId,
                },
            });
        };
    }
}
exports.TransactionRepository = TransactionRepository;
//# sourceMappingURL=transaction.repository.js.map
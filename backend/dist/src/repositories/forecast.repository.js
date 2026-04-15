"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForecastRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const client_1 = require("../generated/prisma/client");
class ForecastRepository {
    constructor() {
        this.upsertForecast = async (data) => {
            return prisma_1.default.forecast.upsert({
                where: {
                    userId_categoryId_targetMonth_targetYear: {
                        userId: data.userId,
                        categoryId: data.categoryId,
                        targetMonth: data.targetMonth,
                        targetYear: data.targetYear,
                    },
                },
                create: {
                    userId: data.userId,
                    categoryId: data.categoryId,
                    targetMonth: data.targetMonth,
                    targetYear: data.targetYear,
                    predictedAmount: new client_1.Prisma.Decimal(data.predictedAmount),
                },
                update: {
                    predictedAmount: new client_1.Prisma.Decimal(data.predictedAmount),
                },
            });
        };
        this.getLatestByUserId = async (userId) => {
            return prisma_1.default.forecast.findFirst({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                include: { category: true }
            });
        };
    }
}
exports.ForecastRepository = ForecastRepository;
//# sourceMappingURL=forecast.repository.js.map
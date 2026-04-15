"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForecastService = void 0;
class ForecastService {
    constructor(transactionRepo, forecastRepo) {
        this.transactionRepo = transactionRepo;
        this.forecastRepo = forecastRepo;
        this.forecastTopCategory = async (userId, categoryId) => {
            const transactions = await this.transactionRepo.findByCategory(userId, categoryId, 3);
            if (!transactions.length) {
                return null;
            }
            const predictedAmount = Math.max(0, Math.round(transactions.reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0) / transactions.length));
            const nextMonth = new Date();
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            return this.forecastRepo.upsertForecast({
                userId,
                categoryId,
                targetMonth: nextMonth.getMonth() + 1,
                targetYear: nextMonth.getFullYear(),
                predictedAmount,
            });
        };
    }
}
exports.ForecastService = ForecastService;
//# sourceMappingURL=forecast.service.js.map
import { TransactionRepository } from "@/repositories/transaction.repository";
import { ForecastRepository } from "@/repositories/forecast.repository";
import { CategoryRepository } from "@/repositories/category.repository";

export class ForecastService {
    constructor(
        private readonly transactionRepo: TransactionRepository,
        private readonly forecastRepo: ForecastRepository,
        private readonly categoryRepo: CategoryRepository
    ) { }

    public forecastTopCategory = async (userId: string, categoryId: string) => {
        const monthlyAggs = await this.transactionRepo.getMonthlyAggregates(userId, categoryId, 6);

        if (!monthlyAggs.length) {
            return null;
        }

        // Calculate SMA(3) if possible, otherwise average of what we have
        const windowSize = 3;
        const recentMonths = monthlyAggs.slice(0, windowSize);
        const predictedAmount = Math.max(
            0,
            Math.round(
                recentMonths.reduce((sum, month) => sum + month.total, 0) / recentMonths.length,
            ),
        );

        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        return this.forecastRepo.upsertForecast({
            userId,
            categoryId,
            targetMonth: nextMonth.getMonth() + 1,
            targetYear: nextMonth.getFullYear(),
            predictedAmount,
        });
    }

    public getTopForecasts = async (userId: string, limit = 3) => {
        const categories = await this.categoryRepo.getAll(userId);
        const forecasts: Array<{ categoryName: string; predictedAmount: number; rank: number }> = [];

        for (const category of categories) {
            const monthlyAggs = await this.transactionRepo.getMonthlyAggregates(userId, category.id, 6);
            if (monthlyAggs.length < 1) continue;

            const windowSize = 3;
            const recentMonths = monthlyAggs.slice(0, windowSize);
            const predictedAmount = Math.round(
                recentMonths.reduce((sum, month) => sum + month.total, 0) / recentMonths.length
            );

            if (predictedAmount > 0) {
                // We don't necessarily need to upsert here, but we can if we want persistence
                forecasts.push({
                    categoryName: category.name,
                    predictedAmount,
                    rank: 0 // Will be set after sorting
                });
            }
        }

        return forecasts
            .sort((a, b) => b.predictedAmount - a.predictedAmount)
            .slice(0, limit)
            .map((f, i) => ({ ...f, rank: i + 1 }));
    }
}

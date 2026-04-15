import { TransactionRepository } from "@/repositories/transaction.repository";
import { ForecastRepository } from "@/repositories/forecast.repository";

export class ForecastService {
    constructor(
        private readonly transactionRepo: TransactionRepository,
        private readonly forecastRepo: ForecastRepository
    ) { }

    public forecastTopCategory = async (userId: string, categoryId: string) => {
        const transactions = await this.transactionRepo.findByCategory(userId, categoryId, 3);

        if (!transactions.length) {
            return null;
        }

        const predictedAmount = Math.max(
            0,
            Math.round(
                transactions.reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0) / transactions.length,
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
}

import { TransactionRepository } from "@/repositories/transaction.repository";
import { ForecastRepository } from "@/repositories/forecast.repository";
import { CategoryRepository } from "@/repositories/category.repository";

const WINDOW_SIZE = 3;

export class ForecastService {
  constructor(
    private readonly transactionRepo: TransactionRepository,
    private readonly forecastRepo: ForecastRepository,
    private readonly categoryRepo: CategoryRepository,
  ) {}

  public forecastTopCategory = async (userId: string, categoryId: string) => {
    const monthlyAggs = await this.transactionRepo.getMonthlyAggregates(
      userId,
      categoryId,
      WINDOW_SIZE,
    );

    if (!monthlyAggs.length) {
      return null;
    }

    const predictedAmount = this.calculateSMA(monthlyAggs);

    const nextMonth = this.nextTargetMonth();

    return this.forecastRepo.upsertForecast({
      userId,
      categoryId,
      targetMonth: nextMonth.month,
      targetYear: nextMonth.year,
      predictedAmount,
    });
  };

  public getTopForecasts = async (userId: string, limit = 3) => {
    const categories = await this.categoryRepo.getAll(userId);
    if (!categories.length) return [];

    const monthlyAggsByCategory =
      await this.transactionRepo.getMonthlyAggregatesByCategories(
        userId,
        categories.map((c) => c.id),
        WINDOW_SIZE,
      );

    const forecasts: Array<{
      categoryId: string;
      categoryName: string;
      predictedAmount: number;
      rank: number;
    }> = [];

    for (const category of categories) {
      const monthlyAggs = monthlyAggsByCategory.get(category.id);
      if (!monthlyAggs || !monthlyAggs.length) continue;

      const predictedAmount = this.calculateSMA(monthlyAggs);

      if (predictedAmount > 0) {
        forecasts.push({
          categoryId: category.id,
          categoryName: category.name,
          predictedAmount,
          rank: 0, // Will be set after sorting
        });
      }
    }

    const sorted = forecasts
      .sort((a, b) => b.predictedAmount - a.predictedAmount)
      .slice(0, limit)
      .map((f, i) => ({ ...f, rank: i + 1 }));

    const { month, year } = this.nextTargetMonth();
    await this.forecastRepo.upsertForecasts(
      sorted.map((f) => ({
        userId,
        categoryId: f.categoryId,
        targetMonth: month,
        targetYear: year,
        predictedAmount: f.predictedAmount,
      })),
    );

    return sorted.map(({ categoryName, predictedAmount, rank }) => ({
      categoryName,
      predictedAmount,
      rank,
    }));
  };

  private calculateSMA = (
    monthlyAggs: Array<{ total: number }>,
    windowSize = WINDOW_SIZE,
  ) => {
    const recentMonths = monthlyAggs.slice(0, windowSize);
    return Math.max(
      0,
      Math.round(
        recentMonths.reduce((sum, month) => sum + month.total, 0) /
          windowSize,
      ),
    );
  };

  private nextTargetMonth = () => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    return { month: nextMonth.getMonth() + 1, year: nextMonth.getFullYear() };
  };
}
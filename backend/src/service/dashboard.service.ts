import { startOfMonth, endOfMonth } from "date-fns";
import { DashboardRepository } from "@/repositories/dashboard.repository";
import { CategoryRepository } from "@/repositories/category.repository";
import { ForecastRepository } from "@/repositories/forecast.repository";
import { ForecastService } from "@/service/forecast.service";
import { cacheManager } from "@/utils/cache";
import { redisClient } from "@/config/redis";
import frameworkLogger from "@/utils/winston.logger";

export class DashboardService {
    constructor(
        private readonly dashboardRepo: DashboardRepository,
        private readonly categoryRepo: CategoryRepository,
        private readonly forecastRepo: ForecastRepository,
        private readonly forecastService: ForecastService
    ) { }

    public getSummary = async (userId: string): Promise<{
        summary: {
            totalBalance: number;
            monthlyIncome: number;
            monthlyExpense: number;
            savingsRate: number;
        };
        topCategories: {
            name: string;
            amount: number;
            percentage: number;
            color: string;
        }[];
        forecast: {
            categoryName: string;
            predictedAmount: number;
            targetMonth: number;
        } | null;
        topForecasts: {
            rank: number;
            categoryName: string;
            predictedAmount: number;
        }[];
    }> => {
        const now = new Date();
        const start = startOfMonth(now);
        const end = endOfMonth(now);
        const cachedKey = `dashboard:${userId}`;

        const cachedData = await redisClient.get(cachedKey);
        if (cachedData) {
            frameworkLogger.cache('Cache hit for dashboard summary');
            return JSON.parse(cachedData);
        }

        const [allTimeStats, monthlyStats, categoryStats, latestForecast, topForecasts] = await Promise.all([
            this.dashboardRepo.getAllTimeStats(userId),
            this.dashboardRepo.getMonthlyStats(userId, start, end),
            this.dashboardRepo.getTopCategories(userId, start, end),
            this.forecastRepo.getLatestByUserId(userId),
            this.forecastService.getTopForecasts(userId, 3)
        ]);

        let totalIncomeAllTime = 0;
        let totalExpenseAllTime = 0;
        allTimeStats.forEach(stat => {
            if (stat.type === 'INCOME') totalIncomeAllTime = stat._sum.amount || 0;
            if (stat.type === 'EXPENSE') totalExpenseAllTime = stat._sum.amount || 0;
        });

        const totalBalance = totalIncomeAllTime - totalExpenseAllTime;

        let monthlyIncome = 0;
        let monthlyExpense = 0;
        monthlyStats.forEach(stat => {
            if (stat.type === 'INCOME') monthlyIncome = stat._sum.amount || 0;
            if (stat.type === 'EXPENSE') monthlyExpense = stat._sum.amount || 0;
        });

        const savingsRate = monthlyIncome > 0
            ? Number((((monthlyIncome - monthlyExpense) / monthlyIncome) * 100).toFixed(1))
            : 0;

        const categoryIds = categoryStats.map(c => c.categoryId).filter(Boolean) as string[];
        const categories = await this.categoryRepo.findByIds(categoryIds);
        const categoryMap = new Map(categories.map(c => [c.id, c]));

        const topCategories = categoryStats.map(stat => {
            const category = categoryMap.get(stat.categoryId!);
            const amount = stat._sum.amount || 0;
            const percentage = monthlyExpense > 0 ? Number(((amount / monthlyExpense) * 100).toFixed(1)) : 0;

            return {
                name: category?.name || 'Lainnya',
                amount,
                percentage,
                color: category?.color || '#888888'
            };
        });

        const result = {
            summary: {
                totalBalance,
                monthlyIncome,
                monthlyExpense,
                savingsRate
            },
            topCategories,

            forecast: latestForecast ? {
                categoryName: latestForecast.category.name,
                predictedAmount: Number(latestForecast.predictedAmount),
                targetMonth: latestForecast.targetMonth
            } : null,
            topForecasts
        }

        redisClient.set(cachedKey, JSON.stringify(result), 'EX', 3600)

        return result;
    }
}

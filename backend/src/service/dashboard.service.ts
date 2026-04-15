import { startOfMonth, endOfMonth } from "date-fns";
import { DashboardRepository } from "@/repositories/dashboard.repository";
import { CategoryRepository } from "@/repositories/category.repository";
import { ForecastRepository } from "@/repositories/forecast.repository";

export class DashboardService {
    constructor(
        private readonly dashboardRepo: DashboardRepository,
        private readonly categoryRepo: CategoryRepository,
        private readonly forecastRepo: ForecastRepository
    ) { }

    public getSummary = async (userId: string) => {
        const now = new Date();
        const start = startOfMonth(now);
        const end = endOfMonth(now);

        const [allTimeStats, monthlyStats, categoryStats, latestForecast] = await Promise.all([
            this.dashboardRepo.getAllTimeStats(userId),
            this.dashboardRepo.getMonthlyStats(userId, start, end),
            this.dashboardRepo.getTopCategories(userId, start, end),
            this.forecastRepo.getLatestByUserId(userId)
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

        return {
            summary: {
                totalBalance,
                monthlyIncome,
                monthlyExpense,
                savingsRate,
            },
            topCategories,
            forecast: latestForecast ? {
                categoryName: latestForecast.category.name,
                predictedAmount: Number(latestForecast.predictedAmount),
                targetMonth: latestForecast.targetMonth
            } : null
        };
    }
}

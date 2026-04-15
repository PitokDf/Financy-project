import { DashboardRepository } from "../repositories/dashboard.repository";
import { CategoryRepository } from "../repositories/category.repository";
import { ForecastRepository } from "../repositories/forecast.repository";
export declare class DashboardService {
    private readonly dashboardRepo;
    private readonly categoryRepo;
    private readonly forecastRepo;
    constructor(dashboardRepo: DashboardRepository, categoryRepo: CategoryRepository, forecastRepo: ForecastRepository);
    getSummary: (userId: string) => Promise<{
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
    }>;
}
//# sourceMappingURL=dashboard.service.d.ts.map
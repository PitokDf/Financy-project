import { TransactionRepository } from "../repositories/transaction.repository";
import { ForecastRepository } from "../repositories/forecast.repository";
export declare class ForecastService {
    private readonly transactionRepo;
    private readonly forecastRepo;
    constructor(transactionRepo: TransactionRepository, forecastRepo: ForecastRepository);
    forecastTopCategory: (userId: string, categoryId: string) => Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        categoryId: string;
        targetMonth: number;
        targetYear: number;
        predictedAmount: import("@prisma/client-runtime-utils").Decimal;
    } | null>;
}
//# sourceMappingURL=forecast.service.d.ts.map
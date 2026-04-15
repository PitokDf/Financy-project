import { AnalysisRepository } from "../repositories/analysis.repository";
import { CategoryRepository } from "../repositories/category.repository";
import { TransactionRepository } from "../repositories/transaction.repository";
import { ForecastService } from "../service/forecast.service";
import { RunAnalysisInput, ConfirmAnalysisInput } from "../schemas/analysis.schema";
export declare class AnalysisService {
    private readonly analysisRepo;
    private readonly categoryRepo;
    private readonly transactionRepo;
    private readonly forecastService;
    constructor(analysisRepo: AnalysisRepository, categoryRepo: CategoryRepository, transactionRepo: TransactionRepository, forecastService: ForecastService);
    getLatestRun: (userId: string) => Promise<{
        runId: string;
        status: string;
        totalTransactions: number;
        kOptimal: number | null;
        silhouetteScore: number | null;
        durationMs: number | null;
        clusters: {
            id: string;
            index: number;
            name: string;
            suggestedName: string | null;
            color: string;
            size: any;
            totalAmount: any;
            representativeDescriptions: never[];
            members: any;
        }[];
        preAssignedSummary: {
            count: any;
        } | undefined;
    } | null>;
    getStats: (userId: string, startDate?: string, endDate?: string) => Promise<{
        income: number;
        expense: number;
        date: string;
    }[]>;
    getCategoryBreakdown: (userId: string, startDate?: string, endDate?: string) => Promise<{
        id: any;
        name: any;
        color: any;
        totalAmount: any;
    }[]>;
    run: (payload: RunAnalysisInput, userId: string) => Promise<{
        runId: string;
        status: string;
        totalTransactions: number;
        kOptimal: number | null;
        silhouetteScore: number | null;
        durationMs: number | null;
        clusters: {
            id: string;
            index: number;
            name: string;
            suggestedName: string | null;
            color: string;
            size: any;
            totalAmount: any;
            representativeDescriptions: never[];
            members: any;
        }[];
        preAssignedSummary: {
            count: any;
        } | undefined;
    } | {
        runId: string;
        status: string;
        totalTransactions: number;
        kOptimal: number;
        silhouetteScore: number;
        durationMs: number;
        elbowData: {
            k: number;
            wcss: number;
        }[];
        clusters: any[];
        preAssignedSummary: {
            count: number;
            byCategory: Record<string, number>;
        };
    } | null>;
    confirm: (payload: ConfirmAnalysisInput) => Promise<{
        runId: string;
        status: string;
        createdCategories: any[];
        forecast: {
            id: string;
            createdAt: Date;
            userId: string;
            categoryId: string;
            targetMonth: number;
            targetYear: number;
            predictedAmount: import("@prisma/client-runtime-utils").Decimal;
        } | null;
    }>;
}
//# sourceMappingURL=analysis.service.d.ts.map
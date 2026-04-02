import { HttpStatus } from "@/constants/http-status";
import { Messages } from "@/constants/message";
import { AppError } from "@/errors/app-error";
import { CategoryRepository } from "@/repositories/category.repository";
import { ForecastRepository } from "@/repositories/forecast.repository";
import { NotificationRepository } from "@/repositories/notification.repository";
import { TransactionRepository } from "@/repositories/transaction.repository";
import {
    GenerateForecastInput,
    GetForecastsQueryInput,
} from "@/schemas/forecast.schema";

type ForecastRecord = Awaited<ReturnType<typeof ForecastRepository.create>>;

export type ForecastResponse = Omit<ForecastRecord, "predictedAmount"> & {
    predictedAmount: number;
};

export interface PaginatedForecastsResponse {
    data: ForecastResponse[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

type MonthlyHistoryPoint = {
    month: number;
    year: number;
    actual: number;
};

const mapForecast = (forecast: ForecastRecord): ForecastResponse => ({
    ...forecast,
    predictedAmount: Number(forecast.predictedAmount),
});

const getMonthIndex = (year: number, month: number) => year * 12 + (month - 1);

export class ForecastService {
    constructor(
        private readonly forecastRepository: typeof ForecastRepository,
        private readonly transactionRepository: typeof TransactionRepository,
        private readonly categoryRepository: typeof CategoryRepository,
        private readonly notificationRepository: typeof NotificationRepository
    ) { }

    public getForecastById = async (userId: string, forecastId: string) => {
        const forecast = await this.forecastRepository.findByIdAndUser(forecastId, userId);

        if (!forecast) {
            throw new AppError(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return mapForecast(forecast);
    };

    public getForecasts = async (userId: string, query: GetForecastsQueryInput): Promise<PaginatedForecastsResponse> => {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const skip = (page - 1) * limit;

        const [forecasts, total] = await Promise.all([
            this.forecastRepository.findManyByUser({
                userId,
                skip,
                take: limit,
                categoryId: query.categoryId,
                targetMonth: query.targetMonth,
                targetYear: query.targetYear,
                sortBy: query.sortBy,
                sortOrder: query.sortOrder,
            }),
            this.forecastRepository.countByUser({
                userId,
                categoryId: query.categoryId,
                targetMonth: query.targetMonth,
                targetYear: query.targetYear,
            }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: forecasts.map(mapForecast),
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        };
    };

    public generateForecast = async (userId: string, payload: GenerateForecastInput) => {
        const category = await this.categoryRepository.findByIdAndUser(payload.categoryId, userId);

        if (!category) {
            throw new AppError("Kategori tidak ditemukan", HttpStatus.NOT_FOUND);
        }

        const duplicate = await this.forecastRepository.findDuplicate(
            userId,
            payload.categoryId,
            payload.targetMonth,
            payload.targetYear
        );

        if (duplicate) {
            throw new AppError(Messages.CONFLICT, HttpStatus.CONFLICT);
        }

        const history = await this.transactionRepository.findExpenseHistoryByCategory(userId, payload.categoryId);

        if (history.length === 0) {
            throw new AppError("Data transaksi historis belum cukup untuk forecast", HttpStatus.BAD_REQUEST);
        }

        const targetIndex = getMonthIndex(payload.targetYear, payload.targetMonth);
        const monthlyMap = new Map<number, MonthlyHistoryPoint>();

        for (const item of history) {
            const month = item.date.getMonth() + 1;
            const year = item.date.getFullYear();
            const monthIndex = getMonthIndex(year, month);

            if (monthIndex >= targetIndex) {
                continue;
            }

            const key = monthIndex;
            const existing = monthlyMap.get(key);
            if (existing) {
                existing.actual += item.amount;
            } else {
                monthlyMap.set(key, {
                    month,
                    year,
                    actual: item.amount,
                });
            }
        }

        const orderedHistory = Array.from(monthlyMap.entries())
            .sort(([left], [right]) => left - right)
            .map(([, value]) => value);

        if (orderedHistory.length === 0) {
            throw new AppError("Belum ada histori sebelum periode target forecast", HttpStatus.BAD_REQUEST);
        }

        const selectedHistory = orderedHistory.slice(-payload.windowSize);
        const predictedAmount = selectedHistory.reduce((sum, item) => sum + item.actual, 0) / selectedHistory.length;

        const forecast = await this.forecastRepository.create({
            userId,
            categoryId: payload.categoryId,
            targetMonth: payload.targetMonth,
            targetYear: payload.targetYear,
            predictedAmount,
            windowSize: payload.windowSize,
            basedOnMonths: selectedHistory,
        });

        try {
            await this.notificationRepository.create({
                userId,
                type: "FORECAST_READY",
                title: "Forecast siap",
                message: `Prediksi pengeluaran untuk ${category.name} periode ${payload.targetMonth}/${payload.targetYear} berhasil dibuat.`,
                metadata: {
                    forecastId: forecast.id,
                    categoryId: payload.categoryId,
                    targetMonth: payload.targetMonth,
                    targetYear: payload.targetYear,
                    predictedAmount,
                },
            });
        } catch {
        }

        return mapForecast(forecast);
    };

    public deleteForecast = async (userId: string, forecastId: string) => {
        const forecast = await this.forecastRepository.findByIdAndUser(forecastId, userId);

        if (!forecast) {
            throw new AppError(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        const deleted = await this.forecastRepository.deleteById(forecastId);

        return mapForecast(deleted);
    };
}

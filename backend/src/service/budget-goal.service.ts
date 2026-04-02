import { HttpStatus } from "@/constants/http-status";
import { Messages } from "@/constants/message";
import { AppError } from "@/errors/app-error";
import { CategoryRepository } from "@/repositories/category.repository";
import { BudgetGoalRepository } from "@/repositories/budget-goal.repository";
import {
    CreateBudgetGoalInput,
    GetBudgetGoalsQueryInput,
    UpdateBudgetGoalInput,
} from "@/schemas/budget-goal.schema";

type BudgetGoalRecord = Awaited<ReturnType<typeof BudgetGoalRepository.create>>;

export type BudgetGoalResponse = Omit<BudgetGoalRecord, "limitAmount"> & {
    limitAmount: number;
};

export interface PaginatedBudgetGoalsResponse {
    data: BudgetGoalResponse[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

const mapBudgetGoal = (budgetGoal: BudgetGoalRecord): BudgetGoalResponse => ({
    ...budgetGoal,
    limitAmount: Number(budgetGoal.limitAmount),
});

export class BudgetGoalService {
    constructor(
        private readonly budgetGoalRepository: typeof BudgetGoalRepository,
        private readonly categoryRepository: typeof CategoryRepository
    ) { }

    public createBudgetGoal = async (userId: string, payload: CreateBudgetGoalInput) => {
        const category = await this.categoryRepository.findByIdAndUser(payload.categoryId, userId);

        if (!category) {
            throw new AppError("Kategori tidak ditemukan", HttpStatus.NOT_FOUND);
        }

        const duplicate = await this.budgetGoalRepository.findDuplicate(
            userId,
            payload.categoryId,
            payload.month,
            payload.year
        );

        if (duplicate) {
            throw new AppError(Messages.CONFLICT, HttpStatus.CONFLICT);
        }

        const budgetGoal = await this.budgetGoalRepository.create({
            userId,
            categoryId: payload.categoryId,
            limitAmount: payload.limitAmount,
            month: payload.month,
            year: payload.year,
        });

        return mapBudgetGoal(budgetGoal);
    };

    public getBudgetGoalById = async (userId: string, budgetGoalId: string) => {
        const budgetGoal = await this.budgetGoalRepository.findByIdAndUser(budgetGoalId, userId);

        if (!budgetGoal) {
            throw new AppError(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return mapBudgetGoal(budgetGoal);
    };

    public getBudgetGoals = async (userId: string, query: GetBudgetGoalsQueryInput): Promise<PaginatedBudgetGoalsResponse> => {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const skip = (page - 1) * limit;

        const [budgetGoals, total] = await Promise.all([
            this.budgetGoalRepository.findManyByUser({
                userId,
                skip,
                take: limit,
                categoryId: query.categoryId,
                month: query.month,
                year: query.year,
                sortBy: query.sortBy,
                sortOrder: query.sortOrder,
            }),
            this.budgetGoalRepository.countByUser({
                userId,
                categoryId: query.categoryId,
                month: query.month,
                year: query.year,
            }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: budgetGoals.map(mapBudgetGoal),
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

    public updateBudgetGoal = async (userId: string, budgetGoalId: string, payload: UpdateBudgetGoalInput) => {
        const existingBudgetGoal = await this.budgetGoalRepository.findByIdAndUser(budgetGoalId, userId);

        if (!existingBudgetGoal) {
            throw new AppError(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        const nextCategoryId = payload.categoryId ?? existingBudgetGoal.categoryId;
        const nextMonth = payload.month ?? existingBudgetGoal.month;
        const nextYear = payload.year ?? existingBudgetGoal.year;

        if (payload.categoryId) {
            const category = await this.categoryRepository.findByIdAndUser(payload.categoryId, userId);

            if (!category) {
                throw new AppError("Kategori tidak ditemukan", HttpStatus.NOT_FOUND);
            }
        }

        const duplicate = await this.budgetGoalRepository.findDuplicate(
            userId,
            nextCategoryId,
            nextMonth,
            nextYear,
            budgetGoalId
        );

        if (duplicate) {
            throw new AppError(Messages.CONFLICT, HttpStatus.CONFLICT);
        }

        const budgetGoal = await this.budgetGoalRepository.updateById(budgetGoalId, {
            ...(payload.categoryId !== undefined ? { categoryId: payload.categoryId } : {}),
            ...(payload.limitAmount !== undefined ? { limitAmount: payload.limitAmount } : {}),
            ...(payload.month !== undefined ? { month: payload.month } : {}),
            ...(payload.year !== undefined ? { year: payload.year } : {}),
        });

        return mapBudgetGoal(budgetGoal);
    };

    public deleteBudgetGoal = async (userId: string, budgetGoalId: string) => {
        const existingBudgetGoal = await this.budgetGoalRepository.findByIdAndUser(budgetGoalId, userId);

        if (!existingBudgetGoal) {
            throw new AppError(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        const budgetGoal = await this.budgetGoalRepository.deleteById(budgetGoalId);

        return mapBudgetGoal(budgetGoal);
    };
}

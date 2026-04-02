import { HttpStatus } from "@/constants/http-status";
import { Messages } from "@/constants/message";
import { AppError } from "@/errors/app-error";
import { CategoryRepository } from "@/repositories/category.repository";
import {
    CreateCategoryInput,
    GetCategoriesQueryInput,
    UpdateCategoryInput,
} from "@/schemas/category.schema";

type CategoryRecord = Awaited<ReturnType<typeof CategoryRepository.create>>;

export type CategoryResponse = CategoryRecord;

export interface PaginatedCategoriesResponse {
    data: CategoryResponse[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export class CategoryService {
    constructor(private readonly categoryRepository: typeof CategoryRepository) { }

    public createCategory = async (userId: string, payload: CreateCategoryInput) => {
        const existingCategory = await this.categoryRepository.findByNameAndUser(userId, payload.name);

        if (existingCategory) {
            throw new AppError(Messages.CONFLICT, HttpStatus.CONFLICT);
        }

        return this.categoryRepository.create({
            userId,
            name: payload.name,
            icon: payload.icon ?? null,
            color: payload.color ?? null,
            isSystem: false,
        });
    };

    public getCategoryById = async (userId: string, categoryId: string) => {
        const category = await this.categoryRepository.findByIdAndUser(categoryId, userId);

        if (!category) {
            throw new AppError(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return category;
    };

    public getCategories = async (userId: string, query: GetCategoriesQueryInput): Promise<PaginatedCategoriesResponse> => {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const skip = (page - 1) * limit;

        const [categories, total] = await Promise.all([
            this.categoryRepository.findManyByUser({
                userId,
                skip,
                take: limit,
                search: query.search,
                sortBy: query.sortBy,
                sortOrder: query.sortOrder,
            }),
            this.categoryRepository.countByUser(userId, query.search),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: categories,
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

    public updateCategory = async (userId: string, categoryId: string, payload: UpdateCategoryInput) => {
        const existingCategory = await this.getCategoryById(userId, categoryId);

        if (existingCategory.isSystem) {
            throw new AppError("Kategori sistem tidak dapat diubah", HttpStatus.FORBIDDEN);
        }

        if (payload.name) {
            const nameConflict = await this.categoryRepository.findByNameAndUser(userId, payload.name, categoryId);

            if (nameConflict) {
                throw new AppError(Messages.CONFLICT, HttpStatus.CONFLICT);
            }
        }

        return this.categoryRepository.updateById(categoryId, {
            ...(payload.name !== undefined ? { name: payload.name } : {}),
            ...(payload.icon !== undefined ? { icon: payload.icon ?? null } : {}),
            ...(payload.color !== undefined ? { color: payload.color ?? null } : {}),
        });
    };

    public deleteCategory = async (userId: string, categoryId: string) => {
        const existingCategory = await this.getCategoryById(userId, categoryId);

        if (existingCategory.isSystem) {
            throw new AppError("Kategori sistem tidak dapat dihapus", HttpStatus.FORBIDDEN);
        }

        return this.categoryRepository.deleteById(categoryId);
    };
}

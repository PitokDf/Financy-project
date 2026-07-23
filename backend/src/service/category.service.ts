import { CategoryRepository } from "@/repositories/category.repository";
import { TransactionType } from "@/generated/prisma/enums";
import { GamificationQueue } from "@/queue/gamification.queue";
import { AppError } from "@/errors/app-error";
import { HttpStatus } from "@/constants/http-status";

export class CategoryService {
    constructor(private readonly categoryRepo: CategoryRepository) { }

    public getAll = async (userId: string) => {
        return this.categoryRepo.getAll(userId);
    }

    public create = async (userId: string, data: { name: string, type: string, color?: string, icon?: string }) => {
        if (!data.name) throw new Error("Category name is required");
        const category = await this.categoryRepo.create({
            userId,
            name: data.name,
            type: data.type as TransactionType,
            color: data.color,
            icon: data.icon
        });

        const gamificationQueue = new GamificationQueue();
        await gamificationQueue.add('category-created', {
            userId,
            action: 'CATEGORY_CREATED'
        });

        return category;
    }

    public updateCategory = async (userId: string, id: string, data: { name?: string, color?: string, icon?: string }) => {
        const existing = await this.categoryRepo.findById(userId, id);
        if (!existing) {
            throw new AppError("Kategori tidak ditemukan", HttpStatus.NOT_FOUND);
        }

        return this.categoryRepo.update(userId, id, data);
    }

    public deleteCategory = async (userId: string, id: string) => {
        const existing = await this.categoryRepo.findById(userId, id);
        if (!existing) {
            throw new AppError("Kategori tidak ditemukan", HttpStatus.NOT_FOUND);
        }

        await this.categoryRepo.setNullOnTransactions(userId, id);
        await this.categoryRepo.delete(id);
    }
}

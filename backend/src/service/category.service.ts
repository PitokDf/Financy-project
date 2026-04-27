import { CategoryRepository } from "@/repositories/category.repository";
import { TransactionType } from "@/generated/prisma/enums";
import { GamificationQueue } from "@/queue/gamification.queue";

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
}

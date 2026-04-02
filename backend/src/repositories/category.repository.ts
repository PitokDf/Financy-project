import prisma from "@/config/prisma";
import { Prisma } from "@prisma/client";

export interface FindCategoriesOptions {
    userId: string;
    skip?: number;
    take?: number;
    search?: string;
    sortBy?: "name" | "createdAt";
    sortOrder?: "asc" | "desc";
}

export class CategoryRepository {
    static async create(data: Prisma.CategoryUncheckedCreateInput) {
        return prisma.category.create({ data });
    }

    static async findByIdAndUser(categoryId: string, userId: string) {
        return prisma.category.findFirst({
            where: {
                id: categoryId,
                userId,
            },
        });
    }

    static async findByNameAndUser(userId: string, name: string, ignoreCategoryId?: string) {
        return prisma.category.findFirst({
            where: {
                userId,
                name,
                ...(ignoreCategoryId ? { NOT: { id: ignoreCategoryId } } : {}),
            },
        });
    }

    static async findManyByUser(options: FindCategoriesOptions) {
        const {
            userId,
            skip,
            take,
            search,
            sortBy = "createdAt",
            sortOrder = "desc",
        } = options;

        return prisma.category.findMany({
            where: {
                userId,
                ...(search
                    ? {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    }
                    : {}),
            },
            orderBy: {
                [sortBy]: sortOrder,
            },
            skip,
            take,
        });
    }

    static async countByUser(userId: string, search?: string) {
        return prisma.category.count({
            where: {
                userId,
                ...(search
                    ? {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    }
                    : {}),
            },
        });
    }

    static async updateById(categoryId: string, data: Prisma.CategoryUncheckedUpdateInput) {
        return prisma.category.update({
            where: {
                id: categoryId,
            },
            data,
        });
    }

    static async deleteById(categoryId: string) {
        return prisma.category.delete({
            where: {
                id: categoryId,
            },
        });
    }
}

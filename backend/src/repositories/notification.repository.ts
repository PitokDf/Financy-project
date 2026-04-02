import prisma from "@/config/prisma";
import { Prisma } from "@prisma/client";

export interface FindNotificationsOptions {
    userId: string;
    skip?: number;
    take?: number;
    isRead?: boolean;
    type?: Prisma.NotificationWhereInput["type"];
    sortBy?: "createdAt" | "isRead";
    sortOrder?: "asc" | "desc";
}

export class NotificationRepository {
    static async create(data: Prisma.NotificationUncheckedCreateInput) {
        return prisma.notification.create({ data });
    }

    static async findByIdAndUser(notificationId: string, userId: string) {
        return prisma.notification.findFirst({
            where: { id: notificationId, userId },
        });
    }

    static async findManyByUser(options: FindNotificationsOptions) {
        const { userId, skip, take, isRead, type, sortBy = "createdAt", sortOrder = "desc" } = options;

        return prisma.notification.findMany({
            where: {
                userId,
                ...(isRead !== undefined ? { isRead } : {}),
                ...(type ? { type } : {}),
            },
            orderBy: {
                [sortBy]: sortOrder,
            },
            skip,
            take,
        });
    }

    static async countByUser(options: Omit<FindNotificationsOptions, "skip" | "take" | "sortBy" | "sortOrder">) {
        const { userId, isRead, type } = options;

        return prisma.notification.count({
            where: {
                userId,
                ...(isRead !== undefined ? { isRead } : {}),
                ...(type ? { type } : {}),
            },
        });
    }

    static async updateById(notificationId: string, data: Prisma.NotificationUncheckedUpdateInput) {
        return prisma.notification.update({
            where: { id: notificationId },
            data,
        });
    }

    static async markAllAsRead(userId: string) {
        return prisma.notification.updateMany({
            where: {
                userId,
                isRead: false,
            },
            data: {
                isRead: true,
                readAt: new Date(),
            },
        });
    }

    static async deleteById(notificationId: string) {
        return prisma.notification.delete({
            where: { id: notificationId },
        });
    }
}

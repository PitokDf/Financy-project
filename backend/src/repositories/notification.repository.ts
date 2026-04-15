import prisma from "@/config/prisma";
import { NotificationType } from "generated/prisma/enums";

export class NotificationRepository {
  static async create(data: {
    userId: string;
    title: string;
    message: string;
    type: NotificationType;
    metadata?: any;
  }) {
    return prisma.notification.create({
      data: {
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type,
        metadata: data.metadata || {},
      },
    });
  }

  static async findManyByUserId(userId: string, limit = 50, offset = 0) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    });
  }

  static async markAsRead(userId: string, id: string) {
    return prisma.notification.updateMany({
      where: { id, userId },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  static async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  }

  static async delete(userId: string, id: string) {
    return prisma.notification.deleteMany({
      where: { id, userId },
    });
  }

  static async countUnread(userId: string) {
    return prisma.notification.count({
      where: { userId, isRead: false },
    });
  }
}

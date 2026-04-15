"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class NotificationRepository {
    static async create(data) {
        return prisma_1.default.notification.create({
            data: {
                userId: data.userId,
                title: data.title,
                message: data.message,
                type: data.type,
                metadata: data.metadata || {},
            },
        });
    }
    static async findManyByUserId(userId, limit = 50, offset = 0) {
        return prisma_1.default.notification.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: limit,
            skip: offset,
        });
    }
    static async markAsRead(userId, id) {
        return prisma_1.default.notification.updateMany({
            where: { id, userId },
            data: {
                isRead: true,
                readAt: new Date(),
            },
        });
    }
    static async markAllAsRead(userId) {
        return prisma_1.default.notification.updateMany({
            where: { userId, isRead: false },
            data: {
                isRead: true,
                readAt: new Date(),
            },
        });
    }
    static async delete(userId, id) {
        return prisma_1.default.notification.deleteMany({
            where: { id, userId },
        });
    }
    static async countUnread(userId) {
        return prisma_1.default.notification.count({
            where: { userId, isRead: false },
        });
    }
}
exports.NotificationRepository = NotificationRepository;
//# sourceMappingURL=notification.repository.js.map
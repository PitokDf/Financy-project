"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const notification_repository_1 = require("../repositories/notification.repository");
class NotificationService {
    static async getNotifications(userId, limit, offset) {
        const notifications = await notification_repository_1.NotificationRepository.findManyByUserId(userId, limit, offset);
        return notifications || [];
    }
    static async markAsRead(userId, id) {
        return notification_repository_1.NotificationRepository.markAsRead(userId, id);
    }
    static async markAllAsRead(userId) {
        return notification_repository_1.NotificationRepository.markAllAsRead(userId);
    }
    static async deleteNotification(userId, id) {
        return notification_repository_1.NotificationRepository.delete(userId, id);
    }
    static async getUnreadCount(userId) {
        return notification_repository_1.NotificationRepository.countUnread(userId);
    }
}
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map
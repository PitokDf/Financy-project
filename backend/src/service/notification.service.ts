import { NotificationRepository } from "../repositories/notification.repository";

export class NotificationService {
  static async getNotifications(userId: string, limit?: number, offset?: number) {
    const notifications = await NotificationRepository.findManyByUserId(userId, limit, offset);
    return notifications || [];
  }

  static async markAsRead(userId: string, id: string) {
    return NotificationRepository.markAsRead(userId, id);
  }

  static async markAllAsRead(userId: string) {
    return NotificationRepository.markAllAsRead(userId);
  }

  static async deleteNotification(userId: string, id: string) {
    return NotificationRepository.delete(userId, id);
  }

  static async getUnreadCount(userId: string) {
    return NotificationRepository.countUnread(userId);
  }
}

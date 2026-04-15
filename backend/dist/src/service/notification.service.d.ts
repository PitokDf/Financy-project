export declare class NotificationService {
    static getNotifications(userId: string, limit?: number, offset?: number): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        type: import("../generated/prisma/enums").NotificationType;
        title: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        readAt: Date | null;
    }[]>;
    static markAsRead(userId: string, id: string): Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
    static markAllAsRead(userId: string): Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
    static deleteNotification(userId: string, id: string): Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
    static getUnreadCount(userId: string): Promise<number>;
}
//# sourceMappingURL=notification.service.d.ts.map
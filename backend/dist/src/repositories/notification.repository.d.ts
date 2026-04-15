import { NotificationType } from "../generated/prisma/enums";
export declare class NotificationRepository {
    static create(data: {
        userId: string;
        title: string;
        message: string;
        type: NotificationType;
        metadata?: any;
    }): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        type: NotificationType;
        title: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        readAt: Date | null;
    }>;
    static findManyByUserId(userId: string, limit?: number, offset?: number): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        type: NotificationType;
        title: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        readAt: Date | null;
    }[]>;
    static markAsRead(userId: string, id: string): Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
    static markAllAsRead(userId: string): Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
    static delete(userId: string, id: string): Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
    static countUnread(userId: string): Promise<number>;
}
//# sourceMappingURL=notification.repository.d.ts.map
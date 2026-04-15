import { Request, Response } from "express";
export declare class NotificationController {
    static getNotifications(req: Request, res: Response): Promise<Response<import("../types/response").ApiResponse<{
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        type: import("../generated/prisma/enums").NotificationType;
        title: string;
        isRead: boolean;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        readAt: Date | null;
    }[]>, Record<string, any>>>;
    static getUnreadCount(req: Request, res: Response): Promise<Response<import("../types/response").ApiResponse<{
        count: number;
    }>, Record<string, any>>>;
    static markAsRead(req: Request, res: Response): Promise<Response<import("../types/response").ApiResponse<null>, Record<string, any>>>;
    static markAllAsRead(req: Request, res: Response): Promise<Response<import("../types/response").ApiResponse<null>, Record<string, any>>>;
    static deleteNotification(req: Request, res: Response): Promise<Response<import("../types/response").ApiResponse<null>, Record<string, any>>>;
}
//# sourceMappingURL=notification.controller.d.ts.map
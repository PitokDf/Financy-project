import { HttpStatus } from "@/constants/http-status";
import { MessageCodes } from "@/constants/message";
import { asyncHandler } from "@/middleware/error.middleware";
import { NotificationService } from "@/service/notification.service";
import {
    createNotificationSchema,
    getNotificationsQuerySchema,
    notificationIdParamSchema,
} from "@/schemas/notification.schema";
import { ResponseUtil } from "@/utils";
import { Request, Response } from "express";

export class NotificationController {
    constructor(private readonly notificationService: NotificationService) { }

    public getNotifications = asyncHandler(async (req: Request, res: Response) => {
        const query = getNotificationsQuerySchema.parse(req.query);
        const userId = String(req.auth_user?.user_id);

        const result = await this.notificationService.getNotifications(userId, query);

        return ResponseUtil.success(res, result, HttpStatus.OK, MessageCodes.SUCCESS);
    });

    public getNotificationById = asyncHandler(async (req: Request, res: Response) => {
        const { notificationId } = notificationIdParamSchema.parse(req.params);
        const userId = String(req.auth_user?.user_id);

        const notification = await this.notificationService.getNotificationById(userId, notificationId);

        return ResponseUtil.success(res, notification, HttpStatus.OK, MessageCodes.SUCCESS);
    });

    public createNotification = asyncHandler(async (req: Request, res: Response) => {
        const payload = createNotificationSchema.parse(req.body);
        const notification = await this.notificationService.createNotification(payload);

        return ResponseUtil.success(res, notification, HttpStatus.CREATED, MessageCodes.CREATED);
    });

    public markAsRead = asyncHandler(async (req: Request, res: Response) => {
        const { notificationId } = notificationIdParamSchema.parse(req.params);
        const userId = String(req.auth_user?.user_id);

        const notification = await this.notificationService.markAsRead(userId, notificationId);

        return ResponseUtil.success(res, notification, HttpStatus.OK, MessageCodes.UPDATED);
    });

    public markAllAsRead = asyncHandler(async (req: Request, res: Response) => {
        const userId = String(req.auth_user?.user_id);

        const result = await this.notificationService.markAllAsRead(userId);

        return ResponseUtil.success(res, result, HttpStatus.OK, MessageCodes.UPDATED);
    });

    public deleteNotification = asyncHandler(async (req: Request, res: Response) => {
        const { notificationId } = notificationIdParamSchema.parse(req.params);
        const userId = String(req.auth_user?.user_id);

        const notification = await this.notificationService.deleteNotification(userId, notificationId);

        return ResponseUtil.success(res, notification, HttpStatus.OK, MessageCodes.DELETED);
    });
}

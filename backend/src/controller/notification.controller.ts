import { Request, Response } from "express";
import { NotificationService } from "../service/notification.service";
import { HttpStatus } from "@/constants/http-status";
import { ResponseUtil } from "@/utils";

export class NotificationController {
  static async getNotifications(req: Request, res: Response) {
    const userId = (req as any).auth_user.id;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

    const notifications = await NotificationService.getNotifications(userId, limit, offset);
    return ResponseUtil.success(res, notifications, HttpStatus.OK, "Notifications retrieved successfully");
  }

  static async getUnreadCount(req: Request, res: Response) {
    const userId = (req as any).auth_user.id;
    const count = await NotificationService.getUnreadCount(userId);
    return ResponseUtil.success(res, { count }, HttpStatus.OK, "Unread count retrieved successfully");
  }

  static async markAsRead(req: Request, res: Response) {
    const userId = (req as any).auth_user.id;
    const { id } = req.params;

    await NotificationService.markAsRead(userId, id as string);
    return ResponseUtil.success(res, null, HttpStatus.OK, "Notification marked as read");
  }

  static async markAllAsRead(req: Request, res: Response) {
    const userId = (req as any).auth_user.id;

    await NotificationService.markAllAsRead(userId);
    return ResponseUtil.success(res, null, HttpStatus.OK, "All notifications marked as read");
  }

  static async deleteNotification(req: Request, res: Response) {
    const userId = (req as any).auth_user.id;
    const { id } = req.params;

    await NotificationService.deleteNotification(userId, id as string);
    return ResponseUtil.success(res, null, HttpStatus.OK, "Notification deleted");
  }
}

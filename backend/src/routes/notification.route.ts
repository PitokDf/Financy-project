import { NotificationController } from "@/controller/notification.controller";
import authMiddleware from "@/middleware/auth.middleware";
import { NotificationRepository } from "@/repositories/notification.repository";
import { NotificationService } from "@/service/notification.service";
import { Router } from "express";

const notificationRouter = Router();
const notificationService = new NotificationService(NotificationRepository);
const notificationController = new NotificationController(notificationService);

notificationRouter.use(authMiddleware);

notificationRouter.get("/", notificationController.getNotifications);
notificationRouter.get("/mark-all-read", notificationController.markAllAsRead);
notificationRouter.get("/:notificationId", notificationController.getNotificationById);
notificationRouter.patch("/:notificationId/read", notificationController.markAsRead);
notificationRouter.delete("/:notificationId", notificationController.deleteNotification);

export default notificationRouter;

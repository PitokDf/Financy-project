import { Router } from "express";
import { NotificationController } from "../controller/notification.controller";
import { asyncHandler } from "../middleware/error.middleware";
import authMiddleware from "@/middleware/auth.middleware";

const router = Router();

// Apply auth middleware to all notification routes
router.use(authMiddleware);

router.get("/", asyncHandler(NotificationController.getNotifications));
router.get("/unread-count", asyncHandler(NotificationController.getUnreadCount));
router.patch("/read-all", asyncHandler(NotificationController.markAllAsRead));
router.patch("/:id/read", asyncHandler(NotificationController.markAsRead));
router.delete("/:id", asyncHandler(NotificationController.deleteNotification));

export default router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notification_controller_1 = require("../controller/notification.controller");
const error_middleware_1 = require("../middleware/error.middleware");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = (0, express_1.Router)();
router.use(auth_middleware_1.default);
router.get("/", (0, error_middleware_1.asyncHandler)(notification_controller_1.NotificationController.getNotifications));
router.get("/unread-count", (0, error_middleware_1.asyncHandler)(notification_controller_1.NotificationController.getUnreadCount));
router.patch("/read-all", (0, error_middleware_1.asyncHandler)(notification_controller_1.NotificationController.markAllAsRead));
router.patch("/:id/read", (0, error_middleware_1.asyncHandler)(notification_controller_1.NotificationController.markAsRead));
router.delete("/:id", (0, error_middleware_1.asyncHandler)(notification_controller_1.NotificationController.deleteNotification));
exports.default = router;
//# sourceMappingURL=notification.routes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const notification_service_1 = require("../service/notification.service");
const http_status_1 = require("../constants/http-status");
const utils_1 = require("../utils");
class NotificationController {
    static async getNotifications(req, res) {
        const userId = req.auth_user.id;
        const limit = req.query.limit ? parseInt(req.query.limit) : 50;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;
        const notifications = await notification_service_1.NotificationService.getNotifications(userId, limit, offset);
        return utils_1.ResponseUtil.success(res, notifications, http_status_1.HttpStatus.OK, "Notifications retrieved successfully");
    }
    static async getUnreadCount(req, res) {
        const userId = req.auth_user.id;
        const count = await notification_service_1.NotificationService.getUnreadCount(userId);
        return utils_1.ResponseUtil.success(res, { count }, http_status_1.HttpStatus.OK, "Unread count retrieved successfully");
    }
    static async markAsRead(req, res) {
        const userId = req.auth_user.id;
        const { id } = req.params;
        await notification_service_1.NotificationService.markAsRead(userId, id);
        return utils_1.ResponseUtil.success(res, null, http_status_1.HttpStatus.OK, "Notification marked as read");
    }
    static async markAllAsRead(req, res) {
        const userId = req.auth_user.id;
        await notification_service_1.NotificationService.markAllAsRead(userId);
        return utils_1.ResponseUtil.success(res, null, http_status_1.HttpStatus.OK, "All notifications marked as read");
    }
    static async deleteNotification(req, res) {
        const userId = req.auth_user.id;
        const { id } = req.params;
        await notification_service_1.NotificationService.deleteNotification(userId, id);
        return utils_1.ResponseUtil.success(res, null, http_status_1.HttpStatus.OK, "Notification deleted");
    }
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map
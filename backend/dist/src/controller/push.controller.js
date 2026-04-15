"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushController = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const utils_1 = require("../utils");
const http_status_1 = require("../constants/http-status");
const push_service_1 = require("../service/push.service");
class PushController {
}
exports.PushController = PushController;
_a = PushController;
PushController.subscribe = (0, error_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.auth_user?.user_id;
    if (!userId) {
        return utils_1.ResponseUtil.unauthorized(res, "Unauthorized");
    }
    const subscription = req.body;
    if (!subscription || !subscription.endpoint) {
        return utils_1.ResponseUtil.error(res, "Invalid subscription", [], http_status_1.HttpStatus.BAD_REQUEST);
    }
    await push_service_1.PushService.subscribe(userId, subscription);
    return utils_1.ResponseUtil.success(res, null, http_status_1.HttpStatus.CREATED, "Subscribed successfully");
});
PushController.unsubscribe = (0, error_middleware_1.asyncHandler)(async (req, res) => {
    const { endpoint } = req.body;
    if (!endpoint) {
        return utils_1.ResponseUtil.error(res, "Endpoint required", [], http_status_1.HttpStatus.BAD_REQUEST);
    }
    await push_service_1.PushService.unsubscribe(endpoint);
    return utils_1.ResponseUtil.success(res, null, http_status_1.HttpStatus.OK, "Unsubscribed successfully");
});
PushController.sendTest = (0, error_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.query.userId;
    const title = req.query.title;
    const body = req.query.body;
    if (!userId) {
        return utils_1.ResponseUtil.unauthorized(res, "Unauthorized");
    }
    await push_service_1.PushService.sendNotificationToUser(userId, title || "Test Notification", body || "This is a test notification from Fintrack!");
    return utils_1.ResponseUtil.success(res, null, 200, "Test notification sent");
});
//# sourceMappingURL=push.controller.js.map
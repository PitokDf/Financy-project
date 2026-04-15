"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../service/user.service");
const response_1 = require("../utils/response");
const error_middleware_1 = require("../middleware/error.middleware");
const http_status_1 = require("../constants/http-status");
const message_1 = require("../constants/message");
const auth_1 = require("../utils/auth");
const winston_logger_1 = __importDefault(require("../utils/winston.logger"));
class UserController {
}
exports.UserController = UserController;
_a = UserController;
UserController.getAllUser = (0, error_middleware_1.asyncHandler)(async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    const result = await (0, user_service_1.getAllUserService)({ page, limit });
    const authUser = req.auth_user;
    winston_logger_1.default.debug('Get all users request', { user: authUser, page, limit });
    return response_1.ResponseUtil.success(res, result, http_status_1.HttpStatus.OK, message_1.MessageCodes.SUCCESS);
});
UserController.getUserById = (0, error_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.params.userId;
    const user = await (0, user_service_1.getUserByIdService)(userId);
    return response_1.ResponseUtil.success(res, user);
});
UserController.getMe = (0, error_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.auth_user.user_id || req.auth_user.id;
    const userProfile = await (0, user_service_1.getUserProfileService)(userId);
    return response_1.ResponseUtil.success(res, userProfile);
});
UserController.createUser = (0, error_middleware_1.asyncHandler)(async (req, res) => {
    const payload = req.body;
    const user = await (0, user_service_1.createUserService)(payload);
    return response_1.ResponseUtil.success(res, user, http_status_1.HttpStatus.CREATED, message_1.MessageCodes.CREATED);
});
UserController.updateUser = (0, error_middleware_1.asyncHandler)(async (req, res) => {
    const payload = req.body;
    const userId = req.params.userId;
    const user = await (0, user_service_1.updateUserService)(userId, payload);
    return response_1.ResponseUtil.success(res, user, http_status_1.HttpStatus.OK, message_1.MessageCodes.UPDATED);
});
UserController.deleteUser = (0, error_middleware_1.asyncHandler)(async (req, res) => {
    const userId = req.params.userId;
    const user = await (0, user_service_1.deleteUserService)(userId);
    return response_1.ResponseUtil.success(res, user, http_status_1.HttpStatus.OK, message_1.MessageCodes.DELETED);
});
UserController.logout = (0, error_middleware_1.asyncHandler)(async (req, res) => {
    auth_1.Auth.clearTokenCookieHttpOnly(res);
    return response_1.ResponseUtil.success(res, null, http_status_1.HttpStatus.OK, "Logout berhasil");
});
//# sourceMappingURL=user.controller.js.map
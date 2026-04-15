"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const auth_1 = require("../utils/auth");
const utils_1 = require("../utils");
class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.login = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const data = req.body;
            const result = await this.authService.login(data);
            auth_1.Auth.setTokenCookieHttpOnly(res, result.token, { duration: 3, unit: 'd' });
            return utils_1.ResponseUtil.success(res, result.user);
        });
        this.register = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const data = req.body;
            const result = await this.authService.register(data);
            auth_1.Auth.setTokenCookieHttpOnly(res, result.token, { duration: 3, unit: 'd' });
            return utils_1.ResponseUtil.success(res, result.user);
        });
        this.logout = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            auth_1.Auth.clearTokenCookieHttpOnly(res);
            return utils_1.ResponseUtil.success(res, {});
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map
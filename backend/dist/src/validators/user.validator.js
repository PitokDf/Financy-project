"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmailExists = void 0;
const user_service_1 = require("../service/user.service");
const app_error_1 = require("../errors/app-error");
const http_status_1 = require("../constants/http-status");
const checkEmailExists = async (req, res, next) => {
    const { email } = req.body;
    const userId = req.params.userId;
    if (!email)
        return next();
    const existingUser = await (0, user_service_1.getUserByEmailService)(email, userId);
    if (existingUser)
        throw new app_error_1.AppError("Email sudah terdaftar", http_status_1.HttpStatus.BAD_REQUEST);
    return next();
};
exports.checkEmailExists = checkEmailExists;
//# sourceMappingURL=user.validator.js.map
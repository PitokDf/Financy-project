"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = require("../constants/http-status");
const message_1 = require("../constants/message");
const app_error_1 = require("../errors/app-error");
const utils_1 = require("../utils");
class AuthService {
    constructor(userRepo) {
        this.userRepo = userRepo;
        this.register = async (data) => {
            const existingUser = await this.userRepo.findByEmail(data.email);
            if (existingUser)
                throw new app_error_1.AppError('Email sudah terdaftar', http_status_1.HttpStatus.CONFLICT);
            const hashedPassword = await utils_1.BcryptUtil.hash(data.password);
            const user = await this.userRepo.create({
                name: data.name,
                email: data.email,
                password: hashedPassword
            });
            const token = utils_1.JwtUtil.generate({ ...user, user_id: user.id }, '3d');
            return { user, token };
        };
        this.login = async (data) => {
            const user = await this.userRepo.findByEmail(data.email);
            if (!user)
                throw new app_error_1.AppError(message_1.Messages.INVALID_CREDENTIALS, http_status_1.HttpStatus.UNAUTHORIZED);
            const isValidPassword = await utils_1.BcryptUtil.compare(data.password, user.password);
            if (!isValidPassword)
                throw new app_error_1.AppError(message_1.Messages.INVALID_CREDENTIALS, http_status_1.HttpStatus.UNAUTHORIZED);
            const token = utils_1.JwtUtil.generate({ ...user, user_id: user.id }, '3d');
            return { user, token };
        };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map
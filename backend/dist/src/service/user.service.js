"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserService = getAllUserService;
exports.getUserByIdService = getUserByIdService;
exports.getUserProfileService = getUserProfileService;
exports.getUserByEmailService = getUserByEmailService;
exports.createUserService = createUserService;
exports.updateUserService = updateUserService;
exports.deleteUserService = deleteUserService;
const http_status_1 = require("../constants/http-status");
const message_1 = require("../constants/message");
const app_error_1 = require("../errors/app-error");
const user_repository_1 = require("../repositories/user.repository");
const utils_1 = require("../utils");
const cache_1 = require("../utils/cache");
const winston_logger_1 = __importDefault(require("../utils/winston.logger"));
async function getAllUserService(query) {
    const page = query?.page || 1;
    const limit = query?.limit || 10;
    const skip = (page - 1) * limit;
    const cacheKey = `users:all:page:${page}:limit:${limit}`;
    const cachedResult = cache_1.cacheManager.get(cacheKey);
    if (cachedResult) {
        winston_logger_1.default.debug('[CACHE] Users served from cache', { page, limit });
        return cachedResult;
    }
    winston_logger_1.default.debug('[CACHE] Users cache miss, fetching from database', { page, limit });
    const [users, total] = await Promise.all([
        user_repository_1.UserRepository.findAllOptimized({ skip, take: limit }),
        user_repository_1.UserRepository.count()
    ]);
    const result = {
        data: users,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page < Math.ceil(total / limit),
            hasPrevPage: page > 1
        }
    };
    cache_1.cacheManager.set(cacheKey, result, 300);
    return result;
}
async function getUserByIdService(userId) {
    const user = await user_repository_1.UserRepository.findById(userId);
    if (!user)
        throw new app_error_1.AppError(message_1.Messages.NOT_FOUND, http_status_1.HttpStatus.NOT_FOUND);
    return { ...user, password: '[REDACTED]' };
}
async function getUserProfileService(userId) {
    const user = await user_repository_1.UserRepository.findUserProfile(userId);
    if (!user)
        throw new app_error_1.AppError(message_1.Messages.NOT_FOUND, http_status_1.HttpStatus.NOT_FOUND);
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        level: user.userStats?.level ?? 1,
        streak: user.userStats?.streak ?? 0,
        badgeCount: user._count?.userBadges ?? 0
    };
}
async function getUserByEmailService(email, ignoreUserId) {
    const user = await user_repository_1.UserRepository.findByEmail(email, ignoreUserId);
    return user;
}
function invalidateUserListCache() {
    cache_1.cacheManager.delPattern('users:all:page:');
}
async function createUserService(data) {
    data.password = (await utils_1.BcryptUtil.hash(data.password));
    const user = await user_repository_1.UserRepository.create(data);
    invalidateUserListCache();
    return { ...user, password: '[REDACTED]' };
}
async function updateUserService(userId, data) {
    await getUserByIdService(userId);
    if (data && data.password) {
        data.password = (await utils_1.BcryptUtil.hash(data.password));
    }
    const user = await user_repository_1.UserRepository.update(userId, data);
    invalidateUserListCache();
    return { ...user, password: '[REDACTED]' };
}
async function deleteUserService(userId) {
    await getUserByIdService(userId);
    const user = await user_repository_1.UserRepository.delete(userId);
    invalidateUserListCache();
    return { ...user, password: '[REDACTED]' };
}
//# sourceMappingURL=user.service.js.map
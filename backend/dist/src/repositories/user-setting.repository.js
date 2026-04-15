"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSettingRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class UserSettingRepository {
    static async getByUserId(userId) {
        return prisma_1.default.userSetting.findUnique({
            where: { userId }
        });
    }
    static async upsert(userId, data) {
        return prisma_1.default.userSetting.upsert({
            where: { userId },
            update: data,
            create: {
                userId,
                ...data
            }
        });
    }
}
exports.UserSettingRepository = UserSettingRepository;
//# sourceMappingURL=user-setting.repository.js.map
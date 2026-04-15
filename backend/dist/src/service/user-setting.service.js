"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSettingService = void 0;
const user_setting_repository_1 = require("../repositories/user-setting.repository");
class UserSettingService {
    static async getSettings(userId) {
        const settings = await user_setting_repository_1.UserSettingRepository.getByUserId(userId);
        if (!settings) {
            return {
                emailNotifications: true,
                pushNotifications: true,
                budgetAlerts: true,
                dailyReminder: true,
                reminderTime: "20:00",
                currency: "IDR",
                language: "id",
                theme: "light",
                showGamification: true
            };
        }
        return settings;
    }
    static async updateSettings(userId, data) {
        return user_setting_repository_1.UserSettingRepository.upsert(userId, data);
    }
}
exports.UserSettingService = UserSettingService;
//# sourceMappingURL=user-setting.service.js.map
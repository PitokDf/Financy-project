import { UserSettingRepository } from "@/repositories/user-setting.repository";
import { UpdateUserSettingDTO } from "@/schemas/user-setting.schema";

export class UserSettingService {
    static async getSettings(userId: string) {
        const settings = await UserSettingRepository.getByUserId(userId);
        
        // Return default settings mock if not exists in DB yet
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
            }
        }
        
        return settings;
    }

    static async updateSettings(userId: string, data: UpdateUserSettingDTO) {
        return UserSettingRepository.upsert(userId, data);
    }
}

import { UpdateUserSettingDTO } from "../schemas/user-setting.schema";
export declare class UserSettingService {
    static getSettings(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        pushNotifications: boolean;
        budgetAlerts: boolean;
        dailyReminder: boolean;
        reminderTime: string;
        currency: string;
        language: string;
        showGamification: boolean;
    } | {
        emailNotifications: boolean;
        pushNotifications: boolean;
        budgetAlerts: boolean;
        dailyReminder: boolean;
        reminderTime: string;
        currency: string;
        language: string;
        theme: string;
        showGamification: boolean;
    }>;
    static updateSettings(userId: string, data: UpdateUserSettingDTO): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        pushNotifications: boolean;
        budgetAlerts: boolean;
        dailyReminder: boolean;
        reminderTime: string;
        currency: string;
        language: string;
        showGamification: boolean;
    }>;
}
//# sourceMappingURL=user-setting.service.d.ts.map
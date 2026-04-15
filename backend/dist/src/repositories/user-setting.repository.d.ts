import { UpdateUserSettingDTO } from "../schemas/user-setting.schema";
export declare class UserSettingRepository {
    static getByUserId(userId: string): Promise<{
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
    } | null>;
    static upsert(userId: string, data: UpdateUserSettingDTO): Promise<{
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
//# sourceMappingURL=user-setting.repository.d.ts.map
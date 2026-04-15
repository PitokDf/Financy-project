import { z } from "zod";
export declare const updateUserSettingSchema: z.ZodObject<{
    emailNotifications: z.ZodOptional<z.ZodBoolean>;
    pushNotifications: z.ZodOptional<z.ZodBoolean>;
    budgetAlerts: z.ZodOptional<z.ZodBoolean>;
    dailyReminder: z.ZodOptional<z.ZodBoolean>;
    reminderTime: z.ZodOptional<z.ZodString>;
    currency: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    theme: z.ZodOptional<z.ZodString>;
    showGamification: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    pushNotifications?: boolean | undefined;
    budgetAlerts?: boolean | undefined;
    dailyReminder?: boolean | undefined;
    reminderTime?: string | undefined;
    currency?: string | undefined;
    language?: string | undefined;
    showGamification?: boolean | undefined;
    emailNotifications?: boolean | undefined;
    theme?: string | undefined;
}, {
    pushNotifications?: boolean | undefined;
    budgetAlerts?: boolean | undefined;
    dailyReminder?: boolean | undefined;
    reminderTime?: string | undefined;
    currency?: string | undefined;
    language?: string | undefined;
    showGamification?: boolean | undefined;
    emailNotifications?: boolean | undefined;
    theme?: string | undefined;
}>;
export type UpdateUserSettingDTO = z.infer<typeof updateUserSettingSchema>;
//# sourceMappingURL=user-setting.schema.d.ts.map
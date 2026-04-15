"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSettingSchema = void 0;
const zod_1 = require("zod");
exports.updateUserSettingSchema = zod_1.z.object({
    emailNotifications: zod_1.z.boolean().optional(),
    pushNotifications: zod_1.z.boolean().optional(),
    budgetAlerts: zod_1.z.boolean().optional(),
    dailyReminder: zod_1.z.boolean().optional(),
    reminderTime: zod_1.z.string().optional(),
    currency: zod_1.z.string().optional(),
    language: zod_1.z.string().optional(),
    theme: zod_1.z.string().optional(),
    showGamification: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=user-setting.schema.js.map
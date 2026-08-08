import { z } from "zod"

export const updateUserSettingSchema = z.object({

  emailNotifications: z.boolean().optional(),
  pushNotifications: z.boolean().optional(),
  budgetAlerts: z.boolean().optional(),
  dailyReminder: z.boolean().optional(),
  reminderTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'reminderTime harus format HH:MM (24 jam)').optional(),
  currency: z.string().optional(),
  language: z.string().optional(),
  theme: z.string().optional(),
  showGamification: z.boolean().optional(),
  autoCategorize: z.boolean().optional(),
})

export type UpdateUserSettingDTO = z.infer<typeof updateUserSettingSchema>

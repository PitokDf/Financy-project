import { z } from "zod"

export const updateUserSettingSchema = z.object({

  emailNotifications: z.boolean().optional(),
  pushNotifications: z.boolean().optional(),
  budgetAlerts: z.boolean().optional(),
  dailyReminder: z.boolean().optional(),
  reminderTime: z.string().optional(),
  currency: z.string().optional(),
  language: z.string().optional(),
  theme: z.string().optional(),
  showGamification: z.boolean().optional(),
})

export type UpdateUserSettingDTO = z.infer<typeof updateUserSettingSchema>

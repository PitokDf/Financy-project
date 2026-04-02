import z from "zod";

export const updateReminderConfigSchema = z.object({
    isEnabled: z.boolean().optional(),
    reminderTime: z
        .string()
        .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Format waktu harus HH:MM")
        .optional(),
    budgetWarningPct: z.coerce
        .number()
        .int()
        .min(1, "Persentase minimal 1")
        .max(100, "Persentase maksimal 100")
        .optional(),
}).refine((data) => Object.keys(data).length > 0, {
    message: "Minimal satu field harus diisi untuk update",
});

export type UpdateReminderConfigInput = z.infer<typeof updateReminderConfigSchema>;

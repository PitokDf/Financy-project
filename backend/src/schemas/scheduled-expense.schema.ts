import z from "zod";

export const CreateScheduledExpenseSchema = z.object({
    userId: z.string({ message: 'userId dibutuhkan' }),
    description: z.string({ message: 'Deskripsi dibutuhkan' })
        .min(1, { message: 'Deskripsi minimal 1 karakter' }),
    amount: z.number({ invalid_type_error: 'amount harus angka' }).int({ message: 'amount harus integer' }).nonnegative({ message: 'amount tidak boleh negatif' }),
    dayOfMonth: z.number({ invalid_type_error: 'dayOfMonth harus angka' }).int().min(1, { message: 'dayOfMonth antara 1-31' }).max(31, { message: 'dayOfMonth antara 1-31' }),
    categoryId: z.string().nullable().optional(),
});

export const UpdateScheduledExpenseSchema = CreateScheduledExpenseSchema.partial().extend({
    id: z.string().optional(),
    isActive: z.boolean().optional(),
});

export type CreateScheduledExpense = z.infer<typeof CreateScheduledExpenseSchema>;
export type UpdateScheduledExpense = z.infer<typeof UpdateScheduledExpenseSchema>;

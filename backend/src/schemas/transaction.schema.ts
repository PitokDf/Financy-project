import z from "zod";

export const TransactionType = z.enum(["INCOME", "EXPENSE"]);
export const TransactionSource = z.enum(["MANUAL", "CSV_IMPORT", "API"]);

export const CreateTransactionSchema = z.object({
    userId: z.string({ message: 'userId dibutuhkan' }),
    description: z.string({ message: 'Deskripsi dibutuhkan' })
        .min(5, { message: 'Deskripsi minimal 5 karakter' }),
    amount: z.number({ invalid_type_error: 'amount harus angka' }).int({ message: 'amount harus integer' }).nonnegative({ message: 'amount tidak boleh negatif' }),
    type: TransactionType,
    date: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg as any);
        return arg;
    }, z.date({ invalid_type_error: 'date harus tanggal/ISO string' })),
    categoryId: z.string().optional(),
    clusterId: z.string().optional(),
    source: TransactionSource.optional(),
    csvImportId: z.string().optional(),
});

export const UpdateTransactionSchema = CreateTransactionSchema.partial().extend({
    id: z.string().optional(),
});

export const TransactionResponseSchema = CreateTransactionSchema.extend({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type CreateTransaction = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransaction = z.infer<typeof UpdateTransactionSchema>;
export type TransactionResponse = z.infer<typeof TransactionResponseSchema>;
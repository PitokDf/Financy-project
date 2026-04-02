import z from "zod";

export const budgetGoalIdParamSchema = z.object({
    budgetGoalId: z.string().cuid("ID budget goal tidak valid"),
});

export const createBudgetGoalSchema = z.object({
    categoryId: z.string().cuid("ID kategori tidak valid"),
    limitAmount: z.coerce
        .number({ invalid_type_error: "Nominal batas harus berupa angka" })
        .positive("Nominal batas harus lebih besar dari 0"),
    month: z.coerce.number().int().min(1, "Bulan minimal 1").max(12, "Bulan maksimal 12"),
    year: z.coerce.number().int().min(2000, "Tahun tidak valid").max(2100, "Tahun terlalu jauh"),
});

export const updateBudgetGoalSchema = createBudgetGoalSchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "Minimal satu field harus diisi untuk update",
    });

export const getBudgetGoalsQuerySchema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(10),
    categoryId: z.string().cuid("ID kategori tidak valid").optional(),
    month: z.coerce.number().int().min(1).max(12).optional(),
    year: z.coerce.number().int().min(2000).max(2100).optional(),
    sortBy: z.enum(["createdAt", "month", "year", "limitAmount"]).optional().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export type BudgetGoalIdParamInput = z.infer<typeof budgetGoalIdParamSchema>;
export type CreateBudgetGoalInput = z.infer<typeof createBudgetGoalSchema>;
export type UpdateBudgetGoalInput = z.infer<typeof updateBudgetGoalSchema>;
export type GetBudgetGoalsQueryInput = z.infer<typeof getBudgetGoalsQuerySchema>;

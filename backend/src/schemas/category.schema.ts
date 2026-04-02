import z from "zod";

export const categoryIdParamSchema = z.object({
    categoryId: z.string().cuid("ID kategori tidak valid"),
});

export const createCategorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Nama kategori tidak boleh kosong")
        .max(60, "Nama kategori maksimal 60 karakter"),
    icon: z
        .string()
        .trim()
        .min(1, "Icon kategori tidak valid")
        .max(20, "Icon kategori maksimal 20 karakter")
        .optional()
        .nullable(),
    color: z
        .string()
        .trim()
        .regex(/^#([0-9A-Fa-f]{6})$/, "Format warna harus hex, contoh: #22C55E")
        .optional()
        .nullable(),
});

export const updateCategorySchema = createCategorySchema
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
        message: "Minimal satu field harus diisi untuk update",
    });

export const getCategoriesQuerySchema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(10),
    search: z.string().trim().optional(),
    sortBy: z.enum(["name", "createdAt"]).optional().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export type CategoryIdParamInput = z.infer<typeof categoryIdParamSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type GetCategoriesQueryInput = z.infer<typeof getCategoriesQuerySchema>;

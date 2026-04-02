import z from "zod";

export const forecastIdParamSchema = z.object({
    forecastId: z.string().cuid("ID forecast tidak valid"),
});

export const generateForecastSchema = z.object({
    categoryId: z.string().cuid("ID kategori tidak valid"),
    targetMonth: z.coerce.number().int().min(1, "Bulan minimal 1").max(12, "Bulan maksimal 12"),
    targetYear: z.coerce.number().int().min(2000, "Tahun tidak valid").max(2100, "Tahun terlalu jauh"),
    windowSize: z.coerce.number().int().min(1, "Window minimal 1").max(12, "Window maksimal 12").optional().default(3),
});

export const getForecastsQuerySchema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(10),
    categoryId: z.string().cuid("ID kategori tidak valid").optional(),
    targetMonth: z.coerce.number().int().min(1).max(12).optional(),
    targetYear: z.coerce.number().int().min(2000).max(2100).optional(),
    sortBy: z.enum(["createdAt", "targetMonth", "targetYear", "predictedAmount"]).optional().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export type ForecastIdParamInput = z.infer<typeof forecastIdParamSchema>;
export type GenerateForecastInput = z.infer<typeof generateForecastSchema>;
export type GetForecastsQueryInput = z.infer<typeof getForecastsQuerySchema>;

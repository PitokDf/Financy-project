import z from "zod";

const parseBoolean = (value: unknown) => {
    if (value === true || value === false) return value;
    if (typeof value === "string") {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
    }
    return value;
};

export const importBatchIdParamSchema = z.object({
    importBatchId: z.string().cuid("ID import batch tidak valid"),
});

export const importTransactionsSchema = z.object({
    defaultCategoryId: z.string().cuid("ID kategori tidak valid").optional().nullable(),
    hasHeader: z.preprocess(parseBoolean, z.boolean()).optional().default(true),
});

export const getImportBatchesQuerySchema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(10),
    sortBy: z.enum(["createdAt", "fileName", "totalRows", "successCount", "errorCount"]).optional().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export type ImportBatchIdParamInput = z.infer<typeof importBatchIdParamSchema>;
export type ImportTransactionsInput = z.infer<typeof importTransactionsSchema>;
export type GetImportBatchesQueryInput = z.infer<typeof getImportBatchesQuerySchema>;

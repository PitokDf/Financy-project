import { ExportFormat, ExportStatus } from "@prisma/client";
import z from "zod";

export const exportLogIdParamSchema = z.object({
    exportLogId: z.string().cuid("ID export log tidak valid"),
});

export const createExportLogSchema = z.object({
    format: z.nativeEnum(ExportFormat, {
        errorMap: () => ({ message: "Format ekspor tidak valid" }),
    }),
    month: z.coerce.number().int().min(1, "Bulan minimal 1").max(12, "Bulan maksimal 12"),
    year: z.coerce.number().int().min(2000, "Tahun tidak valid").max(2100, "Tahun terlalu jauh"),
    options: z.record(z.any()).optional().nullable(),
});

export const updateExportLogStatusSchema = z.object({
    status: z.nativeEnum(ExportStatus, {
        errorMap: () => ({ message: "Status ekspor tidak valid" }),
    }),
    fileUrl: z.string().url("URL file tidak valid").optional().nullable(),
    fileSize: z.coerce.number().int().min(0, "Ukuran file tidak valid").optional().nullable(),
    errorMessage: z.string().trim().max(500, "Pesan error maksimal 500 karakter").optional().nullable(),
}).refine((data) => Object.keys(data).length > 0, {
    message: "Minimal satu field harus diisi untuk update",
});

export const getExportLogsQuerySchema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(10),
    format: z.nativeEnum(ExportFormat).optional(),
    status: z.nativeEnum(ExportStatus).optional(),
    month: z.coerce.number().int().min(1).max(12).optional(),
    year: z.coerce.number().int().min(2000).max(2100).optional(),
    sortBy: z.enum(["createdAt", "completedAt", "month", "year", "status"]).optional().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export type ExportLogIdParamInput = z.infer<typeof exportLogIdParamSchema>;
export type CreateExportLogInput = z.infer<typeof createExportLogSchema>;
export type UpdateExportLogStatusInput = z.infer<typeof updateExportLogStatusSchema>;
export type GetExportLogsQueryInput = z.infer<typeof getExportLogsQuerySchema>;

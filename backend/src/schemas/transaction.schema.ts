import { TransactionType } from "@prisma/client";
import z from "zod";

export const transactionIdParamSchema = z.object({
  transactionId: z.string().cuid("ID transaksi tidak valid"),
});

export const createTransactionSchema = z.object({
  type: z.nativeEnum(TransactionType, {
    errorMap: () => ({ message: "Tipe transaksi harus INCOME atau EXPENSE" }),
  }),
  amount: z.coerce
    .number({ invalid_type_error: "Nominal harus berupa angka" })
    .positive("Nominal harus lebih besar dari 0"),
  description: z
    .string()
    .trim()
    .min(1, "Deskripsi tidak boleh kosong")
    .max(255, "Deskripsi maksimal 255 karakter"),
  date: z.coerce.date({
    errorMap: () => ({ message: "Tanggal transaksi tidak valid" }),
  }),
  categoryId: z.string().cuid("ID kategori tidak valid").optional().nullable(),
});

export const updateTransactionSchema = createTransactionSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Minimal satu field harus diisi untuk update",
  });

export const getTransactionsQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(10),
    type: z.nativeEnum(TransactionType).optional(),
    categoryId: z.string().cuid("ID kategori tidak valid").optional(),
    search: z.string().trim().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    sortBy: z.enum(["date", "amount", "createdAt"]).optional().default("date"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;
      return data.startDate <= data.endDate;
    },
    {
      message: "startDate tidak boleh lebih besar dari endDate",
      path: ["startDate"],
    }
  );

export const analyzeTransactionsSchema = z.object({
  kMin: z.coerce.number().int().min(2).max(10).optional().default(2),
  kMax: z.coerce.number().int().min(2).max(15).optional().default(8),
}).refine((data) => data.kMin <= data.kMax, {
  message: "kMin tidak boleh lebih besar dari kMax",
  path: ["kMin"],
});

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
export type GetTransactionsQueryInput = z.infer<typeof getTransactionsQuerySchema>;
export type TransactionIdParamInput = z.infer<typeof transactionIdParamSchema>;
export type AnalyzeTransactionsInput = z.infer<typeof analyzeTransactionsSchema>;

import z from "zod";
export declare const TransactionType: z.ZodEnum<["INCOME", "EXPENSE"]>;
export declare const TransactionSource: z.ZodEnum<["MANUAL", "CSV_IMPORT", "API"]>;
export declare const CreateTransactionSchema: z.ZodObject<{
    userId: z.ZodString;
    description: z.ZodString;
    amount: z.ZodNumber;
    type: z.ZodEnum<["INCOME", "EXPENSE"]>;
    date: z.ZodEffects<z.ZodDate, Date, unknown>;
    categoryId: z.ZodOptional<z.ZodString>;
    clusterId: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodEnum<["MANUAL", "CSV_IMPORT", "API"]>>;
    csvImportId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    description: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
    date: Date;
    categoryId?: string | undefined;
    clusterId?: string | undefined;
    source?: "MANUAL" | "CSV_IMPORT" | "API" | undefined;
    csvImportId?: string | undefined;
}, {
    userId: string;
    description: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
    date?: unknown;
    categoryId?: string | undefined;
    clusterId?: string | undefined;
    source?: "MANUAL" | "CSV_IMPORT" | "API" | undefined;
    csvImportId?: string | undefined;
}>;
export declare const UpdateTransactionSchema: z.ZodObject<{
    userId: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    amount: z.ZodOptional<z.ZodNumber>;
    type: z.ZodOptional<z.ZodEnum<["INCOME", "EXPENSE"]>>;
    date: z.ZodOptional<z.ZodEffects<z.ZodDate, Date, unknown>>;
    categoryId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    clusterId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    source: z.ZodOptional<z.ZodOptional<z.ZodEnum<["MANUAL", "CSV_IMPORT", "API"]>>>;
    csvImportId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
} & {
    id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id?: string | undefined;
    userId?: string | undefined;
    description?: string | undefined;
    amount?: number | undefined;
    type?: "INCOME" | "EXPENSE" | undefined;
    date?: Date | undefined;
    categoryId?: string | undefined;
    clusterId?: string | undefined;
    source?: "MANUAL" | "CSV_IMPORT" | "API" | undefined;
    csvImportId?: string | undefined;
}, {
    id?: string | undefined;
    userId?: string | undefined;
    description?: string | undefined;
    amount?: number | undefined;
    type?: "INCOME" | "EXPENSE" | undefined;
    date?: unknown;
    categoryId?: string | undefined;
    clusterId?: string | undefined;
    source?: "MANUAL" | "CSV_IMPORT" | "API" | undefined;
    csvImportId?: string | undefined;
}>;
export declare const TransactionResponseSchema: z.ZodObject<{
    userId: z.ZodString;
    description: z.ZodString;
    amount: z.ZodNumber;
    type: z.ZodEnum<["INCOME", "EXPENSE"]>;
    date: z.ZodEffects<z.ZodDate, Date, unknown>;
    categoryId: z.ZodOptional<z.ZodString>;
    clusterId: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodEnum<["MANUAL", "CSV_IMPORT", "API"]>>;
    csvImportId: z.ZodOptional<z.ZodString>;
} & {
    id: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    description: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
    date: Date;
    categoryId?: string | undefined;
    clusterId?: string | undefined;
    source?: "MANUAL" | "CSV_IMPORT" | "API" | undefined;
    csvImportId?: string | undefined;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    description: string;
    amount: number;
    type: "INCOME" | "EXPENSE";
    date?: unknown;
    categoryId?: string | undefined;
    clusterId?: string | undefined;
    source?: "MANUAL" | "CSV_IMPORT" | "API" | undefined;
    csvImportId?: string | undefined;
}>;
export type CreateTransaction = z.infer<typeof CreateTransactionSchema>;
export type UpdateTransaction = z.infer<typeof UpdateTransactionSchema>;
export type TransactionResponse = z.infer<typeof TransactionResponseSchema>;
//# sourceMappingURL=transaction.schema.d.ts.map
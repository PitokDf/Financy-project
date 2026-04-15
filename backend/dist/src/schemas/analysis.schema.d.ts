import z from "zod";
declare const clusterMappingSchema: z.ZodObject<{
    index: z.ZodNumber;
    name: z.ZodString;
    color: z.ZodOptional<z.ZodString>;
    icon: z.ZodOptional<z.ZodString>;
    suggestedName: z.ZodOptional<z.ZodString>;
    transactionIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    index: number;
    color?: string | undefined;
    icon?: string | undefined;
    suggestedName?: string | undefined;
    transactionIds?: string[] | undefined;
}, {
    name: string;
    index: number;
    color?: string | undefined;
    icon?: string | undefined;
    suggestedName?: string | undefined;
    transactionIds?: string[] | undefined;
}>;
export declare const runAnalysisSchema: z.ZodEffects<z.ZodObject<{
    lookbackDays: z.ZodOptional<z.ZodNumber>;
    kMin: z.ZodOptional<z.ZodNumber>;
    kMax: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    lookbackDays?: number | undefined;
    kMin?: number | undefined;
    kMax?: number | undefined;
}, {
    lookbackDays?: number | undefined;
    kMin?: number | undefined;
    kMax?: number | undefined;
}>, {
    lookbackDays?: number | undefined;
    kMin?: number | undefined;
    kMax?: number | undefined;
}, {
    lookbackDays?: number | undefined;
    kMin?: number | undefined;
    kMax?: number | undefined;
}>;
export declare const confirmAnalysisSchema: z.ZodObject<{
    userId: z.ZodString;
    runId: z.ZodString;
    clusterMappings: z.ZodArray<z.ZodObject<{
        index: z.ZodNumber;
        name: z.ZodString;
        color: z.ZodOptional<z.ZodString>;
        icon: z.ZodOptional<z.ZodString>;
        suggestedName: z.ZodOptional<z.ZodString>;
        transactionIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        index: number;
        color?: string | undefined;
        icon?: string | undefined;
        suggestedName?: string | undefined;
        transactionIds?: string[] | undefined;
    }, {
        name: string;
        index: number;
        color?: string | undefined;
        icon?: string | undefined;
        suggestedName?: string | undefined;
        transactionIds?: string[] | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    userId: string;
    runId: string;
    clusterMappings: {
        name: string;
        index: number;
        color?: string | undefined;
        icon?: string | undefined;
        suggestedName?: string | undefined;
        transactionIds?: string[] | undefined;
    }[];
}, {
    userId: string;
    runId: string;
    clusterMappings: {
        name: string;
        index: number;
        color?: string | undefined;
        icon?: string | undefined;
        suggestedName?: string | undefined;
        transactionIds?: string[] | undefined;
    }[];
}>;
export type RunAnalysisInput = z.infer<typeof runAnalysisSchema>;
export type ConfirmAnalysisInput = z.infer<typeof confirmAnalysisSchema>;
export type ClusterMappingInput = z.infer<typeof clusterMappingSchema>;
export {};
//# sourceMappingURL=analysis.schema.d.ts.map
import z from "zod";

const clusterMappingSchema = z.object({
    index: z.number({ invalid_type_error: "index harus angka" }).int({ message: "index harus integer" }),
    name: z.string({ message: "name dibutuhkan" }).min(1, { message: "name minimal 1 karakter" }).max(125, { message: "name maksimal 125 karakter" }),
    color: z.string().optional(),
    icon: z.string().optional(),
    suggestedName: z.string().optional(),
    transactionIds: z.array(z.string()).optional(), // Added for manual assignment
});

export const runAnalysisSchema = z.object({
    lookbackDays: z.number({ invalid_type_error: "lookbackDays harus angka" })
        .int({ message: "lookbackDays harus integer" })
        .min(1, { message: "lookbackDays minimal 1" })
        .max(365, { message: "lookbackDays maksimal 365" })
        .optional(),
    kMin: z.number({ invalid_type_error: "kMin harus angka" })
        .int({ message: "kMin harus integer" })
        .min(2, { message: "kMin minimal 2" })
        .max(12, { message: "kMin maksimal 12" })
        .optional(),
    kMax: z.number({ invalid_type_error: "kMax harus angka" })
        .int({ message: "kMax harus integer" })
        .min(2, { message: "kMax minimal 2" })
        .max(12, { message: "kMax maksimal 12" })
        .optional(),
}).refine((data) => {
    if (data.kMin === undefined || data.kMax === undefined) return true;
    return data.kMin <= data.kMax;
}, {
    message: "kMin tidak boleh lebih besar dari kMax",
    path: ["kMin"],
});

export const confirmAnalysisSchema = z.object({
    userId: z.string({ message: "userId dibutuhkan" }),
    runId: z.string({ message: "runId dibutuhkan" }),
    clusterMappings: z.array(clusterMappingSchema, { message: "clusterMappings dibutuhkan" }),
});

export type RunAnalysisInput = z.infer<typeof runAnalysisSchema>;
export type ConfirmAnalysisInput = z.infer<typeof confirmAnalysisSchema>;
export type ClusterMappingInput = z.infer<typeof clusterMappingSchema>;

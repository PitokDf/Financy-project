"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmAnalysisSchema = exports.runAnalysisSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const clusterMappingSchema = zod_1.default.object({
    index: zod_1.default.number({ invalid_type_error: "index harus angka" }).int({ message: "index harus integer" }),
    name: zod_1.default.string({ message: "name dibutuhkan" }).min(1, { message: "name minimal 1 karakter" }).max(125, { message: "name maksimal 125 karakter" }),
    color: zod_1.default.string().optional(),
    icon: zod_1.default.string().optional(),
    suggestedName: zod_1.default.string().optional(),
    transactionIds: zod_1.default.array(zod_1.default.string()).optional(),
});
exports.runAnalysisSchema = zod_1.default.object({
    lookbackDays: zod_1.default.number({ invalid_type_error: "lookbackDays harus angka" })
        .int({ message: "lookbackDays harus integer" })
        .min(1, { message: "lookbackDays minimal 1" })
        .max(365, { message: "lookbackDays maksimal 365" })
        .optional(),
    kMin: zod_1.default.number({ invalid_type_error: "kMin harus angka" })
        .int({ message: "kMin harus integer" })
        .min(2, { message: "kMin minimal 2" })
        .max(12, { message: "kMin maksimal 12" })
        .optional(),
    kMax: zod_1.default.number({ invalid_type_error: "kMax harus angka" })
        .int({ message: "kMax harus integer" })
        .min(2, { message: "kMax minimal 2" })
        .max(12, { message: "kMax maksimal 12" })
        .optional(),
}).refine((data) => {
    if (data.kMin === undefined || data.kMax === undefined)
        return true;
    return data.kMin <= data.kMax;
}, {
    message: "kMin tidak boleh lebih besar dari kMax",
    path: ["kMin"],
});
exports.confirmAnalysisSchema = zod_1.default.object({
    userId: zod_1.default.string({ message: "userId dibutuhkan" }),
    runId: zod_1.default.string({ message: "runId dibutuhkan" }),
    clusterMappings: zod_1.default.array(clusterMappingSchema, { message: "clusterMappings dibutuhkan" }),
});
//# sourceMappingURL=analysis.schema.js.map
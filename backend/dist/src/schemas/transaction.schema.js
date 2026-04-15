"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionResponseSchema = exports.UpdateTransactionSchema = exports.CreateTransactionSchema = exports.TransactionSource = exports.TransactionType = void 0;
const zod_1 = __importDefault(require("zod"));
exports.TransactionType = zod_1.default.enum(["INCOME", "EXPENSE"]);
exports.TransactionSource = zod_1.default.enum(["MANUAL", "CSV_IMPORT", "API"]);
exports.CreateTransactionSchema = zod_1.default.object({
    userId: zod_1.default.string({ message: 'userId dibutuhkan' }),
    description: zod_1.default.string({ message: 'Deskripsi dibutuhkan' })
        .min(5, { message: 'Deskripsi minimal 5 karakter' }),
    amount: zod_1.default.number({ invalid_type_error: 'amount harus angka' }).int({ message: 'amount harus integer' }).nonnegative({ message: 'amount tidak boleh negatif' }),
    type: exports.TransactionType,
    date: zod_1.default.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date)
            return new Date(arg);
        return arg;
    }, zod_1.default.date({ invalid_type_error: 'date harus tanggal/ISO string' })),
    categoryId: zod_1.default.string().optional(),
    clusterId: zod_1.default.string().optional(),
    source: exports.TransactionSource.optional(),
    csvImportId: zod_1.default.string().optional(),
});
exports.UpdateTransactionSchema = exports.CreateTransactionSchema.partial().extend({
    id: zod_1.default.string().optional(),
});
exports.TransactionResponseSchema = exports.CreateTransactionSchema.extend({
    id: zod_1.default.string(),
    createdAt: zod_1.default.date(),
    updatedAt: zod_1.default.date(),
});
//# sourceMappingURL=transaction.schema.js.map
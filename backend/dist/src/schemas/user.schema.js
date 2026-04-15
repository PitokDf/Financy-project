"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.updateUserSchema = exports.registerSchema = exports.createUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .nonempty({ message: "Nama tidak boleh kosong" })
        .min(3, { message: "Nama minimal 3 karakter" })
        .max(125, "Nama maksimal 125 karakter"),
    email: zod_1.default
        .string()
        .nonempty({ message: "Email tidak boleh kosong" })
        .email({ message: "Email tidak valid" })
        .max(255, { message: "Email terlalu panjang, maksimal 255 karakter" })
        .transform(str => str.toLowerCase()),
    password: zod_1.default
        .string()
        .nonempty({ message: "Password tidak boleh kosong" })
        .min(6, { message: "Password minimal 6 karakter" }),
});
exports.registerSchema = exports.createUserSchema;
exports.updateUserSchema = zod_1.default
    .object({
    name: zod_1.default
        .string()
        .min(3, { message: "Nama minimal 3 karakter" })
        .optional(),
    email: zod_1.default
        .string()
        .email({ message: "Email tidak valid" })
        .max(255, { message: "Email terlalu panjang, maksimal 255 karakter" })
        .optional()
        .transform((str) => (str ? str.toLowerCase() : str)),
    password: zod_1.default
        .string()
        .min(6, { message: "Password minimal 6 karakter" })
        .optional(),
})
    .refine((data) => Object.keys(data).length > 0, {
    message: "Minimal satu field harus diisi untuk update",
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().nonempty({ message: "Email tidak boleh kosong" }).email({ message: "Email tidak valid" }).transform(s => s.toLowerCase()),
    password: zod_1.default.string().nonempty({ message: "Password tidak boleh kosong" })
});
//# sourceMappingURL=user.schema.js.map
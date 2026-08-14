import { userService } from "@/service/user.service";
import z from "zod";

export const createUserSchema = z.object({
    name: z
        .string()
        .nonempty({ message: "Nama tidak boleh kosong" })
        .min(3, { message: "Nama minimal 3 karakter" })
        .max(125, "Nama maksimal 125 karakter"),
    email: z
        .string()
        .nonempty({ message: "Email tidak boleh kosong" })
        .email({ message: "Email tidak valid" })
        .max(255, { message: "Email terlalu panjang, maksimal 255 karakter" })
        .transform(str => str.toLowerCase()),
    password: z
        .string()
        .nonempty({ message: "Password tidak boleh kosong" })
        .min(6, { message: "Password minimal 6 karakter" }),
})
    .superRefine(async (values, ctx) => {
        if (await userService.findByEmail(values.email)) {
            ctx.addIssue({
                code: "custom",
                message: "Email sudah terdaftar",
                path: ["email"],
            });
        }
    });

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(6, 'Minimal 6 karakter'),
    newPassword: z.string().min(6, 'Minimal 6 karakter'),
}).superRefine((values, ctx) => {
    if (values.currentPassword === values.newPassword) {
        ctx.addIssue({
            code: 'custom',
            message: 'Kata sandi baru tidak boleh sama dengan yang lama.',
            path: ['newPassword']
        })
    }
})

export type ChangePassword = z.infer<typeof changePasswordSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;

export const registerSchema = createUserSchema;
export type RegisterDTO = z.infer<typeof registerSchema>;

export const updateUserSchema = z
    .object({
        name: z
            .string()
            .min(3, { message: "Nama minimal 3 karakter" })
            .optional(), // kalau kamu izinkan string kosong
        email: z
            .string()
            .email({ message: "Email tidak valid" })
            .max(255, { message: "Email terlalu panjang, maksimal 255 karakter" })
            .optional()
            .transform((str) => (str ? str.toLowerCase() : str))
        ,
        password: z
            .string()
            .min(6, { message: "Password minimal 6 karakter" })
            .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "Minimal satu field harus diisi untuk update",
    });

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const loginSchema = z.object({
    email: z.string().nonempty({ message: "Email tidak boleh kosong" }).email({ message: "Email tidak valid" }).transform(s => s.toLowerCase()),
    password: z.string().nonempty({ message: "Password tidak boleh kosong" })
});

export type LoginDTO = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().nonempty({ message: "Email tidak boleh kosong" }).email({ message: "Email tidak valid" }).transform(s => s.toLowerCase()),
});

export type ForgotPasswordDTO = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
    token: z.string().min(1, { message: "Token diperlukan" }),
    password: z.string()
        .min(8, { message: "Password minimal 8 karakter" })
        .regex(/[A-Z]/, { message: "Password harus mengandung huruf besar" })
        .regex(/[0-9]/, { message: "Password harus mengandung angka" }),
    confirmPassword: z.string().min(1, { message: "Konfirmasi password diperlukan" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
});

export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>;

export const verifyEmailSchema = z.object({
    token: z.string().min(1, { message: "Token diperlukan" }),
});

export type VerifyEmailDTO = z.infer<typeof verifyEmailSchema>;

export const resendVerificationSchema = z.object({
    email: z.string().nonempty({ message: "Email tidak boleh kosong" }).email({ message: "Email tidak valid" }).transform(s => s.toLowerCase()),
});

export type ResendVerificationDTO = z.infer<typeof resendVerificationSchema>;

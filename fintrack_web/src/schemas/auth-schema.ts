import z from "zod";

export const LoginSchema = z.object({
    email: z.email('Masukkan email yang valid'),
    password: z.string("Wajib diisi").min(6, "Minimal 6 karakter")
})

export type LoginFormValues = z.infer<typeof LoginSchema>

export const RegisterSchema = z
    .object({
        name: z
            .string('Wajib diisi')
            .min(3, 'Nama minimal 3 karakter'),
        email: z
            .string('Wajib diisi')
            .min(1, 'Email wajib diisi')
            .email('Format email tidak valid'),
        password: z
            .string('Wajib diisi')
            .min(6, 'Password minimal 6 karakter'),
        confirmPassword: z
            .string('Wajib diisi'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        "message": "Konfirmasi password tidak sama",
        path: ['confirmPassword']
    })

export type RegisterFormValues = z.infer<typeof RegisterSchema>
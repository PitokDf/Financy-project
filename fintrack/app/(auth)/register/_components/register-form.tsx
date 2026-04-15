import z from "zod"
import { ReusableForm } from "@/components/ui/reuseable-form";
import { ArrowRight } from "lucide-react";


const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, 'Nama wajib diisi')
            .min(2, 'Nama minimal 2 karakter')
            .max(50, 'Nama maksimal 50 karakter'),
        email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
        password: z
            .string()
            .min(1, 'Kata sandi wajib diisi')
            .min(8, 'Minimal 8 karakter')
            .regex(/[A-Z]/, 'Harus ada huruf kapital')
            .regex(/[0-9]/, 'Harus ada angka'),
        confirmPassword: z.string().min(1, 'Konfirmasi kata sandi wajib diisi'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Kata sandi tidak cocok',
        path: ['confirmPassword'],
    });

export type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm({ onSubmit }: {
    onSubmit: (values: RegisterFormData) => void
}) {
    return <ReusableForm<RegisterFormData>
        fields={[
            { name: 'name', type: 'text', label: 'Nama Lengkap', placeholder: 'Masukkan nama lengkap' },
            { name: 'email', type: 'email', label: 'Alamat Email', placeholder: 'nama@gmail.com' },
            { name: 'password', type: 'password', label: 'Kata Sandi', placeholder: 'Buat kata sandi kuat' },
            { name: 'confirmPassword', type: 'password', label: 'Konfirmasi Kata Sandi', placeholder: 'Ulangin kata sandi' },
        ]}
        defaultValues={{ confirmPassword: '', email: '', name: '', password: '' }}
        schema={registerSchema}
        onSubmit={onSubmit}
        submitText="Daftar Akun Gratis"
        submitIcon={ArrowRight}
        loadingText="Memproses"
    />
}
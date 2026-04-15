'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { TrendingUp, Shield, Zap, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/lib/zustand/auth-store';
import { ReusableForm } from '@/components/ui/reuseable-form';
import { useAuth } from '@/hooks/use-auth';

const loginSchema = z.object({
    email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
    password: z.string().min(1, 'Kata sandi wajib diisi').min(6, 'Minimal 6 karakter'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const FEATURES = [
    { icon: TrendingUp, label: 'Pantau keuangan real-time' },
    { icon: Zap, label: 'Klasterisasi transaksi otomatis' },
    { icon: Shield, label: 'Data aman & terenkripsi' },
] as const;

export default function LoginPage() {
    const { setAuth } = useAuthStore();
    const { loginMutation } = useAuth()
    const router = useRouter();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const user = await loginMutation(data);
            setAuth(user);
            router.replace('/dashboard');
        } catch (error) {
            throw error
        }
    };

    return (
        <div className="min-h-dvh flex flex-col">
            <div className="gradient-primary px-6 pt-16 pb-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5 backdrop-blur-sm">
                        <span className="text-white font-black text-2xl">F</span>
                    </div>
                    <h1 className="text-3xl font-black text-white mb-2">FinTrack</h1>
                    <p className="text-white/80 text-sm font-medium">
                        Kendalikan keuangan Anda dengan cerdas
                    </p>
                    <div className="flex flex-wrap gap-3 mt-5">
                        {FEATURES.map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5 backdrop-blur-sm">
                                <Icon className="w-3 h-3 text-white" />
                                <span className="text-white text-xs font-medium">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-background rounded-t-3xl -mt-4 relative z-10 px-6 pt-8 pb-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Masuk ke FinTrack</h2>
                    <p className="text-muted-foreground text-sm mt-1">
                        Belum punya akun?{' '}
                        <Link href="/register" className="text-primary font-semibold hover:underline">
                            Daftar gratis
                        </Link>
                    </p>
                </div>

                <ReusableForm<LoginFormData>
                    defaultValues={{ email: "", password: "" }}
                    submitText='Masuk Sekarang'
                    submitIcon={ArrowRight}
                    loadingText='Sedang Masuk'
                    useFormData={false}
                    loadingIcon={() => <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    fields={[
                        {
                            name: "email",
                            type: 'email',
                            label: 'Alamat Email',
                            placeholder: 'nama@email.com'
                        },
                        {
                            name: "password",
                            type: 'password',
                            label: 'Kata Sandi',
                            placeholder: 'Masukkan kata sandi'
                        },
                        {
                            type: 'custom',
                            renderCustom: () => (
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="text-sm text-primary font-semibold hover:underline"
                                    >
                                        Lupa kata sandi?
                                    </button>
                                </div>
                            )
                        }
                    ]}
                    onSubmit={onSubmit}
                    schema={loginSchema}
                    key={'login-form'}
                />

                <p className="text-center text-xs text-muted-foreground mt-8 leading-relaxed">
                    Dengan masuk, Anda menyetujui{' '}
                    <span className="text-primary font-medium">Syarat & Ketentuan</span> dan{' '}
                    <span className="text-primary font-medium">Kebijakan Privasi</span> FinTrack.
                </p>
            </div>
        </div>
    );
}

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, } from 'lucide-react';
import { useAuthStore } from '@/lib/zustand/auth-store';
import { RegisterForm, RegisterFormData } from './_components/register-form';
import { useAuth } from '@/hooks/use-auth';

export default function RegisterPage() {
    const { setAuth } = useAuthStore();
    const { registerMutation } = useAuth()
    const router = useRouter();

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const user = await registerMutation(data);
            setAuth(user);
            router.replace('/dashboard');
        } catch (error) {
            throw error
        }
    };

    return (
        <div className="min-h-dvh flex flex-col">
            <div className="gradient-primary px-6 pt-14 pb-8 relative overflow-hidden">
                <Link
                    href="/login"
                    className="inline-flex items-center gap-1 text-white/80 text-sm mb-6 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Sudah punya akun? Masuk
                </Link>
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4 backdrop-blur-sm">
                        <span className="text-white font-black text-xl">F</span>
                    </div>
                    <h1 className="text-2xl font-black text-white mb-1">Buat Akun FinTrack</h1>
                    <p className="text-white/75 text-sm">Mulai perjalanan keuangan sehat Anda hari ini</p>
                </div>
            </div>

            <div className="flex-1 bg-background rounded-t-3xl -mt-4 relative z-10 px-6 pt-7 pb-8 overflow-y-auto">
                <RegisterForm onSubmit={onSubmit} />

                <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
                    Dengan mendaftar, Anda menyetujui{' '}
                    <span className="text-primary font-medium">Syarat & Ketentuan</span> dan{' '}
                    <span className="text-primary font-medium">Kebijakan Privasi</span> FinTrack.
                </p>
            </div>
        </div>
    );
}

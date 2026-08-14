'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, } from 'lucide-react';
import { RegisterForm, RegisterFormData } from './_components/register-form';
import { useAuth } from '@/hooks/use-auth';
import { setLocaleCookie } from '@/lib/locale-cookie';
import Image from 'next/image';

export default function RegisterPage() {
    const { registerMutation } = useAuth()
    const router = useRouter();

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const user = await registerMutation(data);
            setLocaleCookie(user.language || "id");
            router.replace(`/verify-email?email=${encodeURIComponent(user.email)}`);
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
                        <Image alt='Icon badge' src={'/icons/badge-72x72.png'} width={38} height={38} />
                    </div>
                    <h1 className="text-2xl font-black text-white mb-1">Buat Akun FinTrack</h1>
                    <p className="text-white/75 text-sm">Mulai perjalanan keuangan sehat Anda hari ini</p>
                </div>
            </div>

            <div className="flex-1 bg-background rounded-t-3xl -mt-4 relative z-10 px-6 pt-7 pb-8 overflow-y-auto">
                <button
                    type="button"
                    onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
                    className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl px-4 py-2.5 border border-gray-300 transition-colors mb-4"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Daftar dengan Google
                </button>

                <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">atau</span>
                    </div>
                </div>

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

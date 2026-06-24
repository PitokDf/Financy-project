"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { TrendingUp, Shield, Zap, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/lib/zustand/auth-store";
import { ReusableForm } from "@/components/ui/reuseable-form";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(1, "Kata sandi wajib diisi")
    .min(6, "Minimal 6 karakter"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const FEATURES = [
  { icon: TrendingUp, label: "Pantau keuangan real-time" },
  { icon: Zap, label: "Klasterisasi transaksi otomatis" },
] as const;

function LoginContent() {
  const { setAuth } = useAuthStore();
  const { loginMutation } = useAuth();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const errorParam = searchParams.get("error");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (errorParam) {
      setErrorMsg(decodeURIComponent(errorParam));
    }
  }, [errorParam]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = await loginMutation(data);
      setAuth(user);

      router.push(redirectUrl ?? "/dashboard");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <div className="gradient-primary px-6 pt-16 pb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5 backdrop-blur-sm">
            <Image
              alt="Icon badge"
              src={"/icons/badge-72x72.png"}
              width={38}
              height={38}
            />
            {/* <span className="text-white font-black text-2xl">F</span> */}
          </div>
          <h1 className="text-3xl font-black text-white mb-2">FinTrack</h1>
          <p className="text-white/80 text-sm font-medium">
            Kendalikan keuangan Anda dengan cerdas
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5 backdrop-blur-sm"
              >
                <Icon className="w-3 h-3 text-white" />
                <span className="text-white text-xs font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-background rounded-t-3xl -mt-4 relative z-10 px-6 pt-8 pb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            Masuk ke FinTrack
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-primary font-semibold hover:underline"
            >
              Daftar gratis
            </Link>
          </p>
        </div>

        {errorMsg && (
          <div className="flex items-start gap-2 bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-destructive font-medium">{errorMsg}</p>
          </div>
        )}

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
          Lanjutkan dengan Google
        </button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">atau</span>
          </div>
        </div>

        <ReusableForm<LoginFormData>
          defaultValues={{ email: "", password: "" }}
          submitText="Masuk Sekarang"
          submitIcon={ArrowRight}
          loadingText="Sedang Masuk"
          useFormData={false}
          loadingIcon={() => (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          fields={[
            {
              name: "email",
              type: "email",
              label: "Alamat Email",
              placeholder: "nama@email.com",
            },
            {
              name: "password",
              type: "password",
              label: "Kata Sandi",
              placeholder: "Masukkan kata sandi",
            },
            {
              type: "custom",
              renderCustom: () => (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-primary font-semibold hover:underline"
                  >
                    Lupa kata sandi?
                  </button>
                </div>
              ),
            },
          ]}
          onSubmit={onSubmit}
          schema={loginSchema}
          key={"login-form"}
        />

        <p className="text-center text-xs text-muted-foreground mt-8 leading-relaxed">
          Dengan masuk, Anda menyetujui{" "}
          <span className="text-primary font-medium">Syarat & Ketentuan</span>{" "}
          dan{" "}
          <span className="text-primary font-medium">Kebijakan Privasi</span>{" "}
          FinTrack.
        </p>
      </div>
    </div>
  );
}
export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}

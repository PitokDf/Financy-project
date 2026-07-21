"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { Lock, ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react";
import { ReusableForm } from "@/components/ui/reuseable-form";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

const resetSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password wajib diisi")
      .min(8, "Minimal 8 karakter")
      .regex(/[A-Z]/, "Harus mengandung huruf besar")
      .regex(/[0-9]/, "Harus mengandung angka"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

type ResetFormData = z.infer<typeof resetSchema>;

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { resetPasswordMutation } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsValidToken(false);
    }
  }, [token]);

  const onSubmit = async (data: ResetFormData) => {
    if (!token) return;
    try {
      await resetPasswordMutation({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      setIsSuccess(true);
    } catch (error) {
      throw error;
    }
  };

  if (!isValidToken) {
    return (
      <div className="min-h-dvh flex flex-col">
        <div className="gradient-primary px-6 pt-16 pb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5 backdrop-blur-sm">
              <Image alt="Icon badge" src="/icons/badge-72x72.png" width={38} height={38} />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">FinTrack</h1>
          </div>
        </div>
        <div className="flex-1 bg-background rounded-t-3xl -mt-4 relative z-10 px-6 pt-8 pb-8">
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Link Tidak Valid</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Link reset password tidak valid atau sudah kedaluwarsa.
            </p>
            <Link
              href="/forgot-password"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Minta Link Baru
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col">
      <div className="gradient-primary px-6 pt-16 pb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5 backdrop-blur-sm">
            <Image alt="Icon badge" src="/icons/badge-72x72.png" width={38} height={38} />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">FinTrack</h1>
          <p className="text-white/80 text-sm font-medium">Buat password baru Anda</p>
        </div>
      </div>

      <div className="flex-1 bg-background rounded-t-3xl -mt-4 relative z-10 px-6 pt-8 pb-8">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke login
        </Link>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Password Berhasil Direset!</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Anda sekarang bisa login dengan password baru.
            </p>
            <Link
              href="/login?reset=success"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Login Sekarang
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">Reset Password</h2>
              <p className="text-muted-foreground text-sm mt-1">
                Masukkan password baru Anda.
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground text-left">
                  Password minimal 8 karakter, harus mengandung huruf besar dan angka.
                </p>
              </div>
            </div>

            <ReusableForm<ResetFormData>
              defaultValues={{ password: "", confirmPassword: "" }}
              submitText="Reset Password"
              submitIcon={Lock}
              loadingText="Mereset..."
              useFormData={false}
              loadingIcon={() => (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              fields={[
                {
                  name: "password",
                  type: "password",
                  label: "Password Baru",
                  placeholder: "Masukkan password baru",
                },
                {
                  name: "confirmPassword",
                  type: "password",
                  label: "Konfirmasi Password",
                  placeholder: "Masukkan ulang password",
                },
              ]}
              onSubmit={onSubmit}
              schema={resetSchema}
              key="reset-form"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
}

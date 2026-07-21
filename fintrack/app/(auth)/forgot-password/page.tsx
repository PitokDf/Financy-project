"use client";

import Link from "next/link";
import { z } from "zod";
import { Mail, ArrowLeft, CheckCircle, Shield } from "lucide-react";
import { ReusableForm } from "@/components/ui/reuseable-form";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

const forgotSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const { forgotPasswordMutation } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const onSubmit = async (data: ForgotFormData) => {
    try {
      await forgotPasswordMutation(data.email);
      setSentEmail(data.email);
      setIsSuccess(true);
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
              src="/icons/badge-72x72.png"
              width={38}
              height={38}
            />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">FinTrack</h1>
          <p className="text-white/80 text-sm font-medium">
            Kendalikan keuangan Anda dengan cerdas
          </p>
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
            <h2 className="text-xl font-bold text-foreground mb-2">
              Email Terkirim!
            </h2>
            <p className="text-muted-foreground text-sm mb-2">
              Kami telah mengirimkan link reset password ke:
            </p>
            <p className="text-foreground font-semibold text-sm mb-6">
              {sentEmail}
            </p>
            <div className="bg-muted/50 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground text-left">
                  Cek inbox atau folder spam Anda. Link reset password berlaku selama <strong>15 menit</strong>.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsSuccess(false);
                setSentEmail("");
              }}
              className="text-sm text-primary font-semibold hover:underline"
            >
              Kirim ulang ke email lain
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Lupa Kata Sandi?
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                Masukkan email Anda dan kami akan mengirimkan link untuk reset password.
              </p>
            </div>

            <ReusableForm<ForgotFormData>
              defaultValues={{ email: "" }}
              submitText="Kirim Link Reset"
              submitIcon={Mail}
              loadingText="Mengirim..."
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
              ]}
              onSubmit={onSubmit}
              schema={forgotSchema}
              key="forgot-form"
            />
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  Mail,
  RefreshCw,
} from "lucide-react";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

type VerifyStatus =
  | "verifying"
  | "success"
  | "error"
  | "sent";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const emailParam = searchParams.get("email") || "";
  const { verifyEmailMutation, resendVerificationMutation } = useAuth();

  const [status, setStatus] = useState<VerifyStatus>(
    token ? "verifying" : "sent",
  );
  const [email, setEmail] = useState(emailParam);
  const [errorMsg, setErrorMsg] = useState("");
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!token) return;
    let mounted = true;
    (async () => {
      try {
        await verifyEmailMutation(token);
        if (mounted) setStatus("success");
      } catch (error: unknown) {
        if (mounted) {
          const err = error as { message?: string };
          setErrorMsg(
            err.message ||
              "Link verifikasi tidak valid atau sudah kedaluwarsa.",
          );
          setStatus("error");
        }
      }
    })();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleResend = async () => {
    const target = email.trim();
    if (!target) {
      toast.error("Masukkan alamat email Anda.");
      return;
    }
    setResending(true);
    try {
      await resendVerificationMutation(target);
      setStatus("sent");
      toast.success("Email verifikasi telah dikirim ulang!");
    } catch (error: unknown) {
      const err = error as { message?: string };
      toast.error(err.message || "Gagal mengirim ulang email verifikasi.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <div className="gradient-primary px-6 pt-16 pb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
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
            Verifikasi alamat email Anda
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

        {status === "verifying" && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Memverifikasi Email...
            </h2>
            <p className="text-muted-foreground text-sm">
              Mohon tunggu sebentar.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Email Berhasil Diverifikasi!
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Akun Anda sudah aktif. Silakan masuk untuk mulai menggunakan
              FinTrack.
            </p>
            <Link
              href="/login?verified=success"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Login Sekarang
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Link Tidak Valid
            </h2>
            <p className="text-muted-foreground text-sm mb-6">{errorMsg}</p>
            <div className="bg-muted/50 rounded-xl p-4 mb-6 text-left">
              <label className="block text-xs font-medium text-muted-foreground mb-2">
                Alamat email Anda
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full h-11 rounded-lg border border-border/50 bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {resending ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Kirim Ulang Email
            </button>
          </div>
        )}

        {status === "sent" && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Cek Email Anda
            </h2>
            <p className="text-muted-foreground text-sm mb-2">
              Kami telah mengirim link verifikasi ke
            </p>
            <p className="font-semibold text-foreground text-sm mb-4">
              {email || "alamat email Anda"}
            </p>
            <p className="text-muted-foreground text-xs mb-6">
              Buka email dan klik tombol verifikasi. Link berlaku selama 24
              jam. Jika tidak ditemukan, periksa folder spam.
            </p>
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {resending ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Kirim Ulang Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}
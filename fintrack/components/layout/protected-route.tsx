"use client";

import { useAuthStore } from "@/lib/zustand/auth-store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading, refreshUser } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);
  const [checkDone, setCheckDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Cookie-based session (Google OAuth) hanya terdeteksi lewat round-trip ke
  // /users/me. Coba sekali setelah hydration ketika belum ada sesi lokal.
  useEffect(() => {
    if (hydrated && !isAuthenticated && !loading && !checkDone) {
      refreshUser().finally(() => setCheckDone(true));
    }
  }, [hydrated, isAuthenticated, loading, checkDone, refreshUser]);

  // Redirect ke login hanya setelah pengecekan sesi selesai dan memastikan
  // tidak ada sesi aktif. Redirect saat render beradu dengan refreshUser dan
  // membuat login Google pertama kali selalu terlempar ke halaman login.
  useEffect(() => {
    if (hydrated && checkDone && !isAuthenticated && !loading) {
      router.replace("/login");
    }
  }, [hydrated, checkDone, isAuthenticated, loading, router]);

  const checking = !isAuthenticated && !checkDone;
  const redirecting = hydrated && checkDone && !isAuthenticated && !loading;

  if (!hydrated || checking || loading || redirecting) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}

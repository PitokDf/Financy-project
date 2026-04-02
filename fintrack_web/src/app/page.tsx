"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/lib/auth-token";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (token) router.replace("/home");
    else router.replace("/auth/login");
  }, [router]);

  // Tampilkan spinner saat cek — biasanya hanya muncul sepersekian detik
  return (
    <div className="flex h-screen items-center justify-center">
      <span className="animate-spin h-6 w-6 rounded-full border-2 border-current border-t-transparent" />
    </div>
  );
}
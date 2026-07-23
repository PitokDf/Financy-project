"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Wifi, WifiOff, RefreshCw, Database, Clock } from "lucide-react";
import { getSyncQueueStatus } from "@/lib/offline/db";
import { useAuthStore } from "@/lib/zustand/auth-store";

export default function OfflinePage() {
    const router = useRouter();
    const [isRetrying, setIsRetrying] = useState(false);
    const [syncStatus, setSyncStatus] = useState<{ pending: number; failed: number; total: number }>({
        pending: 0,
        failed: 0,
        total: 0,
    });
    const { user } = useAuthStore();
    const userId = user?.id || "";

    useEffect(() => {
        if (userId) {
            getSyncQueueStatus(userId).then(setSyncStatus).catch(() => {});
        }
    }, [userId]);

    const handleRetry = async () => {
        setIsRetrying(true);
        if (navigator.onLine) {
            router.refresh();
            window.location.href = "/dashboard";
        } else {
            setTimeout(() => setIsRetrying(false), 1000);
        }
    };

    return (
        <main className="min-h-screen px-5 py-10 flex items-center justify-center bg-background text-foreground">
            <section className="w-full max-w-sm rounded-2xl border bg-card p-6 shadow-sm">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                        <WifiOff className="w-8 h-8 text-muted-foreground" />
                    </div>

                    <h1 className="text-lg font-semibold">Kamu sedang offline</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Koneksi internet terputus. Halaman yang sudah pernah dibuka tetap bisa diakses.
                    </p>
                </div>

                {syncStatus.total > 0 && (
                    <div className="mt-4 p-3 rounded-lg bg-muted/50 border">
                        <div className="flex items-center gap-2 text-sm">
                            <Database className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">Antrian Sinkronisasi</span>
                        </div>
                        <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
                            {syncStatus.pending > 0 && (
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{syncStatus.pending} menunggu</span>
                                </div>
                            )}
                            {syncStatus.failed > 0 && (
                                <div className="flex items-center gap-1 text-destructive">
                                    <span>{syncStatus.failed} gagal</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="mt-4 space-y-2">
                    <button
                        onClick={handleRetry}
                        disabled={isRetrying}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${isRetrying ? "animate-spin" : ""}`} />
                        {isRetrying ? "Mencoba..." : "Coba Hubungkan Kembali"}
                    </button>

                    <button
                        onClick={() => router.push("/dashboard")}
                        className="w-full px-4 py-2.5 rounded-xl border text-sm font-medium hover:bg-muted transition-colors"
                    >
                        Buka Dashboard (Cache)
                    </button>
                </div>

                <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-muted-foreground text-center">
                        Data yang sudah di-cache tetap tersedia tanpa koneksi internet.
                        Perubahan yang Anda buat akan disinkronisasi otomatis saat online.
                    </p>
                </div>
            </section>
        </main>
    );
}

import Link from "next/link";
import { AlertTriangle, ArrowRight, Loader2 } from "lucide-react";

interface AiLabCardProps {
    isPendingConfirmation: boolean;
    isRunning: boolean;
    clusterCount?: number;
    transactionCount?: number;
}

export function AiLabCard({
    isPendingConfirmation,
    isRunning,
    clusterCount = 14,
    transactionCount = 62,
}: AiLabCardProps) {
    /* ── RUNNING ──────────────────────────────────────────────── */
    if (isRunning) {
        return (
            <Link href="/analysis/lab">
                <div
                    className="
                        relative overflow-hidden rounded-[20px] p-[18px] mb-6
                        bg-white border border-indigo-100
                        dark:bg-card dark:border-indigo-500/25
                    "
                >
                    {/* pulsing orb */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                        <span
                            className="
                                absolute w-14 h-14 rounded-full
                                border border-indigo-200 animate-[ping_3s_ease-in-out_infinite]
                                dark:border-indigo-500/30
                            "
                        />
                        <span
                            className="
                                absolute w-[72px] h-[72px] rounded-full
                                border border-indigo-100 animate-[ping_3s_ease-in-out_infinite_0.5s]
                                dark:border-indigo-500/15
                            "
                        />
                        <span
                            className="
                                w-7 h-7 rounded-full animate-pulse
                                bg-gradient-to-br from-indigo-500 to-violet-500
                                shadow-[0_0_16px_4px_rgba(99,102,241,0.2)]
                                dark:shadow-[0_0_16px_4px_rgba(99,102,241,0.3)]
                            "
                        />
                    </div>

                    <div className="pr-20">
                        {/* tag */}
                        <span
                            className="
                                inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                                text-[10px] font-bold tracking-wide mb-2.5
                                bg-indigo-50 text-indigo-600 border border-indigo-200
                                dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30
                            "
                        >
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Memproses
                        </span>

                        <p className="text-[16px] font-bold leading-tight text-slate-800 dark:text-white">
                            AI sedang bekerja
                        </p>
                        <p className="text-[12px] mt-0.5 text-slate-400 dark:text-white/40">
                            Memprediksi kategori {transactionCount} transaksi...
                        </p>

                        {/* bouncing dots */}
                        <div className="flex gap-1.5 mt-3.5">
                            {[0, 1, 2].map((i) => (
                                <span
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full bg-indigo-400 dark:bg-indigo-500"
                                    style={{
                                        animation: `bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
                                    }}
                                />
                            ))}
                        </div>

                        <button
                            disabled
                            className="
                                inline-flex items-center gap-2 mt-3 px-4 py-2.5 rounded-2xl
                                text-[12px] font-bold cursor-not-allowed
                                bg-slate-100 text-slate-300
                                dark:bg-white/5 dark:text-white/25
                            "
                        >
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Sedang berjalan...
                        </button>
                    </div>
                </div>
            </Link>
        );
    }

    /* ── PENDING CONFIRMATION ─────────────────────────────────── */
    if (isPendingConfirmation) {
        return (
            <Link href="/analysis/lab">
                <div
                    className="
                        relative overflow-hidden rounded-[20px] p-[18px] pb-4 mb-6 active:opacity-90
                        bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100
                        dark:from-amber-950/80 dark:via-orange-950/80 dark:to-amber-900/80
                        border border-transparent dark:border-amber-900/50
                    "
                >
                    <div className="relative z-10">
                        {/* tag */}
                        <span
                            className="
                                inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                                text-[10px] font-bold tracking-wide mb-2.5
                                bg-amber-200 text-amber-900
                                dark:bg-black/25 dark:text-amber-200
                            "
                        >
                            <AlertTriangle className="w-3 h-3" />
                            Perlu konfirmasi
                        </span>

                        <p className="text-[16px] font-bold leading-tight text-amber-900 dark:text-white">
                            Hasil siap direview
                        </p>
                        <p className="text-[12px] mt-0.5 text-amber-700 dark:text-amber-200/60">
                            {clusterCount} kategori ditemukan dari {transactionCount} transaksi.
                        </p>

                        {/* alert bar */}
                        <div
                            className="
                                flex items-center gap-2.5 rounded-2xl px-3 py-2.5 mt-3
                                bg-amber-100 dark:bg-black/20
                            "
                        >
                            <span className="relative flex-shrink-0 flex items-center justify-center w-4 h-4">
                                <span className="absolute w-4 h-4 rounded-full bg-amber-400/40 animate-ping" />
                                <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400" />
                            </span>
                            <span className="text-[11px] font-semibold flex-1 text-amber-800 dark:text-amber-200/80">
                                Menunggu persetujuan Anda
                            </span>
                            <span
                                className="
                                    text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex-shrink-0
                                    bg-amber-500 text-white
                                    dark:bg-amber-400 dark:text-amber-950
                                "
                            >
                                {clusterCount} kategori
                            </span>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                            <button
                                className="
                                    inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl
                                    text-[12px] font-bold active:opacity-80
                                    bg-amber-800 text-white
                                    dark:bg-white dark:text-orange-900
                                "
                            >
                                Review sekarang
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                            <div
                                className="
                                    w-8 h-8 rounded-full flex items-center justify-center
                                    bg-amber-200 dark:bg-black/20
                                "
                            >
                                <ArrowRight className="w-4 h-4 text-amber-700 dark:text-white/60" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    /* ── IDLE ─────────────────────────────────────────────────── */
    return (
        <Link href="/analysis/lab">
            {/* gradient-primary sudah define warna — teks tetap putih di kedua mode */}
            <div className="relative overflow-hidden rounded-[20px] p-[18px] pb-4 mb-6 gradient-primary active:opacity-90">
                {/* orb decorations */}
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                <div className="absolute right-10 -bottom-5 w-20 h-20 rounded-full bg-white/5" />

                {/* cluster nodes illustration */}
                <svg
                    className="absolute right-4 top-1/2 -translate-y-1/2 opacity-25"
                    width="72"
                    height="72"
                    viewBox="0 0 72 72"
                    fill="none"
                >
                    <line x1="36" y1="36" x2="8" y2="18" stroke="white" strokeWidth="1" />
                    <line x1="36" y1="36" x2="62" y2="16" stroke="white" strokeWidth="1" />
                    <line x1="36" y1="36" x2="64" y2="50" stroke="white" strokeWidth="1" />
                    <line x1="36" y1="36" x2="18" y2="60" stroke="white" strokeWidth="1" />
                    <circle cx="36" cy="36" r="7" fill="white" fillOpacity="0.6" />
                    <circle cx="8" cy="18" r="4" fill="white" fillOpacity="0.3" />
                    <circle cx="62" cy="16" r="4" fill="white" fillOpacity="0.3" />
                    <circle cx="64" cy="50" r="5" fill="white" fillOpacity="0.4" />
                    <circle cx="18" cy="60" r="4" fill="white" fillOpacity="0.3" />
                </svg>

                <div className="relative z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide bg-white/20 text-white mb-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        AI Lab
                    </span>

                    <p className="text-[16px] font-bold text-white leading-tight">
                        Prediksi Kategori AI
                    </p>
                    <p className="text-[12px] text-white/60 mt-0.5 max-w-[190px]">
                        Tebak kategori transaksi tak berkategori secara otomatis.
                    </p>

                    <div className="flex items-center justify-between mt-3.5">
                        <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-[12px] font-bold bg-white/22 text-white active:bg-white/30">
                            Mulai analisis
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-white/18 flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
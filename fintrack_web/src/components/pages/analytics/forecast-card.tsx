import { Sparkles } from "lucide-react";

export function ForecastCard() {
    return (
        <div className="mx-5 mb-8 bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background border border-emerald-200 dark:border-emerald-900/50 rounded-[1.25rem] p-4 shadow-sm">
            <h3 className="text-[11px] font-bold text-emerald-800 dark:text-emerald-500 uppercase tracking-widest flex items-center gap-1.5 mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Prediksi Bulan Depan (SMA)
            </h3>

            <div className="space-y-3">
                <div className="flex justify-between items-center bg-white/50 dark:bg-black/20 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                    <div className="text-[12px] font-bold text-foreground">☕ Jajan Kopi</div>
                    <div className="text-[13px] font-black text-emerald-700 dark:text-emerald-400 font-mono">Rp 1.02M</div>
                </div>
                <div className="flex justify-between items-center bg-white/50 dark:bg-black/20 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                    <div className="text-[12px] font-bold text-foreground">🚗 Mobilitas</div>
                    <div className="text-[13px] font-black text-emerald-700 dark:text-emerald-400 font-mono">Rp 590K</div>
                </div>
                <div className="flex justify-between items-center bg-white/50 dark:bg-black/20 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                    <div className="text-[12px] font-bold text-foreground">🎮 Hiburan Digital</div>
                    <div className="text-[13px] font-black text-emerald-700 dark:text-emerald-400 font-mono">Rp 450K</div>
                </div>
            </div>
        </div>
    )
}

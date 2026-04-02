import { ChevronLeft, AlertTriangle, Lightbulb, CalendarClock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
    return (
        <div className="pb-6 bg-background min-h-dvh">
            <div className="bg-background px-5 pt-8 pb-4 sticky top-0 z-30 border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/home" className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center border border-border/50 active:bg-muted transition-colors">
                        <ChevronLeft className="w-5 h-5 text-foreground" />
                    </Link>
                    <h2 className="text-[20px] font-black tracking-tight">Notifikasi</h2>
                </div>
                <Button variant="ghost" className="h-8 px-3 text-[11px] text-emerald-600 dark:text-emerald-500 font-bold hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                    Tandai Dibaca
                </Button>
            </div>

            <div className="px-5 pt-6">
                <h3 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest pl-1 mb-4">Hari Ini</h3>
                <div className="space-y-4 mb-8">
                    <div className="flex gap-4 p-4.5 bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl border border-amber-200/60 dark:border-amber-900/50 relative overflow-hidden group shadow-sm">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 dark:bg-amber-500" />
                        <div className="w-11 h-11 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-500 flex-shrink-0 shadow-sm border border-amber-200 dark:border-amber-800">
                            <AlertTriangle className="w-[22px] h-[22px]" strokeWidth={2.5} />
                        </div>
                        <div className="flex-1 mt-0.5">
                            <div className="flex justify-between items-start mb-1.5">
                                <h4 className="text-[14px] font-bold text-foreground leading-tight">Budget "Makanan" Kritis!</h4>
                                <span className="text-[10px] text-amber-600 dark:text-amber-500 font-bold">12:30</span>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-relaxed">Anda sudah menggunakan 95% dari target anggaran Rp 1.500.000 untuk bulan ini.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-background rounded-2xl border border-border/60 shadow-sm">
                        <div className="w-11 h-11 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-sm border border-emerald-100 dark:border-emerald-800/50">
                            <Lightbulb className="w-[22px] h-[22px]" />
                        </div>
                        <div className="flex-1 mt-0.5">
                            <div className="flex justify-between items-start mb-1.5">
                                <h4 className="text-[14px] font-bold text-foreground leading-tight">Insight AI Mingguan</h4>
                                <span className="text-[10px] text-muted-foreground font-semibold">09:00</span>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-relaxed">Pengeluaran "Jajan Kopi" Anda turun 15% minggu ini. Pertahankan tren positif ini!</p>
                        </div>
                    </div>
                </div>

                <h3 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest pl-1 mb-4">Kemarin</h3>
                <div className="space-y-4">
                    <div className="flex gap-4 p-4 bg-background rounded-2xl border border-border/60 shadow-sm">
                        <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm border border-blue-100 dark:border-blue-800/50">
                            <CalendarClock className="w-[22px] h-[22px]" />
                        </div>
                        <div className="flex-1 mt-0.5">
                            <div className="flex justify-between items-start mb-1.5">
                                <h4 className="text-[14px] font-bold text-foreground leading-tight">Catatan Transaksi</h4>
                                <span className="text-[10px] text-muted-foreground font-semibold">Mar 9</span>
                            </div>
                            <p className="text-[12px] text-muted-foreground leading-relaxed">Ada pengeluaran hari ini? Jangan lupa luangkan waktu 1 menit untuk mencatatnya.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

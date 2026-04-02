import { ChevronLeft, Check, Sparkles, Tag } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ClusterConfirmPage() {
    return (
        <div className="pb-6 bg-muted/20 min-h-dvh">
            {/* Header */}
            <div className="bg-[#064e3b] px-5 pt-10 pb-20 text-white relative rounded-b-[2rem] shadow-sm">
                <div className="absolute top-10 right-0 w-32 h-32 rounded-full bg-[#10b981]/20 blur-xl" />

                <div className="flex items-center gap-3.5 relative z-10 mb-5">
                    <Link href="/home" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 active:bg-white/20 transition-colors">
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </Link>
                    <div>
                        <h2 className="text-[20px] font-black tracking-tight leading-tight">Konfirmasi Klaster AI</h2>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            <p className="text-[10px] text-[#6ee7b7] font-bold tracking-wide">Silhouette Score: 0.85 (Sangat Baik)</p>
                        </div>
                    </div>
                </div>

                <p className="text-[12px] text-emerald-50 leading-relaxed max-w-[90%] relative z-10 font-medium">
                    AI menemukan <strong>4 pola pengeluaran baru</strong> dari 145 transaksi yang diimpor. Beri nama untuk setiap kelompok yang disarankan.
                </p>
            </div>

            <div className="px-5 -mt-12 relative z-20 space-y-4">
                {/* Cluster 1 */}
                <div className="bg-background rounded-[1.5rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-border/60">
                    <div className="flex justify-between items-center mb-4 border-b border-border/50 pb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-[15px] text-emerald-600 font-black border border-emerald-200">
                                1
                            </div>
                            <div>
                                <h3 className="text-[13px] font-bold text-foreground">Kelompok 1</h3>
                                <p className="text-[10px] text-muted-foreground font-semibold">14 Transaksi &bull; Rp 850Rb</p>
                            </div>
                        </div>
                        <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md font-bold border border-emerald-200 shadow-sm">Super Mirip</span>
                    </div>

                    <div className="mb-5 bg-muted/40 rounded-xl p-3 border border-border/60">
                        <p className="text-[9px] font-extrabold text-muted-foreground tracking-widest uppercase mb-2 pl-1">Item Teratas:</p>
                        <div className="flex flex-wrap gap-1.5">
                            <span className="text-[11px] bg-background border border-border/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] px-3 py-1.5 rounded-full font-bold">Starbucks</span>
                            <span className="text-[11px] bg-background border border-border/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] px-3 py-1.5 rounded-full font-bold">Kopi Kulo</span>
                            <span className="text-[11px] bg-background border border-border/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] px-3 py-1.5 rounded-full font-bold">Janji Jiwa</span>
                            <span className="text-[11px] text-muted-foreground bg-muted border border-border/50 px-2 py-1.5 rounded-full font-semibold">+11</span>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-extrabold text-muted-foreground tracking-widest uppercase mb-2.5 block pl-1">Nama Kategori</label>
                        <div className="relative">
                            <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
                            <Input
                                type="text"
                                defaultValue="Jajan Kopi"
                                className="w-full h-12 bg-emerald-50/50 dark:bg-emerald-950/20 border-2 border-emerald-500/40 rounded-xl pl-10 pr-4 text-[13px] font-bold text-emerald-800 dark:text-emerald-400 focus-visible:ring-emerald-500/50 transition-all shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Cluster 2 */}
                <div className="bg-background rounded-[1.5rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-border/60">
                    <div className="flex justify-between items-center mb-4 border-b border-border/50 pb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-[15px] text-amber-600 font-black border border-amber-200">
                                2
                            </div>
                            <div>
                                <h3 className="text-[13px] font-bold text-foreground">Kelompok 2</h3>
                                <p className="text-[10px] text-muted-foreground font-semibold">8 Transaksi &bull; Rp 420Rb</p>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5 bg-muted/40 rounded-xl p-3 border border-border/60">
                        <div className="flex flex-wrap gap-1.5">
                            <span className="text-[11px] bg-background border border-border/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] px-3 py-1.5 rounded-full font-bold">Grab Bike</span>
                            <span className="text-[11px] bg-background border border-border/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] px-3 py-1.5 rounded-full font-bold">Gojek</span>
                            <span className="text-[11px] bg-background border border-border/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] px-3 py-1.5 rounded-full font-bold">Shell V-Power</span>
                        </div>
                    </div>
                    <div>
                        <div className="relative">
                            <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Ketik nama kategori..."
                                className="w-full h-12 bg-muted/30 border-border/60 rounded-xl pl-10 pr-4 text-[13px] font-semibold text-foreground focus-visible:ring-emerald-500/40 transition-shadow"
                            />
                        </div>
                    </div>
                </div>

                <Button asChild className="w-full mt-2 h-14 rounded-2xl bg-[#064e3b] hover:bg-[#047857] text-white font-bold transition-all shadow-[0_4px_14px_rgba(6,78,59,0.3)] flex items-center justify-center gap-2 mb-8">
                    <Link href="/analytics">
                        <Check className="w-[18px] h-[18px]" strokeWidth={3} />
                        <span className="text-[14px] tracking-wide">Konfirmasi & Simpan</span>
                    </Link>
                </Button>
            </div>
        </div>
    )
}

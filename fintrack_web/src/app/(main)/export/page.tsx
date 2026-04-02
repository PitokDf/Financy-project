import { ChevronLeft, FileSpreadsheet, FileText, Download } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ExportPage() {
    return (
        <div className="pb-6 bg-muted/20 min-h-dvh">
            <div className="bg-[#064e3b] px-5 pt-10 pb-20 text-white relative rounded-b-[2rem] shadow-sm">
                <div className="absolute top-10 right-0 w-32 h-32 rounded-full bg-[#10b981]/20 blur-xl" />
                <div className="flex items-center gap-4 relative z-10 mb-2">
                    <Link href="/home" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 active:bg-white/20 transition-colors">
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </Link>
                    <h2 className="text-[20px] font-black tracking-tight">Ekspor Laporan</h2>
                </div>
            </div>

            <Card className="mx-5 -mt-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-border/60 relative z-20">
                <CardContent className="p-5">
                    <h3 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest pl-1 mb-4">Format Dokumen</h3>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                        <div className="border-[1.5px] border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl p-4 flex flex-col justify-center gap-3.5 relative overflow-hidden cursor-pointer shadow-sm">
                            <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-bl-[1.5rem]" />
                            <FileSpreadsheet className="w-6 h-6 text-emerald-600 relative z-10" />
                            <div>
                                <h4 className="text-[13px] font-bold text-emerald-800 dark:text-emerald-400">CSV Excel</h4>
                                <p className="text-[10px] text-emerald-600/70 dark:text-emerald-500/60 font-semibold mt-0.5">Bisa diedit (Mentah)</p>
                            </div>
                        </div>
                        <div className="border border-border/60 bg-background rounded-2xl p-4 flex flex-col justify-center gap-3.5 hover:border-border cursor-pointer transition-colors shadow-sm">
                            <FileText className="w-6 h-6 text-muted-foreground" />
                            <div>
                                <h4 className="text-[13px] font-bold text-foreground">PDF</h4>
                                <p className="text-[10px] text-muted-foreground font-semibold mt-0.5">Siap cetak & Rapih</p>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest pl-1 mb-3">Pilih Periode</h3>
                    <Select defaultValue="this-month">
                        <SelectTrigger className="w-full bg-muted/40 border-border/60 rounded-2xl p-4 h-14 text-[13px] font-bold text-foreground focus:ring-emerald-500/30 mb-8">
                            <SelectValue placeholder="Pilih Periode" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="this-month" className="text-[13px] font-semibold py-2">Bulan Ini (Maret 2025)</SelectItem>
                            <SelectItem value="last-month" className="text-[13px] font-semibold py-2">Bulan Lalu (Feb 2025)</SelectItem>
                            <SelectItem value="q1" className="text-[13px] font-semibold py-2">Kuartal 1 2025</SelectItem>
                            <SelectItem value="all" className="text-[13px] font-semibold py-2">Semua Transaksi</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/50 rounded-2xl p-4 mb-6 flex gap-3.5">
                        <span className="text-lg pb-1 text-center align-top">💡</span>
                        <p className="text-[11px] text-amber-800 dark:text-amber-500 font-medium leading-relaxed pr-2">
                            Data yang diekspor mencakup semua transaksi, <strong>kategori cerdas hasil AI clustering</strong>, dan catatan tambahan dalam periode terkait.
                        </p>
                    </div>

                    <Button className="w-full h-14 rounded-2xl bg-[#064e3b] hover:bg-[#047857] text-emerald-50 font-bold transition-all shadow-md text-[13px] gap-2">
                        <Download className="w-[18px] h-[18px]" strokeWidth={2.5} />
                        Download Laporan
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

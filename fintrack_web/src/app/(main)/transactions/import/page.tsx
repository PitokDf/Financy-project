import { ChevronLeft, Upload, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export default function ImportCsvPage() {
    return (
        <div className="pb-6 bg-background min-h-dvh">
            {/* Header */}
            <div className="bg-background px-5 pt-8 pb-4 sticky top-0 z-30 border-b border-border/50 flex items-center gap-4">
                <Link href="/home" className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center border border-border/50 active:bg-muted transition-colors">
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                </Link>
                <h2 className="text-[20px] font-black tracking-tight">Impor CSV</h2>
            </div>

            <div className="px-5 mt-6">
                {/* Upload Zone */}
                <div className="border-[1.5px] border-dashed border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-emerald-900/40 flex items-center justify-center mb-4 text-emerald-600 shadow-sm border border-emerald-100 dark:border-emerald-800">
                        <Upload className="w-7 h-7" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-[15px] font-extrabold text-foreground mb-1.5">Upload File Mutasi</h3>
                    <p className="text-[11px] text-muted-foreground font-medium px-4 leading-relaxed">
                        Format didukung: BCA, Mandiri, BNI, GoPay, OVO. Maksimal ukuran file 5MB.
                    </p>
                    <Button className="mt-5 rounded-full bg-[#064e3b] text-white font-bold shadow-md px-6">
                        Pilih File CSV
                    </Button>
                </div>

                {/* Simulated File State */}
                <Card className="mt-6 rounded-[1.25rem] border-border/60 shadow-sm overflow-hidden bg-muted/20">
                    <CardContent className="p-4 flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 shadow-sm">
                            <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-bold text-foreground truncate">mutasi_bca_maret.csv</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5 font-semibold">2.4 MB &bull; 145 Baris Data</p>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    </CardContent>
                </Card>

                {/* Mapping */}
                <div className="mt-8">
                    <h3 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest mb-3 pl-1">Mapping Kolom Data</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-2 pl-3.5 bg-background border border-border/60 rounded-[14px] shadow-sm">
                            <span className="text-[13px] font-bold w-24">Tanggal</span>
                            <span className="text-muted-foreground text-sm opacity-50 mr-2">➡️</span>
                            <Select defaultValue="date">
                                <SelectTrigger className="flex-1 bg-muted/50 border-none rounded-xl text-[12px] font-bold outline-none focus:ring-emerald-500">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="date" className="text-[12px] font-semibold py-2">Date / Tanggal</SelectItem>
                                    <SelectItem value="amount" className="text-[12px] font-semibold py-2">Amount</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center justify-between p-2 pl-3.5 bg-background border border-border/60 rounded-[14px] shadow-sm">
                            <span className="text-[13px] font-bold w-24">Nominal</span>
                            <span className="text-muted-foreground text-sm opacity-50 mr-2">➡️</span>
                            <Select defaultValue="amount">
                                <SelectTrigger className="flex-1 bg-muted/50 border-none rounded-xl text-[12px] font-bold outline-none focus:ring-emerald-500">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="date" className="text-[12px] font-semibold py-2">Date / Tanggal</SelectItem>
                                    <SelectItem value="amount" className="text-[12px] font-semibold py-2">Amount / Nominal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center justify-between p-2 pl-3.5 bg-background border border-border/60 rounded-[14px] shadow-sm">
                            <span className="text-[13px] font-bold w-24">Deskripsi</span>
                            <span className="text-muted-foreground text-sm opacity-50 mr-2">➡️</span>
                            <Select defaultValue="desc">
                                <SelectTrigger className="flex-1 bg-muted/50 border-none rounded-xl text-[12px] font-bold outline-none focus:ring-emerald-500">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="desc" className="text-[12px] font-semibold py-2">Description / Note</SelectItem>
                                    <SelectItem value="cat" className="text-[12px] font-semibold py-2">Category (Optional)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <Button asChild className="w-full mt-8 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-[0_4px_14px_rgba(16,185,129,0.3)] transition-all flex justify-between items-center group px-5">
                    <Link href="/clusters/loading">
                        <span>Mulai Proses Impor</span>
                        <span className="bg-white/20 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide group-hover:bg-white/30 transition-colors">145 Data</span>
                    </Link>
                </Button>
            </div>
        </div>
    )
}

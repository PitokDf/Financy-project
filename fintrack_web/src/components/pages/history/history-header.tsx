import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function HistoryHeader() {
    return (
        <div className="bg-background px-5 pt-8 pb-4 sticky top-0 z-30 border-b border-border/50 shadow-sm">
            <h2 className="text-[22px] font-black tracking-tight mb-4">Riwayat Transaksi</h2>
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Cari transaksi, kategori, atau catatan..."
                    className="w-full bg-muted/50 border-border/60 rounded-[14px] pl-11 pr-4 h-12 text-[13px] font-medium placeholder:text-muted-foreground/60 focus-visible:ring-emerald-500/30 transition-shadow transition-all"
                />
            </div>
        </div>
    )
}

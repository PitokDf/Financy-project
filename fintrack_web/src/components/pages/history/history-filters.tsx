export function HistoryFilters() {
    return (
        <div className="flex overflow-x-auto hide-scrollbar gap-2 px-5 py-3 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-[138px] z-20">
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-sm ring-2 ring-emerald-600 ring-offset-1 dark:ring-offset-background transition-all">
                Semua
            </button>
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-muted/50 border border-border text-muted-foreground text-[11px] font-semibold hover:bg-muted transition-all">
                Pengeluaran
            </button>
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-muted/50 border border-border text-muted-foreground text-[11px] font-semibold hover:bg-muted transition-all">
                Pemasukan
            </button>
            <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-muted/50 border border-border text-muted-foreground text-[11px] font-semibold hover:bg-muted transition-all">
                Bulan Ini
            </button>
        </div>
    )
}

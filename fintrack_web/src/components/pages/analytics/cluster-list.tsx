import { cn } from "@/lib/utils";

const clusters = [
    { name: "Jajan Kopi", desc: "Starbucks, Janji Jiwa, Kopi Kenangan...", pct: 43, amount: 960000, color: "bg-[#10b981]" },
    { name: "Mobilitas", desc: "Grab, Gojek, Bensin...", pct: 29, amount: 620000, color: "bg-[#34d399]" },
    { name: "Hiburan Digital", desc: "Netflix, Spotify, Game...", pct: 22, amount: 480000, color: "bg-[#fbbf24]" },
    { name: "Buku & Kuliah", desc: "Buku, Print, ATK...", pct: 14, amount: 310000, color: "bg-[#60a5fa]" },
]

export function ClusterList() {
    return (
        <div className="px-5 space-y-2 mt-4 mb-6">
            {clusters.map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 bg-muted/40 rounded-xl border border-border/50 shadow-sm transition-all hover:bg-muted/60">
                    <div className={cn("w-2.5 h-2.5 rounded-full flex-shrink-0", c.color)} />
                    <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-foreground truncate">{c.name}</p>
                        <p className="text-[9px] text-muted-foreground truncate mt-0.5">{c.desc}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <p className="text-[12px] font-black text-muted-foreground font-mono">{c.pct}%</p>
                        <p className="text-[10px] text-muted-foreground/70 font-mono mt-0.5">Rp {(c.amount / 1000).toFixed(0)}rb</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

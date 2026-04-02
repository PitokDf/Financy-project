import { Plus, Coffee, Utensils, Car, Gamepad2, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const budgets = [
    { icon: Coffee, name: 'Jajan Kopi', spent: 960000, total: 1000000, color: 'bg-rose-500', bg: 'bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-500' },
    { icon: Utensils, name: 'Makanan', spent: 680000, total: 900000, color: 'bg-amber-500', bg: 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-500' },
    { icon: Car, name: 'Transportasi', spent: 200000, total: 500000, color: 'bg-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-500' },
    { icon: Gamepad2, name: 'Hiburan', spent: 480000, total: 1000000, color: 'bg-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-500' },
    { icon: CreditCard, name: 'Cicilan/Tagihan', spent: 420000, total: 820000, color: 'bg-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-500' },
];

export function BudgetList() {
    return (
        <div className="px-5 mt-7 mb-8">
            <h3 className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-widest pl-1 mb-4">Detail Kategori</h3>

            <div className="space-y-4">
                {budgets.map((b, i) => {
                    const Icon = b.icon;
                    const pct = Math.min(100, (b.spent / b.total) * 100);
                    return (
                        <Card key={i} className="rounded-2xl border-border/50 shadow-sm relative overflow-hidden group hover:border-border transition-colors">
                            <CardContent className="p-4">
                                {/* Card Glow */}
                                <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full ${b.bg} blur-2xl opacity-50`} />

                                <div className="flex justify-between items-center mb-3 relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-[14px] ${b.bg} flex items-center justify-center shadow-sm border border-border/10`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[14px] font-bold text-foreground leading-tight">{b.name}</p>
                                            <p className="text-[10px] text-muted-foreground font-semibold mt-0.5">{pct.toFixed(0)}% Terpakai</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[14px] font-black font-mono text-foreground leading-none">{(b.spent / 1000).toFixed(0)}rb</p>
                                        <p className="text-[10px] text-muted-foreground font-mono mt-1 font-semibold">Sisa {((b.total - b.spent) / 1000).toFixed(0)}rb</p>
                                    </div>
                                </div>

                                <div className="w-full h-[6px] bg-muted/70 rounded-full overflow-hidden relative z-10">
                                    <div className={`h-full rounded-full transition-all duration-700 ease-out ${b.color}`} style={{ width: `${pct}%` }} />
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Add New Budget */}
            <Button variant="outline" className="w-full mt-5 h-14 border-[1.5px] border-dashed border-emerald-500/30 rounded-2xl text-emerald-600 dark:text-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 font-bold hover:bg-emerald-100/40 transition-colors">
                <Plus className="w-4 h-4 text-emerald-500 mr-1.5" strokeWidth={3} />
                <span className="text-[13px] tracking-wide">Tambah Target Baru</span>
            </Button>
        </div>
    )
}

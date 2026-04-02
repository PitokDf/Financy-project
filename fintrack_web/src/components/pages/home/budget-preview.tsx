import Link from "next/link";
import { cn } from "@/lib/utils";
import { Utensils, Coffee, Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BudgetItemProps {
    name: string;
    icon: React.ElementType;
    iconColor: string;
    spent: number;
    total: number;
    colorClass: string;
}

function BudgetItem({ name, icon: Icon, iconColor, spent, total, colorClass }: BudgetItemProps) {
    const percentage = Math.min(100, (spent / total) * 100);

    return (
        <div className="mb-3.5">
            <div className="flex justify-between items-center mb-1.5">
                <div className="text-[11px] font-semibold text-foreground flex items-center gap-2">
                    <Icon className={cn("w-3.5 h-3.5", iconColor)} /> {name}
                </div>
                <div className="text-[10px] text-muted-foreground font-mono font-medium">
                    Rp {(spent / 1000).toFixed(0)}rb / {(total / 1000).toFixed(0)}rb
                </div>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                    className={cn("h-full rounded-full transition-all duration-500", colorClass)}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}

export function BudgetPreview() {
    return (
        <Card className="border-border/60 shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                <div>
                    <CardTitle className="text-lg font-bold tracking-tight">Budget Aktif</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">Pantau target anggaran yang sedang berjalan.</p>
                </div>
                <Link href="/budget" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
                    Lihat semua
                </Link>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                    <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                        <p className="text-xs font-semibold text-muted-foreground">Kategori aman</p>
                        <p className="mt-1 text-2xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">3</p>
                        <p className="mt-1 text-sm text-muted-foreground">Budget masih di bawah batas aman.</p>
                    </div>
                    <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                        <p className="text-xs font-semibold text-muted-foreground">Kategori waspada</p>
                        <p className="mt-1 text-2xl font-black tracking-tight text-amber-600 dark:text-amber-400">2</p>
                        <p className="mt-1 text-sm text-muted-foreground">Perlu perhatian pada pengeluaran bulan ini.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <BudgetItem name="Makanan" icon={Utensils} iconColor="text-amber-500" spent={680000} total={900000} colorClass="bg-amber-400" />
                    <BudgetItem name="Transportasi" icon={Car} iconColor="text-emerald-500" spent={200000} total={500000} colorClass="bg-emerald-500" />
                    <BudgetItem name="Jajan Kopi" icon={Coffee} iconColor="text-rose-500" spent={290000} total={300000} colorClass="bg-rose-400" />
                </div>
            </CardContent>
        </Card>
    )
}

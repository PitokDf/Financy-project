import Link from "next/link";
import { cn } from "@/lib/utils";
import { Coffee, BriefcaseBusiness, Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Transaction {
    id: string;
    name: string;
    category: string;
    date: string;
    amount: number;
    type: 'income' | 'expense';
    icon: React.ElementType;
    bgColor: string;
    iconColor: string;
}

const recentTransactions: Transaction[] = [
    { id: '1', name: 'Kopi Kenangan', category: 'Jajan Kopi', date: 'Hari ini', amount: 32000, type: 'expense', icon: Coffee, bgColor: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-500' },
    { id: '2', name: 'Gaji Maret', category: 'Pemasukan', date: '1 Mar', amount: 7500000, type: 'income', icon: BriefcaseBusiness, bgColor: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-500' },
    { id: '3', name: 'Grab ke kampus', category: 'Transportasi', date: 'Kemarin', amount: 18000, type: 'expense', icon: Car, bgColor: 'bg-rose-100 dark:bg-rose-900/30', iconColor: 'text-rose-600 dark:text-rose-500' },
];

export function TransactionList() {
    return (
        <Card className="border-border/60 shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                <div>
                    <CardTitle className="text-lg font-bold tracking-tight">Transaksi Terbaru</CardTitle>
                    <p className="mt-1 text-sm text-muted-foreground">Aktivitas keuangan paling baru dari akun Anda.</p>
                </div>
                <Link href="/history" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
                    Semua
                </Link>
            </CardHeader>

            <CardContent>
                <div className="space-y-0">
                    {recentTransactions.map((t, i) => {
                        const Icon = t.icon;
                        return (
                            <div key={t.id} className={cn(
                                "flex items-center gap-3 py-3.5",
                                i !== recentTransactions.length - 1 && "border-b border-border/50"
                            )}>
                                <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm", t.bgColor)}>
                                    <Icon className={cn("w-5 h-5", t.iconColor)} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-[13px] font-bold text-foreground truncate leading-tight">{t.name}</p>
                                        <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">{t.date}</span>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground mt-1 truncate font-medium">{t.category}</p>
                                </div>
                                <div className={cn(
                                    "text-[13px] font-bold font-mono tracking-tight whitespace-nowrap",
                                    t.type === 'income' ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"
                                )}>
                                    {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString('id-ID')}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}

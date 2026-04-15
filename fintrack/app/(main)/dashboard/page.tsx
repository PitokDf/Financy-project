'use client';

import {
    TrendingUp,
    TrendingDown,
    Wallet,
    ChevronRight,
    Plus,
    Flame,
    Trophy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn, formatCurrency } from '@/lib/utils';
import { useGamification } from '@/hooks/use-gamification';
import { TransactionCard } from '@/components/shared/transaction-card';
import { useTransactions } from '@/hooks/use-transactions';

import { useDashboard } from '@/hooks/use-dashboard';
import { isToday } from 'date-fns';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import DashboardSkeleton from './_components/skeleton';

export default function DashboardPage() {
    const { stats } = useGamification();
    const { transactions } = useTransactions();
    const { data: dashboardData, isLoading } = useDashboard();

    if (isLoading || !dashboardData) return <DashboardSkeleton />


    const lastTx = stats?.lastTransactionAt ? new Date(stats.lastTransactionAt) : null;
    const isAtRisk = (stats?.streak || 0) > 0 && (!lastTx || !isToday(lastTx));

    const summary = dashboardData?.summary || {
        totalBalance: 0,
        monthlyIncome: 0,
        monthlyExpense: 0,
        savingsRate: 0,
    };

    const categories = dashboardData?.topCategories || [];

    return (
        <div className="animate-fade-in text-foreground">
            <div className="mb-5">
                <div className="flex items-center justify-end gap-1 mb-4">
                    <Link href="/achievements" className="p-2 text-amber-500 hover:bg-amber-500/10 rounded-xl transition-colors mr-1">
                        <Trophy className="w-5 h-5" />
                    </Link>
                    <div className={cn(
                        "flex items-center gap-2 rounded-2xl px-3 py-1.5 border transition-all duration-500",
                        isAtRisk
                            ? "bg-gray-500/10 border-gray-200 dark:border-gray-900/50"
                            : "bg-muted/50 border-border/50"
                    )}>
                        <Flame className={cn(
                            "w-3.5 h-3.5 transition-colors",
                            isAtRisk ? "text-gray-500 fill-gray-500" : "text-amber-500 fill-amber-500"
                        )} />
                        <span className={cn(
                            "text-xs font-bold transition-colors",
                            isAtRisk ? "text-gray-600 dark:text-gray-400" : "text-foreground"
                        )}>
                            {stats?.streak || 0} Hari
                        </span>
                    </div>
                </div>

                <div className="gradient-primary rounded-2xl p-5 relative overflow-hidden shadow-lg shadow-primary/20">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1">
                            <Wallet className="w-4 h-4 text-white/80" />
                            <p className="text-white/80 text-xs font-medium">Saldo Total</p>
                        </div>
                        <p className="text-3xl font-black text-white mb-4">
                            {formatCurrency(summary.totalBalance)}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/15 rounded-xl p-3 backdrop-blur-sm">
                                <div className="flex items-center gap-1 mb-1">
                                    <TrendingUp className="w-3 h-3 text-white/70" />
                                    <p className="text-white/70 text-[10px] font-medium">Pemasukan</p>
                                </div>
                                <p className="text-white font-bold text-sm">{formatCurrency(summary.monthlyIncome)}</p>
                            </div>
                            <div className="bg-white/15 rounded-xl p-3 backdrop-blur-sm">
                                <div className="flex items-center gap-1 mb-1">
                                    <TrendingDown className="wDashboardSkeleton-3 h-3 text-white/70" />
                                    <p className="text-white/70 text-[10px] font-medium">Pengeluaran</p>
                                </div>
                                <p className="text-white font-bold text-sm">{formatCurrency(summary.monthlyExpense)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {dashboardData?.forecast && (
                <div className="mb-5 bg-linear-to-r from-indigo-500 to-purple-600 rounded-2xl p-4 shadow-lg shadow-indigo-500/20 text-white relative overflow-hidden">
                    <div className="absolute -top-4 -right-4 opacity-10">
                        <TrendingUp className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">AI Forecast</span>
                        </div>
                        <p className="text-2xl font-black mb-1 drop-shadow-sm tabular-nums tracking-tight">
                            {formatCurrency(dashboardData.forecast.predictedAmount)}
                        </p>
                        <p className="text-xs text-indigo-100 font-medium leading-snug">
                            Prediksi pengeluaran di kategori <strong className="text-white">{dashboardData.forecast.categoryName}</strong> bulan depan.
                        </p>
                    </div>
                </div>
            )}

            <div className=" pt-4 mb-5">
                <div className="flex items-center justify-between mb-3">
                    <div className='flex gap-1 justify-center'>
                        <h3 className="font-bold text-foreground">Kategori Teratas</h3>
                        <InfoTooltip
                            content={
                                <p className='flex-1 max-w-dvw'>Kategori teratas adalah kategori dengan pengeluaran terbanyak di bulan ini.</p>
                            }
                        />
                    </div>
                    <Link href="/analysis" className="text-xs text-primary font-semibold flex items-center gap-0.5">
                        Selengkapnya <ChevronRight className="w-3 h-3" />
                    </Link>
                </div>
                <div className="space-y-2.5">
                    {categories.length === 0 ? <p className="text-xs text-muted-foreground">Belum ada pengeluaran di bulan ini.</p> : categories.map((cat) => (
                        <div key={cat.name} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: cat.color + '20' }}>
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-foreground">{cat.name}</span>
                                    <span className="text-xs font-bold text-foreground">{formatCurrency(cat.amount)}</span>
                                </div>
                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-700"
                                        style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                                    />
                                </div>
                            </div>
                            <span className="text-xs text-muted-foreground w-8 text-right shrink-0">{cat.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pb-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-foreground">Transaksi Terbaru</h3>
                    <Link href="/transactions" className="text-xs text-primary font-semibold flex items-center gap-0.5">
                        Lihat semua <ChevronRight className="w-3 h-3" />
                    </Link>
                </div>
                <div className="space-y-2">
                    {transactions.slice(0, 4).map((tx) => (
                        <TransactionCard
                            key={tx.id}
                            id={tx.id}
                            description={tx.description}
                            amount={tx.amount}
                            type={tx.type}
                            date={tx.date}
                            category={tx.category}
                            categoryColor={tx.categoryColor}
                        />
                    ))}
                </div>
            </div>

            <div className="fixed bottom-24 right-4 z-30">
                <Link href="/transactions?action=add">
                    <Button
                        size="icon"
                        className="w-14 h-14 rounded-2xl shadow-lg shadow-primary/30 gradient-primary border-0 hover:opacity-90 transition-opacity"
                        style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                        aria-label="Tambah transaksi"
                    >
                        <Plus className="w-6 h-6 text-white" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}

'use client';

import {
    TrendingUp,
    TrendingDown,
    Wallet,
    ChevronRight,
    Plus,
    Flame,
    Trophy,
    EyeOff,
    Eye,
    Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn, formatCurrencyWithSecure } from '@/lib/utils';
import { useGamification } from '@/hooks/use-gamification';
import { TransactionCard } from '@/components/shared/transaction-card';
import { useTransactions } from '@/hooks/use-transactions';

import { useDashboard } from '@/hooks/use-dashboard';
import { isToday } from 'date-fns';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import DashboardSkeleton from './_components/skeleton';
import { useSecureMode } from '@/hooks/use-secure';
import { VoiceTransactionButton } from '@/components/shared/voice-transaction-button';
import { useState } from 'react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

export default function DashboardPage() {
    const { stats } = useGamification();
    const { transactions, deleteTransaction } = useTransactions();
    const { data: dashboardData, isLoading } = useDashboard();
    const { isSecure, toggle } = useSecureMode()
    const [idToDelete, setIdToDelete] = useState<string | undefined>(undefined)

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
                    <Link href="/achievements" className="p-2 text-amber-500 hover:bg-amber-500/10 rounded-xl transition-all hover:scale-105 active:scale-95 mr-1 bg-amber-500/5 border border-amber-500/20 shadow-sm shadow-amber-500/10">
                        <Trophy className="w-4 h-4 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                    </Link>
                    <div className={cn(
                        "flex items-center gap-2 rounded-2xl px-3.5 py-1.5 border transition-all duration-500",
                        isAtRisk
                            ? "bg-gray-500/10 border-gray-200 dark:border-gray-800"
                            : "bg-orange-500/10 border-orange-200/50 dark:bg-orange-500/10 dark:border-orange-500/30 shadow-sm shadow-orange-500/20"
                    )}>
                        <Flame className={cn(
                            "w-4 h-4 transition-colors",
                            isAtRisk ? "text-gray-500 fill-gray-500" : "text-orange-500 fill-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse"
                        )} />
                        <span className={cn(
                            "text-sm font-black transition-colors",
                            isAtRisk ? "text-gray-600 dark:text-gray-400" : "text-orange-600 dark:text-orange-400"
                        )}>
                            {stats?.streak || 0} <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">Hari</span>
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
                        <p className="text-3xl font-black text-white flex items-center justify-between gap-2 mb-4">
                            {formatCurrencyWithSecure(summary.totalBalance, isSecure)}
                            <button className='text-sm font-medium' onClick={() => toggle()}>
                                {isSecure ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                            </button>
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/15 rounded-xl p-3 backdrop-blur-sm">
                                <div className="flex items-center gap-1 mb-1">
                                    <TrendingUp className="w-3 h-3 text-white/70" />
                                    <p className="text-white/70 text-[10px] font-medium">Pemasukan</p>
                                </div>
                                <p className="text-white font-bold text-sm">{formatCurrencyWithSecure(summary.monthlyIncome, isSecure)}</p>
                            </div>
                            <div className="bg-white/15 rounded-xl p-3 backdrop-blur-sm">
                                <div className="flex items-center gap-1 mb-1">
                                    <TrendingDown className="wDashboardSkeleton-3 h-3 text-white/70" />
                                    <p className="text-white/70 text-[10px] font-medium">Pengeluaran</p>
                                </div>
                                <p className="text-white font-bold text-sm">{formatCurrencyWithSecure(summary.monthlyExpense, isSecure)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {dashboardData?.topForecasts && dashboardData.topForecasts.length > 0 && (
                <div className="mb-5 bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl p-5 shadow-xl shadow-indigo-500/20 text-white relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <TrendingUp className="w-40 h-40" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                                    <TrendingUp className="w-4 h-4 text-white" />
                                </div>
                                <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">AI Forecast Ranking</span>
                            </div>
                            <InfoTooltip
                                triggerClassName='text-white'
                                content={
                                    <p className='text-xs'>Prediksi 3 kategori pengeluaran terbesar untuk bulan depan menggunakan algoritma SMA (Simple Moving Average).</p>
                                }
                            />
                        </div>

                        <div className="space-y-4">
                            {dashboardData.topForecasts.map((f, index) => (
                                <div key={f.categoryName} className="flex items-center justify-between group/item">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2 backdrop-blur-sm",
                                            index === 0 ? "bg-amber-400 border-amber-300 text-amber-900 shadow-lg shadow-amber-400/30" :
                                                index === 1 ? "bg-slate-300 border-slate-200 text-slate-800" :
                                                    "bg-orange-400/50 border-orange-300 text-orange-950"
                                        )}>
                                            {f.rank}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold leading-none mb-1">{f.categoryName}</p>
                                            <p className="text-[10px] text-white/70 font-medium italic">Estimasi bulan depan</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-base font-black tracking-tight tabular-nums">
                                            {formatCurrencyWithSecure(f.predictedAmount, isSecure)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                                    <span className="text-xs font-bold text-foreground">{formatCurrencyWithSecure(cat.amount, isSecure)}</span>
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
                    {transactions.length === 0 ? (
                        <div className="text-center text-muted-foreground py-4">
                            <p>Belum ada transaksi</p>
                        </div>
                    ) :
                        transactions.slice(0, 4).map((tx) => (
                            <TransactionCard
                                key={tx.id}
                                id={tx.id}
                                description={tx.description}
                                amount={tx.amount}
                                type={tx.type}
                                date={tx.date}
                                category={tx.category}
                                categoryColor={tx.categoryColor}
                                onDelete={setIdToDelete}
                            />
                        ))}
                </div>
            </div>

            <div className="fixed bottom-24 right-4 z-30 flex flex-col items-end gap-3">
                <VoiceTransactionButton />
                <Link href="/transactions?action=add">
                    <Button
                        size="icon"
                        className="w-12 h-12 rounded-2xl shadow-lg shadow-primary/30 gradient-primary border-0 hover:opacity-90 transition-opacity"
                        style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                        aria-label="Tambah transaksi"
                    >
                        <Plus className="w-6 h-6 text-white" />
                    </Button>
                </Link>
            </div>

            {idToDelete && <ConfirmDialog
                icon={<Trash2 className='text-red-500' />}
                title="Hapus Transaksi"
                description="Apakah anda yakin ingin menghapus transaksi ini?"
                onConfirm={async () => await deleteTransaction(idToDelete)}
                onCancel={() => { setIdToDelete(''); }}
                open={!!idToDelete}
                confirmVariant={'destructive'}
                onOpenChange={() => setIdToDelete(undefined)}
            />}

        </div>
    );
}

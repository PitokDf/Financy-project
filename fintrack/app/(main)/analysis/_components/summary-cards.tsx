import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface SummaryCardsProps {
    savings: number;
    savingsRate: number;
    totalIncome: number;
    totalExpense: number;
}

export function SummaryCards({ savings, savingsRate, totalIncome, totalExpense }: SummaryCardsProps) {
    return (
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 -mx-4 px-4 hide-scrollbar">
            <div className="min-w-[85%] snap-center shrink-0 bg-primary/5 border border-primary/20 p-4 rounded-xl flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-primary">
                        <Wallet className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Tabungan Bersih</span>
                    </div>
                    <p className="text-xl font-bold text-primary">{formatCurrency(savings)}</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Savings Rate</p>
                    <p className="text-lg font-black text-primary">{savingsRate.toFixed(1)}%</p>
                </div>
            </div>

            <div className="min-w-[85%] snap-center shrink-0 bg-card border border-border p-4 rounded-xl flex justify-between items-center">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-emerald-500">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Pemasukan</span>
                    </div>
                    <p className="text-sm font-bold">{formatCurrency(totalIncome)}</p>
                </div>
                <div className="h-8 w-px bg-border mx-2"></div>
                <div className="space-y-1 text-right">
                    <div className="flex items-center justify-end gap-2 text-red-500">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Pengeluaran</span>
                        <TrendingDown className="w-4 h-4" />
                    </div>
                    <p className="text-sm font-bold">{formatCurrency(totalExpense)}</p>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useMemo } from 'react';
import { CalendarDays, Loader2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { FinancialStat } from '@/hooks/use-analysis';

const ORDERED_DAYS = [
    { index: 1, short: 'Sen', full: 'Senin' },
    { index: 2, short: 'Sel', full: 'Selasa' },
    { index: 3, short: 'Rab', full: 'Rabu' },
    { index: 4, short: 'Kam', full: 'Kamis' },
    { index: 5, short: 'Jum', full: 'Jumat' },
    { index: 6, short: 'Sab', full: 'Sabtu' },
    { index: 0, short: 'Min', full: 'Minggu' },
];

interface SpendingDayChartProps {
    stats: FinancialStat[];
    isLoading: boolean;
}

export function SpendingDayChart({ stats, isLoading }: SpendingDayChartProps) {
    const dayData = useMemo(() => {
        // Akumulasikan expense & hitung kemunculan per hari
        const acc: Record<number, { total: number; count: number }> = {};
        for (let i = 0; i < 7; i++) acc[i] = { total: 0, count: 0 };

        for (const stat of stats) {
            // date format: "yyyy-MM-dd" — tambahkan T00:00 agar tidak kena UTC shift
            const date = new Date(`${stat.date}T00:00:00`);
            const dow = date.getDay();
            acc[dow].total += stat.expense;
            if (stat.expense > 0) acc[dow].count += 1;
        }

        return ORDERED_DAYS.map(d => ({
            ...d,
            avgExpense: acc[d.index].count > 0
                ? acc[d.index].total / acc[d.index].count
                : 0,
        }));
    }, [stats]);

    const maxExpense = Math.max(...dayData.map(d => d.avgExpense), 1);
    const peakDay = dayData.reduce(
        (best, d) => (d.avgExpense > best.avgExpense ? d : best),
        dayData[0],
    );
    const hasData = dayData.some(d => d.avgExpense > 0);

    if (isLoading) {
        return (
            <div className="bg-card border border-border rounded-xl p-4 shadow-sm h-[240px] flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
            </div>
        );
    }

    if (!hasData) return null;

    return (
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between mb-1">
                <h3 className="text-sm font-bold flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-primary" />
                    Pola Pengeluaran per Hari
                </h3>
            </div>

            {/* Insight callout */}
            <div className="flex items-center gap-2 mb-4 p-2.5 bg-primary/8 border border-primary/15 rounded-xl">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-black text-white">!</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-tight">
                    Rata-rata pengeluaran tertinggi di hari{' '}
                    <span className="font-bold text-primary">{peakDay.full}</span>
                    {' '}{' '}
                    <span className="font-bold text-foreground">{formatCurrency(peakDay.avgExpense)}</span>
                </p>
            </div>

            {/* Horizontal bars */}
            <div className="space-y-2.5">
                {dayData.map(d => {
                    const pct = (d.avgExpense / maxExpense) * 100;
                    const isPeak = d.avgExpense === peakDay.avgExpense && peakDay.avgExpense > 0;
                    const isWeekend = d.index === 0 || d.index === 6;

                    return (
                        <div key={d.index} className="flex items-center gap-2.5">
                            {/* Day label */}
                            <span className={`text-[11px] font-bold w-7 shrink-0 ${isPeak
                                ? 'text-primary'
                                : isWeekend
                                    ? 'text-foreground/70'
                                    : 'text-muted-foreground'
                                }`}>
                                {d.short}
                            </span>

                            {/* Bar track */}
                            <div className="flex-1 h-5 bg-muted/40 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-700 ease-out ${isPeak
                                        ? 'bg-primary'
                                        : isWeekend
                                            ? 'bg-primary/50'
                                            : 'bg-primary/25'
                                        }`}
                                    style={{ width: `${pct > 0 ? Math.max(pct, 2) : 0}%` }}
                                />
                            </div>

                            {/* Amount */}
                            <span className={`text-[10px] font-semibold w-20 text-right tabular-nums shrink-0 ${isPeak ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                {d.avgExpense > 0 ? formatCurrency(d.avgExpense) : '—'}
                            </span>
                        </div>
                    );
                })}
            </div>

            <p className="text-[9px] text-muted-foreground/50 mt-3.5 text-center">
                Rata-rata per kemunculan hari dalam periode yang dipilih
            </p>
        </div>
    );
}

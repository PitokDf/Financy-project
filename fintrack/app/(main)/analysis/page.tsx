'use client';

import { useState } from 'react';
import { useAnalysis } from '@/hooks/use-analysis';
import {
    Sparkles,
    Loader2,
    ChevronRight,
    BrainCircuit,
} from 'lucide-react';
import Link from 'next/link';
import { format, subDays } from 'date-fns';
import { SummaryCards } from './_components/summary-cards';
import { CashFlowChart } from './_components/cash-flow-chart';
import { CategoryBreakdown } from './_components/category-breakdown';
import { storageClient } from '@/lib/local-storage';
import { AnalysisDashboardSkeleton } from './_components/skeleton';

const RANGE_OPTIONS = [
    { label: '7 Hari', value: '7d' as const },
    { label: '30 Hari', value: '30d' as const },
    { label: 'Bulan Ini', value: 'this_month' as const },
    { label: '3 Bulan', value: '3m' as const }
];

type RangeOptionsType = typeof RANGE_OPTIONS[0]['value']
const RANGE_OPTIONS_KEY = 'range-options';

export default function AnalysisDashboardPage() {
    const [activeRange, setActiveRange] = useState<RangeOptionsType>(() => {
        if (typeof window == 'undefined') return '30d';
        return storageClient.get<RangeOptionsType>(RANGE_OPTIONS_KEY) ?? '30d'
    });

    const getDateRange = (range: string) => {
        const end = new Date();
        let start = new Date();
        if (range === '7d') start = subDays(end, 7);
        else if (range === '30d') start = subDays(end, 30);
        else if (range === 'this_month') start = new Date(end.getFullYear(), end.getMonth(), 1);
        else if (range === '3m') start = subDays(end, 90);

        return {
            start: format(start, 'yyyy-MM-dd'),
            end: format(end, 'yyyy-MM-dd')
        };
    };

    const dateRange = getDateRange(activeRange);

    const { useStats, useCategoryBreakdown, latestRun, isLoadingLatest } = useAnalysis();

    const { data: stats, isLoading: isLoadingStats } = useStats(dateRange.start, dateRange.end);
    const { data: categories, isLoading: isLoadingCats } = useCategoryBreakdown(dateRange.start, dateRange.end);

    if (isLoadingLatest) return <AnalysisDashboardSkeleton />;

    const totalIncome = stats?.reduce((sum, s) => sum + s.income, 0) || 0;
    const totalExpense = stats?.reduce((sum, s) => sum + s.expense, 0) || 0;
    const savings = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;

    const isPendingConfirmation = latestRun?.status === 'waiting_confirmation';

    return (
        <div className="animate-fade-in space-y-3 text-foreground">
            {/* Sticky Filter Header */}
            <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md pb-2 pt-1 -mx-4 px-4 overflow-x-auto hide-scrollbar">
                <div className="flex items-center gap-1 bg-muted p-1 rounded-xl w-max min-w-full">
                    {RANGE_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                setActiveRange(option.value);
                                if (typeof window != 'undefined') storageClient.set(RANGE_OPTIONS_KEY, option.value);
                            }}
                            className={`flex-1 min-w-17.5 whitespace-nowrap px-3 py-1.5 text-xs rounded-lg transition-all text-center ${activeRange === option.value
                                ? 'bg-background text-foreground font-bold shadow-sm'
                                : 'bg-transparent text-muted-foreground font-semibold hover:text-foreground'
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <SummaryCards
                savings={savings}
                savingsRate={savingsRate}
                totalExpense={totalExpense}
                totalIncome={totalIncome}
            />

            {/* AI Lab Banner */}
            <Link href="/analysis/lab">
                <div className="relative overflow-hidden gradient-primary p-5 rounded-xl text-white mb-6 shadow-xl shadow-primary/20 group cursor-pointer border-0">
                    <div className="absolute -top-6 -right-6 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
                        <Sparkles className="w-32 h-32" />
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <BrainCircuit className="w-5 h-5 text-white/90" />
                                <h3 className="font-bold text-base">AI Lab Clustering</h3>
                            </div>
                            <p className="text-[11px] text-white/80 max-w-50">
                                {isPendingConfirmation
                                    ? "Ada analisis tertunda yang menunggu konfirmasi Anda."
                                    : "Gunakan AI untuk mengelompokkan transaksi tak berkategori secara otomatis."
                                }
                            </p>
                        </div>
                        <div className="bg-white/20 p-2 rounded-full backdrop-blur-md group-hover:translate-x-1 transition-transform">
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </div>
                    {isPendingConfirmation && (
                        <div className="mt-3 flex items-center gap-1.5 bg-white/20 w-fit px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider animate-pulse">
                            <Loader2 className="w-3 h-3 animate-spin" /> Sedang Menunggu Review
                        </div>
                    )}
                </div>
            </Link>

            <CashFlowChart
                isLoading={isLoadingStats}
                stats={stats || []}
            />

            {/* Category Breakdown */}
            <CategoryBreakdown
                categories={categories}
                isLoading={isLoadingCats}
                totalExpense={totalExpense}
            />
        </div>
    );
}

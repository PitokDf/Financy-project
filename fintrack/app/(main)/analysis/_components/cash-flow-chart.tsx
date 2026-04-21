'use client';

import { useState } from 'react';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { TrendingUp, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { formatCurrency } from '@/lib/utils';
import { FinancialStat } from '@/hooks/use-analysis';
import { storageClient } from '@/lib/local-storage';

interface CashFlowChartProps {
    stats: FinancialStat[];
    isLoading: boolean;
}

type ChartType = 'bar' | 'area';
const CHART_TYPE_KEY = 'chart-type'

export function CashFlowChart({ stats, isLoading }: CashFlowChartProps) {
    const [chartType, setChartType] = useState<ChartType>(() => {
        if (typeof window === 'undefined') return 'bar';
        return storageClient.get<ChartType>(CHART_TYPE_KEY) ?? 'bar';
    });

    return (
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col h-[350px]">
            <div className="flex items-center justify-between mb-4 shrink-0">
                <h3 className="text-sm font-bold flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    Tren Arus Kas
                </h3>
                <div className="flex items-center bg-muted/60 p-1 rounded-full text-xs font-semibold">
                    <button
                        onClick={() => { setChartType('bar'); storageClient.set(CHART_TYPE_KEY, 'bar') }}
                        className={`px-3 py-1 rounded-full transition-all ${chartType === 'bar' ? 'bg-emerald-500 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        Batang
                    </button>
                    <button
                        onClick={() => { setChartType('area'); storageClient.set(CHART_TYPE_KEY, 'area') }}
                        className={`px-3 py-1 rounded-full transition-all ${chartType === 'area' ? 'bg-emerald-500 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        Tren
                    </button>
                </div>
            </div>

            <div className="flex-1 w-full min-h-[250px]">
                {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" className={'mb-0 p-0'} height="100%">
                        {chartType === 'area' ? (
                            <AreaChart data={stats} margin={{ top: 5, right: 0, left: 0, bottom: 0 }} >
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f87171" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(value) => format(new Date(value), 'dd MMM', { locale: id })}
                                    tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                                    axisLine={false}
                                    tickLine={false}
                                    minTickGap={20}
                                    dy={10}
                                />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ stroke: 'var(--muted)', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-card border border-border p-3 rounded-2xl shadow-xl">
                                                    <p className="text-[10px] font-bold text-muted-foreground mb-2">
                                                        {format(new Date(payload[0].payload.date), 'dd MMM yyyy', { locale: id })}
                                                    </p>
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-bold text-emerald-500">
                                                            Pemasukan: {formatCurrency(payload[0].value as number)}
                                                        </p>
                                                        <p className="text-xs font-bold text-red-400">
                                                            Pengeluaran: {formatCurrency(payload[1].value as number)}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                    formatter={(value) => {
                                        return <span className="text-xs font-semibold text-muted-foreground mr-4">{value === 'income' ? 'Pemasukan' : 'Pengeluaran'}</span>
                                    }}
                                />
                                <Area name="income" type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                                <Area name="expense" type="monotone" dataKey="expense" stroke="#f87171" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                            </AreaChart>
                        ) : (
                            <BarChart data={stats} margin={{ top: 5, right: 0, left: 0, bottom: 0 }} barGap={2}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={(value) => format(new Date(value), 'MMM', { locale: id })}
                                    tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                                    axisLine={false}
                                    tickLine={false}
                                    minTickGap={20}
                                    dy={10}
                                />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ fill: 'var(--muted)/0.4' }}

                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-card border border-border p-3 rounded-2xl shadow-xl">
                                                    <p className="text-[10px] font-bold text-muted-foreground mb-2">
                                                        {format(new Date(payload[0].payload.date), 'dd MMM yyyy', { locale: id })}
                                                    </p>
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-bold text-emerald-500">
                                                            Pemasukan: {formatCurrency(payload[0].value as number)}
                                                        </p>
                                                        <p className="text-xs font-bold text-red-400">
                                                            Pengeluaran: {formatCurrency(payload[1].value as number)}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                    formatter={(value) => {
                                        return <span className="text-xs font-semibold text-muted-foreground mr-4">{value === 'income' ? 'Pemasukan' : 'Pengeluaran'}</span>
                                    }}
                                />
                                <Bar
                                    name="income"
                                    dataKey="income"
                                    fill="#10b981"
                                    radius={[4, 4, 0, 0]}
                                    maxBarSize={12}
                                    activeBar={{ fill: '#059669' }}
                                />

                                <Bar
                                    name="expense"
                                    dataKey="expense"
                                    fill="#f87171"
                                    radius={[4, 4, 0, 0]}
                                    maxBarSize={12}
                                    activeBar={{ fill: '#dc2626' }}
                                />
                            </BarChart>
                        )}
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}

'use client';

import { Tag, Loader2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/lib/utils';
import { CHART_COLORS } from './constants';
import { CategoryBreakdown as CategoryBreakdownType } from '@/hooks/use-analysis';

interface CategoryBreakdownProps {
    categories: CategoryBreakdownType[] | undefined;
    isLoading: boolean;
    totalExpense: number;
}

export function CategoryBreakdown({ categories, isLoading, totalExpense }: CategoryBreakdownProps) {
    return (
        <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-bold flex items-center gap-2 mb-6">
                <Tag className="w-4 h-4 text-primary" />
                Breakdown Pengeluaran
            </h3>

            <div className="flex flex-col items-center gap-6">
                <div className="h-48 w-48 relative shrink-0">
                    {isLoading ? (
                        <div className="h-full flex items-center justify-center">
                            <Loader2 className="w-6 h-6 text-primary animate-spin" />
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categories}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={65}
                                    outerRadius={85}
                                    paddingAngle={4}
                                    dataKey="totalAmount"
                                    strokeWidth={0}
                                >
                                    {categories?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Total</span>
                        <span className="text-[13px] font-black">{formatCurrency(totalExpense)}</span>
                    </div>
                </div>

                <div className="w-full space-y-3">
                    {categories?.slice(0, 5).map((cat, i) => (
                        <div key={cat.id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                                <span className="text-sm font-medium text-foreground/80">{cat.name}</span>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold">{formatCurrency(cat.totalAmount)}</p>
                                <p className="text-[10px] text-muted-foreground">
                                    {((cat.totalAmount / totalExpense) * 100).toFixed(1)}%
                                </p>
                            </div>
                        </div>
                    ))}
                    {(!categories || categories.length === 0) && !isLoading && (
                        <p className="text-center text-xs text-muted-foreground py-8">Belum ada data pengeluaran</p>
                    )}
                </div>
            </div>
        </div>
    );
}

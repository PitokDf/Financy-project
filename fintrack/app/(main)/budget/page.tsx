'use client';

import { useState, Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Target, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2 } from 'lucide-react';
import { BudgetCard } from './_components/budget-card';
import { getBudgetStatus } from './_components/utils';
import { cn, formatCurrency } from '@/lib/utils';
import { BudgetPageSkeleton } from './_components/skeleton';

import { useBudgets } from '@/hooks/use-budgets';
import { AddBudgetDialog } from './_components/add-budget-dialog';
import { useSearchParams } from 'next/navigation';

function BudgetContent() {
    const { budgets, isLoading, updateBudget } = useBudgets();
    const [showAddForm, setShowAddForm] = useState(false);
    const searchParams = useSearchParams();
    const budgetAlertId = searchParams.get('budgetAlert')
    if (isLoading) {
        return <BudgetPageSkeleton />;
    }

    const totalBudget = budgets?.reduce((s, b) => s + b.amount, 0) || 0;
    const totalSpent = budgets?.reduce((s, b) => s + b.spentAmount, 0) || 0;
    const overallPercentage = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

    const warningCount = budgets?.filter(b => getBudgetStatus(b.spentAmount, b.amount) === 'warning').length || 0;
    const dangerCount = budgets?.filter(b => getBudgetStatus(b.spentAmount, b.amount) === 'danger').length || 0;

    const currentMonth = new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

    return (
        <div className="animate-fade-in space-y-4">
            <div className="rounded-2xl gradient-primary p-5 relative overflow-hidden shadow-lg shadow-primary/20">
                <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-white/80" />
                            <p className="text-white/80 text-xs font-medium">Total Anggaran {currentMonth}</p>
                        </div>
                        <span className="text-white font-bold text-sm">{overallPercentage}%</span>
                    </div>
                    <p className="text-2xl font-black text-white mb-1">{formatCurrency(totalSpent)}</p>
                    <p className="text-white/70 text-xs mb-3">dari {formatCurrency(totalBudget)}</p>

                    <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-3">
                        <div
                            className="h-full bg-white rounded-full transition-all duration-700"
                            style={{ width: `${Math.min(overallPercentage, 100)}%` }}
                        />
                    </div>

                    <div className="flex gap-3">
                        {dangerCount > 0 && (
                            <div className="flex items-center gap-1.5 bg-red-500 rounded-full px-2.5 py-1">
                                <AlertTriangle className="w-3 h-3 text-white" />
                                <span className="text-white text-xs font-medium">{dangerCount} terlampaui</span>
                            </div>
                        )}
                        {warningCount > 0 && (
                            <div className="flex items-center gap-1.5 bg-amber-500 rounded-full px-2.5 py-1">
                                <AlertTriangle className="w-3 h-3 text-white" />
                                <span className="text-white text-xs font-medium">{warningCount} perhatian</span>
                            </div>
                        )}
                        {(dangerCount === 0 && warningCount === 0 && totalBudget > 0) && (
                            <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-2.5 py-1">
                                <CheckCircle2 className="w-3 h-3 text-white" />
                                <span className="text-white text-xs font-medium">Semua aman</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <h3 className="font-bold text-foreground text-sm">Rencana Anggaran</h3>
                <Button
                    size="sm"
                    onClick={() => setShowAddForm(true)}
                    className="h-8 px-3 text-xs rounded-xl"
                >
                    <Plus className="w-3.5 h-3.5 mr-1" />
                    Tambah
                </Button>
            </div>

            <div className="space-y-3">
                {budgets?.length === 0 ? (
                    <div className="text-center py-10 bg-muted/20 border border-dashed rounded-2xl">
                        <Target className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Belum ada anggaran untuk bulan ini.</p>
                    </div>
                ) : (
                    budgets?.map((budget) => <div id={budget.id} key={budget.id} className={cn({
                        'animate-border-glow': budget.id === budgetAlertId, 'rounded-xl bg-red-500 border-2 border-red-500': budget.id === budgetAlertId
                    })}>
                        <BudgetCard budget={budget} onUpdate={async (values) => await updateBudget.mutateAsync({ id: budget.id, data: { amount: values.amount } })} />
                    </div>
                    )
                )}
            </div>

            <Card className="border-dashed border-2 py-0 bg-transparent">
                <CardContent className="p-4 flex items-center justify-center">
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group py-3"
                    >
                        <div className="w-10 h-10 rounded-xl border-2 border-dashed border-muted-foreground/30 group-hover:border-primary/50 flex items-center justify-center transition-colors">
                            <Plus className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium">Tambah Anggaran Baru</span>
                    </button>
                </CardContent>
            </Card>

            <AddBudgetDialog
                isOpen={showAddForm}
                onOpenChange={setShowAddForm}
            />
        </div>
    );
}

export default function BudgetPage() {
    return (
        <Suspense fallback={<BudgetPageSkeleton />}>
            <BudgetContent />
        </Suspense>
    );
}

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import { MoveHorizontal } from "lucide-react";
import { getBudgetStatus, getProgressColor, STATUS_CONFIG } from "./utils";
import * as LucideIcon from 'lucide-react'
import z from 'zod';

import { BudgetItem } from "@/hooks/use-budgets";
import { useState } from "react";
import { ReusableForm } from "@/components/ui/reuseable-form";

const updateBudgetSchema = z.object({
    amount: z.number().min(1)
})

type UpdateBudgetValues = z.infer<typeof updateBudgetSchema>;

export function BudgetCard({ budget, isBudgetAlert, onUpdate }: { budget: BudgetItem, isBudgetAlert?: boolean, onUpdate: (data: UpdateBudgetValues) => void }) {
    const [isEditing, setIsEditing] = useState(false);
    const status = getBudgetStatus(budget.spentAmount, budget.amount);
    const percentage = Math.round((budget.spentAmount / budget.amount) * 100);
    const StatusIcon = STATUS_CONFIG[status].icon;
    const remaining = budget.amount - budget.spentAmount;
    const IconName = budget.category.icon as keyof typeof LucideIcon;
    const IconComponent = (IconName && LucideIcon[IconName]) ? (LucideIcon[IconName] as LucideIcon.LucideIcon) : null;

    return (
        <Card key={budget.id} className={cn(
            "border-border/50 py-0 shadow-none",
            { 'animate-border-glow': isBudgetAlert }
        )}>
            <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg"
                        style={{ backgroundColor: budget.category.color + '15' }}
                    >
                        {IconComponent ? (
                            <IconComponent
                                className="w-5 h-5 transition-transform group-hover:scale-110"
                                style={{ color: budget.category.color }}
                            />
                        ) : (
                            <LucideIcon.Folder className="w-5 h-5 text-muted-foreground" />
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                            <p className="font-semibold text-sm text-foreground">{budget.category.name}</p>
                            <button onClick={() => setIsEditing(!isEditing)} className={cn("p-0.5 rounded-lg transition-colors", isEditing ? "bg-red-500" : 'bg-muted')}>
                                {isEditing ? <LucideIcon.X className="w-4 h-4 text-white" /> : <MoveHorizontal className="w-4 h-4 text-muted-foreground" />}
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <Badge
                                variant="outline"
                                className={cn('text-[10px] px-1 py-2 h-4', STATUS_CONFIG[status].color, 'border-current/30')}
                            >
                                <StatusIcon className="w-2.5 h-2.5 mr-0.5" />
                                {STATUS_CONFIG[status].label}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{percentage}% terpakai</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className={cn('h-full rounded-full transition-all duration-700', getProgressColor(status))}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground">Terpakai</p>
                            <p className="text-sm font-bold text-foreground">{formatCurrency(budget.spentAmount)}</p>
                        </div>
                        <div className="text-right">
                            {isEditing ?
                                <p className="text-xs text-muted-foreground">
                                    Target Harga
                                </p>
                                : <p className="text-xs text-muted-foreground">
                                    {remaining >= 0 ? 'Tersisa' : 'Melebihi'}
                                </p>
                            }
                            {isEditing ? (
                                <ReusableForm<UpdateBudgetValues>
                                    defaultValues={{ amount: budget.amount }}
                                    fields={[{
                                        label: '',
                                        name: 'amount',
                                        type: 'currency',
                                        autoFocus: true,
                                        className: `
                                        text-sm p-0 font-bold p-0 text-right
                                        border-0 outline-none ring-0
                                        focus:outline-none focus:ring-0 focus:border-0
                                        focus-visible:outline-none focus-visible:ring-0 focus-visible:border-0
                                        shadow-none
                                        bg-transparent
                                        text-emerald-600 dark:text-emerald-400
                                        `
                                    }]}
                                    hideSubmitButton
                                    schema={updateBudgetSchema}
                                    onSubmit={onUpdate}
                                    onSuccess={() => setIsEditing(false)}
                                />
                            ) : (
                                <p
                                    onDoubleClick={() => setIsEditing(!isEditing)}
                                    className={cn(
                                        'text-sm font-bold',
                                        remaining >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'
                                    )}>
                                    {formatCurrency(Math.abs(remaining))}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
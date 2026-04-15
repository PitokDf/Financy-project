import { AlertTriangle, CheckCircle2 } from "lucide-react";

export const STATUS_CONFIG = {
    safe: { label: 'Aman', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800', icon: CheckCircle2 },
    warning: { label: 'Perhatian', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800', icon: AlertTriangle },
    danger: { label: 'Terlampaui', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800', icon: AlertTriangle },
} as const;

type StatusKey = keyof typeof STATUS_CONFIG;

export function getBudgetStatus(spent: number, budget: number): StatusKey {
    const pct = (spent / budget) * 100;
    if (pct >= 100) return 'danger';
    if (pct >= 80) return 'warning';
    return 'safe';
}

export function getProgressColor(status: StatusKey): string {
    if (status === 'danger') return 'bg-red-500';
    if (status === 'warning') return 'bg-amber-500';
    return 'bg-emerald-500';
}
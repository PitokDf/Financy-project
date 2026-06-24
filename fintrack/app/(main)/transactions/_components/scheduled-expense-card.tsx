"use client";

import { Check, Trash2, Edit3, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatCurrencyWithSecure } from "@/lib/utils";
import { ScheduledExpense } from "@/types";
import { useSecureMode } from "@/hooks/use-secure";
import { useTranslations } from "next-intl";

interface Props {
  expense: ScheduledExpense;
  onApprove: (id: string) => void;
  onEdit: (expense: ScheduledExpense) => void;
  onDelete: (id: string) => void;
  isApproving?: boolean;
  isPastDue?: boolean;
}

export function ScheduledExpenseCard({
  expense,
  onApprove,
  onEdit,
  onDelete,
  isApproving,
  isPastDue,
}: Props) {
  const { isSecure } = useSecureMode();
  const t = useTranslations("transactions");

  const today = new Date();
  const isDueToday = expense.dayOfMonth === today.getDate();

  return (
    <div
      className={cn(
        "rounded-2xl border p-4 transition-all duration-200",
        isPastDue
          ? "border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20"
          : isDueToday
            ? "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20"
            : "border-border bg-card"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {isPastDue && (
              <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
            )}
            {isDueToday && !isPastDue && (
              <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            )}
            <p className="font-semibold text-sm truncate">
              {expense.description}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {expense.category && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: expense.category.color + "20",
                  color: expense.category.color,
                }}
              >
                {expense.category.name}
              </span>
            )}
            <span>
              {t("scheduledDay")} {expense.dayOfMonth}
            </span>
          </div>
          <p className="text-base font-bold text-red-600 dark:text-red-400 mt-1">
            {formatCurrencyWithSecure(expense.amount, isSecure)}
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Button
            size="icon"
            variant="ghost"
            className="w-8 h-8 rounded-xl text-muted-foreground hover:text-foreground"
            onClick={() => onEdit(expense)}
          >
            <Edit3 className="w-3.5 h-3.5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="w-8 h-8 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
            onClick={() => onDelete(expense.id)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
          <Button
            size="icon"
            className="w-8 h-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white"
            onClick={() => onApprove(expense.id)}
            disabled={isApproving}
          >
            <Check className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

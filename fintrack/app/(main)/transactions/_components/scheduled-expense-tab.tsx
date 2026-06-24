"use client";

import { useState } from "react";
import { Plus, ClipboardList, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScheduledExpenses } from "@/hooks/use-scheduled-expenses";
import { useTranslations } from "next-intl";
import { ScheduledExpenseCard } from "./scheduled-expense-card";
import { ScheduledExpenseForm } from "./scheduled-expense-form";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Trash2 } from "lucide-react";
import { ScheduledExpense } from "@/types";

export function ScheduledExpenseTab() {
  const t = useTranslations("transactions");
  const {
    expenses,
    isLoading,
    createExpense,
    updateExpense,
    deleteExpense,
    approveExpense,
    isCreating,
    isApproving,
  } = useScheduledExpenses();

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<ScheduledExpense | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const today = new Date();
  const todayDate = today.getDate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const activeExpenses = expenses.filter((e) => e.isActive);
  const pastDue = activeExpenses.filter((e) => e.dayOfMonth < todayDate && !e.lastProcessedAt);
  const upcoming = activeExpenses.filter(
    (e) => e.dayOfMonth >= todayDate && !e.lastProcessedAt
  );
  const completed = activeExpenses.filter((e) => e.lastProcessedAt);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-muted-foreground">
            {activeExpenses.length} {t("scheduledActive")}
          </span>
        </div>
        <Button
          size="sm"
          className="h-9 rounded-xl"
          onClick={() => {
            setEditData(null);
            setShowForm(true);
          }}
        >
          <Plus className="w-4 h-4 mr-1" />
          {t("scheduledNew")}
        </Button>
      </div>

      {activeExpenses.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="font-semibold text-foreground">{t("scheduledEmpty")}</p>
          <p className="text-sm text-muted-foreground mt-1">
          {t("scheduledEmptyDesc")}
          </p>
        </div>
      ) : (
        <div className="space-y-2 pb-4">
          {pastDue.length > 0 && (
            <div>
              <p className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2">
                {t("scheduledPastDue")} — {pastDue.length}
              </p>
              {pastDue.map((exp) => (
                <div key={exp.id} className="mb-2">
                  <ScheduledExpenseCard
                    expense={exp}
                    onApprove={approveExpense}
                    onEdit={(e) => {
                      setEditData(e);
                      setShowForm(true);
                    }}
                    onDelete={setDeleteId}
                    isApproving={isApproving}
                    isPastDue
                  />
                </div>
              ))}
            </div>
          )}

          {upcoming.length > 0 && (
            <div>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                {t("scheduledUpcoming")} — {upcoming.length}
              </p>
              {upcoming.map((exp) => (
                <div key={exp.id} className="mb-2">
                  <ScheduledExpenseCard
                    expense={exp}
                    onApprove={approveExpense}
                    onEdit={(e) => {
                      setEditData(e);
                      setShowForm(true);
                    }}
                    onDelete={setDeleteId}
                    isApproving={isApproving}
                  />
                </div>
              ))}
            </div>
          )}

          {completed.length > 0 && (
            <div>
              <p className="text-xs font-bold text-emerald-500 uppercase tracking-wide mb-2">
        {t("scheduledCompleted")} — {completed.length}
              </p>
              {completed.map((exp) => (
                <div key={exp.id} className="mb-2 opacity-60">
                  <ScheduledExpenseCard
                    expense={exp}
                    onApprove={() => {}}
                    onEdit={(e) => {
                      setEditData(e);
                      setShowForm(true);
                    }}
                    onDelete={setDeleteId}
                    isApproving={isApproving}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <ScheduledExpenseForm
        isOpen={showForm}
        onOpenChange={setShowForm}
        onSubmit={(values) => {
          if (editData) {
            updateExpense({ id: editData.id, ...values });
          } else {
            createExpense(values);
          }
          setEditData(null);
        }}
        editData={editData}
      />

      <ConfirmDialog
        icon={<Trash2 className="text-red-500" />}
        title={t("scheduledDeleteTitle")}
        description={t("scheduledDeleteDesc")}
        onConfirm={() => {
          if (deleteId) {
            deleteExpense(deleteId);
            setDeleteId(null);
          }
        }}
        onCancel={() => setDeleteId(null)}
        open={!!deleteId}
        confirmVariant="destructive"
        onOpenChange={() => setDeleteId(null)}
      />
    </div>
  );
}

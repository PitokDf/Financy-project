"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Virtuoso } from "react-virtuoso";
import {
  Search,
  Plus,
  X,
  TrendingUp,
  TrendingDown,
  Trash2,
  Import,
  Loader2,
} from "lucide-react";
import { cn, formatCurrencyWithSecure } from "@/lib/utils";
import { TransactionForm } from "./_components/transaction-form";
import { TransactionCard } from "@/components/shared/transaction-card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ImportCsvModal } from "./_components/import-csv-modal";
import {
  DisplayTransaction,
  useTransactionsPage,
} from "./use-transactions-page";
import { Suspense, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { TransactionsSkeleton } from "./_components/skeleton";
import { useSecureMode } from "@/hooks/use-secure";
import { useSearchParams } from "next/navigation";
import { Transaction } from "@/hooks/use-transactions";
import { ScheduledExpenseTab } from "./_components/scheduled-expense-tab";
import { Calendar } from "lucide-react";

type FlatItem =
  | { type: "header"; date: string; count: number }
  | { type: "item"; transaction: DisplayTransaction };

function TransactionsContent() {
  const searchParams = useSearchParams();
  const action = searchParams.get("action");

  const { isSecure } = useSecureMode();
  const [showImportModal, setShowImportModal] = useState(action === "import");

  const [editData, setEditData] = useState<Transaction | null>(null);
  const [showScheduled, setShowScheduled] = useState(false);
  const t = useTranslations("transactions");

  const {
    search,
    setSearch,
    filter,
    setFilter,
    showAddModal,
    setShowAddModal,
    showDeleteModal,
    setShowDeleteModal,
    setIdToDelete,
    grouped,
    hasMore,
    loadMore,
    totalIncome,
    totalExpense,
    handleCreateTransaction,
    handleDeleteTransaction,
    formatDate,
    isInitialLoading,
    isSearching,
  } = useTransactionsPage();
  const flatItems = useMemo<FlatItem[]>(() => {
    return grouped.flatMap(([date, transactions]) => [
      { type: "header", date, count: transactions.length },
      ...transactions.map((transaction) => ({
        type: "item" as const,
        transaction,
      })),
    ]);
  }, [grouped]);
  if (isInitialLoading) return <TransactionsSkeleton />;

  return (
    <div className="animate-fade-in flex flex-col h-screen">
      {/* Header stats & filter */}
      <div className="pb-2 shrink-0">
        {!showScheduled && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  {t("income")}
                </span>
              </div>
              <p className="text-base font-bold text-emerald-700 dark:text-emerald-300">
                {formatCurrencyWithSecure(totalIncome, isSecure)}
              </p>
            </div>
            <div className="rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingDown className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
                <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                  {t("expense")}
                </span>
              </div>
              <p className="text-base font-bold text-red-600 dark:text-red-400">
                {formatCurrencyWithSecure(totalExpense, isSecure)}
              </p>
            </div>
          </div>
        )}

        {!showScheduled && (
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t("search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-11 rounded-xl pr-9"
            />
            {isSearching ? (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
            ) : search ? (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : null}
          </div>
        )}

        <div className="flex gap-2">
          {(["ALL", "INCOME", "EXPENSE"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200",
                filter === f
                  ? f === "INCOME"
                    ? "bg-emerald-500 text-white shadow-sm shadow-emerald-200 dark:shadow-emerald-900"
                    : f === "EXPENSE"
                      ? "bg-red-500 text-white shadow-sm shadow-red-200 dark:shadow-red-900"
                      : "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              {f === "ALL"
                ? t("all")
                : f === "INCOME"
                  ? t("income")
                  : t("expense")}
            </button>
          ))}
          <button
            onClick={() => setShowScheduled(!showScheduled)}
            className={cn(
              "px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5",
              showScheduled
                ? "bg-violet-500 text-white shadow-sm shadow-violet-200 dark:shadow-violet-900"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            <Calendar className="w-3.5 h-3.5" />
            {t("scheduledExpense")}
          </button>
        </div>
      </div>

      {/* Scheduled Tab */}
      {showScheduled && (
        <div className="flex-1 min-h-0 overflow-y-auto">
          <ScheduledExpenseTab />
        </div>
      )}

      {/* List */}
      {!showScheduled && (flatItems.length === 0 && !isSearching ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Search className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="font-semibold text-foreground">{t("noTx")}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {t("noTxDesc")}
          </p>
        </div>
      ) : (
        <div className="flex-1 min-h-0">
          {isSearching && (
            <div className="h-0.5 w-full overflow-hidden bg-muted">
              <div className="h-full w-1/3 bg-primary rounded-full animate-[loading_1s_ease-in-out_infinite]" />
            </div>
          )}
          <Virtuoso
            data={flatItems}
            endReached={() => {
              if (hasMore) loadMore();
            }}
            style={{ height: "100%" }}
            itemContent={(index, item) => {
              return (
                <div className="py-0.5">
                  {item.type === "header" ? (
                    <div className="flex items-center gap-2 py-1">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                        {formatDate(item.date)}
                      </p>
                      <div className="flex-1 h-px bg-border" />
                      <p className="text-xs text-muted-foreground">
                        {t("txCount", { count: item.count })}
                      </p>
                    </div>
                  ) : (
                    <TransactionCard
                      {...item.transaction}
                      categoryColor={
                        (item.transaction as any).categoryColor ?? "#6b7280"
                      }
                      categoryIcon={(item.transaction as any).categoryIcon}
                      categoryId={(item.transaction as any).categoryId}
                      isPendingSync={item.transaction.isPendingSync || (item.transaction as any).isOffline}
                      onDelete={(trxID) => {
                        setShowDeleteModal(true);
                        setIdToDelete(trxID);
                      }}
                      onEdit={(data) => {
                        setEditData(data);
                        setShowAddModal(true);
                      }}
                    />
                  )}
                </div>
              );
            }}
          />
        </div>
      ))}

      {/* FAB */}
      {!showScheduled && (
      <div className="fixed bottom-24 right-4 z-30 flex flex-col gap-3">
        <Button
          size="icon"
          onClick={() => setShowImportModal(true)}
          className="w-12 h-12 rounded-2xl bg-secondary text-foreground/70 hover:text-foreground hover:bg-secondary/80 active:scale-95 transition-all duration-200 shadow-none border-0 ml-auto"
          aria-label={t("importCsv")}
        >
          <Import className="w-4.5 h-4.5" strokeWidth={2} />
        </Button>
        <Button
          size="icon"
          className="w-12 h-12 rounded-2xl shadow-lg shadow-primary/30 border-0"
          style={{
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          }}
          onClick={() => setShowAddModal(true)}
          aria-label={t("addTx")}
        >
          <Plus className="w-6 h-6 text-white" />
        </Button>
      </div>
      )}

      <ConfirmDialog
        icon={<Trash2 className="text-red-500" />}
        title={t("deleteTxTitle")}
        description={t("deleteTxDesc")}
        onConfirm={handleDeleteTransaction}
        onCancel={() => {
          setShowDeleteModal(false);
          setIdToDelete("");
        }}
        open={showDeleteModal}
        confirmVariant={"destructive"}
        onOpenChange={setShowDeleteModal}
      />

      <TransactionForm
        isOpen={showAddModal}
        onOpenChange={(open) => {
          setShowAddModal(open);
          if (!open) setEditData(null);
        }}
        onSubmit={(values) => handleCreateTransaction(values, editData?.id)}
        defaultValues={
          editData
            ? {
                description: editData.description,
                jumlah: editData.amount,
                type: editData.type,
                date: editData.date,
                category: editData.categoryId || "",
              }
            : undefined
        }
      />

      <ImportCsvModal
        isOpen={showImportModal}
        onOpenChange={setShowImportModal}
      />
    </div>
  );
}

export default function TransactionsPage() {
  return (
    <Suspense fallback={<TransactionsSkeleton />}>
      <TransactionsContent />
    </Suspense>
  );
}

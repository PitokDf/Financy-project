"use client";

import React, { useMemo, useState } from "react";
import { ReusableForm } from "@/components/ui/reuseable-form";
import {
  getScheduledExpenseFormFields,
  scheduledExpenseSchema,
  ScheduledExpenseValues,
} from "./scheduled-expense-schema";
import { useCategories } from "@/hooks/use-categories";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { ScheduledExpense } from "@/types";
import { useUserSettings } from "@/hooks/use-user-settings";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: {
    description: string;
    amount: number;
    dayOfMonth: number;
    categoryId?: string | null;
  }) => void;
  editData?: ScheduledExpense | null;
}

export function ScheduledExpenseForm({
  isOpen,
  onOpenChange,
  onSubmit,
  editData,
}: Props) {
  const t = useTranslations("txForm");
  const { categories, createCategoryAsync, isCreating } = useCategories();
  const { settings } = useUserSettings();
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  const defaultValues = useMemo(
    () => ({
      description: editData?.description || "",
      amount: editData?.amount || 0,
      dayOfMonth: editData?.dayOfMonth || 1,
      category: editData?.categoryId ?? "",
    }),
    [editData, settings?.autoCategorize],
  );

  const formFields = useMemo(
    () => getScheduledExpenseFormFields(categories, () => setShowCategoryDialog(true), t),
    [categories, t],
  );

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    try {
      await createCategoryAsync({ name: newCatName, type: "EXPENSE" });
      setShowCategoryDialog(false);
      setNewCatName("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ReusableForm<ScheduledExpenseValues>
        defaultValues={defaultValues}
        dialogTitle={
          editData ? t("scheduledFormEditTitle") : t("scheduledFormTitle")
        }
        submitText={editData ? t("saveTx") : t("scheduledFormTitle")}
        schema={scheduledExpenseSchema}
        withDialog
        fields={formFields}
        isDialogOpen={isOpen}
        onDialogOpenChange={onOpenChange}
        onSubmit={(values) => {
          onSubmit({
            description: values.description,
            amount: values.amount,
            dayOfMonth: values.dayOfMonth,
            categoryId: values.category || null,
          });
          onOpenChange(false);
        }}
      />

      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>{t("scheduledCategoryDialogTitle")}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateCategory} className="space-y-4 pt-4">
            <div className="space-y-2 flex flex-col">
              <label className="text-sm font-medium">{t("scheduledCategoryDialogLabel")}</label>
              <Input
                placeholder={t("scheduledCategoryDialogPlaceholder")}
                className="h-11"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                disabled={isCreating}
                required
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCategoryDialog(false)}
                disabled={isCreating}
              >
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={isCreating || !newCatName.trim()}>
                {isCreating ? t("importing") : t("saveTx")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

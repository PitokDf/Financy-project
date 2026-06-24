import { FormFieldConfig } from "@/components/ui/reuseable-form";
import React from "react";
import z from "zod";
import { Category } from "@/hooks/use-categories";

export const scheduledExpenseSchema = z.object({
  description: z.string().min(1, "Deskripsi minimal 1 karakter"),
  amount: z.number().min(1, "Jumlah minimal 1"),
  dayOfMonth: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val) : val),
    z.number().int().min(1, "Tanggal antara 1-31").max(31, "Tanggal antara 1-31"),
  ),
  category: z.string().optional(),
});

export type ScheduledExpenseValues = z.infer<typeof scheduledExpenseSchema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TFn = (key: string, params?: any) => string;

export const getScheduledExpenseFormFields = (
  categories: Category[],
  onAddCategory: () => void,
  t: TFn,
): FormFieldConfig<ScheduledExpenseValues>[] => {
  const expenseOptions = categories
    .filter((c) => c.type === "EXPENSE")
    .map((c) => ({
      label: c.name,
      value: c.id,
    }));

  return [
    {
      name: "amount",
      label: t("scheduledFormAmount"),
      placeholder: "0",
      type: "currency",
    },
    {
      name: "category",
      label: "Kategori",
      type: "chips",
      options: [{ label: t("aiCategorized"), value: "" }, ...expenseOptions],
    },
    {
      name: "dayOfMonth",
      label: t("scheduledFormDay"),
      type: "number",
      className: "h-11 rounded-xl",
    },
    {
      name: "description",
      label: t("notes"),
      placeholder: t("scheduledFormNotes"),
      type: "textarea",
      className: "resize-none h-24 rounded-xl",
    },
    {
      type: "custom",
      renderCustom: () =>
        React.createElement(
          "button",
          {
            type: "button",
            onClick: onAddCategory,
            className:
              "text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 w-full text-center p-2 rounded-xl border border-dashed border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all mt-2",
          },
          t("scheduledFormAddCategory"),
        ),
    },
  ];
};

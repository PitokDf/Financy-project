"use client";

import { z } from "zod";
import { ReusableForm, FormFieldConfig } from "@/components/ui/reuseable-form";
import { useBudgets } from "@/hooks/use-budgets";
import { useCategories } from "@/hooks/use-categories";
import { Target, Wallet } from "lucide-react";
import { useTranslations } from "next-intl";

export function AddBudgetDialog({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: (open: boolean) => void }) {
    const t = useTranslations('budget');
    const { createBudget } = useBudgets();
    const { categories, isLoading: isLoadingCategories } = useCategories();

    const budgetSchema = z.object({
        categoryId: z.string().min(1, t('validationCategory')),
        amount: z.number().min(1000, t('validationAmount')),
        period: z.enum(["WEEKLY", "MONTHLY", "YEARLY"]).default("MONTHLY"),
    });

    type BudgetFormValues = z.infer<typeof budgetSchema>;

    const expenseCategories = categories
        .filter(c => c.type === 'EXPENSE')
        .map(c => ({
            label: c.name,
            value: c.id
        }));

    const fields: FormFieldConfig<BudgetFormValues>[] = [
        {
            name: "period",
            label: t('period'),
            type: "segmented-control",
            options: [
                { label: t('weekly'), value: "WEEKLY" },
                { label: t('monthly'), value: "MONTHLY" },
                { label: t('yearly'), value: "YEARLY" },
            ],
            colSpan: "full"
        },
        {
            name: "categoryId",
            label: t('category'),
            type: "chips",
            className: "w-full",
            placeholder: t('selectCategory'),
            options: expenseCategories,
            disabled: isLoadingCategories,
        },
        {
            name: "amount",
            label: t('budgetAmount'),
            type: "currency",
            placeholder: t('enterBudgetAmount'),
        },
    ];

    const handleSubmit = async (values: BudgetFormValues) => {
        await createBudget.mutateAsync(values);
        onOpenChange(false);
    };

    return (
        <ReusableForm<BudgetFormValues>
            withDialog
            isDialogOpen={isOpen}
            onDialogOpenChange={onOpenChange}
            dialogTitle={t('newBudgetTitle')}
            schema={budgetSchema}
            fields={fields}
            onSubmit={handleSubmit}
            defaultValues={{
                categoryId: "",
                amount: 0,
                period: "MONTHLY"
            }}
            submitText={t('saveBudget')}
            loadingText={t('saving')}
            isLoading={createBudget.isPending}
        />
    );
}

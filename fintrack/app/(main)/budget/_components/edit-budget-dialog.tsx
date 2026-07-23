"use client";

import { z } from "zod";
import { ReusableForm, FormFieldConfig } from "@/components/ui/reuseable-form";
import { useBudgets, BudgetItem } from "@/hooks/use-budgets";
import { useTranslations } from "next-intl";

export function EditBudgetDialog({
    isOpen,
    onOpenChange,
    budget
}: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    budget: BudgetItem | null;
}) {
    const t = useTranslations('budget');
    const { updateBudget } = useBudgets();

    const budgetSchema = z.object({
        amount: z.number().min(1000, t('validationAmount')),
        period: z.enum(["WEEKLY", "MONTHLY", "YEARLY"]),
    });

    type BudgetFormValues = z.infer<typeof budgetSchema>;

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
            name: "amount",
            label: t('budgetAmount'),
            type: "currency",
            placeholder: t('enterBudgetAmount'),
        },
    ];

    const handleSubmit = async (values: BudgetFormValues) => {
        if (!budget) return;
        await updateBudget.mutateAsync({ id: budget.id, data: values });
        onOpenChange(false);
    };

    return (
        <ReusableForm<BudgetFormValues>
            withDialog
            isDialogOpen={isOpen}
            onDialogOpenChange={onOpenChange}
            dialogTitle={t('editBudgetTitle')}
            schema={budgetSchema}
            fields={fields}
            onSubmit={handleSubmit}
            defaultValues={{
                amount: budget?.amount ?? 0,
                period: (budget?.period as "WEEKLY" | "MONTHLY" | "YEARLY") ?? "MONTHLY",
            }}
            submitText={t('saveBudget')}
            loadingText={t('saving')}
            isLoading={updateBudget.isPending}
        />
    );
}

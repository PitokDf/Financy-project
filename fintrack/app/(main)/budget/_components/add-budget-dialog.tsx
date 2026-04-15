"use client";

import { z } from "zod";
import { ReusableForm, FormFieldConfig } from "@/components/ui/reuseable-form";
import { useBudgets } from "@/hooks/use-budgets";
import { useCategories } from "@/hooks/use-categories";
import { Target, Wallet } from "lucide-react";

const budgetSchema = z.object({
    categoryId: z.string().min(1, "Kategori harus dipilih"),
    amount: z.number().min(1000, "Anggaran minimal Rp 1.000"),
    period: z.enum(["WEEKLY", "MONTHLY", "YEARLY"]).default("MONTHLY"),
});

type BudgetFormValues = z.infer<typeof budgetSchema>;

interface AddBudgetDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AddBudgetDialog({ isOpen, onOpenChange }: AddBudgetDialogProps) {
    const { createBudget } = useBudgets();
    const { categories, isLoading: isLoadingCategories } = useCategories();

    const expenseCategories = categories
        .filter(c => c.type === 'EXPENSE')
        .map(c => ({
            label: c.name,
            value: c.id
        }));

    const fields: FormFieldConfig<BudgetFormValues>[] = [
        {
            name: "period",
            label: "Periode",
            type: "segmented-control",
            options: [
                { label: "Mingguan", value: "WEEKLY" },
                { label: "Bulanan", value: "MONTHLY" },
                { label: "Tahunan", value: "YEARLY" },
            ],
            colSpan: "full"
        },
        {
            name: "categoryId",
            label: "Kategori",
            type: "chips",
            className: "w-full",
            placeholder: "Pilih kategori anggaran",
            options: expenseCategories,
            disabled: isLoadingCategories,
        },
        {
            name: "amount",
            label: "Jumlah Anggaran",
            type: "currency",
            placeholder: "Masukkan jumlah anggaran",
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
            dialogTitle="Atur Anggaran Baru"
            // dialogDescription="Tentukan limit pengeluaran untuk kategori tertentu agar keuangan tetap terkontrol."
            schema={budgetSchema}
            fields={fields}
            onSubmit={handleSubmit}
            defaultValues={{
                categoryId: "",
                amount: 0,
                period: "MONTHLY"
            }}
            submitText="Simpan Anggaran"
            loadingText="Menyimpan..."
            isLoading={createBudget.isPending}
        />
    );
}

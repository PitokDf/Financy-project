import { FormFieldConfig } from "@/components/ui/reuseable-form"
import React from "react"
import z from "zod"

import { Category } from "@/hooks/use-categories"

export const transactionSchema = z.object({
    description: z.string().min(5, 'Deskripsi minimal 5 karakter'),
    jumlah: z.number().min(1, 'Nominal minimal Rp 1'),
    type: z.enum(['EXPENSE', 'INCOME']),
    category: z.string().optional(),
    date: z.string()
})

export type TransactionValues = z.infer<typeof transactionSchema>

export const getTransactionFormFields = (
    categories: Category[],
    onAddCategory: () => void
): FormFieldConfig<TransactionValues>[] => {
    const expenseOptions = categories.filter(c => c.type === 'EXPENSE').map(c => ({
        label: c.name,
        value: c.id
    }));

    const incomeOptions = categories.filter(c => c.type === 'INCOME').map(c => ({
        label: c.name,
        value: c.id
    }));

    return [
        {
            name: 'type',
            type: 'segmented-control',
            options: [
                { label: 'Pengeluaran', value: 'EXPENSE', activeBgClass: 'bg-red-500', activeTextClass: 'text-white' },
                { label: 'Pemasukan', value: 'INCOME', activeBgClass: 'bg-emerald-500', activeTextClass: 'text-white' }
            ],
            className: 'bg-muted/50 p-1.5 rounded-2xl'
        },
        {
            name: 'jumlah',
            label: 'Nominal',
            placeholder: '0',
            type: 'currency',
        },
        {
            name: 'category',
            label: 'Kategori Pengeluaran',
            type: 'chips',
            condition: (values) => values.type === 'EXPENSE',
            options: [
                { label: '📦 Belum dikategorikan', value: '' },
                ...expenseOptions
            ]
        },
        {
            name: 'category',
            label: 'Kategori Pemasukan',
            type: 'chips',
            condition: (values) => values.type === 'INCOME',
            options: [
                { label: '📦 Belum dikategorikan', value: '' },
                ...incomeOptions
            ]
        },
        {
            name: 'date',
            type: 'date',
            label: 'Tanggal Transaksi',
            className: 'h-12 rounded-xl'
        },
        {
            name: 'description',
            label: 'Catatan',
            placeholder: 'Tuliskan catatan transaksi kamu (minimal 12 karakter)...',
            type: 'textarea',
            className: 'resize-none h-24 rounded-xl'
        },
        {
            type: 'custom',
            renderCustom: () => React.createElement('button', {
                type: 'button',
                onClick: onAddCategory,
                className: 'text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 w-full text-center p-2 rounded-xl border border-dashed border-emerald-500/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all mt-2'
            }, '+ Buat Kategori Baru')
        }
    ];
} 
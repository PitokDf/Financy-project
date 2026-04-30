import React, { useMemo, useState } from "react";
import { ReusableForm } from "@/components/ui/reuseable-form";
import { getTransactionFormFields, transactionSchema, TransactionValues } from "./schema";
import { useCategories } from "@/hooks/use-categories";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TransactionFormProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: TransactionValues) => void;
    defaultValues?: Partial<TransactionValues>
}

export function TransactionForm({
    isOpen,
    onOpenChange,
    onSubmit,
    defaultValues: initialValues

}: TransactionFormProps) {
    const { categories, createCategoryAsync, isCreating } = useCategories();
    const [showCategoryDialog, setShowCategoryDialog] = useState(false);
    const [newCatName, setNewCatName] = useState("");
    const [formType, setFormType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE');

    initialValues && console.log("Form Initial Values:", initialValues)

    const defaultValues = useMemo(() => ({
        description: initialValues?.description || '',
        jumlah: initialValues?.jumlah || 0,
        type: initialValues?.type || 'EXPENSE' as const,
        category: initialValues?.category || '',
        date: initialValues?.date || new Date().toISOString()
    }), [initialValues]);

    const formFields = useMemo(() => getTransactionFormFields(categories, () => setShowCategoryDialog(true)), [categories]);

    const handleCreateCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCatName.trim()) return;
        try {
            await createCategoryAsync({ name: newCatName, type: formType });
            setShowCategoryDialog(false);
            setNewCatName("");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <ReusableForm<TransactionValues>
                defaultValues={defaultValues}
                dialogTitle="Tambah Transaksi"
                submitText="Simpan Transaksi"
                schema={transactionSchema}
                withDialog
                fields={formFields}
                isDialogOpen={isOpen}
                onDialogOpenChange={onOpenChange}
                onValuesChange={(vals) => {
                    if (vals.type) setFormType(vals.type);
                }}
                onSubmit={(values) => {
                    onSubmit(values);
                    onOpenChange(false);
                }}
            />

            <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Buat Kategori Baru</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateCategory} className="space-y-4 pt-4">
                        <div className="space-y-2 flex flex-col">
                            <label className="text-sm font-medium">Nama Kategori</label>
                            <Input
                                placeholder="Contoh: Belanja Bulanan"
                                className="h-11"
                                value={newCatName}
                                onChange={(e) => setNewCatName(e.target.value)}
                                disabled={isCreating}
                                required
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setShowCategoryDialog(false)} disabled={isCreating}>Batal</Button>
                            <Button type="submit" disabled={isCreating || !newCatName.trim()}>
                                {isCreating ? "Menyimpan..." : "Simpan Kategori"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
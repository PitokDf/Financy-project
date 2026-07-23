"use client";

import { useState } from "react";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useCategories, Category } from "@/hooks/use-categories";
import { cn } from "@/lib/utils";
import { Plus, Pencil, Trash2, Check, X, Loader2 } from "lucide-react";
import * as LucideIcon from "lucide-react";

const PRESET_COLORS = [
    "#ef4444", "#f97316", "#eab308", "#22c55e",
    "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
    "#6b7280", "#14b8a6", "#f43f5e", "#a855f7",
];

interface CategorySheetProps {
    open: boolean;
    onClose: () => void;
}

export function CategorySheet({ open, onClose }: CategorySheetProps) {
    const { categories, updateCategory, deleteCategory } = useCategories();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");
    const [editColor, setEditColor] = useState("#6b7280");
    const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
    const [addingType, setAddingType] = useState<"EXPENSE" | "INCOME" | null>(null);
    const [newName, setNewName] = useState("");
    const [newColor, setNewColor] = useState("#6b7280");

    const expenseCategories = categories?.filter(c => c.type === "EXPENSE") || [];
    const incomeCategories = categories?.filter(c => c.type === "INCOME") || [];

    const startEdit = (cat: Category) => {
        setEditingId(cat.id);
        setEditName(cat.name);
        setEditColor(cat.color);
    };

    const saveEdit = async () => {
        if (!editingId || !editName.trim()) return;
        await updateCategory.mutateAsync({ id: editingId, data: { name: editName.trim(), color: editColor } });
        setEditingId(null);
    };

    const renderCategory = (cat: Category) => {
        const isEditing = editingId === cat.id;
        const IconName = cat.icon as keyof typeof LucideIcon;
        const IconComponent = IconName && LucideIcon[IconName] ? LucideIcon[IconName] as LucideIcon.LucideIcon : null;

        return (
            <div key={cat.id} className="flex items-center gap-3 py-2.5 border-b border-border/30 last:border-0">
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: cat.color + "20" }}
                >
                    {IconComponent ? (
                        <IconComponent className="w-4 h-4" style={{ color: cat.color }} />
                    ) : (
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    )}
                </div>

                {isEditing ? (
                    <div className="flex-1 flex items-center gap-2">
                        <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="h-8 text-sm"
                            autoFocus
                            onKeyDown={(e) => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") setEditingId(null); }}
                        />
                        <div className="flex gap-1">
                            {PRESET_COLORS.slice(0, 6).map(c => (
                                <button
                                    key={c}
                                    onClick={() => setEditColor(c)}
                                    className={cn("w-5 h-5 rounded-full border-2 transition-all", editColor === c ? "border-foreground scale-110" : "border-transparent")}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                        <button onClick={saveEdit} className="p-1 text-emerald-500">
                            <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => setEditingId(null)} className="p-1 text-muted-foreground">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <>
                        <span className="flex-1 text-sm font-medium text-foreground">{cat.name}</span>
                        <div className="flex items-center gap-0.5">
                            <button onClick={() => startEdit(cat)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                                <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                            </button>
                            <button onClick={() => setDeletingCategory(cat)} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors">
                                <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-red-500" />
                            </button>
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <>
            <BottomSheet open={open} onClose={onClose} title="Kelola Kategori" description="Edit atau hapus kategori transaksi">
                <div className="space-y-5 max-h-[60vh] overflow-y-auto">
                    {/* Expense Categories */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Pengeluaran</p>
                            <button
                                onClick={() => setAddingType(addingType === "EXPENSE" ? null : "EXPENSE")}
                                className="p-1 rounded-lg hover:bg-muted transition-colors"
                            >
                                <Plus className={cn("w-4 h-4 text-muted-foreground transition-transform", addingType === "EXPENSE" && "rotate-45")} />
                            </button>
                        </div>
                        {addingType === "EXPENSE" && (
                            <AddCategoryInline
                                name={newName}
                                setName={setNewName}
                                color={newColor}
                                setColor={setNewColor}
                                type="EXPENSE"
                                onCancel={() => { setAddingType(null); setNewName(""); setNewColor("#6b7280"); }}
                            />
                        )}
                        {expenseCategories.map(renderCategory)}
                        {expenseCategories.length === 0 && addingType !== "EXPENSE" && (
                            <p className="text-xs text-muted-foreground py-2">Belum ada kategori</p>
                        )}
                    </div>

                    {/* Income Categories */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Pemasukan</p>
                            <button
                                onClick={() => setAddingType(addingType === "INCOME" ? null : "INCOME")}
                                className="p-1 rounded-lg hover:bg-muted transition-colors"
                            >
                                <Plus className={cn("w-4 h-4 text-muted-foreground transition-transform", addingType === "INCOME" && "rotate-45")} />
                            </button>
                        </div>
                        {addingType === "INCOME" && (
                            <AddCategoryInline
                                name={newName}
                                setName={setNewName}
                                color={newColor}
                                setColor={setNewColor}
                                type="INCOME"
                                onCancel={() => { setAddingType(null); setNewName(""); setNewColor("#6b7280"); }}
                            />
                        )}
                        {incomeCategories.map(renderCategory)}
                        {incomeCategories.length === 0 && addingType !== "INCOME" && (
                            <p className="text-xs text-muted-foreground py-2">Belum ada kategori</p>
                        )}
                    </div>
                </div>
            </BottomSheet>

            <ConfirmDialog
                open={!!deletingCategory}
                onOpenChange={(open) => { if (!open) setDeletingCategory(null); }}
                title="Hapus Kategori"
                description={`Hapus "${deletingCategory?.name}"? Transaksi yang menggunakan kategori ini akan dikosongkan kategorinya.`}
                icon={<Trash2 className="w-6 h-6 text-red-500" />}
                confirmLabel="Hapus"
                confirmVariant="destructive"
                onConfirm={async () => {
                    if (deletingCategory) {
                        await deleteCategory.mutateAsync(deletingCategory.id);
                        setDeletingCategory(null);
                    }
                }}
            />
        </>
    );
}

function AddCategoryInline({
    name, setName, color, setColor, type, onCancel
}: {
    name: string;
    setName: (v: string) => void;
    color: string;
    setColor: (v: string) => void;
    type: "EXPENSE" | "INCOME";
    onCancel: () => void;
}) {
    const { createCategoryAsync, isCreating } = useCategories();

    const handleCreate = async () => {
        if (!name.trim()) return;
        await createCategoryAsync({ name: name.trim(), type });
        setName("");
        setColor("#6b7280");
        onCancel();
    };

    return (
        <div className="flex items-center gap-2 py-2 border-b border-border/30">
            <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama kategori..."
                className="h-8 text-sm flex-1"
                autoFocus
                onKeyDown={(e) => { if (e.key === "Enter") handleCreate(); if (e.key === "Escape") onCancel(); }}
            />
            <div className="flex gap-1">
                {PRESET_COLORS.slice(0, 6).map(c => (
                    <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={cn("w-4 h-4 rounded-full border-2 transition-all", color === c ? "border-foreground scale-110" : "border-transparent")}
                        style={{ backgroundColor: c }}
                    />
                ))}
            </div>
            <button onClick={handleCreate} disabled={isCreating || !name.trim()} className="p-1 text-emerald-500 disabled:opacity-50">
                {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            </button>
            <button onClick={onCancel} className="p-1 text-muted-foreground">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

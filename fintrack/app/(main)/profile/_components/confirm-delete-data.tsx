'use client'

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ReusableForm } from "@/components/ui/reuseable-form";
import { useUserSettings } from "@/hooks/use-user-settings";
import { Trash2 } from "lucide-react";
import { z } from "zod";

type ConfirmDeleteDataProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const confimToDeleteSchema = z.object({
    confirmText: z.literal(['HAPUS SEMUA', ''], { error: 'Ketik HAPUS SEMUA untuk melanjutkan' }),
    deletePassword: z.string().min(1, 'Masukkan password akun Anda'),
})

type ConfimToDeleteValues = z.infer<typeof confimToDeleteSchema>

export function ConfirmDeleteData({ open, onOpenChange }: ConfirmDeleteDataProps) {
    const { purgeDeleteData } = useUserSettings();

    return (
        <ConfirmDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Hapus Semua Data?"
            description="Tindakan ini tidak dapat diurungkan. Seluruh transaksi, anggaran, kategori, analisis, dan pencapaian Anda akan dihapus permanen. Akun Anda tetap aktif."
            icon={<Trash2 className="w-6 h-6 text-destructive" />}
            confirmLabel="Hapus Permanen"
            confirmVariant="destructive"
            confirmDisabled={false}
            confirmLoading={purgeDeleteData.isPending}
            confirmLoadingLabel="Menghapus..."
            preventCloseOnConfirm
            confirmToForm="confirm-delete-data"
        >
            <div className="space-y-3 mt-2">
                {/* What will be deleted */}
                <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-3 space-y-1.5">
                    <p className="text-xs font-semibold text-destructive">Yang akan dihapus:</p>
                    <ul className="space-y-1">
                        {[
                            'Semua transaksi pemasukan & pengeluaran',
                            'Kategori dan anggaran bulanan',
                            'Hasil analisis AI & clustering',
                            'Riwayat notifikasi',
                            'Badge & pencapaian gamifikasi'
                        ].map((item) => (
                            <li key={item} className="text-xs text-destructive/80 flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-destructive/60 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <ReusableForm<ConfimToDeleteValues>
                    id="confirm-delete-data"
                    hideSubmitButton
                    schema={confimToDeleteSchema}
                    onSubmit={async (values) => {
                        await purgeDeleteData.mutateAsync(values.deletePassword)
                        onOpenChange(false)
                    }}
                    fields={[
                        {
                            name: 'confirmText',
                            type: 'text',
                            label: 'Ketik HAPUS SEMUA untuk melanjutkan:',
                            placeholder: 'HAPUS SEMUA',
                            autoComplete: 'off',
                            autoFocus: true
                        },
                        {
                            name: 'deletePassword',
                            type: 'password',
                            label: 'Password akun Anda:',
                            placeholder: 'Masukkan password',
                            autoComplete: 'current-password',
                        },
                    ]}
                    defaultValues={{
                        confirmText: '',
                        deletePassword: '',
                    }}
                />
            </div>

        </ConfirmDialog>
    )
}
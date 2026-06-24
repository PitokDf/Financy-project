'use client'

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ReusableForm } from "@/components/ui/reuseable-form";
import { useUserSettings } from "@/hooks/use-user-settings";
import { Trash2 } from "lucide-react";
import { z } from "zod";
import { useTranslations } from "next-intl";

type ConfirmDeleteDataProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ConfirmDeleteData({ open, onOpenChange }: ConfirmDeleteDataProps) {
    const { purgeDeleteData } = useUserSettings();
    const t = useTranslations('profileEdit');

    const confirmKeyword = t('typePlaceholder');

    const confimToDeleteSchema = z.object({
        confirmText: z.literal([confirmKeyword, ''], { error: t('confirmTextValidation') }),
        deletePassword: z.string().min(1, t('passwordValidation')),
    });

    type ConfimToDeleteValues = z.infer<typeof confimToDeleteSchema>;

    const toBeDeletedList = [
        t('toBeDeletedList.0' as any),
        t('toBeDeletedList.1' as any),
        t('toBeDeletedList.2' as any),
        t('toBeDeletedList.3' as any),
        t('toBeDeletedList.4' as any),
    ];

    return (
        <ConfirmDialog
            open={open}
            onOpenChange={onOpenChange}
            title={t('deleteTitle')}
            description={t('deleteSubtitle')}
            icon={<Trash2 className="w-6 h-6 text-destructive" />}
            confirmLabel={t('deletePermanently')}
            confirmVariant="destructive"
            confirmDisabled={false}
            confirmLoading={purgeDeleteData.isPending}
            confirmLoadingLabel={t('deleting')}
            preventCloseOnConfirm
            confirmToForm="confirm-delete-data"
        >
            <div className="space-y-3 mt-2">
                {/* What will be deleted */}
                <div className="rounded-lg bg-destructive/5 border border-destructive/20 p-3 space-y-1.5">
                    <p className="text-xs font-semibold text-destructive">{t('toBeDeleted')}</p>
                    <ul className="space-y-1">
                        {toBeDeletedList.map((item) => (
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
                            label: t('typeToDelete'),
                            placeholder: t('typePlaceholder'),
                            autoComplete: 'off',
                            autoFocus: true
                        },
                        {
                            name: 'deletePassword',
                            type: 'password',
                            label: t('passwordLabel'),
                            placeholder: t('passwordPlaceholder'),
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
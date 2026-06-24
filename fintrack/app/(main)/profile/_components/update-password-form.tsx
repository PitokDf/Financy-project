'use client';

import { ReusableForm } from '@/components/ui/reuseable-form';
import { useAuth } from '@/hooks/use-auth';
import { Lock } from 'lucide-react';
import z from 'zod';
import { useTranslations } from 'next-intl';

export function UpdatePasswordForm() {
    const { changePasswordMutation } = useAuth();
    const t = useTranslations('profileEdit');

    const updatePasswordSchema = z.object({
        currentPassword: z.string().min(6, t('minCharacters', { count: 6 })),
        newPassword: z.string().min(6, t('minCharacters', { count: 6 })),
        confirmPassword: z.string()
    }).superRefine((value, ctx) => {
        if (value.currentPassword === value.newPassword) {
            ctx.addIssue({
                path: ['newPassword'],
                message: t('passwordSameAsOld'),
                code: z.ZodIssueCode.custom
            });
        }

        if (value.newPassword !== value.confirmPassword) {
            ctx.addIssue({
                path: ['confirmPassword'],
                message: t('passwordMismatch'),
                code: z.ZodIssueCode.custom
            })
        }
    });

    type UpdatePasswordValues = z.infer<typeof updatePasswordSchema>;

    return (
        <ReusableForm<UpdatePasswordValues>
            fields={[
                {
                    label: t('currentPassword'),
                    name: 'currentPassword',
                    placeholder: t('currentPasswordPlaceholder'),
                    type: 'password',
                    icon: Lock
                },
                {
                    label: t('newPassword'),
                    name: 'newPassword',
                    placeholder: t('newPasswordPlaceholder'),
                    type: 'password',
                    icon: Lock
                },
                {
                    label: t('confirmPassword'),
                    name: 'confirmPassword',
                    placeholder: t('confirmPasswordPlaceholder'),
                    type: 'password',
                    icon: Lock
                }
            ]}
            defaultValues={{ confirmPassword: '', currentPassword: '', newPassword: '' }}
            schema={updatePasswordSchema}
            onSubmit={changePasswordMutation}
            submitText={t('changePassword')}
        />
    );
}
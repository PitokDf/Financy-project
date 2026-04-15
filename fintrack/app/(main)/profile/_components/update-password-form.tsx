import { ReusableForm } from '@/components/ui/reuseable-form';
import { useAuth } from '@/hooks/use-auth';
import { Lock } from 'lucide-react';
import z from 'zod'

const updatePasswordSchema = z.object({
    currentPassword: z.string().min(6, 'Minimal 6 karakter'),
    newPassword: z.string().min(6, 'Minimal 6 karakter'),
    confirmPassword: z.string()
}).superRefine((value, ctx) => {
    if (value.currentPassword === value.newPassword) {
        ctx.addIssue({
            path: ['newPassword'],
            message: 'Password baru harus berbeda dari password lama',
            code: z.ZodIssueCode.custom
        });
    }

    if (value.newPassword !== value.confirmPassword) {
        ctx.addIssue({
            path: ['confirmPassword'],
            message: 'Konfirmasi password tidak sama',
            code: z.ZodIssueCode.custom
        })
    }
})

export type UpdateProfileValues = z.Infer<typeof updatePasswordSchema>

export function UpdatePasswordForm() {
    const {changePasswordMutation} = useAuth()
    return (
        <ReusableForm<UpdateProfileValues>
            fields={[
                {
                    label: 'Kata Sandi Saat Ini',
                    name: 'currentPassword',
                    placeholder: 'Masukkan kata sandi saat ini',
                    type: 'password',
                    icon: Lock
                },
                {
                    label: 'Kata Sandi Saat Baru',
                    name: 'newPassword',
                    placeholder: 'Minimal 6 karakter',
                    type: 'password',
                    icon: Lock
                },
                {
                    label: 'Ulangi Kata Sandi Baru',
                    name: 'confirmPassword',
                    placeholder: 'Ulangi kata sandi baru',
                    type: 'password',
                    icon: Lock
                }
            ]}
            defaultValues={{ confirmPassword: '', currentPassword: '', newPassword: '' }}
            schema={updatePasswordSchema}
            onSubmit={changePasswordMutation}
            submitText={'Ubah Kata Sandi'}
        />
    )
}
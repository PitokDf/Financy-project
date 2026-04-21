import { ReusableForm } from '@/components/ui/reuseable-form';
import { useAuth } from '@/hooks/use-auth';
import { User, Mail } from 'lucide-react';
import z from 'zod'

const updateProfileSchema = z.object({
    name: z.string().min(3, 'Minimal 3 karakter'),
    email: z.string().email('Email tidak valid').optional().or(z.literal('')),
});

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

interface UpdateProfileFormProps {
    initialData?: {
        name: string;
        email?: string;
    }
}

export function UpdateProfileForm({ initialData }: UpdateProfileFormProps) {
    const { updateProfileMutation } = useAuth();

    return (
        <ReusableForm<UpdateProfileValues>
            fields={[
                {
                    label: 'Nama Lengkap',
                    name: 'name',
                    placeholder: 'Masukkan nama lengkap Anda',
                    type: 'text',
                    icon: User
                },
                {
                    label: 'Alamat Email',
                    name: 'email',
                    placeholder: 'Masukkan alamat email Anda',
                    type: 'email',
                    icon: Mail
                }
            ]}
            defaultValues={{
                name: initialData?.name || '',
                email: initialData?.email || ''
            }}
            schema={updateProfileSchema}
            onSubmit={(values) => updateProfileMutation({ ...values, email: values.email || undefined })}
            submitText={'Simpan Perubahan'}
        />
    )
}

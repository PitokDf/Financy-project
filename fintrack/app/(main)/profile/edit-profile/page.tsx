'use client';

import { Card, CardContent } from '@/components/ui/card';
import { UserCircle, Loader2 } from 'lucide-react';
import { UpdateProfileForm } from '../_components/update-profile-form';
import { useAuth } from '@/hooks/use-auth';
import { useTranslations } from 'next-intl';

export default function EditProfilePage() {
    const { profileQuery } = useAuth();
    const t = useTranslations('profileEdit');
    
    if (profileQuery.isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
        )
    }

    return (
        <div className="animate-fade-in space-y-4">
            {/* Profile Info Card */}
            <Card className="border-border/50 py-0 shadow-none">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <UserCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-foreground">
                                {t('personalInfo')}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {t('profileDesc')}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            <UpdateProfileForm initialData={profileQuery.data?.data} />
        </div>
    );
}
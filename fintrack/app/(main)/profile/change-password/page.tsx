'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

import { UpdatePasswordForm } from '../_components/update-password-form';

export default function ChangePasswordPage() {
    return (
        <div className="animate-fade-in space-y-4">
            {/* Security Info */}
            <Card className="border-border/50 py-0 shadow-none">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Shield className="w-4 h-4 text-primary" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-foreground">
                                Keamanan Akun
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Pastikan kata sandi baru Anda kuat dan berbeda dari kata sandi sebelumnya.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <UpdatePasswordForm />
        </div>
    );
}
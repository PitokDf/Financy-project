'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Camera, Save, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/lib/zustand/auth-store';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/types';

export default function EditProfilePage() {
    const router = useRouter();
    const { user, updateUser } = useAuthStore();
    const { updateProfileMutation } = useAuth();

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const initials = user?.name
        ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
        : 'FT';

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error('Nama tidak boleh kosong');
            return;
        }

        if (!formData.email.trim()) {
            toast.error('Email tidak boleh kosong');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Format email tidak valid');
            return;
        }

        setIsLoading(true);
        try {
            const result = await updateProfileMutation({
                name: formData.name.trim(),
                email: formData.email.trim(),
            });

            updateUser(result);
            toast.success('Profil berhasil diperbarui');
            router.back();
        } catch (error) {
            const errors = error as unknown as AxiosError<ErrorResponse>
            toast.error(errors.response?.data?.message || 'Gagal memperbarui profil');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="animate-fade-in space-y-4">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <Avatar className="w-20 h-20 border-3 border-background shadow-lg ring-2 ring-primary/20">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-black">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <button
                            type="button"
                            className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
                            onClick={() => toast.info('Fitur upload foto dalam pengembangan')}
                        >
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                        Ketuk ikon kamera untuk mengubah foto profil
                    </p>
                </div>

                {/* Form Fields */}
                <Card className="border-border/50 py-0 shadow-none">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">Informasi Pribadi</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">
                                Nama Lengkap
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="Masukkan nama lengkap"
                                className="h-11"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="Masukkan alamat email"
                                className="h-11"
                                disabled={isLoading}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="space-y-3">
                    <Button
                        type="submit"
                        className="w-full h-12 rounded-xl font-semibold"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 mr-2" />
                                Simpan Perubahan
                            </>
                        )}
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full h-12 rounded-xl"
                        onClick={() => router.back()}
                        disabled={isLoading}
                    >
                        Batal
                    </Button>
                </div>
            </form>
        </div>
    );
}
'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/zustand/auth-store';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, Star, Flame, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { useEffect, useState } from 'react';
import { MenuSection } from './_components/menu-section';
import { useAuth } from '@/hooks/use-auth';
import { useGamification } from '@/hooks/use-gamification';
import Link from 'next/link';
import ProfileSkeleton from './_components/skeleton';

export default function ProfilePage() {
    const { user, logout, updateUser } = useAuthStore();
    const { logoutMutation, logoutLoading, profileQuery, loadingQuery } = useAuth();
    const { stats, progressToNextLevel, xpToNextLevel } = useGamification()
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (profileQuery.data) {
            updateUser(profileQuery.data);
        }
    }, [profileQuery.data, updateUser]);

    const initials = user?.name
        ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
        : 'FT';

    const joinDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
        : 'Baru saja';

    if (loadingQuery) return <ProfileSkeleton />

    const handleLogout = async () => {
        try {
            await logoutMutation();
            logout();
            router.replace('/login');
        } catch (error) {
            console.error(error);
        }
    };

    const userLevel = stats?.level ?? 1;
    const userStreak = stats?.streak ?? 0;
    const userBadgeCount = user?.badgeCount ?? 0;

    const STATS = [
        { label: 'Level', value: userLevel.toString(), icon: Star, color: 'text-amber-500' },
        { label: 'Streak', value: userStreak.toString(), icon: Flame, color: 'text-orange-500' },
        { label: 'Badge', value: userBadgeCount.toString(), icon: Award, color: 'text-primary', link: '/achievements' },
    ];

    return (
        <>
            <div className="animate-fade-in space-y-5">
                <Card className="border-border/50 py-0 shadow-none overflow-hidden">
                    <div className="gradient-primary h-20 z-0 relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    </div>
                    <CardContent className="px-4 pb-4 z-1 -mt-14">
                        <div className="flex items-end gap-3">
                            <div className="relative">
                                <Avatar className="w-16 h-16 border-3 border-background shadow-lg ring-2 ring-primary/20">
                                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-black">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                                {/* Level Badge Overlay */}
                                <div className="absolute -bottom-2 -right-1 bg-amber-500 border-2 border-background text-white text-[10px] font-black px-1.5 py-0.5 rounded-lg shadow-sm shadow-amber-500/40 transform rotate-[-5deg]">
                                    Lv.{userLevel}
                                </div>
                            </div>
                            <div className="flex-1 pb-1">
                                <h2 className="font-bold text-lg text-white leading-tight">{user?.name ?? 'Pengguna'}</h2>
                                <p className="text-xs text-muted-foreground">{user?.email}</p>
                            </div>
                        </div>

                        <div className="mt-4 bg-muted/30 p-3 rounded-2xl border border-border/50 shadow-inner">
                            <div className="flex justify-between items-center mb-1.5">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Progress ke Level {userLevel + 1}</span>
                                <span className="text-[10px] font-black text-primary">{Math.round(progressToNextLevel)}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden border border-border/50">
                                <div
                                    className="h-full gradient-primary transition-all duration-1000 ease-out relative"
                                    style={{ width: `${progressToNextLevel}%` }}
                                >
                                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                </div>
                            </div>
                            <p className="text-[9px] text-muted-foreground text-center mt-1.5 font-medium">
                                Butuh {xpToNextLevel} XP lagi untuk naik level
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border/50">
                            {STATS.map(({ label, value, icon: Icon, color, link }) =>
                                link ? (
                                    <Link href={link} key={label} className="flex flex-col items-center gap-1">
                                        <div className={cn('flex items-center gap-1', color)}>
                                            <Icon className="w-3.5 h-3.5" />
                                            <span className="text-base font-black text-foreground">{value}</span>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground">{label}</span>
                                    </Link>
                                ) : (
                                    <div key={label} className="flex flex-col items-center gap-1">
                                        <div className={cn('flex items-center gap-1', color)}>
                                            <Icon className="w-3.5 h-3.5" />
                                            <span className="text-base font-black text-foreground">{value}</span>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground">{label}</span>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>

                <MenuSection />

                <Button
                    variant="outline"
                    className="w-full h-12 rounded-xl border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground font-semibold transition-colors"
                    onClick={() => setShowLogoutDialog(prev => !prev)}
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar dari Akun
                </Button>

                <p className="text-center text-xs text-muted-foreground pb-2">
                    FinTrack v1.0.0
                </p>
            </div>

            <ConfirmDialog
                open={showLogoutDialog}
                onOpenChange={setShowLogoutDialog}
                title="Keluar dari Akun?"
                description="Anda harus masuk kembali untuk mencatat dan mengakses data transaksi keuangan Anda."
                icon={<LogOut className="w-6 h-6 text-red-500" />}
                confirmLabel="Ya, Keluar"
                confirmVariant="destructive"
                onConfirm={handleLogout}
                confirmLoading={logoutLoading}
            />
        </>
    );
}


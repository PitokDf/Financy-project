'use client';

import { Bell, Moon, Sun, ChevronLeft } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/zustand/auth-store';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { usePathname, useRouter } from 'next/navigation';

interface HeaderProps {
    title?: string;
    showAvatar?: boolean;
    back?: boolean;
    onBack?: () => void;
    className?: string;
    showThemeToggle?: boolean;
    showNotification?: boolean;
    showProfile?: boolean;
    notificationCount?: number;
    notificationPath?: string;
    profilePath?: string;
    onNotificationClick?: () => void;
    onProfileClick?: () => void;
}

const ROUTE_TITLES: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/transactions': 'Transaksi',
    '/analysis': 'Analisis Pola',
    '/analysis/lab': 'AI Lab',
    '/budget': 'Anggaran Bulanan',
    '/notifications': 'Notifikasi',
    '/achievements': 'Pencapaian',
    '/profile/change-password': 'Ganti Password',
    '/profile/edit-profile': 'Edit Profil',
    '/profile/help': 'Bantuan & Dukungan',
};

export function Header({
    title,
    showAvatar = true,
    back,
    onBack,
    className,
    showThemeToggle = true,
    showNotification,
    showProfile,
    notificationCount = 1,
    notificationPath = '/notifications',
    profilePath = '/profile',
    onNotificationClick,
    onProfileClick,
}: HeaderProps) {
    const { theme, setTheme } = useTheme();
    const { user } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    const resolvedTitle = title ?? ROUTE_TITLES[pathname] ?? 'FinTrack';
    const enableNotification = showNotification ?? showAvatar;
    const enableProfile = showProfile ?? showAvatar;

    const initials = user?.name
        ? user.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        : 'FT';

    const greeting = (() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Selamat pagi';
        if (hour < 15) return 'Selamat siang';
        if (hour < 18) return 'Selamat sore';
        return 'Selamat malam';
    })();

    const handleBack = () => {
        if (onBack) {
            onBack();
            return;
        }

        if (window.history.length > 1) {
            router.back();
            return;
        }

        router.replace('/dashboard');
    };

    const handleNotificationClick = () => {
        if (onNotificationClick) {
            onNotificationClick();
            return;
        }

        router.push(notificationPath);
    };

    const handleProfileClick = () => {
        if (onProfileClick) {
            onProfileClick();
            return;
        }

        router.push(profilePath);
    };

    return (
        <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${className ?? ''}`}>
            {/* Glass Container with Safe Top Padding */}
            <div className="glass border-b border-border/40 px-4 safe-top shadow-sm shadow-black/5">
                <div className="relative flex h-14 items-center justify-between">
                    {/* Left & Center Section */}
                    <div className={cn(
                        "flex items-center gap-3",
                        back ? "flex-1" : "flex-1"
                    )}>
                        {back ? (
                            <>
                                <div className="flex min-w-[3rem] items-center">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="w-10 h-10 rounded-full shrink-0 -ml-2 hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all"
                                        onClick={handleBack}
                                        aria-label="Kembali"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </Button>
                                </div>
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none w-full max-w-[60%]">
                                    <h1 className="text-base font-bold text-foreground tracking-tight truncate px-4 animate-in fade-in zoom-in-95 duration-300">
                                        {resolvedTitle}
                                    </h1>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-500">
                                {showAvatar && !title && pathname === '/dashboard' ? (
                                    <div>
                                        <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground/80 leading-tight">
                                            {greeting} <span className="inline-block origin-[70%_70%] animate-wave text-lg">👋</span>,
                                        </span>
                                        <h1 className="text-sm font-bold text-foreground leading-tight truncate">
                                            {user?.name ?? 'Pengguna'}
                                        </h1>
                                    </div>
                                ) : (
                                    <h1 className="text-lg font-bold text-foreground tracking-tight">
                                        {resolvedTitle}
                                    </h1>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-end gap-1.5 min-w-[3rem]">
                        {showThemeToggle && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-9 h-9 rounded-full hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all"
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                aria-label="Toggle tema"
                            >
                                <Sun className="w-[1.2rem] h-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            </Button>
                        )}

                        {enableNotification && (
                            <Button
                                onClick={handleNotificationClick}
                                variant="ghost"
                                size="icon"
                                className="w-9 h-9 rounded-full relative hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-all"
                                aria-label="Notifikasi"
                            >
                                <Bell className="w-[1.1rem] h-[1.1rem]" />
                                {notificationCount > 0 && (
                                    <span className="absolute top-2 right-2 w-2 h-2 bg-destructive border-2 border-background rounded-full" />
                                )}
                            </Button>
                        )}

                        {enableProfile && (
                            <div className="ml-1 active:scale-90 transition-transform cursor-pointer" onClick={handleProfileClick}>
                                <Avatar className="w-8 h-8 ring-2 ring-primary/10 hover:ring-primary/30 transition-all">
                                    <AvatarFallback className="bg-primary text-primary-foreground text-[10px] font-black">
                                        {initials}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
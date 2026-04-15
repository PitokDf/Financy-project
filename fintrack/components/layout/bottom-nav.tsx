'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ArrowLeftRight, BarChart3, Target, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
    { label: 'Beranda', href: '/dashboard', icon: Home },
    { label: 'Transaksi', href: '/transactions', icon: ArrowLeftRight },
    { label: 'Analisis', href: '/analysis', icon: BarChart3 },
    { label: 'Anggaran', href: '/budget', icon: Target },
    { label: 'Profil', href: '/profile', icon: User },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 safe-bottom">
            <div className="glass border-t border-border/40 shadow-[0_-1px_3px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-around px-2 h-16">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'group relative flex flex-col items-center justify-center min-w-[64px] h-full transition-all duration-300 active:scale-90',
                                    isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                                )}
                                aria-label={item.label}
                            >
                                {/* Active Indicator Pill */}
                                <div
                                    className={cn(
                                        'relative flex items-center justify-center w-14 h-8 transition-all duration-300 rounded-2xl mb-1',
                                        isActive ? 'bg-primary/15' : 'bg-transparent group-hover:bg-primary/5'
                                    )}
                                >
                                    <Icon
                                        className={cn(
                                            'w-5 h-5 transition-all duration-300',
                                            isActive ? 'stroke-[2.5] scale-110' : 'stroke-[1.8]'
                                        )}
                                    />
                                    
                                    {/* Small notification dot placeholder if needed in future */}
                                </div>

                                <span
                                    className={cn(
                                        'text-[10px] font-bold tracking-tight transition-all duration-300',
                                        isActive ? 'opacity-100' : 'opacity-60 text-[9px] font-medium'
                                    )}
                                >
                                    {item.label}
                                </span>

                                {/* Bottom Dot for Active State */}
                                {isActive && (
                                    <span className="absolute bottom-1 w-1 h-1 bg-primary rounded-full animate-in fade-in zoom-in-50 duration-500" />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}

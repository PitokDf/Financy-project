'use client'

import { BottomNav } from '@/components/layout/bottom-nav';
import { Header } from '@/components/layout/header';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useNotifications } from '@/hooks/use-notifications';

const BOTTOM_NAV_HIDDEN_ROUTE = ['/notifications', '/achievements', '/profile/change-password']
const HEADER_HIDDEN_ROUTE = ['/profile']
const HEADER_HIDDEN_PREFIX = ['/transactions/create']

const HEADER_WITH_AVATAR_ROUTE = ['/dashboard'];
const HEADER_WITH_BACK_ROUTE = ['/notifications', '/analysis/lab', '/achievements', '/profile/change-password'];

const isHiddenByRules = (pathname: string, exactRoutes: string[], prefixRoutes: string[]) => {
    return exactRoutes.includes(pathname) || prefixRoutes.some((prefix) => pathname.startsWith(prefix));
};

export function MainLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const showAvatar = HEADER_WITH_AVATAR_ROUTE.includes(pathname);
    const showNotification = pathname !== '/notifications';
    const showBack = HEADER_WITH_BACK_ROUTE.includes(pathname);
    const hideHeader = isHiddenByRules(pathname, HEADER_HIDDEN_ROUTE, HEADER_HIDDEN_PREFIX);
    const { unreadCount } = useNotifications();

    return (
        <div className="min-h-dvh flex flex-col bg-background">
            {!hideHeader && (
                <Header
                    back={showBack}
                    showAvatar={showAvatar}
                    notificationCount={unreadCount}
                    showNotification={showNotification}
                />
            )}
            <main className="flex-1 px-4 animate-in fade-in duration-500 pt-4 pb-20">
                {children}
            </main>
            {!BOTTOM_NAV_HIDDEN_ROUTE.includes(pathname) && <BottomNav />}
        </div>
    );
}

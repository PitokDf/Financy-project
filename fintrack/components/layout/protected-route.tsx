'use client';

import { useAuthStore } from '@/lib/zustand/auth-store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axiosClient from '@/lib/api/client';
import type { User } from '@/types';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, isAuthenticated, setAuth } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(!isAuthenticated);

    useEffect(() => {
        let cancelled = false;

        async function fetchProfile() {
            try {
                const res = await axiosClient.get('/users/me') as any;
                const userData = res?.data || res;
                if (!cancelled) {
                    setAuth(userData as User);
                }
            } catch {
                if (!cancelled) {
                    const redirect = encodeURIComponent(pathname);
                    router.replace(`/login?redirect=${redirect}`);
                }
            }
        }

        if (isAuthenticated && user) {
            fetchProfile();
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        fetchProfile().finally(() => {
            if (!cancelled) setIsLoading(false);
        });

        return () => { cancelled = true; };
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-dvh flex items-center justify-center bg-background">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
}

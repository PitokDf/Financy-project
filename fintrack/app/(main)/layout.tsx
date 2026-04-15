import { ProtectedRoute } from '@/components/layout/protected-route';
import { MainLayoutClient } from '@/components/layout/main-layout-client';
import React from 'react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <MainLayoutClient>
                {children}
            </MainLayoutClient>
        </ProtectedRoute>
    );
}

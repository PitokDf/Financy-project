"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { registerQueryClient } from "@/lib/query-cache";
import { OfflineSyncProvider } from "./offline-sync-provider";
import { PrefetchProvider } from "./prefetch-provider";

const STALE_TIME = {
    categories: 60 * 60 * 1000,
    dashboard: 5 * 60 * 1000,
    transactions: 2 * 60 * 1000,
    notifications: 30 * 1000,
    budgets: 5 * 60 * 1000,
    gamification: 10 * 60 * 1000,
    analysis: 10 * 60 * 1000,
    scheduledExpenses: 5 * 60 * 1000,
};

function getStaleTime(queryKey: string[]): number {
    const key = queryKey[0];
    switch (key) {
        case 'categories':
            return STALE_TIME.categories;
        case 'dashboard-stats':
            return STALE_TIME.dashboard;
        case 'transactions':
            return STALE_TIME.transactions;
        case 'notifications':
            return STALE_TIME.notifications;
        case 'budgets':
            return STALE_TIME.budgets;
        case 'user-stats':
        case 'user-badges':
        case 'user-challenges':
        case 'all-badges':
            return STALE_TIME.gamification;
        case 'analysis':
            return STALE_TIME.analysis;
        case 'scheduled-expenses':
            return STALE_TIME.scheduledExpenses;
        default:
            return 2 * 60 * 1000;
    }
}

export function QueryClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [client] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: 1,
                        refetchOnWindowFocus: false,
                        refetchOnReconnect: true,
                        gcTime: 30 * 60 * 1000,
                        staleTime: 2 * 60 * 1000,
                    },
                    mutations: {
                        retry: 1,
                    },
                },
            })
    );

    useEffect(() => {
        registerQueryClient(client);
    }, [client]);

    return (
        <QueryClientProvider client={client}>
            <OfflineSyncProvider>
                <PrefetchProvider>
                    {children}
                </PrefetchProvider>
            </OfflineSyncProvider>
        </QueryClientProvider>
    );
}
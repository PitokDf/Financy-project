"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { OfflineSyncProvider } from "./offline-sync-provider";

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
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={client}>
            <OfflineSyncProvider>
                {children}
            </OfflineSyncProvider>
        </QueryClientProvider>
    );
}
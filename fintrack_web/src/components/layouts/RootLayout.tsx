'use client'

import { AuthProvider } from "@/providers/auth-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
    const [client] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={client}>
            <AuthProvider>
                {children}
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
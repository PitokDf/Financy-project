'use client'

import { useAuthStore } from "@/stores/auth-store";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode
}

const DefaultFallback = () => (
    <div className="flex min-h-dvh items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <span className="h-7 w-7 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <p className="text-sm font-medium">Memeriksa sesi...</p>
        </div>
    </div>
)

export function AuthGuard({ children, fallback }: AuthGuardProps) {
    const router = useRouter()
    const pathname = usePathname()
    const status = useAuthStore(s => s.status)
    const initialized = useAuthStore(s => s.initialized)

    useEffect(() => {
        if (!initialized) {
            return
        }

        if (status === 'unauthenticated') {
            router.replace(`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`)
        }
    }, [initialized, status, router, pathname])

    if (!initialized) return <>{fallback ?? <DefaultFallback />}</>
    if (status !== 'authenticated') return <>{fallback ?? <DefaultFallback />}</>
    return <>{children}</>
}
'use client'

import { clearTokens } from "@/lib/auth-token";
import { getCurrentUser } from "@/service/auth-service";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const setSession = useAuthStore(s => s.setSession)
    const clearSession = useAuthStore(s => s.clearSession)
    const setInitialized = useAuthStore(s => s.setInitialized)
    const router = useRouter()

    useEffect(() => {
        async function initializeSession() {
            try {
                const user = await getCurrentUser()
                setSession(user)
            } catch {
                clearSession()
            } finally {
                setInitialized(true)
            }
        }

        initializeSession()
    }, [setSession, clearSession, setInitialized])

    useEffect(() => {
        const handleLogout = () => {
            clearTokens()
            clearSession()
            router.replace("/auth/login")
        }

        window.addEventListener("auth:logout", handleLogout)
        return () => window.removeEventListener("auth:logout", handleLogout)
    }, [clearSession, router])

    return <>{children}</>
}
import { SessionUser } from "@/service/auth-service";
import { create } from "zustand"

type AuthStatus = "idle" | "authenticated" | "unauthenticated"

interface AuthState {
    user: SessionUser | null,
    status: AuthStatus,
    initialized: boolean
}
interface AuthActions {
    setSession: (user: SessionUser | null) => void;
    clearSession: () => void;
    setInitialized: (value: boolean) => void;
}
export const useAuthStore = create<AuthState & AuthActions>()((set) => ({
    status: 'idle',
    user: null,
    initialized: false,

    setSession: (user) => set({ user, status: user ? 'authenticated' : 'unauthenticated' }),
    clearSession: () => set({ user: null, status: 'unauthenticated' }),
    setInitialized: (value) => set({ initialized: value })
}))
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { AuthState, User } from "@/types";
import { deleteDB, pullOnLogin, getDB } from "@/lib/offline/db";
import { clearQueryCache } from "@/lib/query-cache";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      setAuth: (user: User) => {
        clearQueryCache();
        set({ user, isAuthenticated: true });

        // Initialize DB and pull data on login
        if (user?.id) {
          getDB(user.id);
          pullOnLogin(user.id, async (url) => {
            const { default: axiosClient } = await import("@/lib/api/client");
            return axiosClient.get(url);
          }).catch(console.error);
        }
      },

      logout: async () => {
        const currentUser = get().user;
        clearQueryCache();
        if (currentUser?.id) {
          await deleteDB(currentUser.id).catch(console.error);
        }
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },

      refreshUser: async () => {
        set({ loading: true });
        try {
          const { default: axiosClient } = await import("@/lib/api/client");
          const res = (await axiosClient.get("/users/me")) as any;
          const userData = res?.data || res;
          const { setLocaleCookie } = await import("@/lib/locale-cookie");
          if (userData?.language) {
            setLocaleCookie(userData.language);
          }
          set({
            user: userData as User,
            isAuthenticated: true,
            loading: false,
          });
        } catch {
          set({ user: null, isAuthenticated: false, loading: false });
        }
      },
    }),
    {
      name: "fintrack-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/lib/api/client";
import { cacheResponse, getCachedResponse } from "@/lib/offline/db";
import { useAuthStore } from "@/lib/zustand/auth-store";

export interface UserStats {
    xp: number;
    level: number;
    streak: number;
    longestStreak: number;
    totalTransactions: number;
    lastTransactionAt?: string;
}

export interface UserBadge {
    id: string;
    badge: {
        id: string;
        name: string;
        description: string;
        icon: string;
        color: string;
    };
    unlockedAt: string;
}

export interface UserChallenge {
    id: string;
    current: number;
    isCompleted: boolean;
    deadline: string;
    challenge: {
        id: string;
        title: string;
        description: string;
        target: number;
        xpReward: number;
        type: string;
    };
}

export interface Badges {
    id: string
    name: string
    description: string
    icon: string
    condition: string
    xpReward: number
    color: string
    createdAt: string
}

export function useGamification() {
    const { user } = useAuthStore();
    const userId = user?.id || "guest";

    const getAllBadges = useQuery({
        queryKey: ['all-badges'],
        queryFn: async () => {
            try {
                const res = await axiosClient.get("/gamification/badges/all");
                const data = (res.data as Badges[]) || [];
                await cacheResponse(userId, '/api/gamification/badges/all', data);
                return data;
            } catch (error) {
                const cached = await getCachedResponse(userId, '/api/gamification/badges/all');
                if (cached) return cached.data as Badges[];
                throw error;
            }
        },
    });

    const statsQuery = useQuery({
        queryKey: ['user-stats'],
        queryFn: async () => {
            try {
                const res = await axiosClient.get("/gamification/stats");
                const data = res.data as UserStats;
                if (data) {
                    try { await cacheResponse(userId, '/api/gamification/stats', data); } catch {}
                }
                return data ?? { xp: 0, level: 1, streak: 0, longestStreak: 0, totalTransactions: 0 };
            } catch (error) {
                try {
                    const cached = await getCachedResponse(userId, '/api/gamification/stats');
                    if (cached) return cached.data as UserStats;
                } catch {}
                return { xp: 0, level: 1, streak: 0, longestStreak: 0, totalTransactions: 0 };
            }
        },
        placeholderData: {
            xp: 0,
            level: 1,
            streak: 0,
            longestStreak: 0,
            totalTransactions: 0
        }
    });

    const badgesQuery = useQuery({
        queryKey: ['user-badges'],
        queryFn: async () => {
            try {
                const res = await axiosClient.get("/gamification/badges");
                const data = (res.data as UserBadge[]) || [];
                await cacheResponse(userId, '/api/gamification/badges', data);
                return data;
            } catch (error) {
                const cached = await getCachedResponse(userId, '/api/gamification/badges');
                if (cached) return cached.data as UserBadge[];
                throw error;
            }
        },
        initialData: []
    });

    const challengesQuery = useQuery({
        queryKey: ['user-challenges'],
        queryFn: async () => {
            try {
                const res = await axiosClient.get("/gamification/challenges");
                const data = (res.data as UserChallenge[]) || [];
                await cacheResponse(userId, '/api/gamification/challenges', data);
                return data;
            } catch (error) {
                const cached = await getCachedResponse(userId, '/api/gamification/challenges');
                if (cached) return cached.data as UserChallenge[];
                throw error;
            }
        },
        initialData: []
    });

    const xpToNextLevel = ((statsQuery.data?.level || 1) ** 2) * 100;
    const progressToNextLevel = statsQuery.data ? (statsQuery.data.xp / xpToNextLevel) * 100 : 0;

    return {
        allBadges: getAllBadges.data,
        stats: statsQuery.data,
        badges: badgesQuery.data,
        challenges: challengesQuery.data,
        isLoading: statsQuery.isLoading || badgesQuery.isLoading || challengesQuery.isLoading || getAllBadges.isPending,
        xpToNextLevel,
        progressToNextLevel
    };
}

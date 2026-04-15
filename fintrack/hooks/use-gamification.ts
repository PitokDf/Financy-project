import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/lib/api/client";

export interface UserStats {
    xp: number;
    level: number;
    streak: number;
    longestStreak: number;
    totalTransactions: number;
    totalIncome: number;
    totalExpense: number;
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

export function useGamification() {
    const statsQuery = useQuery({
        queryKey: ['user-stats'],
        queryFn: async () => {
            const res = await axiosClient.get("/gamification/stats");
            return (res.data as UserStats) || null;
        },
        placeholderData: {
            xp: 0,
            level: 1,
            streak: 0,
            longestStreak: 0,
            totalTransactions: 0,
            totalIncome: 0,
            totalExpense: 0
        }
    });

    const badgesQuery = useQuery({
        queryKey: ['user-badges'],
        queryFn: async () => {
            const res = await axiosClient.get("/gamification/badges");
            return (res.data as UserBadge[]) || [];
        },
        initialData: []
    });

    const challengesQuery = useQuery({
        queryKey: ['user-challenges'],
        queryFn: async () => {
            const res = await axiosClient.get("/gamification/challenges");
            return (res.data as UserChallenge[]) || [];
        },
        initialData: []
    });

    const xpToNextLevel = ((statsQuery.data?.level || 1) ** 2) * 100;
    const progressToNextLevel = statsQuery.data ? (statsQuery.data.xp / xpToNextLevel) * 100 : 0;

    return {
        stats: statsQuery.data,
        badges: badgesQuery.data,
        challenges: challengesQuery.data,
        isLoading: statsQuery.isLoading || badgesQuery.isLoading || challengesQuery.isLoading,
        xpToNextLevel,
        progressToNextLevel
    };
}

import { UserStats } from "../generated/prisma/client";
export declare class GamificationRepository {
    getStats: (userId: string) => Promise<UserStats | null>;
    upsertStats: (userId: string, data: Partial<UserStats>) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        xp: number;
        level: number;
        streak: number;
        longestStreak: number;
        lastTransactionAt: Date | null;
        totalTransactions: number;
        totalIncome: number;
        totalExpense: number;
        hasExported: boolean;
        hasAnalyzed: boolean;
    }>;
    getAllBadges: () => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        description: string;
        color: string;
        icon: string;
        condition: string;
        xpReward: number;
    }[]>;
    getUserBadges: (userId: string) => Promise<({
        badge: {
            id: string;
            name: string;
            createdAt: Date;
            description: string;
            color: string;
            icon: string;
            condition: string;
            xpReward: number;
        };
    } & {
        id: string;
        userId: string;
        badgeId: string;
        unlockedAt: Date;
    })[]>;
    unlockBadge: (userId: string, badgeId: string) => Promise<{
        id: string;
        userId: string;
        badgeId: string;
        unlockedAt: Date;
    }>;
    getActiveChallenges: (userId: string, weekNumber: number, year: number) => Promise<({
        challenge: {
            target: number;
            id: string;
            createdAt: Date;
            description: string;
            type: import("../generated/prisma/client").ChallengeType;
            title: string;
            xpReward: number;
        };
    } & {
        id: string;
        year: number;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        challengeId: string;
        current: number;
        isCompleted: boolean;
        completedAt: Date | null;
        deadline: Date;
        weekNumber: number;
    })[]>;
    updateChallengeProgress: (userId: string, challengeId: string, progress: number) => Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload>;
    getUsersWithActiveStreak: () => Promise<({
        user: {
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        xp: number;
        level: number;
        streak: number;
        longestStreak: number;
        lastTransactionAt: Date | null;
        totalTransactions: number;
        totalIncome: number;
        totalExpense: number;
        hasExported: boolean;
        hasAnalyzed: boolean;
    })[]>;
}
//# sourceMappingURL=gamification.repository.d.ts.map
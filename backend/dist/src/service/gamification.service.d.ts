import { GamificationRepository } from "../repositories/gamification.repository";
import { UserStats } from "../generated/prisma/client";
export declare class GamificationService {
    private readonly gamificationRepo;
    private readonly XP_TRANSACTION;
    private readonly XP_ANALYSIS;
    private readonly XP_EXPORT;
    constructor(gamificationRepo: GamificationRepository);
    private calculateLevel;
    awardXP: (userId: string, amount: number, action: string) => Promise<{
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
    syncStreak: (userId: string) => Promise<UserStats | null>;
    updateStreak: (userId: string) => Promise<{
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
    } | {
        streak: number;
    }>;
    checkAndAwardBadge: (userId: string, condition: string) => Promise<void>;
    ensureWeeklyChallenges: (userId: string) => Promise<({
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
    updateChallengeProgress: (userId: string, type: string, amount?: number) => Promise<void>;
    private getWeekNumber;
}
//# sourceMappingURL=gamification.service.d.ts.map
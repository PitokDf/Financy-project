import prisma from "@/config/prisma";
import { UserStats } from "@/generated/prisma/client";

export class GamificationRepository {
    public getStats = async (userId: string): Promise<UserStats | null> => {
        return prisma.userStats.findUnique({
            where: { userId }
        });
    }

    public upsertStats = async (userId: string, data: Partial<UserStats>) => {
        return prisma.userStats.upsert({
            where: { userId },
            create: {
                userId,
                xp: data.xp || 0,
                level: data.level || 1,
                streak: data.streak || 0,
                ...data
            },
            update: data
        });
    }

    public getAllBadges = async () => {
        return prisma.badge.findMany();
    }

    public getUserBadges = async (userId: string) => {
        return prisma.userBadge.findMany({
            where: { userId },
            include: { badge: true }
        });
    }

    public unlockBadge = async (userId: string, badgeId: string) => {
        return prisma.userBadge.create({
            data: {
                userId,
                badgeId
            }
        });
    }

    public getActiveChallenges = async (userId: string, weekNumber: number, year: number) => {
        return prisma.userChallenge.findMany({
            where: {
                userId,
                weekNumber,
                year
            },
            include: { challenge: true }
        });
    }

    public updateChallengeProgress = async (userId: string, challengeId: string, progress: number) => {
        return prisma.userChallenge.updateMany({
            where: {
                userId,
                challengeId,
                isCompleted: false
            },
            data: {
                current: {
                    increment: progress
                }
            }
        });
    }

    public getUsersWithActiveStreak = async () => {
        return prisma.userStats.findMany({
            where: {
                streak: {
                    gt: 0
                },
                user: {
                    userSetting: {
                        dailyReminder: true
                    }
                }
            },
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });
    }
}

import { GamificationRepository } from "@/repositories/gamification.repository";
import { UserStats } from "@/generated/prisma/client";
import prisma from "@/config/prisma";
import { differenceInCalendarDays } from "date-fns";

export class GamificationService {
    // XP Constants
    private readonly XP_TRANSACTION = 10;
    private readonly XP_ANALYSIS = 50;
    private readonly XP_EXPORT = 20;

    constructor(private readonly gamificationRepo: GamificationRepository) { }

    private calculateLevel(xp: number): number {
        return Math.floor(Math.sqrt(xp / 100)) + 1;
    }

    public awardXP = async (userId: string, amount: number, action: string) => {
        const stats = await this.gamificationRepo.getStats(userId);
        const currentXP = stats?.xp || 0;
        const newXP = currentXP + amount;
        const newLevel = this.calculateLevel(newXP);
        const oldLevel = stats?.level || 1;

        const updatedStats = await this.gamificationRepo.upsertStats(userId, {
            xp: newXP,
            level: newLevel
        });

        if (newLevel > oldLevel) {
            await prisma.notification.create({
                data: {
                    userId,
                    title: "Level Up!",
                    message: `Selamat! Anda naik ke Level ${newLevel}.`,
                    type: "LEVEL_UP",
                    metadata: { level: newLevel, action }
                }
            });
        }

        return updatedStats;
    }

    public syncStreak = async (userId: string): Promise<UserStats | null> => {
        const stats = await this.gamificationRepo.getStats(userId);
        if (!stats || !stats.lastTransactionAt) return stats;

        const now = new Date();
        const diffDays = differenceInCalendarDays(now, stats.lastTransactionAt);

        if (diffDays > 1) {
            return await this.gamificationRepo.upsertStats(userId, {
                streak: 0
            });
        }

        return stats;
    }

    public updateStreak = async (userId: string) => {
        const stats = await this.gamificationRepo.getStats(userId);
        if (!stats) return this.awardXP(userId, this.XP_TRANSACTION, "FIRST_TRANSACTION");

        const lastTx = stats.lastTransactionAt;
        const now = new Date();

        let newStreak = stats.streak;

        if (!lastTx) {
            newStreak = 1;
        } else {
            const diffDays = differenceInCalendarDays(now, lastTx);

            if (diffDays === 1) {
                newStreak += 1;
            } else if (diffDays > 1) {
                newStreak = 1;
            }
        }

        const longestStreak = Math.max(newStreak, stats.longestStreak);

        await this.gamificationRepo.upsertStats(userId, {
            streak: newStreak,
            longestStreak,
            lastTransactionAt: now
        });

        await this.awardXP(userId, this.XP_TRANSACTION, "TRANSACTION_CREATED");

        if (newStreak === 3) await this.checkAndAwardBadge(userId, "streak_3");
        if (newStreak === 7) await this.checkAndAwardBadge(userId, "streak_7");
        if (newStreak === 30) await this.checkAndAwardBadge(userId, "streak_30");

        return { streak: newStreak };
    }

    public checkAndAwardBadge = async (userId: string, condition: string) => {
        const badges = await this.gamificationRepo.getAllBadges();
        const badge = badges.find(b => b.condition === condition);

        if (!badge) return;

        const userBadges = await this.gamificationRepo.getUserBadges(userId);
        if (userBadges.some(ub => ub.badgeId === badge.id)) return;

        await this.gamificationRepo.unlockBadge(userId, badge.id);
        await this.awardXP(userId, badge.xpReward, `BADGE_UNLOCKED_${badge.name}`);

        await prisma.notification.create({
            data: {
                userId,
                title: "Badge Baru Terbuka!",
                message: `Anda mendapatkan badge: ${badge.name}`,
                type: "ACHIEVEMENT",
                metadata: { badgeId: badge.id, badgeName: badge.name }
            }
        });
    }

    public ensureWeeklyChallenges = async (userId: string) => {
        const now = new Date();
        const weekNumber = this.getWeekNumber(now);
        const year = now.getFullYear();

        const activeChallenges = await this.gamificationRepo.getActiveChallenges(userId, weekNumber, year);

        if (activeChallenges.length > 0) return activeChallenges;

        const allChallenges = await prisma.challenge.findMany();
        if (allChallenges.length === 0) return [];

        const shuffled = allChallenges.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        const deadline = new Date();
        deadline.setDate(deadline.getDate() + (7 - (deadline.getDay() || 7)));
        deadline.setHours(23, 59, 59, 999);

        const userChallenges = await Promise.all(
            selected.map(challenge =>
                prisma.userChallenge.create({
                    data: {
                        userId,
                        challengeId: challenge.id,
                        deadline,
                        weekNumber,
                        year,
                        current: 0,
                        isCompleted: false
                    },
                    include: { challenge: true }
                })
            )
        );

        return userChallenges;
    }

    public updateChallengeProgress = async (userId: string, type: string, amount: number = 1) => {
        await this.ensureWeeklyChallenges(userId);

        const now = new Date();
        const weekNumber = this.getWeekNumber(now);
        const year = now.getFullYear();

        const activeChallenges = await prisma.userChallenge.findMany({
            where: {
                userId,
                isCompleted: false,
                weekNumber,
                year,
                challenge: {
                    type: type as any
                }
            },
            include: { challenge: true }
        });

        for (const uc of activeChallenges) {
            const newProgress = uc.current + amount;
            const isNowCompleted = newProgress >= uc.challenge.target;

            await prisma.userChallenge.update({
                where: { id: uc.id },
                data: {
                    current: newProgress,
                    isCompleted: isNowCompleted,
                    completedAt: isNowCompleted ? new Date() : null
                }
            });

            if (isNowCompleted) {
                await this.awardXP(userId, uc.challenge.xpReward, `CHALLENGE_COMPLETED_${uc.challenge.title}`);
                await prisma.notification.create({
                    data: {
                        userId,
                        title: "Tantangan Selesai!",
                        message: `Selamat! Anda menyelesaikan tantangan: ${uc.challenge.title}`,
                        type: "CHALLENGE_COMPLETE",
                        metadata: { challengeId: uc.challengeId, xpReward: uc.challenge.xpReward }
                    }
                });
            }
        }
    }

    private getWeekNumber(date: Date): number {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    }
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamificationRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class GamificationRepository {
    constructor() {
        this.getStats = async (userId) => {
            return prisma_1.default.userStats.findUnique({
                where: { userId }
            });
        };
        this.upsertStats = async (userId, data) => {
            return prisma_1.default.userStats.upsert({
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
        };
        this.getAllBadges = async () => {
            return prisma_1.default.badge.findMany();
        };
        this.getUserBadges = async (userId) => {
            return prisma_1.default.userBadge.findMany({
                where: { userId },
                include: { badge: true }
            });
        };
        this.unlockBadge = async (userId, badgeId) => {
            return prisma_1.default.userBadge.create({
                data: {
                    userId,
                    badgeId
                }
            });
        };
        this.getActiveChallenges = async (userId, weekNumber, year) => {
            return prisma_1.default.userChallenge.findMany({
                where: {
                    userId,
                    weekNumber,
                    year
                },
                include: { challenge: true }
            });
        };
        this.updateChallengeProgress = async (userId, challengeId, progress) => {
            return prisma_1.default.userChallenge.updateMany({
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
        };
        this.getUsersWithActiveStreak = async () => {
            return prisma_1.default.userStats.findMany({
                where: {
                    streak: {
                        gt: 0
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
        };
    }
}
exports.GamificationRepository = GamificationRepository;
//# sourceMappingURL=gamification.repository.js.map
import prisma from "@/config/prisma";
import { User } from "@/generated/prisma/client";

export class UserRepository {
    static async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id }
        })
    }

    static async purgeDeleteData(userId: string) {
        await prisma.$transaction([
            prisma.categoryFeedbackEvent.deleteMany({ where: { userId } }),
            prisma.recommendationLog.deleteMany({ where: { userId } }),
            prisma.csvImport.deleteMany({ where: { userId } }),
            prisma.exportLog.deleteMany({ where: { userId } }),
            prisma.activityLog.deleteMany({ where: { userId } }),
            prisma.notification.deleteMany({ where: { userId } }),

            prisma.forecastCache.deleteMany({ where: { userId } }),
            prisma.forecast.deleteMany({ where: { userId } }),

            prisma.cluster.deleteMany({
                where: { analysisRun: { userId } }
            }),
            prisma.analysisRun.deleteMany({ where: { userId } }),

            // Budget
            prisma.budgetGoal.deleteMany({ where: { userId } }),

            prisma.userBadge.deleteMany({ where: { userId } }),
            prisma.userChallenge.deleteMany({ where: { userId } }),

            prisma.transaction.deleteMany({ where: { userId } }),

            prisma.category.deleteMany({ where: { userId } }),

            prisma.userStats.updateMany({
                where: { userId },
                data: {
                    xp: 0,
                    level: 1,
                    streak: 0,
                    longestStreak: 0,
                    lastTransactionAt: null,
                    totalTransactions: 0,
                    totalIncome: 0,
                    totalExpense: 0,
                    hasExported: false,
                    hasAnalyzed: false,
                },
            }),
        ]);
    }

    static async findUserProfile(id: string) {
        return prisma.user.findUnique({
            where: { id },
            include: {
                userStats: true,
                _count: {
                    select: { userBadges: true }
                }
            }
        });
    }

    static async findByEmail(email: string, ignoreUserId?: string): Promise<User | null> {
        return prisma.user.findFirst({
            where: {
                email,
                ...(ignoreUserId ?
                    { NOT: { id: ignoreUserId } }
                    : {}),
            }
        })
    }

    static async create(data: Pick<User, 'name' | 'email' | 'password'>): Promise<User> {
        return prisma.user.create({
            data,
        });
    }

    static async update(id: string, data: Partial<Pick<User, 'name' | 'password'>>): Promise<User> {
        return prisma.user.update({
            where: { id },
            data,
        });
    }

    static async delete(id: string): Promise<User> {
        return prisma.user.delete({
            where: { id },
        });
    }

    static async findAll(): Promise<User[]> {
        return prisma.user.findMany();
    }

    // Optimized version - select only needed fields
    static async findAllOptimized(options?: {
        skip?: number;
        take?: number
    }): Promise<Pick<User, 'id' | 'name' | 'email'>[]> {
        return prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                // Exclude password field for better performance
            },
            skip: options?.skip,
            take: options?.take,
        });
    }

    static async count(): Promise<number> {
        return prisma.user.count();
    }
}
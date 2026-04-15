import { User } from "../generated/prisma/client";
export declare class UserRepository {
    static findById(id: string): Promise<User | null>;
    static findUserProfile(id: string): Promise<({
        userStats: {
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
        } | null;
        _count: {
            userBadges: number;
        };
    } & {
        id: string;
        name: string;
        email: string;
        password: string;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    static findByEmail(email: string, ignoreUserId?: string): Promise<User | null>;
    static create(data: Pick<User, 'name' | 'email' | 'password'>): Promise<User>;
    static update(id: string, data: Partial<Pick<User, 'name' | 'password'>>): Promise<User>;
    static delete(id: string): Promise<User>;
    static findAll(): Promise<User[]>;
    static findAllOptimized(options?: {
        skip?: number;
        take?: number;
    }): Promise<Pick<User, 'id' | 'name' | 'email'>[]>;
    static count(): Promise<number>;
}
//# sourceMappingURL=user.repository.d.ts.map
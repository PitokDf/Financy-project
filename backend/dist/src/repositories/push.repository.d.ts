export declare class PushRepository {
    static findByEndpoint(endpoint: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        endpoint: string;
        p256dh: string;
        auth: string;
    } | null>;
    static upsert(userId: string, subscription: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        endpoint: string;
        p256dh: string;
        auth: string;
    }>;
    static delete(endpoint: string): Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload | null>;
    static deleteForUser(userId: string, endpoint: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        endpoint: string;
        p256dh: string;
        auth: string;
    } | null>;
    static findManyByUserId(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        endpoint: string;
        p256dh: string;
        auth: string;
    }[]>;
}
//# sourceMappingURL=push.repository.d.ts.map
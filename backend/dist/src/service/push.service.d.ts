import webpush from "web-push";
export declare class PushService {
    static subscribe(userId: string, subscription: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        endpoint: string;
        p256dh: string;
        auth: string;
    }>;
    static unsubscribe(endpoint: string): Promise<import("../generated/prisma/internal/prismaNamespace").BatchPayload | null>;
    static sendNotificationToUser(userId: string, title: string, body: string, data?: any): Promise<(void | webpush.SendResult)[]>;
}
//# sourceMappingURL=push.service.d.ts.map
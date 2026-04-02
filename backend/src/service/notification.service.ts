import { HttpStatus } from "@/constants/http-status";
import { Messages } from "@/constants/message";
import { AppError } from "@/errors/app-error";
import { NotificationRepository } from "@/repositories/notification.repository";
import {
    CreateNotificationInput,
    GetNotificationsQueryInput,
} from "@/schemas/notification.schema";

type NotificationRecord = Awaited<ReturnType<typeof NotificationRepository.create>>;

export type NotificationResponse = NotificationRecord;

export interface PaginatedNotificationsResponse {
    data: NotificationResponse[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export class NotificationService {
    constructor(private readonly notificationRepository: typeof NotificationRepository) { }

    public createNotification = async (payload: CreateNotificationInput) => {
        return this.notificationRepository.create({
            userId: payload.userId,
            type: payload.type,
            title: payload.title,
            message: payload.message,
            metadata: payload.metadata ?? undefined,
        });
    };

    public getNotificationById = async (userId: string, notificationId: string) => {
        const notification = await this.notificationRepository.findByIdAndUser(notificationId, userId);

        if (!notification) {
            throw new AppError(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return notification;
    };

    public getNotifications = async (userId: string, query: GetNotificationsQueryInput): Promise<PaginatedNotificationsResponse> => {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const skip = (page - 1) * limit;

        const [notifications, total] = await Promise.all([
            this.notificationRepository.findManyByUser({
                userId,
                skip,
                take: limit,
                isRead: query.isRead,
                type: query.type,
                sortBy: query.sortBy,
                sortOrder: query.sortOrder,
            }),
            this.notificationRepository.countByUser({
                userId,
                isRead: query.isRead,
                type: query.type,
            }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: notifications,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        };
    };

    public markAsRead = async (userId: string, notificationId: string) => {
        const notification = await this.getNotificationById(userId, notificationId);

        if (notification.isRead) {
            return notification;
        }

        return this.notificationRepository.updateById(notificationId, {
            isRead: true,
            readAt: new Date(),
        });
    };

    public markAllAsRead = async (userId: string) => {
        return this.notificationRepository.markAllAsRead(userId);
    };

    public deleteNotification = async (userId: string, notificationId: string) => {
        await this.getNotificationById(userId, notificationId);
        return this.notificationRepository.deleteById(notificationId);
    };
}

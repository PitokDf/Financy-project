import { NotificationType } from "@prisma/client";
import z from "zod";

const parseBoolean = (value: unknown) => {
    if (value === true || value === false) return value;
    if (typeof value === "string") {
        if (value.toLowerCase() === "true") return true;
        if (value.toLowerCase() === "false") return false;
    }
    return value;
};

export const notificationIdParamSchema = z.object({
    notificationId: z.string().cuid("ID notifikasi tidak valid"),
});

export const createNotificationSchema = z.object({
    userId: z.string().cuid("ID user tidak valid"),
    type: z.nativeEnum(NotificationType, {
        errorMap: () => ({ message: "Tipe notifikasi tidak valid" }),
    }),
    title: z.string().trim().min(1, "Judul tidak boleh kosong").max(120, "Judul maksimal 120 karakter"),
    message: z.string().trim().min(1, "Pesan tidak boleh kosong").max(500, "Pesan maksimal 500 karakter"),
    metadata: z.record(z.any()).optional().nullable(),
});

export const getNotificationsQuerySchema = z.object({
    page: z.coerce.number().int().min(1).optional().default(1),
    limit: z.coerce.number().int().min(1).max(100).optional().default(10),
    isRead: z.preprocess(parseBoolean, z.boolean()).optional(),
    type: z.nativeEnum(NotificationType).optional(),
    sortBy: z.enum(["createdAt", "isRead"]).optional().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export type NotificationIdParamInput = z.infer<typeof notificationIdParamSchema>;
export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
export type GetNotificationsQueryInput = z.infer<typeof getNotificationsQuerySchema>;

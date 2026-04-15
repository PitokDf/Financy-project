import { GamificationRepository } from "@/repositories/gamification.repository";
import { PushService } from "@/service/push.service";
import prisma from "@/config/prisma";
import { isToday } from "date-fns";

export class TaskManager {
    public async streakWarning() {
        console.log("[Task] Starting Streak Warning Task...");
        const usersWithStreak = await GamificationRepository.getUsersWithActiveStreak();

        let notifiedCount = 0;

        for (const stats of usersWithStreak) {
            const lastTx = stats.lastTransactionAt;

            if (lastTx && isToday(lastTx)) {
                continue;
            }

            const todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);

            const existingNotification = await prisma.notification.findFirst({
                where: {
                    userId: stats.userId,
                    type: "STREAK_WARNING",
                    createdAt: {
                        gte: todayStart
                    }
                }
            });

            if (existingNotification) continue;

            // 1. Create In-App Notification
            await prisma.notification.create({
                data: {
                    userId: stats.userId,
                    title: "Streak Anda dalam Bahaya! 🔥",
                    message: `Jangan biarkan streak ${stats.streak} hari Anda putus. Yuk catat transaksi hari ini!`,
                    type: "STREAK_WARNING",
                    metadata: { streak: stats.streak }
                }
            });

            // 2. Send Push Notification
            try {
                await PushService.sendNotificationToUser(
                    stats.userId,
                    "Streak Anda dalam Bahaya! 🔥",
                    `Ayo catat transaksi hari ini untuk menjaga streak ${stats.streak} hari Anda!`,
                    { url: "/dashboard" }
                );
            } catch (error) {
                console.error(`Failed to send push warning to user ${stats.userId}:`, error);
            }

            notifiedCount++;
        }

        console.log(`[Task] Streak Warning Task completed. Notified ${notifiedCount} users.`);
    }
}

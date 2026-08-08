import { GamificationRepository } from "@/repositories/gamification.repository";
import { PushService } from "@/service/push.service";
import { format, startOfDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { NotificationRepository } from "@/repositories/notification.repository";
import frameworkLogger from "@/utils/winston.logger";

const WIB_TIMEZONE = 'Asia/Jakarta';
const DEFAULT_REMINDER_TIME = '20:00';

export class TaskManager {
    public async streakWarning() {
        frameworkLogger.info("[Task] Starting Streak Warning Task...")

        const gamificationRepository = new GamificationRepository()
        const usersWithStreak = await gamificationRepository.getUsersWithActiveStreak();

        const now = new Date();
        const zonedNow = toZonedTime(now, WIB_TIMEZONE)
        const todayStart = startOfDay(zonedNow)
        const currentTime = format(zonedNow, 'HH:mm')

        const usersToNotify = usersWithStreak.filter((stats) => {
            const reminderTime = stats.user?.userSetting?.reminderTime || DEFAULT_REMINDER_TIME;
            return reminderTime === currentTime;
        });

        const existingNotification = await NotificationRepository.getExistingNotification(todayStart);
        const notifiedUserIds = new Set(existingNotification.map(n => n.userId));

        let notifiedCount = 0;

        const tasks = usersToNotify.map(async (stats) => {
            try {
                const lastTx = stats.lastTransactionAt;

                if (lastTx) {
                    const zonedLastTx = toZonedTime(lastTx, WIB_TIMEZONE);
                    const lastTxDay = startOfDay(zonedLastTx);

                    if (lastTxDay.getTime() === todayStart.getTime()) return;
                }

                if (notifiedUserIds.has(stats.userId)) return;
                // 1. In-App Notification
                await NotificationRepository.create({
                    userId: stats.userId,
                    title: "Pertahankan Streak Anda! 🔥",
                    message: `Streak Anda sudah ${stats.streak} hari. Catat transaksi hari ini agar tidak terputus.`,
                    type: "STREAK_WARNING",
                    metadata: { streak: stats.streak }
                });

                // 2. Push Notification
                await PushService.sendStreakReminderNotification(stats.userId);

                notifiedCount++;
            } catch (error) {
                console.error(`Failed processing user ${stats.userId}:`, error);
            }
        })

        await Promise.allSettled(tasks)
        frameworkLogger.info(`[Task] Streak Warning Task completed. Notified ${notifiedCount}/${usersToNotify.length} users.`)
    }
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = void 0;
const gamification_repository_1 = require("../repositories/gamification.repository");
const push_service_1 = require("../service/push.service");
const prisma_1 = __importDefault(require("../config/prisma"));
const date_fns_1 = require("date-fns");
class TaskManager {
    async streakWarning() {
        console.log("[Task] Starting Streak Warning Task...");
        const gamificationRepository = new gamification_repository_1.GamificationRepository();
        const usersWithStreak = await gamificationRepository.getUsersWithActiveStreak();
        let notifiedCount = 0;
        for (const stats of usersWithStreak) {
            const lastTx = stats.lastTransactionAt;
            if (lastTx && (0, date_fns_1.isToday)(lastTx)) {
                continue;
            }
            const todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);
            const existingNotification = await prisma_1.default.notification.findFirst({
                where: {
                    userId: stats.userId,
                    type: "STREAK_WARNING",
                    createdAt: {
                        gte: todayStart
                    }
                }
            });
            if (existingNotification)
                continue;
            await prisma_1.default.notification.create({
                data: {
                    userId: stats.userId,
                    title: "Streak Anda dalam Bahaya! 🔥",
                    message: `Jangan biarkan streak ${stats.streak} hari Anda putus. Yuk catat transaksi hari ini!`,
                    type: "STREAK_WARNING",
                    metadata: { streak: stats.streak }
                }
            });
            try {
                await push_service_1.PushService.sendNotificationToUser(stats.userId, "Streak Anda dalam Bahaya! 🔥", `Ayo catat transaksi hari ini untuk menjaga streak ${stats.streak} hari Anda!`, { url: "/dashboard" });
            }
            catch (error) {
                console.error(`Failed to send push warning to user ${stats.userId}:`, error);
            }
            notifiedCount++;
        }
        console.log(`[Task] Streak Warning Task completed. Notified ${notifiedCount} users.`);
    }
}
exports.TaskManager = TaskManager;
//# sourceMappingURL=streak-warning.task.js.map
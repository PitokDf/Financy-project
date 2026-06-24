import { ScheduledExpenseRepository } from "@/repositories/scheduled-expense.repository";
import { NotificationRepository } from "@/repositories/notification.repository";
import { PushService } from "@/service/push.service";
import { getDate, getMonth, getYear } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import frameworkLogger from "@/utils/winston.logger";

const WIB_TIMEZONE = 'Asia/Jakarta';

export class ScheduledExpenseTask {
    public async checkAndNotify() {
        frameworkLogger.info("[Task] Starting Scheduled Expense Check...");

        const scheduledExpenseRepo = new ScheduledExpenseRepository();

        const now = new Date();
        const zonedNow = toZonedTime(now, WIB_TIMEZONE);
        const currentDay = getDate(zonedNow);
        const currentMonth = getMonth(zonedNow);
        const currentYear = getYear(zonedNow);

        const expenses = await scheduledExpenseRepo.getActiveByDay(currentDay);

        if (expenses.length === 0) {
            frameworkLogger.info("[Task] No scheduled expenses for today.");
            return;
        }

        let notifiedCount = 0;

        const tasks = expenses.map(async (expense) => {
            try {
                if (expense.lastProcessedAt) {
                    const zonedLastProcessed = toZonedTime(expense.lastProcessedAt, WIB_TIMEZONE);
                    const lastProcessedMonth = getMonth(zonedLastProcessed);
                    const lastProcessedYear = getYear(zonedLastProcessed);

                    if (lastProcessedMonth === currentMonth && lastProcessedYear === currentYear) {
                        return;
                    }
                }

                const formattedAmount = expense.amount.toLocaleString('id-ID');

                await NotificationRepository.create({
                    userId: expense.userId,
                    title: "Pengeluaran Terjadwal",
                    message: `Pengeluaran ${expense.description} sebesar Rp${formattedAmount} akan jatuh tempo hari ini. Approve sekarang?`,
                    type: 'SCHEDULED_EXPENSE',
                    metadata: { scheduledExpenseId: expense.id }
                });

                await PushService.sendNotificationToUser(
                    expense.userId,
                    "Pengeluaran Terjadwal",
                    `Pengeluaran ${expense.description} sebesar Rp${formattedAmount} akan jatuh tempo hari ini. Approve sekarang?`,
                    { url: `/scheduled-expenses?approve=${expense.id}` }
                );

                await scheduledExpenseRepo.markNotified(expense.id, currentDay);

                notifiedCount++;
            } catch (error) {
                frameworkLogger.error(`[Task] Failed processing expense ${expense.id}:`, error);
            }
        });

        await Promise.allSettled(tasks);
        frameworkLogger.info(`[Task] Scheduled Expense Check completed. Notified ${notifiedCount}/${expenses.length} expenses.`);
    }
}

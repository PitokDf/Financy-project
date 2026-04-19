import { Job } from "bullmq";
import { BaseWorker } from "./base.worker";
import frameworkLogger from "@/utils/winston.logger";
import { startOfMonth, endOfMonth } from "date-fns";
import { PushService } from "@/service/push.service";
import { BudgetRepository } from "@/repositories/budget.repository";
import { TransactionRepository } from "@/repositories/transaction.repository";
import { NotificationRepository } from "@/repositories/notification.repository";

export class ReminderBudgetWorker extends BaseWorker<{ userId: string }> {
    private budgetRepository: BudgetRepository;
    private transactionRepository: TransactionRepository;

    constructor() {
        super('reminder-budget');
        this.budgetRepository = new BudgetRepository();
        this.transactionRepository = new TransactionRepository();
    }

    protected async process(job: Job<{ userId: string }, any, string>): Promise<void> {
        const { userId } = job.data;
        frameworkLogger.info(`[ReminderBudgetWorker] Memulai pengecekan anggaran untuk user: ${userId}`);

        try {
            const now = new Date();
            const start = startOfMonth(now);
            const end = endOfMonth(now);

            await this.budgetRepository.resetMonthlyAlerts(start);

            const budgets = await this.budgetRepository.findAll(userId);

            for (const budget of budgets) {
                const spentAggregate = await this.transactionRepository.getSumExpenseByCategoryAndDate(
                    budget.userId,
                    budget.categoryId,
                    start,
                    end
                );

                const spentAmount = spentAggregate._sum.amount || 0;
                const percentage = budget.amount > 0 ? (spentAmount / budget.amount) * 100 : 0;

                let shouldUpdate = false;
                const updateData: any = {};

                // Cek > 100%
                if (percentage >= 100) {
                    shouldUpdate = true;
                    updateData.alertSent100 = true;
                    updateData.alertSent80 = true;

                    const title = "Peringatan Anggaran!";
                    const body = `Anda telah melebihi batas anggaran untuk kategori ${budget.category.name} (Terpakai: ${Math.round(percentage)}%).`;

                    await this.sendAlert(budget.userId, title, body, "BUDGET_ALERT", { categoryId: budget.categoryId, budgetId: budget.id });

                }
                // Cek > threshold (contoh 80%) tapi belum capai 100%
                else if (percentage >= budget.alertThreshold && percentage) {
                    shouldUpdate = true;
                    updateData.alertSent80 = true;

                    const title = "Anggaran Hampir Habis!";
                    const body = `Pengeluaran kategori ${budget.category.name} sudah mencapai ${Math.round(percentage)}% dari anggaran.`;

                    await this.sendAlert(budget.userId, title, body, "BUDGET_ALERT", { categoryId: budget.categoryId });
                }

                if (shouldUpdate) {
                    await this.budgetRepository.updateAlertStatus(budget.id, updateData);
                }
            }

            frameworkLogger.info(`[ReminderBudgetWorker] Berhasil memantau ${budgets.length} batas anggaran.`);
        } catch (error) {
            frameworkLogger.error(`[ReminderBudgetWorker] Error saat memproses antrean pengingat anggaran`, error);
            throw error;
        }
    }

    private async sendAlert(userId: string, title: string, body: string, notificationType: string, metadata: any) {
        // Kirim Notifikasi Dalam Aplikasi via Repository
        await NotificationRepository.create({
            userId,
            title,
            message: body,
            type: notificationType as any,
            metadata: metadata
        });

        // Kirim Notifikasi Push via Web-Push
        try {
            await PushService.sendNotificationToUser(userId, title, body, { url: `/budget?budgetAlert=${metadata.budgetId}#${metadata.budgetId}` });
        } catch (err) {
            frameworkLogger.error(`Push notification gagal dikirim ke user ${userId} - ini diabaikan jika user tidak subscribe.`, err);
        }
    }
}
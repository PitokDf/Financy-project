import { ScheduledExpenseQueue } from "@/queue/scheduled-expense.queue";
import frameworkLogger from "@/utils/winston.logger";

export class ScheduledExpenseJob {
    private queue: ScheduledExpenseQueue

    constructor() {
        this.queue = new ScheduledExpenseQueue()
    }

    async register() {
        const queue = this.queue['queue'];
        if (!queue) {
            frameworkLogger.warn("[ScheduledExpenseJob] Redis not configured. Skipping job registration.");
            return;
        }

        const repeatables = await queue.getRepeatableJobs();

        for (const job of repeatables) {
            await queue.removeRepeatableByKey(job.key)
        }

        await this.queue.add('check-scheduled-expenses', {}, {
            repeat: {
                pattern: '0 0 * * *',
                tz: 'Asia/Jakarta'
            }
        });
        frameworkLogger.info("[ScheduledExpenseJob] Repeatable job registered for '0 0 * * *'")
    }
}

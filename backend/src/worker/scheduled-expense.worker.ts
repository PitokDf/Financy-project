import { Job } from "bullmq";
import { BaseWorker } from "./base.worker";
import frameworkLogger from "@/utils/winston.logger";
import { ScheduledExpenseTask } from "@/tasks/scheduled-expense.task";

export class ScheduledExpenseWorker extends BaseWorker<any> {
    private task: ScheduledExpenseTask;

    constructor() {
        super('scheduled-expense-queue');
        this.task = new ScheduledExpenseTask();
    }

    protected async process(job: Job<any, any, string>): Promise<void> {
        frameworkLogger.info(`[ScheduledExpenseWorker] Processing job: ${job.name}`);

        try {
            if (job.name === 'check-scheduled-expenses') {
                await this.task.checkAndNotify();
            }
            frameworkLogger.info(`[ScheduledExpenseWorker] Successfully processed job`);
        } catch (error) {
            frameworkLogger.error(`[ScheduledExpenseWorker] Failed to process job`, error);
            throw error;
        }
    }
}

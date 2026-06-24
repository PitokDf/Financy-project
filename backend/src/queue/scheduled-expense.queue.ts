import { Job } from "bull";
import { BaseQueue } from "./base.queue";
import frameworkLogger from "@/utils/winston.logger";

export class ScheduledExpenseQueue extends BaseQueue<{}> {
    constructor() {
        super("scheduled-expense-queue");
    }

    protected async handle(job: Job) {
        frameworkLogger.info(`[ScheduledExpenseQueue] Processing job ${job.id}`);
        try {
            frameworkLogger.info(`[ScheduledExpenseQueue] Job ${job.id} completed successfully`);
        } catch (error) {
            frameworkLogger.error(`[ScheduledExpenseQueue] Job ${job.id} failed:`, error);
            throw error;
        }
    }
}

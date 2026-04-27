import { Job } from "bullmq";
import { BaseWorker } from "./base.worker";
import frameworkLogger from "@/utils/winston.logger";
import { TaskManager } from "@/tasks/streak-warning.task";

export class StreakWorker extends BaseWorker<any> {
    private taskManager: TaskManager;

    constructor() {
        super('streak-queue');
        this.taskManager = new TaskManager();
    }

    protected async process(job: Job<any, any, string>): Promise<void> {
        frameworkLogger.info(`[StreakWorker] Processing job: ${job.name}`);
        
        try {
            if (job.name === 'streak-job') {
                await this.taskManager.streakWarning();
            }
            frameworkLogger.info(`[StreakWorker] Successfully processed job`);
        } catch (error) {
            frameworkLogger.error(`[StreakWorker] Failed to process job`, error);
            throw error;
        }
    }
}

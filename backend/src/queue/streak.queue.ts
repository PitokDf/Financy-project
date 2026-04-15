import { Job } from "bull";
import { BaseQueue } from "./base.queue";
import frameworkLogger from "@/utils/winston.logger";
import { TaskManager } from "@/tasks/streak-warning.task";

export class StreakQueue extends BaseQueue<{}> {
    private task: TaskManager

    constructor() {
        super("streak-queue");
        this.task = new TaskManager()
    }

    protected async handle(job: Job) {
        frameworkLogger.info(`[StreakQueue] Processing job ${job.id}`);
        try {
            await this.task.streakWarning();
            frameworkLogger.info(`[StreakQueue] Job ${job.id} completed successfully`);
        } catch (error) {
            frameworkLogger.error(`[StreakQueue] Job ${job.id} failed:`, error);
            throw error; // Re-throw to let Bull handle the retry if configured
        }
    }
}
import { StreakQueue } from "@/queue/streak.queue";
import frameworkLogger from "@/utils/winston.logger";

export class StreakJob {
    private streakQueue: StreakQueue

    constructor() {
        this.streakQueue = new StreakQueue()
    }

    async register() {
        const queue = this.streakQueue['queue'];
        if (!queue) {
            frameworkLogger.warn("[StreakJob] Redis not configured. Skipping streak job registration.");
            return;
        }

        const repeatables = await queue.getRepeatableJobs();

        for (const job of repeatables) {
            await queue.removeRepeatableByKey(job.key)
        }

        // Run every minute so the task can dispatch to users whose custom
        // reminderTime matches the current time (WIB).
        await this.streakQueue.add('streak-job', {}, {
            repeat: {
                pattern: '* * * * *',
                tz: 'Asia/Jakarta'
            }
        });
        frameworkLogger.info("[StreakJob] Repeatable job registered for '* * * * *'")
    }
}
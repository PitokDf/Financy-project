import { StreakQueue } from "@/queue/streak.queue";
import frameworkLogger from "@/utils/winston.logger";

export class StreakJob {
    private streakQueue: StreakQueue

    constructor() {
        this.streakQueue = new StreakQueue()
    }

    async register() {
        const repeatables = await this.streakQueue['queue'].getRepeatableJobs();

        for (const job of repeatables) {
            await this.streakQueue['queue'].removeRepeatableByKey(job.key)
        }

        await this.streakQueue.add('streak-job', {}, {
            repeat: {
                pattern: '0 20 * * *',
                tz: 'Asia/Jakarta'
            }
        });
        frameworkLogger.info("[StreakJob] Repeatable job registered for '0 20 * * *'")
    }
}
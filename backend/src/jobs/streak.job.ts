import { StreakQueue } from "@/queue/streak.queue";

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

        await this.streakQueue.add({}, {
            repeat: {
                cron: '0 20 * * *'
            }
        });
        console.log("[StreakJob] Repeatable job registered for '0 20 * * *'");
    }
}
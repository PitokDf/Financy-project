"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreakJob = void 0;
const streak_queue_1 = require("../queue/streak.queue");
class StreakJob {
    constructor() {
        this.streakQueue = new streak_queue_1.StreakQueue();
    }
    async register() {
        const repeatables = await this.streakQueue['queue'].getRepeatableJobs();
        for (const job of repeatables) {
            await this.streakQueue['queue'].removeRepeatableByKey(job.key);
        }
        await this.streakQueue.add({}, {
            repeat: {
                cron: '0 20 * * *'
            }
        });
        console.log("[StreakJob] Repeatable job registered for '0 20 * * *'");
    }
}
exports.StreakJob = StreakJob;
//# sourceMappingURL=streak.job.js.map
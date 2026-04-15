import { StreakQueue } from "@/queue/streak.queue";
import frameworkLogger from "@/utils/winston.logger";

export const queues: any[] = [
    // StreakQueue is handled by StreakJob
]

export const initQueue = () => {
    queues.forEach((queue) => {
        frameworkLogger.queue(`[${queue.name}] Queue initialized`)
    })
}
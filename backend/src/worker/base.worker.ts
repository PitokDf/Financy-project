import { redisConfig } from "@/config/redis";
import frameworkLogger from "@/utils/winston.logger";
import { Job, Worker, ConnectionOptions } from "bullmq";

export abstract class BaseWorker<T> {
    protected worker: Worker<T, any, string> | null;

    constructor(queueName: string) {
        if (redisConfig) {
            this.worker = new Worker<T, any, string>(
                queueName,
                async (job: Job<T, any, string>) => {
                    await this.process(job);
                },
                { connection: redisConfig as ConnectionOptions }
            );

            this.worker.on("failed", (job, error) => {
                frameworkLogger.error(`[${queueName}] Job failed: ${job?.id}`, error)
            })

            this.worker.on("error", (error) => {
                frameworkLogger.error(`[${queueName}] Worker error`, error)
            })

            this.worker.on("completed", (job) => {
                frameworkLogger.info(`[${queueName}] Job completed: ${job?.id}`)
            })

            this.worker.on("drained", () => {
                frameworkLogger.info(`[${queueName}] Queue drained`)
            })
        } else {
            this.worker = null;
            frameworkLogger.warn(`[Worker] Redis not configured. Worker "${queueName}" will not process jobs.`);
        }
    }

    protected abstract process(job: Job<T, any, string>): Promise<void>;
}
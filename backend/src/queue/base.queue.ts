import { Queue, Job, JobsOptions, QueueOptions, ConnectionOptions } from 'bullmq';
import { redisConfig } from '@/config/redis';
import frameworkLogger from '@/utils/winston.logger';

export abstract class BaseQueue<T> {
    protected queue: Queue<T, any, string> | null;
    public readonly name: string;

    constructor(queueName: string, options?: Omit<QueueOptions, 'connection'>) {
        this.name = queueName;
        if (redisConfig) {
            this.queue = new Queue<T, any, string>(queueName, {
                connection: redisConfig as ConnectionOptions,
                ...options,
            });
        } else {
            this.queue = null;
            frameworkLogger.warn(`[Queue] Redis not configured. Queue "${queueName}" will not process jobs.`);
        }
    }

    async add(name: string, data: T, options?: JobsOptions): Promise<Job<T, any, string> | void> {
        if (!this.queue) {
            frameworkLogger.warn(`[Queue] Skipping job "${name}" - Redis not available.`);
            return;
        }
        return this.queue.add(name as any, data as any, options) as unknown as Promise<Job<T, any, string>>;
    }
}
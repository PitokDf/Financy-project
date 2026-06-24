import { Queue, Job, JobsOptions, QueueOptions, ConnectionOptions } from 'bullmq';
import { redisConfig } from '@/config/redis';

export abstract class BaseQueue<T> {
    protected queue: Queue<T, any, string>;
    public readonly name: string;

    constructor(queueName: string, options?: Omit<QueueOptions, 'connection'>) {
        this.name = queueName;
        this.queue = new Queue<T, any, string>(queueName, {
            connection: redisConfig as ConnectionOptions,
            ...options,
        });
    }

    async add(name: string, data: T, options?: JobsOptions): Promise<Job<T, any, string>> {
        return this.queue.add(name as any, data as any, options) as unknown as Promise<Job<T, any, string>>;
    }
}
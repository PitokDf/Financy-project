import Queue, { Job, QueueOptions } from 'bull';
import { redisConfig } from '@/config/redis';

export abstract class BaseQueue<T> {
    protected queue: Queue.Queue<T>;
    public readonly name: string

    constructor(queueName: string, options?: QueueOptions) {
        this.name = queueName
        this.queue = new Queue<T>(queueName, {
            redis: redisConfig,
            ...options,
        });

        this.queue.process(this.handle.bind(this));

    }

    protected abstract handle(job: Job<T>): Promise<void>;

    async add(data: T, options?: Queue.JobOptions): Promise<Job<T>> {
        return this.queue.add(data, options);
    }
}
import Queue, { Job, QueueOptions } from 'bull';
export declare abstract class BaseQueue<T> {
    protected queue: Queue.Queue<T>;
    readonly name: string;
    constructor(queueName: string, options?: QueueOptions);
    protected abstract handle(job: Job<T>): Promise<void>;
    add(data: T, options?: Queue.JobOptions): Promise<Job<T>>;
}
//# sourceMappingURL=base.queue.d.ts.map
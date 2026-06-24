import { JobsOptions, Job } from "bullmq";
import { BaseQueue } from "./base.queue";

export class ReminderBadgeQueue extends BaseQueue<{ userId: string }> {
    constructor() {
        super('reminder-budget');
    }

    async add(name: string, data: { userId: string }, options?: JobsOptions): Promise<Job<{ userId: string }, any, string>> {
        return super.add(name, data, options);
    }
}
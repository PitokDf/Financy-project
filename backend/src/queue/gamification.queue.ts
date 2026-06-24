import { JobsOptions, Job } from "bullmq";
import { BaseQueue } from "./base.queue";

export interface GamificationJobData {
    userId: string;
    action: string;
    value?: number;
}

export class GamificationQueue extends BaseQueue<GamificationJobData> {
    constructor() {
        super('gamification-queue');
    }

    async add(name: string, data: GamificationJobData, options?: JobsOptions): Promise<Job<GamificationJobData, any, string>> {
        return super.add(name, data, options);
    }
}
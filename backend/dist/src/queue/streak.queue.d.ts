import { Job } from "bull";
import { BaseQueue } from "./base.queue";
export declare class StreakQueue extends BaseQueue<{}> {
    private task;
    constructor();
    protected handle(job: Job): Promise<void>;
}
//# sourceMappingURL=streak.queue.d.ts.map
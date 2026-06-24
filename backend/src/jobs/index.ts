import frameworkLogger from "@/utils/winston.logger";
import { StreakJob } from "./streak.job";
import { ScheduledExpenseJob } from "./scheduled-expense.job";

const jobs = [
    new StreakJob(),
    new ScheduledExpenseJob(),
];

export const initJobs = () => {
    jobs.forEach((job) => {
        try {
            job.register();
            frameworkLogger.job(`[${job.constructor.name}] Job registered`)
        } catch (error) {
            console.error(error);
        }
    });
};
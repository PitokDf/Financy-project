import frameworkLogger from "@/utils/winston.logger";
import { StreakJob } from "./streak.job";

const jobs = [
    new StreakJob(),
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
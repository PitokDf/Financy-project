import { ReminderBudgetWorker } from "./reminder-budget.worker";
import { GamificationWorker } from "./gamification.worker";
import { StreakWorker } from "./streak.worker";
import frameworkLogger from "@/utils/winston.logger";

const workers = [
    new ReminderBudgetWorker(),
    new GamificationWorker(),
    new StreakWorker(),
];

export const initWorkers = () => {
    workers.forEach((workerInstance) => {
        try {
            frameworkLogger.info(`[${workerInstance.constructor.name}] Worker initialized and listening to queue`);
        } catch (error) {
            frameworkLogger.error(`Failed to initialize worker ${workerInstance.constructor.name}`, error);
        }
    });
};
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreakQueue = void 0;
const base_queue_1 = require("./base.queue");
const winston_logger_1 = __importDefault(require("../utils/winston.logger"));
const streak_warning_task_1 = require("../tasks/streak-warning.task");
class StreakQueue extends base_queue_1.BaseQueue {
    constructor() {
        super("streak-queue");
        this.task = new streak_warning_task_1.TaskManager();
    }
    async handle(job) {
        winston_logger_1.default.info(`[StreakQueue] Processing job ${job.id}`);
        try {
            await this.task.streakWarning();
            winston_logger_1.default.info(`[StreakQueue] Job ${job.id} completed successfully`);
        }
        catch (error) {
            winston_logger_1.default.error(`[StreakQueue] Job ${job.id} failed:`, error);
            throw error;
        }
    }
}
exports.StreakQueue = StreakQueue;
//# sourceMappingURL=streak.queue.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initJobs = void 0;
const winston_logger_1 = __importDefault(require("../utils/winston.logger"));
const streak_job_1 = require("./streak.job");
const jobs = [
    new streak_job_1.StreakJob(),
];
const initJobs = () => {
    jobs.forEach((job) => {
        try {
            job.register();
            winston_logger_1.default.job(`[${job.constructor.name}] Job registered`);
        }
        catch (error) {
            console.error(error);
        }
    });
};
exports.initJobs = initJobs;
//# sourceMappingURL=index.js.map
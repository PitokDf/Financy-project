"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initQueue = exports.queues = void 0;
const winston_logger_1 = __importDefault(require("../utils/winston.logger"));
exports.queues = [];
const initQueue = () => {
    exports.queues.forEach((queue) => {
        winston_logger_1.default.queue(`[${queue.name}] Queue initialized`);
    });
};
exports.initQueue = initQueue;
//# sourceMappingURL=queue.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const redis_1 = require("../config/redis");
class BaseQueue {
    constructor(queueName, options) {
        this.name = queueName;
        this.queue = new bull_1.default(queueName, {
            redis: redis_1.redisConfig,
            ...options,
        });
        this.queue.process(this.handle.bind(this));
    }
    async add(data, options) {
        return this.queue.add(data, options);
    }
}
exports.BaseQueue = BaseQueue;
//# sourceMappingURL=base.queue.js.map
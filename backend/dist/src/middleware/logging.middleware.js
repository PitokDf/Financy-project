"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = requestLogger;
const winston_logger_1 = __importDefault(require("../utils/winston.logger"));
function requestLogger(req, res, next) {
    const start = process.hrtime();
    const startTime = new Date();
    res.on("finish", () => {
        const [seconds, nanoseconds] = process.hrtime(start);
        const responseTime = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);
        const endTime = new Date();
        winston_logger_1.default.request(req.method, req.originalUrl, res.statusCode, parseFloat(responseTime));
    });
    next();
}
//# sourceMappingURL=logging.middleware.js.map
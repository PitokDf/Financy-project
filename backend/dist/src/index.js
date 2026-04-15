"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config_1 = require("./config");
const winston_logger_1 = __importDefault(require("./utils/winston.logger"));
const app_utils_1 = require("./utils/app-utils");
process.on('uncaughtException', (error) => {
    winston_logger_1.default.error('💥 Uncaught exception occurred', {
        error: error.message,
        stack: error.stack
    });
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    winston_logger_1.default.error('💥 Unhandled promise rejection', {
        reason: reason instanceof Error ? reason.message : reason,
        stack: reason instanceof Error ? reason.stack : undefined,
        promise
    });
    process.exit(1);
});
(0, app_utils_1.startServer)(config_1.config.PORT);
//# sourceMappingURL=index.js.map
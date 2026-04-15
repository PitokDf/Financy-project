"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const logger = (0, pino_1.default)({
    transport: {
        target: 'pino-pretty',
        options: { colorize: true }
    }
});
const frameworkLogger = {
    info: (...args) => logger.info(...args),
    error: (...args) => logger.error(...args),
    warn: (...args) => logger.warn(...args),
    debug: (...args) => logger.debug(...args),
    trace: (...args) => logger.trace(...args),
    fatal: (...args) => logger.fatal(...args),
    serverStartup: (port, env) => logger.info(`🚀 Server successfully started on port ${port}`),
    serverReady: (port, urls) => logger.info(`🌐 Server accessible at ${urls.length} endpoint(s)`),
    frameworkInit: (component, status) => logger.info(`⚙️ Framework ${component} ${status}`),
    database: (action) => logger.info(`🗄️ Database ${action}`),
    cache: (action) => logger.info(`💾 Cache ${action}`),
    email: (action) => logger.info(`📧 Email ${action}`),
    job: (action) => logger.info(`⚡ Job ${action}`),
    queue: (action) => logger.info(`⚡ Queue ${action}`),
    request: (method, url, status, duration) => logger.info(`${method} ${url} ${status} - ${duration}ms`),
    health: (status) => logger.info(` Health check ${status}`),
    security: (event) => logger.warn(`🔐 Security event: ${event}`)
};
exports.default = frameworkLogger;
//# sourceMappingURL=winston.logger.js.map
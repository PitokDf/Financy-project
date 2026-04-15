import pino from 'pino';

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: { colorize: true }
    }
});

const frameworkLogger = {
    info: (...args: Parameters<typeof logger.info>) => logger.info(...args),
    error: (...args: Parameters<typeof logger.error>) => logger.error(...args),
    warn: (...args: Parameters<typeof logger.warn>) => logger.warn(...args),
    debug: (...args: Parameters<typeof logger.debug>) => logger.debug(...args),
    trace: (...args: Parameters<typeof logger.trace>) => logger.trace(...args),
    fatal: (...args: Parameters<typeof logger.fatal>) => logger.fatal(...args),
    serverStartup: (port: number, env: string) => logger.info(`🚀 Server successfully started on port ${port}`),
    serverReady: (port: number, urls: string[]) => logger.info(`🌐 Server accessible at ${urls.length} endpoint(s)`),
    frameworkInit: (component: string, status: string) => logger.info(`⚙️ Framework ${component} ${status}`),
    database: (action: string) => logger.info(`🗄️ Database ${action}`),
    cache: (action: string) => logger.info(`💾 Cache ${action}`),
    email: (action: string) => logger.info(`📧 Email ${action}`),
    job: (action: string) => logger.info(`⚡ Job ${action}`),
    queue: (action: string) => logger.info(`⚡ Queue ${action}`),
    request: (method: string, url: string, status: number, duration: number) => logger.info(`${method} ${url} ${status} - ${duration}ms`),
    health: (status: string) => logger.info(` Health check ${status}`),
    security: (event: string) => logger.warn(`🔐 Security event: ${event}`)
};

export default frameworkLogger;

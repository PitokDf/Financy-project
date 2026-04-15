declare const logger: import("pino").Logger<never>;
declare const frameworkLogger: {
    info: (msg: string, ...args: any[]) => void;
    error: (msg: string, ...args: any[]) => void;
    warn: (msg: string, ...args: any[]) => void;
    debug: (msg: string, ...args: any[]) => void;
    trace: (msg: string, ...args: any[]) => void;
    fatal: (msg: string, ...args: any[]) => void;
    serverStartup: (port: number, env: string) => void;
    serverReady: (port: number, urls: string[]) => void;
    frameworkInit: (component: string, status: string) => void;
    database: (action: string) => void;
    cache: (action: string) => void;
    email: (action: string) => void;
    job: (action: string) => void;
    queue: (action: string) => void;
    request: (method: string, url: string, status: number, duration: number) => void;
    health: (status: string) => void;
    security: (event: string) => void;
};
export default frameworkLogger;
//# sourceMappingURL=winston.logger.d.ts.map
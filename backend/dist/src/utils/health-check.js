"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckService = void 0;
const winston_logger_1 = __importDefault(require("./winston.logger"));
const config_1 = require("../config");
const cache_1 = require("./cache");
class HealthCheckService {
    constructor(prismaClient) {
        this.checkers = new Map();
        this.prisma = prismaClient;
        this.registerDefaultCheckers();
    }
    registerChecker(name, checker) {
        this.checkers.set(name, checker);
    }
    removeChecker(name) {
        const removed = this.checkers.delete(name);
        if (removed) {
            winston_logger_1.default.info(`Health checker "${name}" removed`);
        }
        return removed;
    }
    async runAllChecks() {
        const startTime = Date.now();
        const checks = [];
        const checkPromises = Array.from(this.checkers.entries()).map(async ([name, checker]) => {
            try {
                const result = await checker();
                return { name, result };
            }
            catch (error) {
                winston_logger_1.default.error(`Health check "${name}" failed:`, error);
                return {
                    name,
                    result: {
                        name,
                        status: 'unhealthy',
                        message: error instanceof Error ? error.message : 'Unknown error',
                        responseTime: 0,
                        timestamp: new Date().toISOString(),
                    }
                };
            }
        });
        const checkResults = await Promise.allSettled(checkPromises);
        for (const result of checkResults) {
            if (result.status === 'fulfilled') {
                checks.push(result.value.result);
            }
            else {
                checks.push({
                    name: 'unknown',
                    status: 'unhealthy',
                    message: 'Health check failed to execute',
                    timestamp: new Date().toISOString(),
                });
            }
        }
        const summary = {
            total: checks.length,
            healthy: checks.filter(c => c.status === 'healthy').length,
            unhealthy: checks.filter(c => c.status === 'unhealthy').length,
            degraded: checks.filter(c => c.status === 'degraded').length,
        };
        let overallStatus = 'healthy';
        if (summary.unhealthy > 0) {
            overallStatus = 'unhealthy';
        }
        else if (summary.degraded > 0) {
            overallStatus = 'degraded';
        }
        const totalResponseTime = Date.now() - startTime;
        winston_logger_1.default.info(`Health check completed in ${totalResponseTime}ms - Status: ${overallStatus}`);
        return {
            status: overallStatus,
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: process.env.npm_package_version || '1.0.0',
            environment: config_1.config.NODE_ENV || 'development',
            checks,
            summary,
        };
    }
    async runCheck(name) {
        const checker = this.checkers.get(name);
        if (!checker) {
            winston_logger_1.default.warn(`Health checker "${name}" not found`);
            return null;
        }
        try {
            return await checker();
        }
        catch (error) {
            winston_logger_1.default.error(`Health check "${name}" failed:`, error);
            return {
                name,
                status: 'unhealthy',
                message: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString(),
            };
        }
    }
    middleware() {
        return async (req, res) => {
            try {
                const health = await this.runAllChecks();
                let httpStatus = 200;
                if (health.status === 'degraded') {
                    httpStatus = 200;
                }
                else if (health.status === 'unhealthy') {
                    httpStatus = 503;
                }
                res.status(httpStatus).json(health);
            }
            catch (error) {
                winston_logger_1.default.error('Health check endpoint failed:', error);
                res.status(500).json({
                    status: 'unhealthy',
                    timestamp: new Date().toISOString(),
                    message: 'Health check system failure',
                    error: error instanceof Error ? error.message : 'Unknown error',
                });
            }
        };
    }
    readinessCheck() {
        return async (req, res) => {
            try {
                const criticalChecks = ['database', 'cache'];
                const results = await Promise.all(criticalChecks.map(name => this.runCheck(name)));
                const hasUnhealthy = results.some(result => result && result.status === 'unhealthy');
                if (hasUnhealthy) {
                    res.status(503).json({ status: 'not ready' });
                }
                else {
                    res.status(200).json({ status: 'ready' });
                }
            }
            catch (error) {
                res.status(503).json({ status: 'not ready', error: error });
            }
        };
    }
    livenessCheck() {
        return (req, res) => {
            res.status(200).json({
                status: 'alive',
                timestamp: new Date().toISOString(),
                uptime: process.uptime()
            });
        };
    }
    registerDefaultCheckers() {
        this.registerChecker('database', async () => {
            const startTime = Date.now();
            try {
                await this.prisma.$queryRaw `SELECT 1`;
                const responseTime = Date.now() - startTime;
                return {
                    name: 'database',
                    status: responseTime < 1000 ? 'healthy' : 'degraded',
                    message: `Database connection ${responseTime < 1000 ? 'healthy' : 'slow'}`,
                    responseTime,
                    timestamp: new Date().toISOString(),
                    details: {
                        responseTime: `${responseTime}ms`,
                        threshold: '1000ms'
                    }
                };
            }
            catch (error) {
                return {
                    name: 'database',
                    status: 'unhealthy',
                    message: `Database connection failed: ${error}`,
                    responseTime: Date.now() - startTime,
                    timestamp: new Date().toISOString(),
                };
            }
        });
        this.registerChecker('memory', async () => {
            const memUsage = process.memoryUsage();
            const totalMemory = memUsage.heapTotal;
            const usedMemory = memUsage.heapUsed;
            const memoryUsagePercent = (usedMemory / totalMemory) * 100;
            let status = 'healthy';
            let message = 'Memory usage normal';
            if (memoryUsagePercent > 90) {
                status = 'unhealthy';
                message = 'Critical memory usage';
            }
            else if (memoryUsagePercent > 75) {
                status = 'degraded';
                message = 'High memory usage';
            }
            return {
                name: 'memory',
                status,
                message,
                timestamp: new Date().toISOString(),
                details: {
                    usagePercent: `${memoryUsagePercent.toFixed(2)}%`,
                    heapUsed: `${Math.round(usedMemory / 1024 / 1024)}MB`,
                    heapTotal: `${Math.round(totalMemory / 1024 / 1024)}MB`,
                    external: `${Math.round(memUsage.external / 1024 / 1024)}MB`,
                }
            };
        });
        this.registerChecker('cache', async () => {
            const startTime = Date.now();
            try {
                const testKey = 'health_check_test';
                const testValue = Date.now().toString();
                cache_1.cacheManager.set(testKey, testValue, 10);
                const cachedValue = cache_1.cacheManager.get(testKey);
                cache_1.cacheManager.del(testKey);
                const responseTime = Date.now() - startTime;
                if (cachedValue === testValue) {
                    return {
                        name: 'cache',
                        status: responseTime < 100 ? 'healthy' : 'degraded',
                        message: `Cache ${responseTime < 100 ? 'healthy' : 'slow response'}`,
                        responseTime,
                        timestamp: new Date().toISOString(),
                        details: {
                            responseTime: `${responseTime}ms`,
                            stats: cache_1.cacheManager.getStats()
                        }
                    };
                }
                else {
                    return {
                        name: 'cache',
                        status: 'unhealthy',
                        message: 'Cache read/write test failed',
                        responseTime,
                        timestamp: new Date().toISOString(),
                    };
                }
            }
            catch (error) {
                return {
                    name: 'cache',
                    status: 'unhealthy',
                    message: `Cache error: ${error}`,
                    responseTime: Date.now() - startTime,
                    timestamp: new Date().toISOString(),
                };
            }
        });
        this.registerChecker('disk', async () => {
            try {
                const fs = await Promise.resolve().then(() => __importStar(require('fs')));
                fs.statSync(process.cwd());
                return {
                    name: 'disk',
                    status: 'healthy',
                    message: 'Disk space check completed',
                    timestamp: new Date().toISOString(),
                    details: {
                        workingDirectory: process.cwd(),
                        note: 'Basic disk access check only'
                    }
                };
            }
            catch (error) {
                return {
                    name: 'disk',
                    status: 'unhealthy',
                    message: `Disk access failed: ${error}`,
                    timestamp: new Date().toISOString(),
                };
            }
        });
    }
}
exports.HealthCheckService = HealthCheckService;
//# sourceMappingURL=health-check.js.map
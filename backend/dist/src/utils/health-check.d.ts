import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma/client';
export interface HealthCheckResult {
    name: string;
    status: 'healthy' | 'unhealthy' | 'degraded';
    message?: string;
    responseTime?: number;
    timestamp: string;
    details?: Record<string, any>;
}
export interface SystemHealth {
    status: 'healthy' | 'unhealthy' | 'degraded';
    timestamp: string;
    uptime: number;
    version: string;
    environment: string;
    checks: HealthCheckResult[];
    summary: {
        total: number;
        healthy: number;
        unhealthy: number;
        degraded: number;
    };
}
type HealthChecker = () => Promise<HealthCheckResult>;
declare class HealthCheckService {
    private checkers;
    private prisma;
    constructor(prismaClient: PrismaClient);
    registerChecker(name: string, checker: HealthChecker): void;
    removeChecker(name: string): boolean;
    runAllChecks(): Promise<SystemHealth>;
    runCheck(name: string): Promise<HealthCheckResult | null>;
    middleware(): (req: Request, res: Response) => Promise<void>;
    readinessCheck(): (req: Request, res: Response) => Promise<void>;
    livenessCheck(): (req: Request, res: Response) => void;
    private registerDefaultCheckers;
}
export { HealthCheckService };
//# sourceMappingURL=health-check.d.ts.map
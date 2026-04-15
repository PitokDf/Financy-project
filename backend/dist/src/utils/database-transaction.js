"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseTransactionService = void 0;
const winston_logger_1 = __importDefault(require("./winston.logger"));
class DatabaseTransactionService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }
    async executeTransaction(callback, options = {}) {
        const startTime = Date.now();
        try {
            const transactionOptions = {
                maxWait: options.maxWait || 5000,
                timeout: options.timeout || 10000
            };
            if (options.isolationLevel) {
                transactionOptions.isolationLevel = options.isolationLevel;
            }
            const result = await this.prisma.$transaction(callback, transactionOptions);
            const duration = Date.now() - startTime;
            winston_logger_1.default.info(`Transaction completed successfully in ${duration}ms`);
            return {
                success: true,
                data: result,
                duration
            };
        }
        catch (error) {
            const duration = Date.now() - startTime;
            winston_logger_1.default.error(`Transaction failed after ${duration}ms:`, error);
            return {
                success: false,
                error: error,
                duration
            };
        }
    }
    async executeBatch(callback, options = {}) {
        return this.executeTransaction(callback, options);
    }
    async executeWithRetry(callback, maxRetries = 3, retryDelay = 1000, options = {}) {
        let lastError;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            const result = await this.executeTransaction(callback, options);
            if (result.success) {
                if (attempt > 1) {
                    winston_logger_1.default.info(`Transaction succeeded on attempt ${attempt}`);
                }
                return result;
            }
            lastError = result.error;
            if (!this.isRetryableError(lastError)) {
                winston_logger_1.default.warn(`Non-retryable error, stopping retries: ${lastError.message}`);
                break;
            }
            if (attempt < maxRetries) {
                winston_logger_1.default.warn(`Transaction failed on attempt ${attempt}, retrying in ${retryDelay}ms...`);
                await this.delay(retryDelay);
                retryDelay *= 2;
            }
        }
        winston_logger_1.default.error(`Transaction failed after ${maxRetries} attempts`);
        return {
            success: false,
            error: lastError,
            duration: 0
        };
    }
    async createSavepoint(name) {
        await this.prisma.$executeRaw `SAVEPOINT ${name}`;
        winston_logger_1.default.debug(`Created savepoint: ${name}`);
    }
    async rollbackToSavepoint(name) {
        await this.prisma.$executeRaw `ROLLBACK TO SAVEPOINT ${name}`;
        winston_logger_1.default.debug(`Rolled back to savepoint: ${name}`);
    }
    async releaseSavepoint(name) {
        await this.prisma.$executeRaw `RELEASE SAVEPOINT ${name}`;
        winston_logger_1.default.debug(`Released savepoint: ${name}`);
    }
    async executeManualTransaction(callback) {
        const startTime = Date.now();
        try {
            await this.prisma.$executeRaw `BEGIN`;
            const controls = {
                commit: async () => {
                    await this.prisma.$executeRaw `COMMIT`;
                    winston_logger_1.default.debug('Transaction committed manually');
                },
                rollback: async () => {
                    await this.prisma.$executeRaw `ROLLBACK`;
                    winston_logger_1.default.debug('Transaction rolled back manually');
                },
                createSavepoint: (name) => this.createSavepoint(name),
                rollbackToSavepoint: (name) => this.rollbackToSavepoint(name),
                releaseSavepoint: (name) => this.releaseSavepoint(name)
            };
            const result = await callback(this.prisma, controls);
            try {
                await controls.commit();
            }
            catch (error) {
                winston_logger_1.default.debug('Auto-commit skipped (transaction already completed)');
            }
            const duration = Date.now() - startTime;
            winston_logger_1.default.info(`Manual transaction completed successfully in ${duration}ms`);
            return {
                success: true,
                data: result,
                duration
            };
        }
        catch (error) {
            try {
                await this.prisma.$executeRaw `ROLLBACK`;
                winston_logger_1.default.debug('Auto-rollback executed');
            }
            catch (rollbackError) {
                winston_logger_1.default.debug('Auto-rollback skipped (transaction already completed)');
            }
            const duration = Date.now() - startTime;
            winston_logger_1.default.error(`Manual transaction failed after ${duration}ms:`, error);
            return {
                success: false,
                error: error,
                duration
            };
        }
    }
    async getTransactionStats() {
        try {
            const result = await this.prisma.$queryRaw `
                SELECT 
                    (SELECT count(*) FROM pg_stat_activity WHERE state = 'active') as active_transactions,
                    (SELECT count(*) FROM pg_stat_activity WHERE wait_event_type = 'Lock') as waiting_transactions,
                    (SELECT setting::int FROM pg_settings WHERE name = 'max_connections') as max_connections,
                    (SELECT count(*) FROM pg_stat_activity) as current_connections
            `;
            return {
                activeTransactions: result[0].active_transactions,
                waitingTransactions: result[0].waiting_transactions,
                maxConnections: result[0].max_connections,
                currentConnections: result[0].current_connections
            };
        }
        catch (error) {
            winston_logger_1.default.error('Failed to get transaction stats:', error);
            return {
                activeTransactions: 0,
                waitingTransactions: 0,
                maxConnections: 0,
                currentConnections: 0
            };
        }
    }
    isRetryableError(error) {
        const retryableErrors = [
            'P2034',
            'P2037',
            'ECONNRESET',
            'ETIMEDOUT',
            'ENOTFOUND'
        ];
        return retryableErrors.some(code => error.message.includes(code) ||
            error.name.includes(code));
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    middleware() {
        return (req, res, next) => {
            req.transaction = {
                execute: (callback, options) => this.executeTransaction(callback, options),
                executeWithRetry: (callback, maxRetries, retryDelay, options) => this.executeWithRetry(callback, maxRetries, retryDelay, options),
                executeBatch: (callback, options) => this.executeTransaction(callback, options)
            };
            next();
        };
    }
}
exports.DatabaseTransactionService = DatabaseTransactionService;
//# sourceMappingURL=database-transaction.js.map
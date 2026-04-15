import { PrismaClient } from '../generated/prisma/client';
export type TransactionCallback<T> = (prisma: Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'>) => Promise<T>;
export interface TransactionOptions {
    maxWait?: number;
    timeout?: number;
    isolationLevel?: 'Serializable';
}
export interface TransactionResult<T> {
    success: boolean;
    data?: T;
    error?: Error;
    duration: number;
}
declare class DatabaseTransactionService {
    private prisma;
    constructor(prismaClient: PrismaClient);
    executeTransaction<T>(callback: TransactionCallback<T>, options?: TransactionOptions): Promise<TransactionResult<T>>;
    executeBatch<T>(callback: TransactionCallback<T[]>, options?: TransactionOptions): Promise<TransactionResult<T[]>>;
    executeWithRetry<T>(callback: TransactionCallback<T>, maxRetries?: number, retryDelay?: number, options?: TransactionOptions): Promise<TransactionResult<T>>;
    createSavepoint(name: string): Promise<void>;
    rollbackToSavepoint(name: string): Promise<void>;
    releaseSavepoint(name: string): Promise<void>;
    executeManualTransaction<T>(callback: (prisma: PrismaClient, controls: TransactionControls) => Promise<T>): Promise<TransactionResult<T>>;
    getTransactionStats(): Promise<{
        activeTransactions: number;
        waitingTransactions: number;
        maxConnections: number;
        currentConnections: number;
    }>;
    private isRetryableError;
    private delay;
    middleware(): (req: any, res: any, next: any) => void;
}
export interface TransactionControls {
    commit: () => Promise<void>;
    rollback: () => Promise<void>;
    createSavepoint: (name: string) => Promise<void>;
    rollbackToSavepoint: (name: string) => Promise<void>;
    releaseSavepoint: (name: string) => Promise<void>;
}
declare global {
    namespace Express {
        interface Request {
            transaction?: {
                execute: <T>(callback: TransactionCallback<T>, options?: TransactionOptions) => Promise<TransactionResult<T>>;
                executeWithRetry: <T>(callback: TransactionCallback<T>, maxRetries?: number, retryDelay?: number, options?: TransactionOptions) => Promise<TransactionResult<T>>;
                executeBatch: <T>(callback: TransactionCallback<T[]>, options?: TransactionOptions) => Promise<TransactionResult<T[]>>;
            };
        }
    }
}
export { DatabaseTransactionService };
//# sourceMappingURL=database-transaction.d.ts.map
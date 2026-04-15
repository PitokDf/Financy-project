import NodeCache from 'node-cache';
declare class CacheManager {
    private cache;
    constructor();
    set<T>(key: string, value: T, ttl?: number): boolean;
    get<T>(key: string): T | undefined;
    del(key: string): number;
    has(key: string): boolean;
    getStats(): NodeCache.Stats;
    flush(): void;
    getOrSet<T>(key: string, fetchFunction: () => Promise<T>, ttl?: number): Promise<T>;
    middleware(ttl?: number): (req: any, res: any, next: any) => any;
    generateKey(prefix: string, params: Record<string, any>): string;
    keys(): string[];
    delPattern(pattern: string): number;
}
export declare const cacheManager: CacheManager;
export {};
//# sourceMappingURL=cache.d.ts.map
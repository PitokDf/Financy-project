"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheManager = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
const winston_logger_1 = __importDefault(require("./winston.logger"));
class CacheManager {
    constructor() {
        this.cache = new node_cache_1.default({
            stdTTL: 3600,
            checkperiod: 600,
            useClones: false
        });
        this.cache.on('expired', (key) => {
            winston_logger_1.default.debug(`Cache key expired: ${key}`);
        });
        this.cache.on('set', (key) => {
            winston_logger_1.default.debug(`Cache key set: ${key}`);
        });
    }
    set(key, value, ttl) {
        try {
            return this.cache.set(key, value, ttl || 3600);
        }
        catch (error) {
            winston_logger_1.default.error('Cache set error:', error);
            return false;
        }
    }
    get(key) {
        try {
            return this.cache.get(key);
        }
        catch (error) {
            winston_logger_1.default.error('Cache get error:', error);
            return undefined;
        }
    }
    del(key) {
        try {
            return this.cache.del(key);
        }
        catch (error) {
            winston_logger_1.default.error('Cache delete error:', error);
            return 0;
        }
    }
    has(key) {
        try {
            return this.cache.has(key);
        }
        catch (error) {
            winston_logger_1.default.error('Cache has error:', error);
            return false;
        }
    }
    getStats() {
        return this.cache.getStats();
    }
    flush() {
        this.cache.flushAll();
        winston_logger_1.default.info('Cache flushed');
    }
    async getOrSet(key, fetchFunction, ttl) {
        const cached = this.get(key);
        if (cached !== undefined) {
            return cached;
        }
        try {
            const data = await fetchFunction();
            this.set(key, data, ttl);
            return data;
        }
        catch (error) {
            winston_logger_1.default.error('Cache getOrSet error:', error);
            throw error;
        }
    }
    middleware(ttl = 3600) {
        return (req, res, next) => {
            const key = `route_cache:${req.originalUrl}`;
            const cached = this.get(key);
            if (cached) {
                winston_logger_1.default.debug(`Cache hit for: ${key}`);
                return res.json(cached);
            }
            const originalJson = res.json;
            res.json = (body) => {
                this.set(key, body, ttl);
                winston_logger_1.default.debug(`Cache set for: ${key}`);
                return originalJson.call(res, body);
            };
            next();
        };
    }
    generateKey(prefix, params) {
        const sortedParams = Object.keys(params)
            .sort()
            .reduce((sorted, key) => {
            sorted[key] = params[key];
            return sorted;
        }, {});
        return `${prefix}:${JSON.stringify(sortedParams)}`;
    }
    keys() {
        return this.cache.keys();
    }
    delPattern(pattern) {
        const keys = this.keys();
        const keysToDelete = keys.filter(key => key.startsWith(pattern));
        let deletedCount = 0;
        keysToDelete.forEach(key => {
            deletedCount += this.del(key);
        });
        if (deletedCount > 0) {
            winston_logger_1.default.debug(`Deleted ${deletedCount} cache keys matching pattern: ${pattern}`);
        }
        return deletedCount;
    }
}
exports.cacheManager = new CacheManager();
//# sourceMappingURL=cache.js.map
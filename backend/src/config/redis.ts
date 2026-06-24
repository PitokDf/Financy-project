import { QueueOptions } from 'bull'
import Redis from 'ioredis'

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

export const redisConfig: QueueOptions['redis'] | null = REDIS_HOST
    ? {
        host: REDIS_HOST,
        port: Number(REDIS_PORT) || 6379,
        password: REDIS_PASSWORD,
    }
    : null;

export const redisClient = REDIS_HOST
    ? new Redis(
        REDIS_PASSWORD
            ? `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`
            : `redis://${REDIS_HOST}:${REDIS_PORT}`
    )
    : null;
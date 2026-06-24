import { QueueOptions } from 'bull'
import Redis from 'ioredis'

export const redisConfig: QueueOptions['redis'] | null = process.env.REDIS_HOST
    ? {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD,
    }
    : null;

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

export const redisClient = REDIS_HOST
    ? new Redis(
        REDIS_PASSWORD
            ? `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`
            : `redis://${REDIS_HOST}:${REDIS_PORT}`
    )
    : null;
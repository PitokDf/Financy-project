import { QueueOptions } from 'bull'
import Redis from 'ioredis'

export const redisConfig: QueueOptions['redis'] = {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
}

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;

const redisUrl = REDIS_PASSWORD
    ? `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`
    : `redis://${REDIS_HOST}:${REDIS_PORT}`;

export const redisClient = new Redis(redisUrl);
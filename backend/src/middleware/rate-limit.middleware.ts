import rateLimit from "express-rate-limit";
import { config } from "@/config";

// Rate limiting hanya diberlakukan di production. Di development/test, batas
// dilonggarkan agar suite E2E paralel tidak terkena 429 (Too many requests).
const isProd = config.isProduction;

export const generalLimiter = rateLimit({
    windowMs: config.rateLimit.WINDOW_MS, // 15 minutes
    max: isProd ? config.rateLimit.MAX : 100_000,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.',
        timestamp: new Date().toISOString()
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        success: false,
        message: 'Too many authentication attempts, please try again later.',
        timestamp: new Date().toISOString()
    },
    skipSuccessfulRequests: true,
});

export const paymentLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 payment requests per minute
    message: {
        success: false,
        message: 'Too many payment requests, please try again later.',
        timestamp: new Date().toISOString()
    },
});
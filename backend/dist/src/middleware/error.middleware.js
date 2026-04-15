"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.errorHandler = exports.notFound = void 0;
const response_1 = require("../utils/response");
const winston_logger_1 = __importDefault(require("../utils/winston.logger"));
const app_error_1 = require("../errors/app-error");
const message_1 = require("../constants/message");
const zod_1 = require("zod");
const multer_1 = require("multer");
const prisma_error_1 = require("../errors/prisma-error");
const http_status_1 = require("../constants/http-status");
const prismaNamespace_1 = require("../generated/prisma/internal/prismaNamespace");
const notFound = (req, res) => {
    response_1.ResponseUtil.notFound(res, `Route ${req.originalUrl} not found`);
};
exports.notFound = notFound;
const errorHandler = (err, req, res, _next) => {
    let statusCode = http_status_1.HttpStatus.INTERNAL_SERVER_ERROR;
    let message = message_1.Messages.INTERNAL_ERROR;
    let errors;
    if (err instanceof zod_1.ZodError) {
        statusCode = http_status_1.HttpStatus.BAD_REQUEST;
        message = "Invalid input data.";
        errors = err.errors.map((e) => ({
            path: e.path.join('.'),
            message: e.message
        }));
    }
    else if (err.name === 'JsonWebTokenError') {
        statusCode = http_status_1.HttpStatus.UNAUTHORIZED;
        message = "Invalid token";
    }
    else if (err.name === 'TokenExpiredError') {
        statusCode = http_status_1.HttpStatus.UNAUTHORIZED;
        message = "Token expired";
    }
    else if (err instanceof multer_1.MulterError) {
        statusCode = http_status_1.HttpStatus.BAD_REQUEST;
        message = "File upload failed";
    }
    else if (err.message?.startsWith("File type")) {
        statusCode = http_status_1.HttpStatus.BAD_REQUEST;
        message = "Invalid file type";
    }
    else if ((0, prisma_error_1.isPrismaError)(err) || err instanceof prismaNamespace_1.PrismaClientKnownRequestError) {
        const mapped = (0, prisma_error_1.mapPrismaError)(err);
        statusCode = mapped.httpStatus ?? http_status_1.HttpStatus.INTERNAL_SERVER_ERROR;
        message = mapped.message || 'A database error occurred';
        const extra = [];
        if (mapped.meta)
            extra.push({ meta: mapped.meta });
        if (mapped.commonCause)
            extra.push({ cause: mapped.commonCause });
        if (extra.length) {
            errors = (errors || []).concat(extra);
        }
    }
    else if (err instanceof app_error_1.AppError) {
        statusCode = err.statusCode ?? http_status_1.HttpStatus.INTERNAL_SERVER_ERROR;
        message = err.message;
        errors = err.errors;
    }
    else if (err instanceof SyntaxError && 'body' in err) {
        statusCode = http_status_1.HttpStatus.BAD_REQUEST;
        message = 'Invalid JSON in request body';
    }
    winston_logger_1.default.error('Unhandled Error', {
        message: err.message,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        statusCode,
    });
    console.log(err);
    response_1.ResponseUtil.error(res, message, errors, statusCode);
};
exports.errorHandler = errorHandler;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=error.middleware.js.map
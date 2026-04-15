"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtil = void 0;
const http_status_1 = require("../constants/http-status");
const message_1 = require("../constants/message");
class ResponseUtil {
    static base(res, success, message, data = null, statusCode, errors, extra, messageCode) {
        const response = {
            success,
            message,
            ...(data !== null ? { data } : {}),
            ...(errors ? { errors } : {}),
            ...(messageCode ? { messageCode } : {}),
            ...extra,
            timestamp: new Date().toISOString(),
            path: res.req.originalUrl
        };
        return res.status(statusCode).json(response);
    }
    static _resolveMessageAndCode(messageOrCode, defaultCode) {
        if (typeof messageOrCode === 'string' && Object.values(message_1.MessageCodes).includes(messageOrCode)) {
            return {
                message: (0, message_1.getMessageByCode)(messageOrCode),
                messageCode: messageOrCode,
            };
        }
        if (typeof messageOrCode === 'string') {
            return { message: messageOrCode, messageCode: undefined };
        }
        if (defaultCode) {
            return {
                message: (0, message_1.getMessageByCode)(defaultCode),
                messageCode: defaultCode,
            };
        }
        return { message: "An unexpected error occurred.", messageCode: undefined };
    }
    static success(res, data, statusCode = http_status_1.HttpStatus.OK, messageOrCode) {
        if (messageOrCode) {
            const { message, messageCode } = this._resolveMessageAndCode(messageOrCode);
            return this.base(res, true, message, data, statusCode, undefined, undefined, messageCode);
        }
        return this.base(res, true, "Success", data, statusCode);
    }
    static error(res, messageOrCode, errors, statusCode = http_status_1.HttpStatus.INTERNAL_SERVER_ERROR) {
        const { message, messageCode } = this._resolveMessageAndCode(messageOrCode, message_1.MessageCodes.INTERNAL_ERROR);
        return this.base(res, false, message, null, statusCode, errors, undefined, messageCode);
    }
    static notFound(res, messageOrCode) {
        const { message, messageCode } = this._resolveMessageAndCode(messageOrCode, message_1.MessageCodes.NOT_FOUND);
        return this.base(res, false, message, null, http_status_1.HttpStatus.NOT_FOUND, undefined, undefined, messageCode);
    }
    static created(res, data, messageOrCode) {
        const { message, messageCode } = this._resolveMessageAndCode(messageOrCode, message_1.MessageCodes.CREATED);
        return this.base(res, true, message, data, http_status_1.HttpStatus.CREATED, undefined, undefined, messageCode);
    }
    static validationError(res, errors, message = 'Validation failed') {
        return this.base(res, false, message, null, http_status_1.HttpStatus.BAD_REQUEST, errors);
    }
    static unprocessableEntity(res, message = 'Unprocessable Entity', errors) {
        return this.base(res, false, message, null, http_status_1.HttpStatus.UNPROCESSABLE_ENTITY, errors);
    }
    static unauthorized(res, message = 'Unauthorized') {
        return this.base(res, false, message, null, http_status_1.HttpStatus.UNAUTHORIZED);
    }
    static forbidden(res, message = 'Forbidden') {
        return this.base(res, false, message, null, http_status_1.HttpStatus.FORBIDDEN);
    }
    static noContent(res, message = 'No Content') {
        return this.base(res, true, message, null, http_status_1.HttpStatus.NO_CONTENT);
    }
    static tooManyRequests(res, message = 'Too Many Requests', retryAfter) {
        const extra = retryAfter ? { retryAfter } : {};
        return this.base(res, false, message, null, http_status_1.HttpStatus.TOO_MANY_REQUESTS, undefined, extra);
    }
    static serviceUnavailable(res, message = 'Service Unavailable') {
        return this.base(res, false, message, null, http_status_1.HttpStatus.SERVICE_UNAVAILABLE);
    }
    static paginated(res, data, page, limit, total, message = 'Success') {
        if (limit <= 0)
            throw new Error('Limit must be greater than 0');
        if (page < 1)
            throw new Error('Page must be greater than 0');
        if (total < 0)
            throw new Error('Total must be non-negative');
        const totalPages = Math.ceil(total / limit);
        const hasNext = page < totalPages;
        const hasPrev = page > 1;
        return this.base(res, true, message, data, http_status_1.HttpStatus.OK, undefined, {
            pagination: {
                page, limit, total, totalPages, hasNext, hasPrev,
                nextPage: hasNext ? page + 1 : null,
                prevPage: hasPrev ? page - 1 : null,
            },
        });
    }
}
exports.ResponseUtil = ResponseUtil;
//# sourceMappingURL=response.js.map
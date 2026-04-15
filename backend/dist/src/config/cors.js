"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfiguration = void 0;
const cors_1 = __importDefault(require("cors"));
const winston_logger_1 = __importDefault(require("../utils/winston.logger"));
const _1 = require(".");
exports.corsConfiguration = (0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (_1.config.NODE_ENV === "production") {
            if (_1.config.ALLOWED_ORIGINS.includes(origin)) {
                return callback(null, true);
            }
            else {
                return callback(new Error('Origin ini tidak diizinkan oleh kebijakan CORS.'));
            }
        }
        else {
            winston_logger_1.default.debug(`CORS request dari origin: ${origin}`);
            return callback(null, true);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        ...(_1.config.NODE_ENV !== "production" ? ['ngrok-skip-browser-warning'] : [])
    ],
    optionsSuccessStatus: 200,
    maxAge: 86400
});
//# sourceMappingURL=cors.js.map
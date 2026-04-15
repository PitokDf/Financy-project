"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = require("./config");
const rate_limit_middleware_1 = require("./middleware/rate-limit.middleware");
const compression_1 = __importDefault(require("compression"));
const error_middleware_1 = require("./middleware/error.middleware");
const app_1 = require("./constants/app");
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const logging_middleware_1 = require("./middleware/logging.middleware");
const utils_1 = require("./utils");
const http_status_1 = require("./constants/http-status");
const cors_1 = require("./config/cors");
const prisma_1 = __importDefault(require("./config/prisma"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    crossOriginEmbedderPolicy: false
}));
app.use(cors_1.corsConfiguration);
app.use(rate_limit_middleware_1.generalLimiter);
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
app.use(logging_middleware_1.requestLogger);
app.use('/uploads', express_1.default.static('uploads'));
app.use(app_1.App.API_PREFIX, index_routes_1.default);
app.get("/", (req, res) => {
    utils_1.ResponseUtil.success(res, null, http_status_1.HttpStatus.OK, `Service ${config_1.config.SERVICE} is running`);
});
app.use(error_middleware_1.notFound);
app.use(error_middleware_1.errorHandler);
process.on('SIGINT', async () => {
    await prisma_1.default.$disconnect();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    await prisma_1.default.$disconnect();
    process.exit(0);
});
exports.default = app;
//# sourceMappingURL=app.js.map
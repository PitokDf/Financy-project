"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const zod_1 = require("zod");
const app_error_1 = require("../errors/app-error");
const validateSchema = (schema) => {
    return async (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                return next(error);
            }
            next(new app_error_1.AppError('Kesalahan tak terduga saat validasi input.'));
        }
    };
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=zod.middleware.js.map
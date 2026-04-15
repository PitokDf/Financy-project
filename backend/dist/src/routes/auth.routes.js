"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controller/auth.controller");
const zod_middleware_1 = require("../middleware/zod.middleware");
const user_repository_1 = require("../repositories/user.repository");
const user_schema_1 = require("../schemas/user.schema");
const auth_service_1 = require("../service/auth.service");
const express_1 = require("express");
const authService = new auth_service_1.AuthService(user_repository_1.UserRepository);
const controller = new auth_controller_1.AuthController(authService);
const authRouter = (0, express_1.Router)();
authRouter.post('/login', (0, zod_middleware_1.validateSchema)(user_schema_1.loginSchema), controller.login);
authRouter.post('/register', (0, zod_middleware_1.validateSchema)(user_schema_1.registerSchema), controller.register);
authRouter.post('/logout', controller.logout);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map
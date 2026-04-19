import { AuthController } from "@/controller/auth.controller";
import { validateSchema } from "@/middleware/zod.middleware";
import { UserRepository } from "@/repositories/user.repository";
import { changePasswordSchema, loginSchema, registerSchema } from "@/schemas/user.schema";
import { AuthService } from "@/service/auth.service";
import { Router } from "express";

const authService = new AuthService(UserRepository);
const controller = new AuthController(authService);

const authRouter = Router()

authRouter.post(
    '/login',
    validateSchema(loginSchema),
    controller.login
)

authRouter.post(
    '/register',
    validateSchema(registerSchema),
    controller.register
)

authRouter.post(
    '/logout',
    controller.logout
)

authRouter.put(
    '/change-password',
    validateSchema(changePasswordSchema),
    controller.changePassword
)

export default authRouter
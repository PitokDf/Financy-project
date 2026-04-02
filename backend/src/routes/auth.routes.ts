import { AuthController } from "@/controller/auth.controller";
import { UserController } from "@/controller/user.controller";
import authMiddleware from "@/middleware/auth.middleware";
import { validateSchema } from "@/middleware/zod.middleware";
import { createUserSchema } from "@/schemas/user.schema";
import { checkEmailExists } from "@/validators/user.validator";
import { Router } from "express";

const authRouter = Router()

authRouter.post('/login', AuthController.login)
authRouter.post('/register', validateSchema(createUserSchema), checkEmailExists, UserController.createUser);
authRouter.post('/refresh', AuthController.refresh)

// Protected
authRouter.get('/me', authMiddleware, AuthController.me)

export default authRouter
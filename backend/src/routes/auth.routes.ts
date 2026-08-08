import { AuthController } from "@/controller/auth.controller";
import authMiddleware from "@/middleware/auth.middleware";
import { validateSchema } from "@/middleware/zod.middleware";
import { UserRepository } from "@/repositories/user.repository";
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/schemas/user.schema";
import { AuthService } from "@/service/auth.service";
import { Router } from "express";

const authService = new AuthService(UserRepository);
const controller = new AuthController(authService);

const authRouter = Router();

authRouter.post("/login", validateSchema(loginSchema), controller.login);

authRouter.post(
  "/register",
  validateSchema(registerSchema),
  controller.register,
);

authRouter.post("/logout", controller.logout);

authRouter.put(
  "/change-password",
  authMiddleware,
  validateSchema(changePasswordSchema),
  controller.changePassword,
);

authRouter.post(
  "/forgot-password",
  validateSchema(forgotPasswordSchema),
  controller.forgotPassword,
);

authRouter.post(
  "/reset-password",
  validateSchema(resetPasswordSchema),
  controller.resetPassword,
);

export default authRouter;

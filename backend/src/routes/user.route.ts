import { Router } from "express";
import { validateSchema } from "@/middleware/zod.middleware";
import {
    createUserSchema,
    updateUserSchema
} from "@/schemas/user.schema";
import { checkEmailExists } from "@/validators/user.validator";
import authMiddleware from "@/middleware/auth.middleware";
import { UserController } from "@/controller/user.controller";
import { UserService } from "@/service/user.service";
import { UserRepository } from "@/repositories/user.repository";
import { UserSettingController } from "@/controller/user-setting.controller";
import { updateUserSettingSchema } from "@/schemas/user-setting.schema";

const userService = new UserService(UserRepository);
const userController = new UserController(userService);

const userRouter = Router()

userRouter.post(
    "/register",
    validateSchema(createUserSchema),
    checkEmailExists,
    userController.createUser);

userRouter.use(authMiddleware)

userRouter.post('/logout', userController.logout);
userRouter.get("/", userController.getAllUser);
userRouter.get("/settings", UserSettingController.getSettings);
userRouter.patch("/settings", validateSchema(updateUserSettingSchema), UserSettingController.updateSettings);
userRouter.get("/me", userController.getMe);
userRouter.patch("/me", validateSchema(updateUserSchema), checkEmailExists, userController.updateMe);
userRouter.delete("/me/data", userController.purgeData);
userRouter.get("/:userId", userController.getUserById);
userRouter.delete("/:userId", userController.deleteUser);
userRouter.patch(
    "/:userId",
    validateSchema(updateUserSchema),
    checkEmailExists,
    userController.updateUser);

export default userRouter
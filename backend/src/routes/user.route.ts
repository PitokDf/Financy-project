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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication endpoints
 */

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User successfully created
 */
userRouter.post(
    "/register",
    validateSchema(createUserSchema),
    checkEmailExists,
    userController.createUser);

// Protected routes - perlu authentication
userRouter.use(authMiddleware)

/**
 * @swagger
 * /api/v1/users/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
userRouter.post('/logout', userController.logout);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 */
userRouter.get("/", userController.getAllUser);

userRouter.get("/settings", UserSettingController.getSettings);
userRouter.patch("/settings", validateSchema(updateUserSettingSchema), UserSettingController.updateSettings);

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     summary: Get strictly the authenticated user's profile with gamification stats
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile payload retrieved
 */
userRouter.get("/me", userController.getMe);
userRouter.patch("/me", validateSchema(updateUserSchema), checkEmailExists, userController.updateMe);
userRouter.delete("/me/data", userController.purgeData);

/**
 * @swagger
 * /api/v1/users/{userId}:
 *   get:
 *     summary: Get user details by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: Successful retrieval containing user payload
 *   patch:
 *     summary: Update existing user data
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated user payload
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User systematically removed
 */
userRouter.get("/:userId", userController.getUserById);
userRouter.delete("/:userId", userController.deleteUser);
userRouter.patch(
    "/:userId",
    validateSchema(updateUserSchema),
    checkEmailExists,
    userController.updateUser);

export default userRouter
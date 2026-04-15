"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_middleware_1 = require("../middleware/zod.middleware");
const user_schema_1 = require("../schemas/user.schema");
const user_validator_1 = require("../validators/user.validator");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const user_controller_1 = require("../controller/user.controller");
const user_setting_controller_1 = require("../controller/user-setting.controller");
const user_setting_schema_1 = require("../schemas/user-setting.schema");
const userRouter = (0, express_1.Router)();
userRouter.post("/register", (0, zod_middleware_1.validateSchema)(user_schema_1.createUserSchema), user_validator_1.checkEmailExists, user_controller_1.UserController.createUser);
userRouter.use(auth_middleware_1.default);
userRouter.post('/logout', user_controller_1.UserController.logout);
userRouter.get("/", user_controller_1.UserController.getAllUser);
userRouter.get("/settings", user_setting_controller_1.UserSettingController.getSettings);
userRouter.patch("/settings", (0, zod_middleware_1.validateSchema)(user_setting_schema_1.updateUserSettingSchema), user_setting_controller_1.UserSettingController.updateSettings);
userRouter.get("/me", user_controller_1.UserController.getMe);
userRouter.get("/:userId", user_controller_1.UserController.getUserById);
userRouter.delete("/:userId", user_controller_1.UserController.deleteUser);
userRouter.patch("/:userId", (0, zod_middleware_1.validateSchema)(user_schema_1.updateUserSchema), user_validator_1.checkEmailExists, user_controller_1.UserController.updateUser);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map
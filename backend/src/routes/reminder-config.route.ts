import { ReminderConfigController } from "@/controller/reminder-config.controller";
import authMiddleware from "@/middleware/auth.middleware";
import { ReminderConfigRepository } from "@/repositories/reminder-config.repository";
import { ReminderConfigService } from "@/service/reminder-config.service";
import { Router } from "express";

const reminderConfigRouter = Router();
const reminderConfigService = new ReminderConfigService(ReminderConfigRepository);
const reminderConfigController = new ReminderConfigController(reminderConfigService);

reminderConfigRouter.use(authMiddleware);

reminderConfigRouter.get("/", reminderConfigController.getReminderConfig);
reminderConfigRouter.patch("/", reminderConfigController.updateReminderConfig);

export default reminderConfigRouter;

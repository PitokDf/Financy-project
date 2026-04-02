import { ForecastController } from "@/controller/forecast.controller";
import authMiddleware from "@/middleware/auth.middleware";
import { CategoryRepository } from "@/repositories/category.repository";
import { ForecastRepository } from "@/repositories/forecast.repository";
import { NotificationRepository } from "@/repositories/notification.repository";
import { TransactionRepository } from "@/repositories/transaction.repository";
import { ForecastService } from "@/service/forecast.service";
import { Router } from "express";

const forecastRouter = Router();
const forecastService = new ForecastService(ForecastRepository, TransactionRepository, CategoryRepository, NotificationRepository);
const forecastController = new ForecastController(forecastService);

forecastRouter.use(authMiddleware);

forecastRouter.get("/", forecastController.getForecasts);
forecastRouter.get("/:forecastId", forecastController.getForecastById);
forecastRouter.post("/generate", forecastController.generateForecast);
forecastRouter.delete("/:forecastId", forecastController.deleteForecast);

export default forecastRouter;

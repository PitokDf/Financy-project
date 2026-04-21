import { Router } from "express";
import { ForecastController } from "@/controller/forecast.controller";
import { ForecastService } from "@/service/forecast.service";
import { ForecastRepository } from "@/repositories/forecast.repository";
import { TransactionRepository } from "@/repositories/transaction.repository";
import { CategoryRepository } from "@/repositories/category.repository";
import authMiddleware from "@/middleware/auth.middleware";

const transactionRepo = new TransactionRepository();
const forecastRepo = new ForecastRepository();
const categoryRepo = new CategoryRepository();

const forecastService = new ForecastService(transactionRepo, forecastRepo, categoryRepo);
const controller = new ForecastController(forecastService);

const forecastRouter = Router();

forecastRouter.use(authMiddleware);
forecastRouter.get("/top", controller.getTopForecasts);

export default forecastRouter;

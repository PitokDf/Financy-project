import { Router } from "express";
import { DashboardController } from "@/controller/dashboard.controller";
import { DashboardService } from "@/service/dashboard.service";
import { DashboardRepository } from "@/repositories/dashboard.repository";
import { CategoryRepository } from "@/repositories/category.repository";
import { ForecastRepository } from "@/repositories/forecast.repository";
import { ForecastService } from "@/service/forecast.service";
import authMiddleware from "@/middleware/auth.middleware";
import { TransactionRepository } from "@/repositories/transaction.repository";

const categoryRepo = new CategoryRepository();
const forecastRepo = new ForecastRepository();
const dashboardRepo = new DashboardRepository();
const transactionRepo = new TransactionRepository()
const forecastService = new ForecastService(transactionRepo, forecastRepo, categoryRepo);
const dashboardService = new DashboardService(dashboardRepo, categoryRepo, forecastRepo, forecastService);
const controller = new DashboardController(dashboardService);

const dashboardRouter = Router();

dashboardRouter.use(authMiddleware);
dashboardRouter.get("/", controller.getSummary);

export default dashboardRouter;

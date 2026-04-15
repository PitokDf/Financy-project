import { Router } from "express";
import { DashboardController } from "@/controller/dashboard.controller";
import { DashboardService } from "@/service/dashboard.service";
import { DashboardRepository } from "@/repositories/dashboard.repository";
import { CategoryRepository } from "@/repositories/category.repository";
import { ForecastRepository } from "@/repositories/forecast.repository";
import authMiddleware from "@/middleware/auth.middleware";

const categoryRepo = new CategoryRepository();
const forecastRepo = new ForecastRepository();
const dashboardRepo = new DashboardRepository();
const dashboardService = new DashboardService(dashboardRepo, categoryRepo, forecastRepo);
const controller = new DashboardController(dashboardService);

const dashboardRouter = Router();

dashboardRouter.use(authMiddleware);
dashboardRouter.get("/", controller.getSummary);

export default dashboardRouter;

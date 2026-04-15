import { Router } from "express";
import { AnalysisController } from "@/controller/analysis.controller";
import { AnalysisService } from "@/service/analysis.service";
import { AnalysisRepository } from "@/repositories/analysis.repository";
import { CategoryRepository } from "@/repositories/category.repository";
import { TransactionRepository } from "@/repositories/transaction.repository";
import { ForecastService } from "@/service/forecast.service";
import { ForecastRepository } from "@/repositories/forecast.repository";
import authMiddleware from "@/middleware/auth.middleware";

const transactionRepo = new TransactionRepository();
const forecastRepo = new ForecastRepository();
const categoryRepo = new CategoryRepository();
const analysisRepo = new AnalysisRepository();

const forecastService = new ForecastService(transactionRepo, forecastRepo);
const service = new AnalysisService(analysisRepo, categoryRepo, transactionRepo, forecastService);
const controller = new AnalysisController(service);

const analysisRouter = Router();

analysisRouter.use(authMiddleware)
analysisRouter.post("/run", controller.run);
analysisRouter.post("/confirm", controller.confirm);
analysisRouter.get("/latest", controller.getLatestRun);
analysisRouter.get("/stats", controller.getStats);
analysisRouter.get("/category-breakdown", controller.getCategoryBreakdown);

export default analysisRouter;

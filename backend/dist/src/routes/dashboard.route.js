"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controller/dashboard.controller");
const dashboard_service_1 = require("../service/dashboard.service");
const dashboard_repository_1 = require("../repositories/dashboard.repository");
const category_repository_1 = require("../repositories/category.repository");
const forecast_repository_1 = require("../repositories/forecast.repository");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const categoryRepo = new category_repository_1.CategoryRepository();
const forecastRepo = new forecast_repository_1.ForecastRepository();
const dashboardRepo = new dashboard_repository_1.DashboardRepository();
const dashboardService = new dashboard_service_1.DashboardService(dashboardRepo, categoryRepo, forecastRepo);
const controller = new dashboard_controller_1.DashboardController(dashboardService);
const dashboardRouter = (0, express_1.Router)();
dashboardRouter.use(auth_middleware_1.default);
dashboardRouter.get("/", controller.getSummary);
exports.default = dashboardRouter;
//# sourceMappingURL=dashboard.route.js.map
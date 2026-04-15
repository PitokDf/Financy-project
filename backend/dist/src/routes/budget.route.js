"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const budget_controller_1 = require("../controller/budget.controller");
const budget_service_1 = require("../service/budget.service");
const budget_repository_1 = require("../repositories/budget.repository");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const budgetRepo = new budget_repository_1.BudgetRepository();
const budgetService = new budget_service_1.BudgetService(budgetRepo);
const controller = new budget_controller_1.BudgetController(budgetService);
const budgetRouter = (0, express_1.Router)();
budgetRouter.use(auth_middleware_1.default);
budgetRouter.get("/", controller.getBudgets);
budgetRouter.post("/", controller.createBudget);
budgetRouter.put("/:id", controller.updateBudget);
budgetRouter.delete("/:id", controller.deleteBudget);
exports.default = budgetRouter;
//# sourceMappingURL=budget.route.js.map
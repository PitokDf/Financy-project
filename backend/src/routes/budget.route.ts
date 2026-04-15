import { Router } from "express";
import { BudgetController } from "@/controller/budget.controller";
import { BudgetService } from "@/service/budget.service";
import { BudgetRepository } from "@/repositories/budget.repository";
import authMiddleware from "@/middleware/auth.middleware";

const budgetRepo = new BudgetRepository();
const budgetService = new BudgetService(budgetRepo);
const controller = new BudgetController(budgetService);

const budgetRouter = Router();

budgetRouter.use(authMiddleware);

budgetRouter.get("/", controller.getBudgets);
budgetRouter.post("/", controller.createBudget);
budgetRouter.put("/:id", controller.updateBudget);
budgetRouter.delete("/:id", controller.deleteBudget);

export default budgetRouter;

import { BudgetGoalController } from "@/controller/budget-goal.controller";
import authMiddleware from "@/middleware/auth.middleware";
import { CategoryRepository } from "@/repositories/category.repository";
import { BudgetGoalRepository } from "@/repositories/budget-goal.repository";
import { BudgetGoalService } from "@/service/budget-goal.service";
import { Router } from "express";

const budgetGoalRouter = Router();
const budgetGoalService = new BudgetGoalService(BudgetGoalRepository, CategoryRepository);
const budgetGoalController = new BudgetGoalController(budgetGoalService);

budgetGoalRouter.use(authMiddleware);

budgetGoalRouter.get("/", budgetGoalController.getBudgetGoals);
budgetGoalRouter.get("/:budgetGoalId", budgetGoalController.getBudgetGoalById);
budgetGoalRouter.post("/", budgetGoalController.createBudgetGoal);
budgetGoalRouter.patch("/:budgetGoalId", budgetGoalController.updateBudgetGoal);
budgetGoalRouter.delete("/:budgetGoalId", budgetGoalController.deleteBudgetGoal);

export default budgetGoalRouter;

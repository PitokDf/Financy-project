import { HttpStatus } from "@/constants/http-status";
import { MessageCodes } from "@/constants/message";
import { asyncHandler } from "@/middleware/error.middleware";
import { BudgetGoalService } from "@/service/budget-goal.service";
import {
    budgetGoalIdParamSchema,
    createBudgetGoalSchema,
    getBudgetGoalsQuerySchema,
    updateBudgetGoalSchema,
} from "@/schemas/budget-goal.schema";
import { ResponseUtil } from "@/utils";
import { Request, Response } from "express";

export class BudgetGoalController {
    constructor(private readonly budgetGoalService: BudgetGoalService) { }

    public getBudgetGoals = asyncHandler(async (req: Request, res: Response) => {
        const query = getBudgetGoalsQuerySchema.parse(req.query);
        const userId = String(req.auth_user?.user_id);

        const result = await this.budgetGoalService.getBudgetGoals(userId, query);

        return ResponseUtil.success(res, result, HttpStatus.OK, MessageCodes.SUCCESS);
    });

    public getBudgetGoalById = asyncHandler(async (req: Request, res: Response) => {
        const { budgetGoalId } = budgetGoalIdParamSchema.parse(req.params);
        const userId = String(req.auth_user?.user_id);

        const budgetGoal = await this.budgetGoalService.getBudgetGoalById(userId, budgetGoalId);

        return ResponseUtil.success(res, budgetGoal, HttpStatus.OK, MessageCodes.SUCCESS);
    });

    public createBudgetGoal = asyncHandler(async (req: Request, res: Response) => {
        const payload = createBudgetGoalSchema.parse(req.body);
        const userId = String(req.auth_user?.user_id);

        const budgetGoal = await this.budgetGoalService.createBudgetGoal(userId, payload);

        return ResponseUtil.success(res, budgetGoal, HttpStatus.CREATED, MessageCodes.CREATED);
    });

    public updateBudgetGoal = asyncHandler(async (req: Request, res: Response) => {
        const { budgetGoalId } = budgetGoalIdParamSchema.parse(req.params);
        const payload = updateBudgetGoalSchema.parse(req.body);
        const userId = String(req.auth_user?.user_id);

        const budgetGoal = await this.budgetGoalService.updateBudgetGoal(userId, budgetGoalId, payload);

        return ResponseUtil.success(res, budgetGoal, HttpStatus.OK, MessageCodes.UPDATED);
    });

    public deleteBudgetGoal = asyncHandler(async (req: Request, res: Response) => {
        const { budgetGoalId } = budgetGoalIdParamSchema.parse(req.params);
        const userId = String(req.auth_user?.user_id);

        const budgetGoal = await this.budgetGoalService.deleteBudgetGoal(userId, budgetGoalId);

        return ResponseUtil.success(res, budgetGoal, HttpStatus.OK, MessageCodes.DELETED);
    });
}

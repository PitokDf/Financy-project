import { Request, Response } from "express";
import { BudgetService } from "@/service/budget.service";
import { asyncHandler } from "@/middleware/error.middleware";
import { ResponseUtil } from "@/utils";

export class BudgetController {
    constructor(private readonly budgetService: BudgetService) { }

    public getBudgets = asyncHandler(async (req: Request, res: Response) => {
        const budgets = await this.budgetService.getBudgetsWithProgress(req.auth_user!.user_id);
        return ResponseUtil.success(res, budgets);
    })

    public createBudget = asyncHandler(async (req: Request, res: Response) => {
        const budget = await this.budgetService.createBudget(req.auth_user!.user_id, req.body);
        return ResponseUtil.success(res, budget, 201);
    })

    public updateBudget = asyncHandler(async (req: Request, res: Response) => {
        const budget = await this.budgetService.updateBudget(req.auth_user!.user_id, req.params.id as string, req.body);
        return ResponseUtil.success(res, budget);
    })

    public deleteBudget = asyncHandler(async (req: Request, res: Response) => {
        await this.budgetService.deleteBudget(req.auth_user!.user_id, req.params.id as string);
        return ResponseUtil.success(res, null, 204);
    })
}

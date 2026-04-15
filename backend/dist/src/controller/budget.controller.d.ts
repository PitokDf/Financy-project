import { Request, Response } from "express";
import { BudgetService } from "../service/budget.service";
export declare class BudgetController {
    private readonly budgetService;
    constructor(budgetService: BudgetService);
    getBudgets: (req: Request, res: Response, next: import("express").NextFunction) => void;
    createBudget: (req: Request, res: Response, next: import("express").NextFunction) => void;
    updateBudget: (req: Request, res: Response, next: import("express").NextFunction) => void;
    deleteBudget: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=budget.controller.d.ts.map
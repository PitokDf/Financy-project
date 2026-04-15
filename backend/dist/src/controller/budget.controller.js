"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetController = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const utils_1 = require("../utils");
class BudgetController {
    constructor(budgetService) {
        this.budgetService = budgetService;
        this.getBudgets = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const budgets = await this.budgetService.getBudgetsWithProgress(req.auth_user.user_id);
            return utils_1.ResponseUtil.success(res, budgets);
        });
        this.createBudget = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const budget = await this.budgetService.createBudget(req.auth_user.user_id, req.body);
            return utils_1.ResponseUtil.success(res, budget, 201);
        });
        this.updateBudget = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const budget = await this.budgetService.updateBudget(req.auth_user.user_id, req.params.id, req.body);
            return utils_1.ResponseUtil.success(res, budget);
        });
        this.deleteBudget = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            await this.budgetService.deleteBudget(req.auth_user.user_id, req.params.id);
            return utils_1.ResponseUtil.success(res, null, 204);
        });
    }
}
exports.BudgetController = BudgetController;
//# sourceMappingURL=budget.controller.js.map
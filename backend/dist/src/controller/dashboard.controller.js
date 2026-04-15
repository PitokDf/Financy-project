"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const utils_1 = require("../utils");
class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
        this.getSummary = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const userId = req.auth_user.user_id;
            const result = await this.dashboardService.getSummary(userId);
            return utils_1.ResponseUtil.success(res, result);
        });
    }
}
exports.DashboardController = DashboardController;
//# sourceMappingURL=dashboard.controller.js.map
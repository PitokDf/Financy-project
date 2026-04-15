"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analysis_route_1 = __importDefault(require("./analysis.route"));
const user_route_1 = __importDefault(require("./user.route"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const transaction_route_1 = __importDefault(require("./transaction.route"));
const gamification_route_1 = __importDefault(require("./gamification.route"));
const dashboard_route_1 = __importDefault(require("./dashboard.route"));
const category_route_1 = __importDefault(require("./category.route"));
const notification_routes_1 = __importDefault(require("./notification.routes"));
const push_route_1 = __importDefault(require("./push.route"));
const budget_route_1 = __importDefault(require("./budget.route"));
const apiRouter = (0, express_1.Router)();
apiRouter.use('/analysis', analysis_route_1.default);
apiRouter.use('/users', user_route_1.default);
apiRouter.use('/auth', auth_routes_1.default);
apiRouter.use('/transactions', transaction_route_1.default);
apiRouter.use('/gamification', gamification_route_1.default);
apiRouter.use('/dashboard', dashboard_route_1.default);
apiRouter.use('/categories', category_route_1.default);
apiRouter.use('/notifications', notification_routes_1.default);
apiRouter.use('/push', push_route_1.default);
apiRouter.use('/budgets', budget_route_1.default);
exports.default = apiRouter;
//# sourceMappingURL=index.routes.js.map
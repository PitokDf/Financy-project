import { Request, Response } from "express";
import { DashboardService } from "../service/dashboard.service";
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getSummary: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=dashboard.controller.d.ts.map
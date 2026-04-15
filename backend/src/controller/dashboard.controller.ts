import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/error.middleware";
import { DashboardService } from "@/service/dashboard.service";
import { ResponseUtil } from "@/utils";

export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    public getSummary = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const result = await this.dashboardService.getSummary(userId);
        return ResponseUtil.success(res, result);
    });
}

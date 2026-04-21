import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/error.middleware";
import { ResponseUtil } from "@/utils";
import { HttpStatus } from "@/constants/http-status";
import { AnalysisService } from "@/service/analysis.service";
import { confirmAnalysisSchema, runAnalysisSchema } from "@/schemas/analysis.schema";

export class AnalysisController {
    constructor(private readonly service: AnalysisService) { }

    public run = asyncHandler(async (req: Request, res: Response) => {
        const payload = runAnalysisSchema.parse({ ...req.body });
        const result = await this.service.run(payload, req.auth_user!.user_id);

        return ResponseUtil.success(res, result, HttpStatus.OK, "Analysis berhasil dijalankan");
    });

    public runV2 = asyncHandler(async (req: Request, res: Response) => {
        const payload = runAnalysisSchema.parse({ ...req.body });
        const result = await this.service.runV2(payload, req.auth_user!.user_id);

        return ResponseUtil.success(res, result, HttpStatus.OK, "Analysis V2 berhasil dijalankan");
    });

    public confirm = asyncHandler(async (req: Request, res: Response) => {
        const payload = confirmAnalysisSchema.parse({ ...req.body, userId: req.auth_user!.user_id });
        const result = await this.service.confirm(payload);

        return ResponseUtil.success(res, result, HttpStatus.OK, "Analysis berhasil dikonfirmasi");
    });

    public getLatestRun = asyncHandler(async (req: Request, res: Response) => {
        const result = await this.service.getLatestRun(req.auth_user!.user_id);
        return ResponseUtil.success(res, result, HttpStatus.OK, "Status analysis terakhir berhasil diambil");
    });

    public getStats = asyncHandler(async (req: Request, res: Response) => {
        const { startDate, endDate } = req.query;
        const result = await this.service.getStats(
            req.auth_user!.user_id,
            startDate as string,
            endDate as string
        );
        return ResponseUtil.success(res, result, HttpStatus.OK, "Statistik analysis berhasil diambil");
    });

    public getCategoryBreakdown = asyncHandler(async (req: Request, res: Response) => {
        const { startDate, endDate } = req.query;
        const result = await this.service.getCategoryBreakdown(
            req.auth_user!.user_id,
            startDate as string,
            endDate as string
        );
        return ResponseUtil.success(res, result, HttpStatus.OK, "Breakdown kategori berhasil diambil");
    });
}

import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/error.middleware";
import { ResponseUtil } from "@/utils";
import { HttpStatus } from "@/constants/http-status";
import { ForecastService } from "@/service/forecast.service";

export class ForecastController {
    constructor(private readonly service: ForecastService) { }

    public getTopForecasts = asyncHandler(async (req: Request, res: Response) => {
        const result = await this.service.getTopForecasts(req.auth_user!.user_id, 3);
        return ResponseUtil.success(res, result, HttpStatus.OK, "Top 3 peramalan kategori berhasil diambil");
    });
}

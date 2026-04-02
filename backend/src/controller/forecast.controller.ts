import { HttpStatus } from "@/constants/http-status";
import { MessageCodes } from "@/constants/message";
import { asyncHandler } from "@/middleware/error.middleware";
import { ForecastService } from "@/service/forecast.service";
import {
    forecastIdParamSchema,
    generateForecastSchema,
    getForecastsQuerySchema,
} from "@/schemas/forecast.schema";
import { ResponseUtil } from "@/utils";
import { Request, Response } from "express";

export class ForecastController {
    constructor(private readonly forecastService: ForecastService) { }

    public getForecasts = asyncHandler(async (req: Request, res: Response) => {
        const query = getForecastsQuerySchema.parse(req.query);
        const userId = String(req.auth_user?.user_id);

        const result = await this.forecastService.getForecasts(userId, query);

        return ResponseUtil.success(res, result, HttpStatus.OK, MessageCodes.SUCCESS);
    });

    public getForecastById = asyncHandler(async (req: Request, res: Response) => {
        const { forecastId } = forecastIdParamSchema.parse(req.params);
        const userId = String(req.auth_user?.user_id);

        const forecast = await this.forecastService.getForecastById(userId, forecastId);

        return ResponseUtil.success(res, forecast, HttpStatus.OK, MessageCodes.SUCCESS);
    });

    public generateForecast = asyncHandler(async (req: Request, res: Response) => {
        const payload = generateForecastSchema.parse(req.body);
        const userId = String(req.auth_user?.user_id);

        const forecast = await this.forecastService.generateForecast(userId, payload);

        return ResponseUtil.success(res, forecast, HttpStatus.CREATED, MessageCodes.CREATED);
    });

    public deleteForecast = asyncHandler(async (req: Request, res: Response) => {
        const { forecastId } = forecastIdParamSchema.parse(req.params);
        const userId = String(req.auth_user?.user_id);

        const forecast = await this.forecastService.deleteForecast(userId, forecastId);

        return ResponseUtil.success(res, forecast, HttpStatus.OK, MessageCodes.DELETED);
    });
}

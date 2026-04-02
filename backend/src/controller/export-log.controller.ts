import { HttpStatus } from "@/constants/http-status";
import { MessageCodes } from "@/constants/message";
import { asyncHandler } from "@/middleware/error.middleware";
import { ExportLogService } from "@/service/export-log.service";
import {
    createExportLogSchema,
    exportLogIdParamSchema,
    getExportLogsQuerySchema,
    updateExportLogStatusSchema,
} from "@/schemas/export-log.schema";
import { ResponseUtil } from "@/utils";
import { Request, Response } from "express";

export class ExportLogController {
    constructor(private readonly exportLogService: ExportLogService) { }

    public getExportLogs = asyncHandler(async (req: Request, res: Response) => {
        const query = getExportLogsQuerySchema.parse(req.query);
        const userId = String(req.auth_user?.user_id);

        const result = await this.exportLogService.getExportLogs(userId, query);

        return ResponseUtil.success(res, result, HttpStatus.OK, MessageCodes.SUCCESS);
    });

    public getExportLogById = asyncHandler(async (req: Request, res: Response) => {
        const { exportLogId } = exportLogIdParamSchema.parse(req.params);
        const userId = String(req.auth_user?.user_id);

        const exportLog = await this.exportLogService.getExportLogById(userId, exportLogId);

        return ResponseUtil.success(res, exportLog, HttpStatus.OK, MessageCodes.SUCCESS);
    });

    public createExportLog = asyncHandler(async (req: Request, res: Response) => {
        const payload = createExportLogSchema.parse(req.body);
        const userId = String(req.auth_user?.user_id);

        const exportLog = await this.exportLogService.createExportLog(userId, payload);

        return ResponseUtil.success(res, exportLog, HttpStatus.CREATED, MessageCodes.CREATED);
    });

    public updateExportLogStatus = asyncHandler(async (req: Request, res: Response) => {
        const { exportLogId } = exportLogIdParamSchema.parse(req.params);
        const payload = updateExportLogStatusSchema.parse(req.body);
        const userId = String(req.auth_user?.user_id);

        const exportLog = await this.exportLogService.updateExportLogStatus(userId, exportLogId, payload);

        return ResponseUtil.success(res, exportLog, HttpStatus.OK, MessageCodes.UPDATED);
    });
}

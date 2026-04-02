import { HttpStatus } from "@/constants/http-status";
import { MessageCodes } from "@/constants/message";
import { asyncHandler } from "@/middleware/error.middleware";
import { ReminderConfigService } from "@/service/reminder-config.service";
import { updateReminderConfigSchema } from "@/schemas/reminder-config.schema";
import { ResponseUtil } from "@/utils";
import { Request, Response } from "express";

export class ReminderConfigController {
    constructor(private readonly reminderConfigService: ReminderConfigService) { }

    public getReminderConfig = asyncHandler(async (req: Request, res: Response) => {
        const userId = String(req.auth_user?.user_id);
        const config = await this.reminderConfigService.getReminderConfig(userId);

        return ResponseUtil.success(res, config, HttpStatus.OK, MessageCodes.SUCCESS);
    });

    public updateReminderConfig = asyncHandler(async (req: Request, res: Response) => {
        const payload = updateReminderConfigSchema.parse(req.body);
        const userId = String(req.auth_user?.user_id);

        const config = await this.reminderConfigService.updateReminderConfig(userId, payload);

        return ResponseUtil.success(res, config, HttpStatus.OK, MessageCodes.UPDATED);
    });
}

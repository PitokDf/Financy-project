import { Request, Response } from 'express';
import { asyncHandler } from "@/middleware/error.middleware";
import { UserSettingService } from '@/service/user-setting.service';
import { ResponseUtil } from '@/utils';
import { UpdateUserSettingDTO } from '@/schemas/user-setting.schema';

export class UserSettingController {
    public static getSettings = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const settings = await UserSettingService.getSettings(userId);

        return ResponseUtil.success(res, settings);
    });

    public static updateSettings = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const data = req.body as UpdateUserSettingDTO;
        console.log(data)
        const settings = await UserSettingService.updateSettings(userId, data);

        return ResponseUtil.success(res, settings);
    });
}

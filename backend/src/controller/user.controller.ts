import { Request, Response } from "express";
import { UserService } from "@/service/user.service";
import { ResponseUtil } from "@/utils/response";
import { asyncHandler } from "@/middleware/error.middleware";
import { HttpStatus } from "@/constants/http-status";
import { MessageCodes } from "@/constants/message";
import { Auth } from "@/utils/auth";
import logger from "@/utils/winston.logger";

export class UserController {
    constructor(private readonly userService: UserService) { }

    public getAllUser = asyncHandler(async (req: Request, res: Response) => {
        const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;

        const result = await this.userService.findAll({ page, limit });
        const authUser = req.auth_user;

        logger.debug('Get all users request', { user: authUser, page, limit });

        return ResponseUtil.success(res, result, HttpStatus.OK, MessageCodes.SUCCESS);
    })

    public getUserById = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.params.userId as string
        const user = await this.userService.findById(userId)

        return ResponseUtil.success(res, user)
    })

    public getMe = asyncHandler(async (req: Request, res: Response) => {
        const userId = (req.auth_user as any)?.user_id || (req.auth_user as any)?.id;
        const userProfile = await this.userService.findProfile(userId);

        return ResponseUtil.success(res, userProfile);
    })

    public createUser = asyncHandler(async (req: Request, res: Response) => {
        const payload = req.body
        const user = await this.userService.create(payload)

        return ResponseUtil.success(res, user, HttpStatus.CREATED, MessageCodes.CREATED)
    })

    public updateUser = asyncHandler(async (req: Request, res: Response) => {
        const payload = req.body
        const userId = req.params.userId as string
        const user = await this.userService.update(userId, payload)

        return ResponseUtil.success(res, user, HttpStatus.OK, MessageCodes.UPDATED)
    })

    public updateMe = asyncHandler(async (req: Request, res: Response) => {
        const payload = req.body
        const userId = req.auth_user!.user_id;
        const user = await this.userService.update(userId, payload)

        return ResponseUtil.success(res, user, HttpStatus.OK, MessageCodes.UPDATED)
    })

    public deleteUser = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.params.userId as string
        const user = await this.userService.delete(userId)

        return ResponseUtil.success(res, user, HttpStatus.OK, MessageCodes.DELETED)
    })

    public logout = asyncHandler(async (req: Request, res: Response) => {
        Auth.clearTokenCookieHttpOnly(res)

        return ResponseUtil.success(res, null, HttpStatus.OK, "Logout berhasil");
    });

    public purgeData = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const { password } = req.body;

        await this.userService.purgeAllData(userId, password);

        return ResponseUtil.success(res, null, HttpStatus.OK, "Semua data berhasil dihapus");
    });
}
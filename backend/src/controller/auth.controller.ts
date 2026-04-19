import { Request, Response } from 'express';
import { asyncHandler } from "@/middleware/error.middleware";
import { ChangePassword, LoginDTO, RegisterDTO } from '@/schemas/user.schema';
import { AuthService } from '@/service/auth.service';
import { Auth } from '@/utils/auth';
import { ResponseUtil } from '@/utils';

export class AuthController {
    constructor(private readonly authService: AuthService) { }

    public login = asyncHandler(async (req: Request, res: Response) => {
        const data = req.body as LoginDTO;
        const result = await this.authService.login(data);

        Auth.setTokenCookieHttpOnly(res, result.token, { duration: 3, unit: 'd' })

        return ResponseUtil.success(res, result.user)
    })

    public register = asyncHandler(async (req: Request, res: Response) => {
        const data = req.body as RegisterDTO;
        const result = await this.authService.register(data);

        Auth.setTokenCookieHttpOnly(res, result.token, { duration: 3, unit: 'd' })

        return ResponseUtil.success(res, result.user)
    })

    public logout = asyncHandler(async (req: Request, res: Response) => {
        Auth.clearTokenCookieHttpOnly(res)

        return ResponseUtil.success(res, {})
    })

    public changePassword = asyncHandler(async (req: Request<ChangePassword>, res: Response) => {
        const updated = await this.authService.changePassword(req.body, req.auth_user?.email!);

        return ResponseUtil.success(res, updated)
    })
}
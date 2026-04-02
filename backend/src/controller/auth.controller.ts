import { HttpStatus } from "@/constants/http-status";
import { asyncHandler } from "@/middleware/error.middleware";
import { getUserByIdService, loginService, refreshTokenService } from "@/service/user.service";
import { ResponseUtil } from "@/utils";
import { Auth } from "@/utils/auth";
import { Request, Response } from 'express'

export class AuthController {
    public static login = asyncHandler(async (req: Request, res: Response) => {
        const payload = req.body;
        const result = await loginService(payload.email, payload.password);

        Auth.setTokenCookieHttpOnly('refreshToken', res, result.refreshToken)

        return ResponseUtil.success(res, {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            user: result.user
        }, HttpStatus.OK, "Login berhasil");
    });

    public static refresh = asyncHandler(async (req: Request, res: Response) => {
        // Support refresh token dari cookie (web) atau body (mobile)
        const token = req.cookies?.refreshToken || req.body?.refreshToken

        if (!token) {
            return ResponseUtil.error(res, "Refresh token tidak ditemukan", undefined, HttpStatus.BAD_REQUEST);
        }

        const result = await refreshTokenService(token)

        Auth.setTokenCookieHttpOnly('refreshToken', res, result.refreshToken)

        return ResponseUtil.success(res, {
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        }, HttpStatus.OK, "Token berhasil diperbarui");
    })

    public static me = asyncHandler(async (req: Request, res: Response) => {
        const authUser = req.auth_user!
        const user = await getUserByIdService(String(authUser.user_id))

        return ResponseUtil.success(res, user, HttpStatus.OK, "Profil berhasil diambil");
    })
}
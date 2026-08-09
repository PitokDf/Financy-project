import { Request, Response } from 'express';
import passport from "@/utils/passport";
import { JwtUtil } from "@/utils/jwt";
import { Auth } from "@/utils/auth";
import { config } from "@/config";
import { UserSettingService } from "@/service/user-setting.service";

const CLIENT_URL = config.CLIENT_URL.split(',')[0].trim();

export class AuthGoogleController {
    public initiate = passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
    });

    public callback = (req: Request, res: Response) => {
        passport.authenticate('google', { session: false }, async (err: any, user: any, info: any) => {
            if (err || !user) {
                const msg = info?.message || (err ? 'google_auth_failed' : 'google_auth_no_user');
                return res.redirect(`${CLIENT_URL}/login?error=${encodeURIComponent(msg)}`);
            }

            const token = JwtUtil.generate({ ...user, user_id: user.id }, '3d');
            Auth.setTokenCookieHttpOnly(res, token, { duration: 3, unit: 'd' });

            const isProd = config.isProduction;
            let language = 'id';
            try {
                const settings = await UserSettingService.getSettings(user.id);
                language = settings.language;
            } catch {
                // fallback ke default jika settings gagal dimuat
            }
            res.cookie('NEXT_LOCALE', language, {
                httpOnly: false,
                secure: isProd,
                sameSite: isProd ? 'none' : 'lax' as const,
                domain: isProd ? config.COOKIES_DOMAIN : undefined,
                maxAge: 365 * 24 * 60 * 60 * 1000,
                path: '/',
            });

            return res.redirect(`${CLIENT_URL}/dashboard`);
        })(req, res);
    }
}

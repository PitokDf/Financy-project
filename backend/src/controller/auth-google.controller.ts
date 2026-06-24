import { Request, Response } from 'express';
import passport from "@/utils/passport";
import { JwtUtil } from "@/utils/jwt";
import { Auth } from "@/utils/auth";
import { config } from "@/config";

const CLIENT_URL = config.CLIENT_URL.split(',')[0].trim();

export class AuthGoogleController {
    public initiate = passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
    });

    public callback = (req: Request, res: Response) => {
        passport.authenticate('google', { session: false }, (err: any, user: any, info: any) => {
            if (err || !user) {
                const msg = info?.message || (err ? 'google_auth_failed' : 'google_auth_no_user');
                return res.redirect(`${CLIENT_URL}/login?error=${encodeURIComponent(msg)}`);
            }

            const token = JwtUtil.generate({ ...user, user_id: user.id }, '3d');
            Auth.setTokenCookieHttpOnly(res, token, { duration: 3, unit: 'd' });

            return res.redirect(`${CLIENT_URL}/dashboard`);
        })(req, res);
    }
}

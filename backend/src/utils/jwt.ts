import jwt from 'jsonwebtoken';
import { config } from '@/config';

export type JwtPayload = {
    user_id: string | number;
    email: string;
    name: string;

    // tambahkan yang lainnya jika dibutuhkan
}

export const JwtUtil = {
    // generate(payload: JwtPayload, expiresIn: any = '1D'): string {
    //     return jwt.sign(payload, config.JWT_SECRET, {
    //         algorithm: "HS256",
    //         expiresIn,
    //         issuer: config.JWT_ISSUER
    //     });
    // },

    // verify(token: string): jwt.JwtPayload & JwtPayload {
    //     return jwt.verify(token, config.JWT_SECRET, {
    //         algorithms: ["HS256"],
    //         issuer: config.JWT_ISSUER
    //     }) as jwt.JwtPayload & JwtPayload;
    // },

    decode(token: string): jwt.JwtPayload {
        return jwt.decode(token) as jwt.JwtPayload;
    },

    signAccessToken(payload: object, expiresIn: any = '1D') {
        return jwt.sign(payload, config.JWT_ACCESS_SECRET, { expiresIn: expiresIn ?? '15m' })
    },

    signRefreshToken(payload: object) {
        return jwt.sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: '30d' })
    },

    verifyAccessToken(token: string): jwt.JwtPayload & JwtPayload {
        return jwt.verify(token, config.JWT_ACCESS_SECRET) as jwt.JwtPayload & JwtPayload;
    },

    verifyRefreshToken(token: string): jwt.JwtPayload & JwtPayload {
        return jwt.verify(token, config.JWT_REFRESH_SECRET) as jwt.JwtPayload & JwtPayload;
    }
};
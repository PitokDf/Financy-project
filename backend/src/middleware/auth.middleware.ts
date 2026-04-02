import { JwtPayload, JwtUtil, ResponseUtil } from "@/utils";
import { Auth } from "@/utils/auth";
import { Request, Response, NextFunction } from "express";

declare global {
    namespace Express {
        interface Request {
            auth_user?: JwtPayload;
        }
    }
}

/**
 * Auth middleware:
 * - expects Authorization: Bearer <token>
 * - verifies JWT and attaches decoded payload to req.user
 */
export default function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;
    const authCookie = req.cookies;

    // Coba ambil token dari header dulu, fallback ke cookie
    let token: string | undefined;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    } else if (authCookie?.token) {
        token = authCookie.token;
    }

    if (!token) {
        return ResponseUtil.unauthorized(res, "Unauthorized");
    }

    try {
        const decoded = JwtUtil.verifyAccessToken(token);
        const today = Math.floor(new Date().getTime() / 1000);

        if (decoded.exp && today > decoded.exp) {
            Auth.clearTokenCookieHttpOnly(res);
            return ResponseUtil.unauthorized(res, "Token expired");
        }

        req.auth_user = decoded;
        return next();
    } catch (err) {
        return ResponseUtil.unauthorized(res, "Invalid or expired token");
    }
}
import { JwtPayload } from "../utils";
import { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            auth_user?: JwtPayload;
        }
    }
}
export default function authMiddleware(req: Request, res: Response, next: NextFunction): void | Response<import("../types/response").ApiResponse<null>, Record<string, any>>;
//# sourceMappingURL=auth.middleware.d.ts.map
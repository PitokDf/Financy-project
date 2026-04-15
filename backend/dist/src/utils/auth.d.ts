import { Response } from "express";
export declare class Auth {
    static setTokenCookieHttpOnly(res: Response, token: string, expiresIn?: {
        duration: number;
        unit: "m" | "h" | "d" | "w" | "infinity";
    }): void;
    static clearTokenCookieHttpOnly(res: Response): void;
}
//# sourceMappingURL=auth.d.ts.map
import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login: (req: Request, res: Response, next: import("express").NextFunction) => void;
    register: (req: Request, res: Response, next: import("express").NextFunction) => void;
    logout: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=auth.controller.d.ts.map
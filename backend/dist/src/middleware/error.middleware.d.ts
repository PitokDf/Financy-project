import { Request, Response, NextFunction } from "express";
export declare const notFound: (req: Request, res: Response) => void;
export declare const errorHandler: (err: any, req: Request, res: Response, _next: NextFunction) => void;
export declare const asyncHandler: (fn: Function) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=error.middleware.d.ts.map
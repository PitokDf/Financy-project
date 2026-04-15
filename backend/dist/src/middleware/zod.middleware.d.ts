import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
export declare const validateSchema: (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=zod.middleware.d.ts.map
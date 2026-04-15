import { Request, Response } from "express";
import { AnalysisService } from "../service/analysis.service";
export declare class AnalysisController {
    private readonly service;
    constructor(service: AnalysisService);
    run: (req: Request, res: Response, next: import("express").NextFunction) => void;
    confirm: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getLatestRun: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getStats: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getCategoryBreakdown: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=analysis.controller.d.ts.map
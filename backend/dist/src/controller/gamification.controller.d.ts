import { GamificationRepository } from "../repositories/gamification.repository";
import { GamificationService } from "../service/gamification.service";
import { Request, Response } from 'express';
export declare class GamificationController {
    private readonly service;
    private readonly repo;
    constructor(service: GamificationService, repo: GamificationRepository);
    getStats: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getBadges: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getAllBadges: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getChallenges: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=gamification.controller.d.ts.map
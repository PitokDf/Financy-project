import { asyncHandler } from "@/middleware/error.middleware";
import { GamificationRepository } from "@/repositories/gamification.repository";
import { GamificationService } from "@/service/gamification.service";
import { ResponseUtil } from "@/utils";
import { Request, Response } from 'express';

export class GamificationController {
    constructor(
        private readonly service: GamificationService,
        private readonly repo: GamificationRepository
    ) { }

    public getStats = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const stats = await this.service.syncStreak(userId);
        return ResponseUtil.success(res, stats);
    });

    public getBadges = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const badges = await this.repo.getUserBadges(userId);
        return ResponseUtil.success(res, badges);
    });

    public getAllBadges = asyncHandler(async (req: Request, res: Response) => {
        const badges = await this.repo.getAllBadges();
        return ResponseUtil.success(res, badges);
    });

    public getChallenges = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const challenges = await this.service.ensureWeeklyChallenges(userId);
        return ResponseUtil.success(res, challenges);
    });
}

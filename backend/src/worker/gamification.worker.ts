import { Job } from "bullmq";
import { BaseWorker } from "./base.worker";
import { GamificationJobData } from "@/queue/gamification.queue";
import frameworkLogger from "@/utils/winston.logger";
import { GamificationService } from "@/service/gamification.service";
import { GamificationRepository } from "@/repositories/gamification.repository";

export class GamificationWorker extends BaseWorker<GamificationJobData> {
    private gamificationService: GamificationService;

    constructor() {
        super('gamification-queue');
        this.gamificationService = new GamificationService(new GamificationRepository());
    }

    protected async process(job: Job<GamificationJobData, any, string>): Promise<void> {
        const { userId, action, value } = job.data;

        frameworkLogger.info(`[GamificationWorker] Processing job for user: ${userId}, action: ${action}`);

        try {
            if (action === 'TRANSACTION_CREATED') {
                await this.gamificationService.updateStreak(userId);
                await this.gamificationService.updateChallengeProgress(userId, 'WEEKLY_TRANSACTIONS', value || 1);
            } else if (action === 'ANALYSIS_CREATED') {
                await this.gamificationService.awardXP(userId, 50, "ANALYSIS_COMPLETED");
                await this.gamificationService.updateChallengeProgress(userId, 'ANALYSIS_COUNT', value || 1);
            }
            frameworkLogger.info(`[GamificationWorker] Successfully processed job for user: ${userId}`);
        } catch (error) {
            frameworkLogger.error(`[GamificationWorker] Failed to process job for user: ${userId}`, error);
            throw error;
        }
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamificationController = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const utils_1 = require("../utils");
class GamificationController {
    constructor(service, repo) {
        this.service = service;
        this.repo = repo;
        this.getStats = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const userId = req.auth_user.user_id;
            const stats = await this.service.syncStreak(userId);
            return utils_1.ResponseUtil.success(res, stats);
        });
        this.getBadges = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const userId = req.auth_user.user_id;
            const badges = await this.repo.getUserBadges(userId);
            return utils_1.ResponseUtil.success(res, badges);
        });
        this.getAllBadges = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const badges = await this.repo.getAllBadges();
            return utils_1.ResponseUtil.success(res, badges);
        });
        this.getChallenges = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const userId = req.auth_user.user_id;
            const challenges = await this.service.ensureWeeklyChallenges(userId);
            return utils_1.ResponseUtil.success(res, challenges);
        });
    }
}
exports.GamificationController = GamificationController;
//# sourceMappingURL=gamification.controller.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const gamification_controller_1 = require("../controller/gamification.controller");
const gamification_service_1 = require("../service/gamification.service");
const gamification_repository_1 = require("../repositories/gamification.repository");
const repo = new gamification_repository_1.GamificationRepository();
const service = new gamification_service_1.GamificationService(repo);
const controller = new gamification_controller_1.GamificationController(service, repo);
const gamificationRouter = (0, express_1.Router)();
gamificationRouter.use(auth_middleware_1.default);
gamificationRouter.get("/stats", controller.getStats);
gamificationRouter.get("/badges", controller.getBadges);
gamificationRouter.get("/badges/all", controller.getAllBadges);
gamificationRouter.get("/challenges", controller.getChallenges);
exports.default = gamificationRouter;
//# sourceMappingURL=gamification.route.js.map
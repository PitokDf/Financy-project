import { Router } from "express";
import authMiddleware from "@/middleware/auth.middleware";
import { GamificationController } from "@/controller/gamification.controller";
import { GamificationService } from "@/service/gamification.service";
import { GamificationRepository } from "@/repositories/gamification.repository";

const repo = new GamificationRepository();
const service = new GamificationService(repo);
const controller = new GamificationController(service, repo);

const gamificationRouter = Router();

gamificationRouter.use(authMiddleware);

gamificationRouter.get("/stats", controller.getStats);
gamificationRouter.get("/badges", controller.getBadges);
gamificationRouter.get("/badges/all", controller.getAllBadges);
gamificationRouter.get("/challenges", controller.getChallenges);

export default gamificationRouter;

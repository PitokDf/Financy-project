import { Router } from "express";
import { PushController } from "@/controller/push.controller";
import authMiddleware from "@/middleware/auth.middleware";

const pushRouter = Router();

pushRouter.get("/test", PushController.sendTest);
pushRouter.use(authMiddleware);

pushRouter.post("/subscribe", PushController.subscribe);
pushRouter.post("/unsubscribe", PushController.unsubscribe);

export default pushRouter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const push_controller_1 = require("../controller/push.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const pushRouter = (0, express_1.Router)();
pushRouter.get("/test", push_controller_1.PushController.sendTest);
pushRouter.use(auth_middleware_1.default);
pushRouter.post("/subscribe", push_controller_1.PushController.subscribe);
pushRouter.post("/unsubscribe", push_controller_1.PushController.unsubscribe);
exports.default = pushRouter;
//# sourceMappingURL=push.route.js.map
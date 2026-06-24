import { Router } from "express";
import { AuthGoogleController } from "@/controller/auth-google.controller";

const controller = new AuthGoogleController();

const authGoogleRouter = Router()

authGoogleRouter.get('/', controller.initiate)

authGoogleRouter.get('/callback', controller.callback)

export default authGoogleRouter

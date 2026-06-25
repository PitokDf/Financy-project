import { Router, Request, Response } from "express";
import { AuthGoogleController } from "@/controller/auth-google.controller";
import { config } from "@/config";

const authGoogleRouter = Router()

if (config.GOOGLE_CLIENT_ID && config.GOOGLE_CLIENT_SECRET) {
    const controller = new AuthGoogleController();

    authGoogleRouter.get('/', controller.initiate)
    authGoogleRouter.get('/callback', controller.callback)
} else {
    authGoogleRouter.all('*', (_req: Request, res: Response) => {
        res.status(400).json({ error: 'Google authentication is not configured' });
    });
}

export default authGoogleRouter

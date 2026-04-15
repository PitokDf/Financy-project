import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/error.middleware";
import { ResponseUtil } from "@/utils";
import { HttpStatus } from "@/constants/http-status";
import { PushService } from "@/service/push.service";

export class PushController {
  static subscribe = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.auth_user?.user_id;
    if (!userId) {
      return ResponseUtil.unauthorized(res, "Unauthorized");
    }

    const subscription = req.body;
    if (!subscription || !subscription.endpoint) {
      return ResponseUtil.error(res, "Invalid subscription", [], HttpStatus.BAD_REQUEST);
    }

    await PushService.subscribe(userId, subscription);
    return ResponseUtil.success(res, null, HttpStatus.CREATED, "Subscribed successfully");
  });

  static unsubscribe = asyncHandler(async (req: Request, res: Response) => {
    const { endpoint } = req.body;
    if (!endpoint) {
      return ResponseUtil.error(res, "Endpoint required", [], HttpStatus.BAD_REQUEST);
    }

    await PushService.unsubscribe(endpoint);
    return ResponseUtil.success(res, null, HttpStatus.OK, "Unsubscribed successfully");
  });

  static sendTest = asyncHandler(async (req: Request, res: Response) => {
    // const userId = req.auth_user?.user_id;
    // const { title, body } = req.body;
    const userId = req.query.userId as string
    const title = req.query.title as string
    const body = req.query.body as string

    if (!userId) {
      return ResponseUtil.unauthorized(res, "Unauthorized");
    }

    await PushService.sendNotificationToUser(
      userId,
      title || "Test Notification",
      body || "This is a test notification from Fintrack!"
    );

    return ResponseUtil.success(res, null, 200, "Test notification sent");
  });
}

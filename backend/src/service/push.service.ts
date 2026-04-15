import webpush from "web-push";
import { PushRepository } from "@/repositories/push.repository";

const publicVapidKey = process.env.VAPID_PUBLIC_KEY || "";
const privateVapidKey = process.env.VAPID_PRIVATE_KEY || "";

if (publicVapidKey && privateVapidKey) {
  webpush.setVapidDetails(
    "mailto:example@yourdomain.com",
    publicVapidKey,
    privateVapidKey
  );
}

export class PushService {
  static async subscribe(userId: string, subscription: any) {
    return PushRepository.upsert(userId, subscription);
  }

  static async unsubscribe(endpoint: string) {
    return PushRepository.delete(endpoint);
  }

  static async sendNotificationToUser(userId: string, title: string, body: string, data?: any) {
    const subscriptions = await PushRepository.findManyByUserId(userId);

    const payload = JSON.stringify({
      title,
      body,
      userId,
      ...data
    });

    const notificationPromises = subscriptions.map(sub => {
      const pushSubscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth
        }
      };

      return webpush.sendNotification(pushSubscription, payload).catch(async (error) => {
        if (error.statusCode === 404 || error.statusCode === 410) {
          await PushRepository.delete(sub.endpoint);
        } else {
          console.error("Error sending push notification:", error);
        }
      });
    });

    return Promise.all(notificationPromises);
  }
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushService = void 0;
const web_push_1 = __importDefault(require("web-push"));
const push_repository_1 = require("../repositories/push.repository");
const publicVapidKey = process.env.VAPID_PUBLIC_KEY || "";
const privateVapidKey = process.env.VAPID_PRIVATE_KEY || "";
if (publicVapidKey && privateVapidKey) {
    web_push_1.default.setVapidDetails("mailto:example@yourdomain.com", publicVapidKey, privateVapidKey);
}
class PushService {
    static async subscribe(userId, subscription) {
        return push_repository_1.PushRepository.upsert(userId, subscription);
    }
    static async unsubscribe(endpoint) {
        return push_repository_1.PushRepository.delete(endpoint);
    }
    static async sendNotificationToUser(userId, title, body, data) {
        const subscriptions = await push_repository_1.PushRepository.findManyByUserId(userId);
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
            return web_push_1.default.sendNotification(pushSubscription, payload).catch(async (error) => {
                if (error.statusCode === 404 || error.statusCode === 410) {
                    await push_repository_1.PushRepository.delete(sub.endpoint);
                }
                else {
                    console.error("Error sending push notification:", error);
                }
            });
        });
        return Promise.all(notificationPromises);
    }
}
exports.PushService = PushService;
//# sourceMappingURL=push.service.js.map
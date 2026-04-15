"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class PushRepository {
    static async findByEndpoint(endpoint) {
        return prisma_1.default.pushSubscription.findFirst({
            where: { endpoint }
        });
    }
    static async upsert(userId, subscription) {
        const { endpoint, keys } = subscription;
        return prisma_1.default.pushSubscription.upsert({
            where: {
                userId_endpoint: {
                    userId,
                    endpoint
                }
            },
            update: {
                p256dh: keys.p256dh,
                auth: keys.auth
            },
            create: {
                userId,
                endpoint,
                p256dh: keys.p256dh,
                auth: keys.auth
            }
        });
    }
    static async delete(endpoint) {
        try {
            return await prisma_1.default.pushSubscription.deleteMany({
                where: { endpoint }
            });
        }
        catch (error) {
            return null;
        }
    }
    static async deleteForUser(userId, endpoint) {
        try {
            return await prisma_1.default.pushSubscription.delete({
                where: {
                    userId_endpoint: { userId, endpoint }
                }
            });
        }
        catch (error) {
            return null;
        }
    }
    static async findManyByUserId(userId) {
        return prisma_1.default.pushSubscription.findMany({
            where: { userId }
        });
    }
}
exports.PushRepository = PushRepository;
//# sourceMappingURL=push.repository.js.map
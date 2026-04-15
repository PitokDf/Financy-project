import prisma from "@/config/prisma";

export class PushRepository {
  static async findByEndpoint(endpoint: string) {
    return prisma.pushSubscription.findUnique({
      where: { endpoint }
    });
  }

  static async upsert(userId: string, subscription: any) {
    const { endpoint, keys } = subscription;
    
    return prisma.pushSubscription.upsert({
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

  static async delete(endpoint: string) {
    try {
      // Delete ALL subscriptions for this endpoint across all users if it's invalid (404/410)
      return await prisma.pushSubscription.deleteMany({
        where: { endpoint }
      });
    } catch (error) {
      return null;
    }
  }

  static async deleteForUser(userId: string, endpoint: string) {
    try {
      return await prisma.pushSubscription.delete({
        where: {
          userId_endpoint: { userId, endpoint }
        }
      });
    } catch (error) {
      return null;
    }
  }

  static async findManyByUserId(userId: string) {
    return prisma.pushSubscription.findMany({
      where: { userId }
    });
  }
}

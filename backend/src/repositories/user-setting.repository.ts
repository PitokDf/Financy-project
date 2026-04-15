import prisma from "@/config/prisma";
import { UpdateUserSettingDTO } from "@/schemas/user-setting.schema";

export class UserSettingRepository {
    static async getByUserId(userId: string) {
        return prisma.userSetting.findUnique({
            where: { userId }
        })
    }

    static async upsert(userId: string, data: UpdateUserSettingDTO) {
        return prisma.userSetting.upsert({
            where: { userId },
            update: data,
            create: {
                userId,
                ...data
            }
        })
    }
}

import prisma from "@/config/prisma";
import { Prisma } from "@prisma/client";

export class ReminderConfigRepository {
    static async findByUserId(userId: string) {
        return prisma.reminderConfig.findUnique({
            where: { userId },
        });
    }

    static async create(data: Prisma.ReminderConfigUncheckedCreateInput) {
        return prisma.reminderConfig.create({
            data,
        });
    }

    static async updateByUserId(userId: string, data: Prisma.ReminderConfigUncheckedUpdateInput) {
        return prisma.reminderConfig.update({
            where: { userId },
            data,
        });
    }
}

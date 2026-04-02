import { ReminderConfigRepository } from "@/repositories/reminder-config.repository";
import { UpdateReminderConfigInput } from "@/schemas/reminder-config.schema";

export class ReminderConfigService {
    constructor(private readonly reminderConfigRepository: typeof ReminderConfigRepository) { }

    public getReminderConfig = async (userId: string) => {
        const config = await this.reminderConfigRepository.findByUserId(userId);

        if (config) {
            return config;
        }

        return this.reminderConfigRepository.create({
            userId,
            isEnabled: true,
            reminderTime: "21:00",
            budgetWarningPct: 80,
        });
    };

    public updateReminderConfig = async (userId: string, payload: UpdateReminderConfigInput) => {
        await this.getReminderConfig(userId);

        return this.reminderConfigRepository.updateByUserId(userId, {
            ...(payload.isEnabled !== undefined ? { isEnabled: payload.isEnabled } : {}),
            ...(payload.reminderTime !== undefined ? { reminderTime: payload.reminderTime } : {}),
            ...(payload.budgetWarningPct !== undefined ? { budgetWarningPct: payload.budgetWarningPct } : {}),
        });
    };
}

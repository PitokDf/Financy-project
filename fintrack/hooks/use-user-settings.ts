import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/lib/api/client";
import { toast } from "sonner";

export interface UserSettings {
    emailNotifications: boolean;
    pushNotifications: boolean;
    budgetAlerts: boolean;
    dailyReminder: boolean;
    reminderTime: string;
    currency: string;
    language: string;
    theme: string;
    showGamification: boolean;
}

export function useUserSettings() {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['user-settings'],
        queryFn: async () => {
            const res = await axiosClient.get("/users/settings");
            return (res.data as UserSettings) || null;
        },
        placeholderData: {
            emailNotifications: true,
            pushNotifications: true,
            budgetAlerts: true,
            dailyReminder: true,
            reminderTime: "20:00",
            currency: "IDR",
            language: "id",
            theme: "light",
            showGamification: true,
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const mutation = useMutation({
        mutationFn: async (newSettings: Partial<UserSettings>) => {
            return axiosClient.patch("/users/settings", newSettings);
        },
        onMutate: async (newSettings) => {
            await queryClient.cancelQueries({ queryKey: ['user-settings'] });
            const previousSettings = queryClient.getQueryData(['user-settings']);
            queryClient.setQueryData(['user-settings'], (old: any) => ({
                ...old,
                ...newSettings,
            }));
            return { previousSettings };
        },
        onError: (err, newSettings, context) => {
            queryClient.setQueryData(['user-settings'], context?.previousSettings);
            toast.error("Gagal menyimpan preferensi");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['user-settings'] });
        },
    });

    const updateSetting = (key: keyof UserSettings, value: any) => {
        mutation.mutate({ [key]: value });
    };

    return {
        settings: query.data,
        isLoading: query.isLoading,
        isUpdating: mutation.isPending,
        updateSetting,
        updateSettingsMutation: mutation,
    };
}

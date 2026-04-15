import axiosClient from "@/lib/api/client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner";

export const useAuth = () => {
    const login = useMutation({
        mutationFn: async (data: { email: string, password: string }) => {
            const result = await axiosClient.post('/auth/login', data);
            return result.data;
        },
        onSuccess: () => {
            toast.success('Selamat datang kembali!');
        }
    })

    const logout = useMutation({
        mutationFn: async () => {
            const result = await axiosClient.post('/auth/logout');
            return result.data;
        },
        onSuccess: () => {
            toast.success('Sampai jumpa! Anda telah keluar.');
        }
    })

    const register = useMutation({
        mutationFn: async (data: { email: string, name: string, password: string }) => {
            const result = await axiosClient.post('/auth/register', data);
            return result.data;
        },

        onSuccess: () => {
            toast.success('Akun berhasil dibuat! Selamat datang di FinTrack!');
        }
    })

    const updateProfile = useMutation({
        mutationFn: async (data: { name: string; email: string }) => {
            const result = await axiosClient.put('/users/me', data);
            return result.data;
        },
        onSuccess: () => {
            toast.success('Profil berhasil diperbarui!');
        }
    })

    const changePassword = useMutation({
        mutationFn: async (data: { currentPassword: string; newPassword: string }) => {
            const result = await axiosClient.put('/auth/change-password', data);
            return result.data;
        },
        onSuccess: () => {
            toast.success('Kata sandi berhasil diubah!');
        }
    })

    const profile = useQuery({
        queryKey: ['profile', 'me'],
        queryFn: async () => {
            const result = await axiosClient.get('/users/me');
            return result.data || null;
        }
    });

    return {
        loginMutation: login.mutateAsync,
        loginLoading: login.isPending,
        registerMutation: register.mutateAsync,
        registerLoading: register.isPending,
        logoutMutation: logout.mutateAsync,
        logoutLoading: logout.isPending,
        profileQuery: profile,
        loadingQuery: profile.isPending,
        updateProfileMutation: updateProfile.mutateAsync,
        updateProfileLoading: updateProfile.isPending,
        changePasswordMutation: changePassword.mutateAsync,
        changePasswordLoading: changePassword.isPending
    }
}
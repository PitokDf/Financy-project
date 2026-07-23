import axiosClient from "@/lib/api/client";
import { ErrorResponse } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { saveToLocal, cacheResponse, getCachedResponse, mergePendingMutations, checkOnlineStatus } from "@/lib/offline/db";
import { useAuthStore } from "@/lib/zustand/auth-store";

export interface BudgetItem {
    id: string;
    categoryId: string;
    amount: number;
    period: string;
    spentAmount: number;
    month: number;
    year: number;
    category: {
        id: string;
        name: string;
        color: string;
        icon: string | null;
    };
}

export interface CreateBudgetData {
    categoryId: string;
    amount: number;
    period: string;
}

export interface UpdateBudgetData {
    categoryId?: string;
    amount?: number;
    period?: string;
}

export function useBudgets() {
    const queryClient = useQueryClient();
    const { user } = useAuthStore();
    const userId = user?.id || "guest";

    const { data: budgets, isLoading } = useQuery({
        queryKey: ['budgets'],
        queryFn: async () => {
            try {
                const res = await axiosClient.get("/budgets");
                const data = (res.data as BudgetItem[]) || [];
                await cacheResponse(userId, '/api/budgets', data);
                return data;
            } catch (error) {
                const cached = await getCachedResponse(userId, '/api/budgets');
                if (cached) {
                    console.log('[Budgets] Serving from offline cache');
                    const merged = await mergePendingMutations(userId, cached.data, "/budgets");
                    return merged as BudgetItem[];
                }
                throw error;
            }
        },
    });

    const createBudget = useMutation({
        mutationFn: async (data: CreateBudgetData) => {
            const record = await saveToLocal(userId, {
                action: "CREATE",
                data,
                endpoint: "/budgets",
            });

            if (navigator.onLine) {
                try {
                    const res = await axiosClient.post("/budgets", data);
                    const { updateRecordStatus } = await import("@/lib/offline/db");
                    await updateRecordStatus(userId, record.id, "synced");
                    return res.data;
                } catch {
                    return { ...data, id: record.id, isPending: true } as any;
                }
            }

            return { ...data, id: record.id, isPending: true } as any;
        },
        onMutate: async (newBudget) => {
            await queryClient.cancelQueries({ queryKey: ['budgets'] });
            const previousBudgets = queryClient.getQueryData(['budgets']);

            const optimisticBudget = {
                id: `temp_${Date.now()}`,
                categoryId: newBudget.categoryId,
                amount: newBudget.amount,
                period: newBudget.period,
                spentAmount: 0,
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear(),
                category: {
                    id: newBudget.categoryId,
                    name: !navigator.onLine ? "Pending sync" : "Memuat...",
                    color: "#6b7280",
                    icon: null,
                },
                isOffline: !navigator.onLine,
            };

            queryClient.setQueryData(['budgets'], (old: any) => {
                if (!old) return [optimisticBudget];
                return [...old, optimisticBudget];
            });

            return { previousBudgets };
        },
        onSuccess: (data) => {
            if (data && (data as any).isPending) {
                toast.success("Anggaran disimpan secara offline!");
            } else {
                queryClient.invalidateQueries({ queryKey: ['budgets'] });
                toast.success("Anggaran berhasil dibuat");
            }
        },
        onError: (error: AxiosError, _, context) => {
            if (context?.previousBudgets) {
                queryClient.setQueryData(['budgets'], context.previousBudgets);
            }
            toast.error((error.response?.data as { message: string }).message || "Gagal membuat anggaran");
        }
    });

    const updateBudget = useMutation({
        mutationFn: async ({ id, data }: { id: string, data: UpdateBudgetData }) => {
            const record = await saveToLocal(userId, {
                action: "UPDATE",
                data: { id, ...data },
                endpoint: `/budgets/${id}`,
            });

            if (navigator.onLine) {
                try {
                    const res = await axiosClient.put(`/budgets/${id}`, data);
                    const { updateRecordStatus } = await import("@/lib/offline/db");
                    await updateRecordStatus(userId, record.id, "synced");
                    return res.data;
                } catch {
                    return { ...data, id, isPending: true } as any;
                }
            }

            return { ...data, id, isPending: true } as any;
        },
        onMutate: async ({ id, data }) => {
            await queryClient.cancelQueries({ queryKey: ['budgets'] });
            const previousBudgets = queryClient.getQueryData(['budgets']);

            queryClient.setQueryData(['budgets'], (old: any) => {
                if (!old) return old;
                return old.map((budget: any) =>
                    budget.id === id
                        ? { ...budget, ...data, isOffline: !navigator.onLine }
                        : budget
                );
            });

            return { previousBudgets };
        },
        onSuccess: (data) => {
            if (data && (data as any).isPending) {
                toast.success("Anggaran diperbarui secara offline!");
            } else {
                queryClient.invalidateQueries({ queryKey: ['budgets'] });
                toast.success("Anggaran berhasil diperbarui");
            }
        },
        onError: (error: AxiosError<ErrorResponse>, _, context) => {
            if (context?.previousBudgets) {
                queryClient.setQueryData(['budgets'], context.previousBudgets);
            }
            toast.error(error.response?.data?.message || "Gagal memperbarui anggaran");
        }
    });

    const deleteBudget = useMutation({
        mutationFn: async (id: string) => {
            const record = await saveToLocal(userId, {
                action: "DELETE",
                data: { id },
                endpoint: `/budgets/${id}`,
            });

            if (navigator.onLine) {
                try {
                    await axiosClient.delete(`/budgets/${id}`);
                    const { updateRecordStatus } = await import("@/lib/offline/db");
                    await updateRecordStatus(userId, record.id, "synced");
                    return { id };
                } catch {
                    return { id, isPending: true };
                }
            }

            return { id, isPending: true };
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['budgets'] });
            const previousBudgets = queryClient.getQueryData(['budgets']);

            queryClient.setQueryData(['budgets'], (old: any) => {
                if (!old) return old;
                return old.filter((budget: any) => budget.id !== id);
            });

            return { previousBudgets };
        },
        onSuccess: (data) => {
            if (data && (data as any).isPending) {
                toast.success("Anggaran dihapus secara offline!");
            } else {
                queryClient.invalidateQueries({ queryKey: ['budgets'] });
                toast.success("Anggaran berhasil dihapus");
            }
        },
        onError: (error: AxiosError<ErrorResponse>, _, context) => {
            if (context?.previousBudgets) {
                queryClient.setQueryData(['budgets'], context.previousBudgets);
            }
            toast.error(error.response?.data?.message || "Gagal menghapus anggaran");
        }
    });

    return {
        budgets,
        isLoading,
        createBudget,
        updateBudget,
        deleteBudget
    };
}

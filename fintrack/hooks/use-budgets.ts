import axiosClient from "@/lib/api/client";
import { ErrorResponse } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { addPendingMutation } from "@/lib/offline/db";
import { cacheResponse, getCachedResponse } from "@/lib/offline/db";

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

    const { data: budgets, isLoading } = useQuery({
        queryKey: ['budgets'],
        queryFn: async () => {
            try {
                const res = await axiosClient.get("/budgets");
                const data = (res.data as BudgetItem[]) || [];
                await cacheResponse('/api/budgets', data);
                return data;
            } catch (error) {
                const cached = await getCachedResponse('/api/budgets');
                if (cached) {
                    console.log('[Budgets] Serving from offline cache');
                    return cached.data as BudgetItem[];
                }
                throw error;
            }
        },
    });

    const createBudget = useMutation({
        mutationFn: async (data: CreateBudgetData) => {
            if (!navigator.onLine) {
                const offlineId = `offline_budget_${Date.now()}`;
                await addPendingMutation({
                    id: offlineId,
                    action: "CREATE",
                    data,
                    endpoint: "/budgets",
                });
                return { ...data, id: offlineId, isOffline: true } as any;
            }
            const res = await axiosClient.post("/budgets", data);
            return res.data;
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
            if (data && (data as any).isOffline) {
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
            if (!navigator.onLine) {
                const offlineId = `upd_budget_${id}`;
                await addPendingMutation({
                    id: offlineId,
                    action: "UPDATE",
                    data: { id, ...data },
                    endpoint: `/budgets/${id}`,
                });
                return { ...data, id, isOffline: true } as any;
            }
            const res = await axiosClient.put(`/budgets/${id}`, data);
            return res.data;
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
            if (data && (data as any).isOffline) {
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
            if (!navigator.onLine) {
                const offlineId = `del_budget_${id}`;
                await addPendingMutation({
                    id: offlineId,
                    action: "DELETE",
                    data: { id },
                    endpoint: `/budgets/${id}`,
                });
                return { id, isOffline: true };
            }
            await axiosClient.delete(`/budgets/${id}`);
            return { id };
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
            if (data && (data as any).isOffline) {
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

import axiosClient from "@/lib/api/client";
import { ErrorResponse } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

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
            const res = await axiosClient.get("/budgets");
            return res.data as BudgetItem[] || [];
        },
    });

    const createBudget = useMutation({
        mutationFn: async (data: CreateBudgetData) => {
            const res = await axiosClient.post("/budgets", data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['budgets'] });
            toast.success("Anggaran berhasil dibuat");
        },
        onError: (error: AxiosError) => {
            toast.error((error.response?.data as { message: string }).message || "Gagal membuat anggaran");
        }
    });

    const updateBudget = useMutation({
        mutationFn: async ({ id, data }: { id: string, data: UpdateBudgetData }) => {
            const res = await axiosClient.put(`/budgets/${id}`, data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['budgets'] });
            toast.success("Anggaran berhasil diperbarui");
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            toast.error(error.response?.data?.message || "Gagal memperbarui anggaran");
        }
    });

    const deleteBudget = useMutation({
        mutationFn: async (id: string) => {
            await axiosClient.delete(`/budgets/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['budgets'] });
            toast.success("Anggaran berhasil dihapus");
        },
        onError: (error: AxiosError<ErrorResponse>) => {
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

import { useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import axiosClient from "@/lib/api/client";
import { toast } from "sonner";

export interface Transaction {
    id: string;
    description: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    date: string;
    categoryId?: string;
    category?: {
        name: string;
        color: string;
        icon: string;
    };
}

export function useTransactions(search?: string, type?: string) {
    const queryClient = useQueryClient();

    const transactionsQuery = useInfiniteQuery({
        queryKey: ['transactions', search, type],
        queryFn: async ({ pageParam }) => {
            const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
            const typeParam = type && type !== 'ALL' ? `&type=${type}` : '';
            const url = pageParam
                ? `/transactions?cursor=${pageParam}&limit=10${searchParam}${typeParam}`
                : `/transactions?limit=10${searchParam}${typeParam}`;

            const res = await axiosClient.get(url);
            console.log(res)
            const payload = res as { data: Transaction[], nextCursor?: string, totalIncome?: number, totalExpense?: number };

            return {
                data: payload.data.map((tx) => ({
                    ...tx,
                    categoryColor: tx.type === 'EXPENSE' ? '#b92910' : '#059669',
                    category: tx.category?.name || 'Belum dikategorikan',
                    categoryIcon: tx.category?.icon || ''
                })),
                nextCursor: payload.nextCursor,
                totalIncome: payload.totalIncome || 0,
                totalExpense: payload.totalExpense || 0
            };
        },
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => lastPage.nextCursor
    });

    const createMutation = useMutation({
        mutationFn: async (data: Omit<Transaction, 'id' | 'category'>) => {
            const res = await axiosClient.post("/transactions", data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['user-stats'] });
            toast.success("Transaksi berhasil ditambahkan!");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Gagal menambahkan transaksi");
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await axiosClient.delete(`/transactions/${id}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['user-stats'] });
            toast.success("Transaksi berhasil dihapus!");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Gagal menghapus transaksi");
        }
    });

    const importCsvMutation = useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axiosClient.post("/transactions/import-csv", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['user-stats'] });
            toast.success(`Berhasil mengimpor ${data.data?.successCount || 0} transaksi!`);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Gagal mengimpor CSV");
        }
    });

    return {
        transactions: transactionsQuery.data?.pages.flatMap(p => p.data) || [],
        totalIncome: transactionsQuery.data?.pages[0]?.totalIncome || 0,
        totalExpense: transactionsQuery.data?.pages[0]?.totalExpense || 0,
        isLoading: transactionsQuery.isLoading,
        hasNextPage: transactionsQuery.hasNextPage,
        fetchNextPage: transactionsQuery.fetchNextPage,
        isFetchingNextPage: transactionsQuery.isFetchingNextPage,
        createTransaction: createMutation.mutate,
        isCreating: createMutation.isPending,
        deleteTransaction: deleteMutation.mutateAsync,
        isDeleting: deleteMutation.isPending,
        importCsvAsync: importCsvMutation.mutateAsync,
        isImporting: importCsvMutation.isPending
    };
}

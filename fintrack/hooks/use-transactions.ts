import { useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import axiosClient from "@/lib/api/client";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types";
import { addPendingMutation } from "@/lib/offline/db";
import { useOfflineSync } from "@/components/providers/offline-sync-provider";

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
    const { isOnline } = useOfflineSync();

    const transactionsQuery = useInfiniteQuery({
        queryKey: ['transactions', search, type],
        queryFn: async ({ pageParam }) => {
            const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
            const typeParam = type && type !== 'ALL' ? `&type=${type}` : '';
            const url = pageParam
                ? `/transactions?cursor=${pageParam}&limit=10${searchParam}${typeParam}`
                : `/transactions?limit=10${searchParam}${typeParam}`;

            const res = await axiosClient.get(url);
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
            if (!navigator.onLine) {
                const offlineId = `offline_${Date.now()}`;
                await addPendingMutation({
                    id: offlineId,
                    action: 'CREATE',
                    data: data
                });
                return { ...data, id: offlineId, isOffline: true };
            }
            const res = await axiosClient.post("/transactions", data);
            return res.data;
        },
        onMutate: async (newTx) => {
            await queryClient.cancelQueries({ queryKey: ['transactions', search, type] });
            const previousTransactions = queryClient.getQueryData(['transactions', search, type]);

            if (!navigator.onLine) {
                const offlineTx = {
                    ...newTx,
                    id: `offline_${Date.now()}`,
                    categoryColor: newTx.type === 'EXPENSE' ? '#b92910' : '#059669',
                    category: 'Pending Sync...',
                    categoryIcon: '',
                    isOffline: true
                };

                queryClient.setQueryData(['transactions', search, type], (old: any) => {
                    if (!old) return old;
                    return {
                        ...old,
                        pages: old.pages.map((page: any, index: number) => {
                            if (index === 0) {
                                return {
                                    ...page,
                                    data: [offlineTx, ...page.data]
                                };
                            }
                            return page;
                        })
                    };
                });
            }

            return { previousTransactions };
        },
        onSuccess: (data) => {
            if (data && (data as any).isOffline) {
                toast.success("Transaksi disimpan secara offline!");
            } else {
                queryClient.invalidateQueries({ queryKey: ['transactions'] });
                queryClient.invalidateQueries({ queryKey: ['user-stats'] });
                toast.success("Transaksi berhasil ditambahkan!");
            }
        },
        onError: (error: AxiosError<ErrorResponse>, _, context) => {
            if (context?.previousTransactions) {
                queryClient.setQueryData(['transactions', search, type], context.previousTransactions);
            }
            toast.error(error.response?.data?.message || "Gagal menambahkan transaksi");
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            if (!navigator.onLine) {
                await addPendingMutation({
                    id: `del_${id}`,
                    action: 'DELETE',
                    data: { id }
                });
                return { id, isOffline: true };
            }
            const res = await axiosClient.delete(`/transactions/${id}`);
            return res.data;
        },
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['transactions', search, type] });
            const previousTransactions = queryClient.getQueryData(['transactions', search, type]);

            queryClient.setQueryData(['transactions', search, type], (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    pages: old.pages.map((page: any) => ({
                        ...page,
                        data: page.data.filter((tx: Transaction) => tx.id !== id)
                    }))
                };
            });

            return { previousTransactions };
        },
        onSuccess: (data) => {
            if (data && (data as any).isOffline) {
                toast.success("Transaksi dihapus secara offline!");
            } else {
                queryClient.invalidateQueries({ queryKey: ['transactions'] });
                queryClient.invalidateQueries({ queryKey: ['user-stats'] });
                toast.success("Transaksi berhasil dihapus!");
            }
        },
        onError: (error: AxiosError<ErrorResponse>, _, context) => {
            if (context?.previousTransactions) {
                queryClient.setQueryData(['transactions', search, type], context.previousTransactions);
            }
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
        onError: (error: AxiosError<ErrorResponse>) => {
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
        createTransaction: createMutation.mutateAsync,
        isCreating: createMutation.isPending,
        deleteTransaction: deleteMutation.mutateAsync,
        isDeleting: deleteMutation.isPending,
        importCsvAsync: importCsvMutation.mutateAsync,
        isImporting: importCsvMutation.isPending
    };
}

import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import axiosClient from "@/lib/api/client";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types";
import { saveToLocal, cacheResponse, getCachedResponse, checkOnlineStatus, mergePendingMutations, appendToCache } from "@/lib/offline/db";
import { useAuthStore } from "@/lib/zustand/auth-store";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  date: string;
  categoryId?: string;
  needsReview?: boolean;
  category?: {
    name: string;
    color: string;
    icon: string;
  };
}

interface TransactionWithPagination {
  data: Transaction[];
  nextCursor?: string;
  totalIncome?: number;
  totalExpense?: number;
}

export function useTransactions(search?: string, type?: string) {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const userId = user?.id || "guest";

  const transactionsQuery = useInfiniteQuery({
    queryKey: ["transactions", search, type],
    queryFn: async ({ pageParam }) => {
      const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
      const typeParam = type && type !== "ALL" ? `&type=${type}` : "";
      const url = pageParam
        ? `/transactions?cursor=${pageParam}&limit=10${searchParam}${typeParam}`
        : `/transactions?limit=10${searchParam}${typeParam}`;

      try {
        const res = await axiosClient.get(url);
        const payload = res as TransactionWithPagination;

        const result = {
          data: payload.data.map((tx) => ({
            ...tx,
            categoryColor:
              tx.category?.color ??
              (tx.type === "EXPENSE" ? "#b92910" : "#059669"),
            category: tx.category?.name || "Belum dikategorikan",
            categoryIcon: tx.category?.icon || "",
          })),
          nextCursor: payload.nextCursor,
          totalIncome: payload.totalIncome || 0,
          totalExpense: payload.totalExpense || 0,
        };

        if (!pageParam) {
          await cacheResponse(userId, '/api/transactions', result);
          const merged = await mergePendingMutations(userId, result, "/transactions");
          return merged;
        }

        return result;
      } catch (error) {
        if (!pageParam) {
          const cached = await getCachedResponse(userId, '/api/transactions');
          if (cached) {
            console.log('[Transactions] Serving from offline cache');
            const merged = await mergePendingMutations(userId, cached.data, "/transactions");
            return merged;
          }
        }
        throw error;
      }
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const createMutation = useMutation({
    mutationFn: async (data: Omit<Transaction, "id" | "category">) => {
      const record = await saveToLocal(userId, {
        action: "CREATE",
        data,
        endpoint: "/transactions",
      });

      await appendToCache(userId, "/api/transactions", "CREATE", {
        ...data,
        id: record.id,
        categoryColor: data.type === "EXPENSE" ? "#b92910" : "#059669",
        category: !checkOnlineStatus() ? "Pending sync" : "Menganalisis Kategori (AI)...",
        categoryIcon: "",
        isOffline: !checkOnlineStatus(),
      });

      if (checkOnlineStatus()) {
        try {
          const res = await axiosClient.post("/transactions", data);
          const { updateRecordStatus } = await import("@/lib/offline/db");
          await updateRecordStatus(userId, record.id, "synced");
          return { ...data, id: (res as any)?.data?.id || record.id };
        } catch {
          return { ...data, id: record.id, isPending: true };
        }
      }

      return { ...data, id: record.id, isPending: true };
    },
    onMutate: async (newTx) => {
      await queryClient.cancelQueries({
        queryKey: ["transactions", search, type],
      });
      const previousTransactions = queryClient.getQueryData([
        "transactions",
        search,
        type,
      ]);

      const tempId = `temp_${Date.now()}`;
      const optimisticTx = {
        id: tempId,
        description: newTx.description,
        amount: newTx.amount,
        type: newTx.type,
        date: newTx.date,
        categoryId: newTx.categoryId,
        categoryColor: newTx.type === "EXPENSE" ? "#b92910" : "#059669",
        category: newTx.categoryId
          ? "Memuat..."
          : !checkOnlineStatus()
            ? "Pending sync"
            : "Menganalisis Kategori (AI)...",
        categoryIcon: "",
        isOptimistic: true,
        isOffline: !checkOnlineStatus(),
      };

      queryClient.setQueryData(["transactions", search, type], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any, index: number) => {
            if (index === 0) {
              return {
                ...page,
                data: [optimisticTx, ...page.data],
                totalIncome:
                  newTx.type === "INCOME"
                    ? page.totalIncome + newTx.amount
                    : page.totalIncome,
                totalExpense:
                  newTx.type === "EXPENSE"
                    ? page.totalExpense + newTx.amount
                    : page.totalExpense,
              };
            }
            return page;
          }),
        };
      });

      return { previousTransactions };
    },
    onSuccess: (data) => {
      if (data && (data as any).isPending) {
        toast.success("Transaksi disimpan secara offline!");
      } else {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        queryClient.invalidateQueries({ queryKey: ["user-stats"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
        toast.success("Transaksi berhasil ditambahkan!");
      }
    },
    onError: (error: AxiosError<ErrorResponse>, _, context) => {
      if (context?.previousTransactions) {
        queryClient.setQueryData(
          ["transactions", search, type],
          context.previousTransactions,
        );
      }
      toast.error(
        error.response?.data?.message || "Gagal menambahkan transaksi",
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const record = await saveToLocal(userId, {
        action: "DELETE",
        data: { id },
        endpoint: `/transactions/${id}`,
      });

      await appendToCache(userId, "/api/transactions", "DELETE", { id });

      if (checkOnlineStatus()) {
        try {
          await axiosClient.delete(`/transactions/${id}`);
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
      await queryClient.cancelQueries({
        queryKey: ["transactions", search, type],
      });
      const previousTransactions = queryClient.getQueryData([
        "transactions",
        search,
        type,
      ]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["transactions", search, type], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.filter((tx: Transaction) => tx.id !== id),
          })),
        };
      });

      return { previousTransactions };
    },
    onSuccess: (data) => {
      if (data && (data as any).isPending) {
        toast.success("Transaksi dihapus secara offline!");
      } else {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        queryClient.invalidateQueries({ queryKey: ["user-stats"] });
        toast.success("Transaksi berhasil dihapus!");
      }
    },
    onError: (error: AxiosError<ErrorResponse>, _, context) => {
      if (context?.previousTransactions) {
        queryClient.setQueryData(
          ["transactions", search, type],
          context.previousTransactions,
        );
      }
      toast.error(error.response?.data?.message || "Gagal menghapus transaksi");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Omit<Transaction, "id" | "category">;
    }) => {
      const record = await saveToLocal(userId, {
        action: "UPDATE",
        data: { id, ...data },
        endpoint: `/transactions/${id}`,
      });

      await appendToCache(userId, "/api/transactions", "UPDATE", {
        id,
        ...data,
        categoryColor: data.type === "EXPENSE" ? "#b92910" : "#059669",
        category: !checkOnlineStatus() ? "Pending sync" : undefined,
        isOffline: !checkOnlineStatus(),
      });

      if (checkOnlineStatus()) {
        try {
          await axiosClient.patch(`/transactions/${id}`, data);
          const { updateRecordStatus } = await import("@/lib/offline/db");
          await updateRecordStatus(userId, record.id, "synced");
          return { ...data, id };
        } catch {
          return { ...data, id, isPending: true };
        }
      }

      return { ...data, id, isPending: true };
    },
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: ["transactions", search, type],
      });
      const previousTransactions = queryClient.getQueryData([
        "transactions",
        search,
        type,
      ]);

      queryClient.setQueryData(["transactions", search, type], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.map((tx: any) =>
              tx.id === id
                ? {
                    ...tx,
                    ...data,
                    categoryColor:
                      data.type === "EXPENSE" ? "#b92910" : "#059669",
                    category: !checkOnlineStatus()
                      ? "Pending sync"
                      : tx.category,
                    isOffline: !checkOnlineStatus(),
                  }
                : tx,
            ),
          })),
        };
      });

      return { previousTransactions };
    },
    onSuccess: (data) => {
      if (data && (data as any).isPending) {
        toast.success("Transaksi diperbarui secara offline!");
      } else {
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        queryClient.invalidateQueries({ queryKey: ["user-stats"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
        toast.success("Transaksi berhasil diperbarui!");
      }
    },
    onError: (error: AxiosError<ErrorResponse>, _, context) => {
      if (context?.previousTransactions) {
        queryClient.setQueryData(
          ["transactions", search, type],
          context.previousTransactions,
        );
      }
      toast.error(
        error.response?.data?.message || "Gagal memperbarui transaksi",
      );
    },
  });

  const importCsvMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axiosClient.post("/transactions/import-csv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["user-stats"] });
      toast.success(`Berhasil mengimpor ${data.successCount || 0} transaksi!`);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data?.message || "Gagal mengimpor CSV");
    },
  });

  return {
    transactions: transactionsQuery.data?.pages.flatMap((p) => p.data) || [],
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
    updateTransaction: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    importCsvAsync: importCsvMutation.mutateAsync,
    isImporting: importCsvMutation.isPending,
  };
}

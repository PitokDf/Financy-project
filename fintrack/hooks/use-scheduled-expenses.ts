"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/lib/api/client';
import { toast } from 'sonner';
import { ScheduledExpense } from '@/types';
import { saveToLocal, cacheResponse, getCachedResponse, mergePendingMutations, checkOnlineStatus } from '@/lib/offline/db';
import { useAuthStore } from '@/lib/zustand/auth-store';

export function useScheduledExpenses() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const userId = user?.id || "guest";

  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ['scheduled-expenses'],
    queryFn: async () => {
      try {
        const response = await axiosClient.get('/scheduled-expenses');
        const data = (response as any).data as ScheduledExpense[];
        await cacheResponse(userId, '/api/scheduled-expenses', data);
        return data;
      } catch (error) {
        const cached = await getCachedResponse(userId, '/api/scheduled-expenses');
        if (cached) {
          console.log('[ScheduledExpenses] Serving from offline cache');
          const merged = await mergePendingMutations(userId, cached.data, "/scheduled-expenses");
          return merged as ScheduledExpense[];
        }
        throw error;
      }
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: {
      description: string;
      amount: number;
      dayOfMonth: number;
      categoryId?: string | null;
    }) => {
      const record = await saveToLocal(userId, {
        action: "CREATE",
        data,
        endpoint: "/scheduled-expenses",
      });

      if (navigator.onLine) {
        try {
          const res = await axiosClient.post('/scheduled-expenses', data);
          const { updateRecordStatus } = await import("@/lib/offline/db");
          await updateRecordStatus(userId, record.id, "synced");
          return (res as any).data as ScheduledExpense;
        } catch {
          return { ...data, id: record.id, isPending: true } as any;
        }
      }

      return { ...data, id: record.id, isPending: true } as any;
    },
    onMutate: async (newExpense) => {
      await queryClient.cancelQueries({ queryKey: ['scheduled-expenses'] });
      const previousExpenses = queryClient.getQueryData(['scheduled-expenses']);

      const optimisticExpense = {
        id: `temp_${Date.now()}`,
        description: newExpense.description,
        amount: newExpense.amount,
        dayOfMonth: newExpense.dayOfMonth,
        categoryId: newExpense.categoryId,
        isActive: true,
        isOffline: !navigator.onLine,
      };

      queryClient.setQueryData(['scheduled-expenses'], (old: any) => {
        if (!old) return [optimisticExpense];
        return [...old, optimisticExpense];
      });

      return { previousExpenses };
    },
    onSuccess: (data) => {
      if (data && (data as any).isPending) {
        toast.success('Pengeluaran terjadwal disimpan secara offline!');
      } else {
        queryClient.invalidateQueries({ queryKey: ['scheduled-expenses'] });
        toast.success('Pengeluaran terjadwal berhasil dibuat');
      }
    },
    onError: (err: any, _, context) => {
      if (context?.previousExpenses) {
        queryClient.setQueryData(['scheduled-expenses'], context.previousExpenses);
      }
      toast.error(err?.message || 'Gagal membuat pengeluaran terjadwal');
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: {
      id: string;
      description?: string;
      amount?: number;
      dayOfMonth?: number;
      categoryId?: string | null;
      isActive?: boolean;
    }) => {
      const record = await saveToLocal(userId, {
        action: "UPDATE",
        data: { id, ...data },
        endpoint: `/scheduled-expenses/${id}`,
      });

      if (navigator.onLine) {
        try {
          const res = await axiosClient.put(`/scheduled-expenses/${id}`, data);
          const { updateRecordStatus } = await import("@/lib/offline/db");
          await updateRecordStatus(userId, record.id, "synced");
          return (res as any).data as ScheduledExpense;
        } catch {
          return { ...data, id, isPending: true } as any;
        }
      }

      return { ...data, id, isPending: true } as any;
    },
    onMutate: async ({ id, ...data }) => {
      await queryClient.cancelQueries({ queryKey: ['scheduled-expenses'] });
      const previousExpenses = queryClient.getQueryData(['scheduled-expenses']);

      queryClient.setQueryData(['scheduled-expenses'], (old: any) => {
        if (!old) return old;
        return old.map((expense: any) =>
          expense.id === id
            ? { ...expense, ...data, isOffline: !navigator.onLine }
            : expense
        );
      });

      return { previousExpenses };
    },
    onSuccess: (data) => {
      if (data && (data as any).isPending) {
        toast.success('Pengeluaran terjadwal diperbarui secara offline!');
      } else {
        queryClient.invalidateQueries({ queryKey: ['scheduled-expenses'] });
        toast.success('Pengeluaran terjadwal diperbarui');
      }
    },
    onError: (err: any, _, context) => {
      if (context?.previousExpenses) {
        queryClient.setQueryData(['scheduled-expenses'], context.previousExpenses);
      }
      toast.error(err?.message || 'Gagal memperbarui pengeluaran terjadwal');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const record = await saveToLocal(userId, {
        action: "DELETE",
        data: { id },
        endpoint: `/scheduled-expenses/${id}`,
      });

      if (navigator.onLine) {
        try {
          await axiosClient.delete(`/scheduled-expenses/${id}`);
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
      await queryClient.cancelQueries({ queryKey: ['scheduled-expenses'] });
      const previousExpenses = queryClient.getQueryData(['scheduled-expenses']);

      queryClient.setQueryData(['scheduled-expenses'], (old: any) => {
        if (!old) return old;
        return old.filter((expense: any) => expense.id !== id);
      });

      return { previousExpenses };
    },
    onSuccess: (data) => {
      if (data && (data as any).isPending) {
        toast.success('Pengeluaran terjadwal dihapus secara offline!');
      } else {
        queryClient.invalidateQueries({ queryKey: ['scheduled-expenses'] });
        toast.success('Pengeluaran terjadwal dihapus');
      }
    },
    onError: (err: any, _, context) => {
      if (context?.previousExpenses) {
        queryClient.setQueryData(['scheduled-expenses'], context.previousExpenses);
      }
      toast.error(err?.message || 'Gagal menghapus pengeluaran terjadwal');
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const record = await saveToLocal(userId, {
        action: "CREATE",
        data: { id, action: 'approve' },
        endpoint: `/scheduled-expenses/${id}/approve`,
      });

      if (navigator.onLine) {
        try {
          const res = await axiosClient.post(`/scheduled-expenses/${id}/approve`);
          const { updateRecordStatus } = await import("@/lib/offline/db");
          await updateRecordStatus(userId, record.id, "synced");
          return res;
        } catch {
          return { id, isPending: true };
        }
      }

      return { id, isPending: true };
    },
    onSuccess: (data) => {
      if (data && (data as any).isPending) {
        toast.success('Persetujuan disimpan secara offline!');
      } else {
        queryClient.invalidateQueries({ queryKey: ['scheduled-expenses'] });
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        toast.success('Pengeluaran berhasil dicatat');
      }
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Gagal menyetujui pengeluaran');
    },
  });

  return {
    expenses,
    isLoading,
    createExpense: createMutation.mutate,
    updateExpense: updateMutation.mutate,
    deleteExpense: deleteMutation.mutate,
    approveExpense: approveMutation.mutate,
    isCreating: createMutation.isPending,
    isApproving: approveMutation.isPending,
  };
}

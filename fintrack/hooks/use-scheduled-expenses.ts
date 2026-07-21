"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/lib/api/client';
import { toast } from 'sonner';
import { ScheduledExpense } from '@/types';
import { addPendingMutation, cacheResponse, getCachedResponse } from '@/lib/offline/db';

export function useScheduledExpenses() {
  const queryClient = useQueryClient();

  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ['scheduled-expenses'],
    queryFn: async () => {
      try {
        const response = await axiosClient.get('/scheduled-expenses');
        const data = (response as any).data as ScheduledExpense[];
        await cacheResponse('/api/scheduled-expenses', data);
        return data;
      } catch (error) {
        const cached = await getCachedResponse('/api/scheduled-expenses');
        if (cached) {
          console.log('[ScheduledExpenses] Serving from offline cache');
          return cached.data as ScheduledExpense[];
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
      if (!navigator.onLine) {
        const offlineId = `offline_sched_${Date.now()}`;
        await addPendingMutation({
          id: offlineId,
          action: "CREATE",
          data,
          endpoint: "/scheduled-expenses",
        });
        return { ...data, id: offlineId, isOffline: true } as any;
      }
      const res = await axiosClient.post('/scheduled-expenses', data);
      return (res as any).data as ScheduledExpense;
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
      if (data && (data as any).isOffline) {
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
      if (!navigator.onLine) {
        const offlineId = `upd_sched_${id}`;
        await addPendingMutation({
          id: offlineId,
          action: "UPDATE",
          data: { id, ...data },
          endpoint: `/scheduled-expenses/${id}`,
        });
        return { ...data, id, isOffline: true } as any;
      }
      const res = await axiosClient.put(`/scheduled-expenses/${id}`, data);
      return (res as any).data as ScheduledExpense;
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
      if (data && (data as any).isOffline) {
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
      if (!navigator.onLine) {
        const offlineId = `del_sched_${id}`;
        await addPendingMutation({
          id: offlineId,
          action: "DELETE",
          data: { id },
          endpoint: `/scheduled-expenses/${id}`,
        });
        return { id, isOffline: true };
      }
      await axiosClient.delete(`/scheduled-expenses/${id}`);
      return { id };
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
      if (data && (data as any).isOffline) {
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
      if (!navigator.onLine) {
        const offlineId = `approve_sched_${id}`;
        await addPendingMutation({
          id: offlineId,
          action: "CREATE",
          data: { id, action: 'approve' },
          endpoint: `/scheduled-expenses/${id}/approve`,
        });
        return { id, isOffline: true };
      }
      const res = await axiosClient.post(`/scheduled-expenses/${id}/approve`);
      return res;
    },
    onSuccess: (data) => {
      if (data && (data as any).isOffline) {
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

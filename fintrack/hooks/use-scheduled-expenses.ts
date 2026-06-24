"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/lib/api/client';
import { toast } from 'sonner';
import { ScheduledExpense } from '@/types';

export function useScheduledExpenses() {
  const queryClient = useQueryClient();

  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ['scheduled-expenses'],
    queryFn: async () => {
      const response = await axiosClient.get('/scheduled-expenses');
      return (response as any).data as ScheduledExpense[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: {
      description: string;
      amount: number;
      dayOfMonth: number;
      categoryId?: string | null;
    }) => {
      const res = await axiosClient.post('/scheduled-expenses', data);
      return (res as any).data as ScheduledExpense;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduled-expenses'] });
      toast.success('Pengeluaran terjadwal berhasil dibuat');
    },
    onError: (err: any) => {
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
      const res = await axiosClient.put(`/scheduled-expenses/${id}`, data);
      return (res as any).data as ScheduledExpense;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduled-expenses'] });
      toast.success('Pengeluaran terjadwal diperbarui');
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Gagal memperbarui pengeluaran terjadwal');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axiosClient.delete(`/scheduled-expenses/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduled-expenses'] });
      toast.success('Pengeluaran terjadwal dihapus');
    },
    onError: (err: any) => {
      toast.error(err?.message || 'Gagal menghapus pengeluaran terjadwal');
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosClient.post(`/scheduled-expenses/${id}/approve`);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scheduled-expenses'] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Pengeluaran berhasil dicatat');
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

"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getPendingMutations, removePendingMutation, updateMutationStatus, getFailedMutations, getSyncQueueStatus, clearExpiredCache } from "@/lib/offline/db";
import axiosClient from "@/lib/api/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface OfflineSyncContextType {
  isOnline: boolean;
  isSyncing: boolean;
  syncQueueStatus: { pending: number; failed: number; total: number };
  syncPendingMutations: () => Promise<void>;
  retryFailedMutations: () => Promise<void>;
}

const OfflineSyncContext = createContext<OfflineSyncContextType>({
  isOnline: true,
  isSyncing: false,
  syncQueueStatus: { pending: 0, failed: 0, total: 0 },
  syncPendingMutations: async () => {},
  retryFailedMutations: async () => {},
});

export const useOfflineSync = () => useContext(OfflineSyncContext);

const MAX_RETRIES = 3;
const BASE_DELAY = 1000;

function getRetryDelay(retryCount: number): number {
  return Math.min(BASE_DELAY * Math.pow(2, retryCount), 30000);
}

export function OfflineSyncProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncQueueStatus, setSyncQueueStatus] = useState({ pending: 0, failed: 0, total: 0 });
  const queryClient = useQueryClient();

  const updateQueueStatus = useCallback(async () => {
    try {
      const status = await getSyncQueueStatus();
      setSyncQueueStatus(status);
    } catch (e) {
      console.error("Failed to get sync queue status:", e);
    }
  }, []);

  const syncSingleMutation = useCallback(async (mutation: any): Promise<boolean> => {
    try {
      await updateMutationStatus(mutation.id, 'syncing');

      switch (mutation.action) {
        case 'CREATE':
          if (mutation.endpoint) {
            await axiosClient.post(mutation.endpoint, mutation.data);
          } else {
            await axiosClient.post("/transactions", mutation.data);
          }
          break;
        case 'DELETE':
          if (mutation.endpoint) {
            await axiosClient.delete(mutation.endpoint);
          } else {
            await axiosClient.delete(`/transactions/${mutation.data.id}`);
          }
          break;
        case 'UPDATE':
          if (mutation.endpoint) {
            await axiosClient.put(mutation.endpoint, mutation.data);
          } else {
            await axiosClient.patch(`/transactions/${mutation.data.id}`, mutation.data);
          }
          break;
        default:
          console.warn(`Unknown mutation action: ${mutation.action}`);
          await removePendingMutation(mutation.id);
          return true;
      }

      await removePendingMutation(mutation.id);
      return true;
    } catch (error: any) {
      const errorMsg = error?.message || 'Unknown error';
      const retryCount = (mutation.retryCount || 0) + 1;

      if (retryCount >= MAX_RETRIES) {
        await updateMutationStatus(mutation.id, 'failed', errorMsg);
        console.error(`Mutation ${mutation.id} failed after ${MAX_RETRIES} retries:`, errorMsg);
        return false;
      }

      await updateMutationStatus(mutation.id, 'failed', errorMsg);
      return false;
    }
  }, []);

  const syncPendingMutations = useCallback(async () => {
    if (isSyncing || !navigator.onLine) return;

    const pending = await getPendingMutations();
    if (pending.length === 0) {
      await updateQueueStatus();
      return;
    }

    setIsSyncing(true);
    const toastId = toast.loading(`Sinkronisasi ${pending.length} data...`);

    let successCount = 0;
    let failCount = 0;

    for (const mutation of pending) {
      const success = await syncSingleMutation(mutation);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    }

    setIsSyncing(false);
    toast.dismiss(toastId);

    if (successCount > 0) {
      toast.success(`Berhasil sinkronisasi ${successCount} data!`);
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['user-stats'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['scheduled-expenses'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    }

    if (failCount > 0) {
      toast.error(`Gagal sinkronisasi ${failCount} data. Akan dicoba lagi nanti.`);
    }

    await updateQueueStatus();
  }, [isSyncing, queryClient, syncSingleMutation, updateQueueStatus]);

  const retryFailedMutations = useCallback(async () => {
    if (isSyncing || !navigator.onLine) return;

    const failed = await getFailedMutations();
    if (failed.length === 0) {
      toast.info("Tidak ada data yang perlu dicoba ulang.");
      return;
    }

    setIsSyncing(true);
    const toastId = toast.loading(`Mencoba ulang ${failed.length} data...`);

    let successCount = 0;
    let failCount = 0;

    for (const mutation of failed) {
      const now = Date.now();
      const lastAttempt = mutation.timestamp || 0;
      const requiredDelay = getRetryDelay(mutation.retryCount || 0);

      if (now - lastAttempt < requiredDelay) {
        failCount++;
        continue;
      }

      const success = await syncSingleMutation(mutation);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    }

    setIsSyncing(false);
    toast.dismiss(toastId);

    if (successCount > 0) {
      toast.success(`Berhasil sinkronisasi ${successCount} data!`);
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['user-stats'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      queryClient.invalidateQueries({ queryKey: ['scheduled-expenses'] });
    }

    if (failCount > 0) {
      toast.error(`${failCount} data masih gagal. Coba lagi nanti.`);
    }

    await updateQueueStatus();
  }, [isSyncing, queryClient, syncSingleMutation, updateQueueStatus]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("Koneksi kembali! Memulai sinkronisasi...");
      syncPendingMutations();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.warning("Koneksi terputus. Anda masih bisa melakukan pencatatan offline.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (navigator.onLine) {
      syncPendingMutations();
    }

    updateQueueStatus();

    const cleanupInterval = setInterval(() => {
      clearExpiredCache(24 * 60 * 60 * 1000);
    }, 60 * 60 * 1000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(cleanupInterval);
    };
  }, [syncPendingMutations, updateQueueStatus]);

  return (
    <OfflineSyncContext.Provider value={{
      isOnline,
      isSyncing,
      syncQueueStatus,
      syncPendingMutations,
      retryFailedMutations,
    }}>
      {children}
    </OfflineSyncContext.Provider>
  );
}

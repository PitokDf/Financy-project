"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getPendingMutations, removePendingMutation } from "@/lib/offline/db";
import axiosClient from "@/lib/api/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface OfflineSyncContextType {
  isOnline: boolean;
  syncPendingMutations: () => Promise<void>;
}

const OfflineSyncContext = createContext<OfflineSyncContextType>({
  isOnline: true,
  syncPendingMutations: async () => {},
});

export const useOfflineSync = () => useContext(OfflineSyncContext);

export function OfflineSyncProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);
  const [isSyncing, setIsSyncing] = useState(false);
  const queryClient = useQueryClient();

  const syncPendingMutations = useCallback(async () => {
    if (isSyncing || !navigator.onLine) return;

    const pending = await getPendingMutations();
    if (pending.length === 0) return;

    setIsSyncing(true);
    const toastId = toast.loading(`Sinkronisasi ${pending.length} data...`);

    let successCount = 0;
    let failCount = 0;

    for (const mutation of pending) {
      try {
        if (mutation.action === 'CREATE') {
          await axiosClient.post("/transactions", mutation.data);
        } else if (mutation.action === 'DELETE') {
          await axiosClient.delete(`/transactions/${mutation.data.id}`);
        } else if (mutation.action === 'UPDATE') {
          await axiosClient.put(`/transactions/${mutation.data.id}`, mutation.data);
        }
        
        await removePendingMutation(mutation.id);
        successCount++;
      } catch (error) {
        console.error("Failed to sync mutation:", mutation, error);
        failCount++;
      }
    }

    setIsSyncing(false);
    toast.dismiss(toastId);

    if (successCount > 0) {
      toast.success(`Berhasil sinkronisasi ${successCount} data!`);
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['user-stats'] });
    }

    if (failCount > 0) {
      toast.error(`Gagal sinkronisasi ${failCount} data. Akan dicoba lagi nanti.`);
    }
  }, [isSyncing, queryClient]);

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

    // Initial sync check
    if (navigator.onLine) {
      syncPendingMutations();
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [syncPendingMutations]);

  return (
    <OfflineSyncContext.Provider value={{ isOnline, syncPendingMutations }}>
      {children}
    </OfflineSyncContext.Provider>
  );
}

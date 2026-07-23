import Dexie, { type Table } from "dexie";

// --- Types ---

export type SyncStatus = "pending" | "synced" | "failed";
export type MutationAction = "CREATE" | "UPDATE" | "DELETE";

export interface PendingMutation {
  id: string;
  action: MutationAction;
  data: any;
  endpoint?: string;
  status: SyncStatus;
  retryCount: number;
  lastError?: string;
  createdAt: number;
  updatedAt: number;
}

export interface CachedResponse {
  key: string;
  data: any;
  timestamp: number;
}

export interface SyncMetadata {
  id?: number;
  lastSyncAt: number;
}

// --- Database Class ---

class FintrackDB extends Dexie {
  pendingMutations!: Table<PendingMutation, string>;
  cachedResponses!: Table<CachedResponse, string>;
  syncMetadata!: Table<SyncMetadata, number>;

  constructor(userId: string) {
    super(`fintrack_db_${userId}`);

    this.version(1).stores({
      pendingMutations: "id, status, createdAt, action",
      cachedResponses: "key, timestamp",
      syncMetadata: "++id, lastSyncAt",
    });
  }
}

// --- Database Management ---

const DB_INSTANCES = new Map<string, FintrackDB>();
const MAX_RETRIES = 5;

export function getDB(userId: string): FintrackDB {
  if (!DB_INSTANCES.has(userId)) {
    const db = new FintrackDB(userId);
    DB_INSTANCES.set(userId, db);
  }
  return DB_INSTANCES.get(userId)!;
}

export function closeDB(userId: string): void {
  const db = DB_INSTANCES.get(userId);
  if (db) {
    db.close();
    DB_INSTANCES.delete(userId);
  }
}

export async function deleteDB(userId: string): Promise<void> {
  closeDB(userId);
  await Dexie.delete(`fintrack_db_${userId}`);
}

// --- Pending Mutations ---

export async function saveToLocal(
  userId: string,
  data: Omit<
    PendingMutation,
    "id" | "status" | "retryCount" | "createdAt" | "updatedAt"
  >,
): Promise<PendingMutation> {
  const db = getDB(userId);
  const now = Date.now();
  const record: PendingMutation = {
    ...data,
    id:
      data.data.id ||
      `offline_${now}_${Math.random().toString(36).slice(2, 8)}`,
    status: "pending",
    retryCount: 0,
    createdAt: now,
    updatedAt: now,
  };
  await db.pendingMutations.put(record);
  return record;
}

export async function getPendingRecords(
  userId: string,
): Promise<PendingMutation[]> {
  const db = getDB(userId);
  return db.pendingMutations
    .where("status")
    .equals("pending")
    .sortBy("createdAt");
}

export async function updateRecordStatus(
  userId: string,
  id: string,
  status: SyncStatus,
  error?: string,
): Promise<void> {
  const db = getDB(userId);
  const record = await db.pendingMutations.get(id);
  if (!record) return;

  const updates: Partial<PendingMutation> = {
    status,
    updatedAt: Date.now(),
  };

  if (status === "failed") {
    updates.retryCount = record.retryCount + 1;
    updates.lastError = error;
  }

  await db.pendingMutations.update(id, updates);
}

export async function removeRecord(userId: string, id: string): Promise<void> {
  const db = getDB(userId);
  await db.pendingMutations.delete(id);
}

export async function getFailedRecords(
  userId: string,
): Promise<PendingMutation[]> {
  const db = getDB(userId);
  const all = await db.pendingMutations.toArray();
  return all.filter((r) => r.status === "failed" && r.retryCount < MAX_RETRIES);
}

export async function getSyncQueueStatus(userId: string): Promise<{
  pending: number;
  failed: number;
  total: number;
}> {
  const db = getDB(userId);
  const all = await db.pendingMutations.toArray();
  return {
    pending: all.filter((r) => r.status === "pending").length,
    failed: all.filter((r) => r.status === "failed").length,
    total: all.length,
  };
}

// --- Cache ---

export async function cacheResponse(
  userId: string,
  key: string,
  data: any,
): Promise<void> {
  const db = getDB(userId);
  await db.cachedResponses.put({ key, data, timestamp: Date.now() });
}

export async function getCachedResponse(
  userId: string,
  key: string,
): Promise<CachedResponse | null> {
  const db = getDB(userId);
  const result = await db.cachedResponses.get(key);
  return result || null;
}

export async function clearExpiredCache(
  userId: string,
  maxAgeMs: number = 24 * 60 * 60 * 1000,
): Promise<void> {
  const db = getDB(userId);
  const cutoff = Date.now() - maxAgeMs;
  await db.cachedResponses.where("timestamp").below(cutoff).delete();
}

// --- Pull on Login ---

export async function pullOnLogin(
  userId: string,
  fetchFn: (url: string) => Promise<any>,
): Promise<void> {
  const db = getDB(userId);

  try {
    const transactions = await fetchFn("/transactions?limit=1000");
    if (transactions?.data) {
      await db.cachedResponses.put({
        key: "/api/transactions",
        data: transactions,
        timestamp: Date.now(),
      });
    }
  } catch (error) {
    console.error("[OfflineDB] Pull on login failed:", error);
  }

  await db.syncMetadata.put({ lastSyncAt: Date.now() });
}

// --- Check Online Status ---

export function checkOnlineStatus(): boolean {
  return navigator.onLine;
}

// --- Merge Pending Mutations into Cached Data ---

export async function mergePendingMutations(
  userId: string,
  cachedData: any,
): Promise<any> {
  const db = getDB(userId);
  const pending = await db.pendingMutations
    .where("status")
    .equals("pending")
    .toArray();

  if (pending.length === 0 || !cachedData?.data) return cachedData;

  let mergedData = [...cachedData.data];

  for (const mutation of pending) {
    switch (mutation.action) {
      case "CREATE":
        mergedData.unshift({
          ...mutation.data,
          id: mutation.data.id || mutation.id,
          categoryColor:
            mutation.data.type === "EXPENSE" ? "#b92910" : "#059669",
          category: "Pending sync",
          categoryIcon: "",
          isOffline: true,
        });
        break;
      case "UPDATE":
        mergedData = mergedData.map((tx: any) =>
          tx.id === mutation.data?.id
            ? { ...tx, ...mutation.data, isOffline: true, category: "Pending sync" }
            : tx,
        );
        break;
      case "DELETE":
        mergedData = mergedData.filter(
          (tx: any) => tx.id !== mutation.data?.id,
        );
        break;
    }
  }

  return { ...cachedData, data: mergedData };
}

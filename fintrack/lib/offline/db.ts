export interface PendingMutation {
  id: string;
  action: 'CREATE' | 'DELETE' | 'UPDATE';
  data: any;
  timestamp: number;
  syncStatus?: 'pending' | 'syncing' | 'failed';
  retryCount?: number;
  lastError?: string;
  endpoint?: string;
}

export interface CachedResponse {
  key: string;
  data: any;
  timestamp: number;
}

export interface SyncMetadata {
  mutationId: string;
  status: 'pending' | 'syncing' | 'failed' | 'completed';
  retryCount: number;
  lastError?: string;
  lastAttempt?: number;
}

const DB_NAME = 'fintrack-offline';
const DB_VERSION = 2;
const MUTATIONS_STORE = 'pending_mutations';
const CACHE_STORE = 'cached_responses';
const SYNC_STORE = 'sync_metadata';

export async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const oldVersion = event.oldVersion;

      if (oldVersion < 1) {
        if (!db.objectStoreNames.contains(MUTATIONS_STORE)) {
          db.createObjectStore(MUTATIONS_STORE, { keyPath: 'id' });
        }
      }

      if (oldVersion < 2) {
        if (!db.objectStoreNames.contains(MUTATIONS_STORE)) {
          db.createObjectStore(MUTATIONS_STORE, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(CACHE_STORE)) {
          db.createObjectStore(CACHE_STORE, { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains(SYNC_STORE)) {
          const syncStore = db.createObjectStore(SYNC_STORE, { keyPath: 'mutationId' });
          syncStore.createIndex('status', 'status', { unique: false });
        }
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function addPendingMutation(mutation: Omit<PendingMutation, 'timestamp'>) {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction([MUTATIONS_STORE, SYNC_STORE], 'readwrite');
    const mutationsStore = transaction.objectStore(MUTATIONS_STORE);
    const syncStore = transaction.objectStore(SYNC_STORE);

    const mutationData = {
      ...mutation,
      timestamp: Date.now(),
      syncStatus: 'pending' as const,
      retryCount: 0,
    };

    mutationsStore.add(mutationData);
    syncStore.add({
      mutationId: mutation.id,
      status: 'pending',
      retryCount: 0,
    });

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function getPendingMutations(): Promise<PendingMutation[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MUTATIONS_STORE, 'readonly');
    const store = transaction.objectStore(MUTATIONS_STORE);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function removePendingMutation(id: string) {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction([MUTATIONS_STORE, SYNC_STORE], 'readwrite');
    const mutationsStore = transaction.objectStore(MUTATIONS_STORE);
    const syncStore = transaction.objectStore(SYNC_STORE);

    mutationsStore.delete(id);
    syncStore.delete(id);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function updateMutationStatus(
  id: string,
  status: SyncMetadata['status'],
  error?: string
) {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction([MUTATIONS_STORE, SYNC_STORE], 'readwrite');
    const mutationsStore = transaction.objectStore(MUTATIONS_STORE);
    const syncStore = transaction.objectStore(SYNC_STORE);

    const mutationsReq = mutationsStore.get(id);
    mutationsReq.onsuccess = () => {
      const mutation = mutationsReq.result;
      if (mutation) {
        mutation.syncStatus = status === 'completed' ? 'pending' : status;
        mutation.retryCount = (mutation.retryCount || 0) + (status === 'failed' ? 1 : 0);
        mutation.lastError = error;
        mutationsStore.put(mutation);
      }
    };

    const syncReq = syncStore.get(id);
    syncReq.onsuccess = () => {
      const sync = syncReq.result;
      if (sync) {
        sync.status = status;
        sync.retryCount = (sync.retryCount || 0) + (status === 'failed' ? 1 : 0);
        sync.lastError = error;
        sync.lastAttempt = Date.now();
        syncStore.put(sync);
      } else {
        syncStore.add({
          mutationId: id,
          status,
          retryCount: status === 'failed' ? 1 : 0,
          lastError: error,
          lastAttempt: Date.now(),
        });
      }
    };

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function getFailedMutations(): Promise<PendingMutation[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(MUTATIONS_STORE, 'readonly');
    const store = transaction.objectStore(MUTATIONS_STORE);
    const request = store.getAll();

    request.onsuccess = () => {
      const mutations = request.result.filter(
        (m: PendingMutation) => m.syncStatus === 'failed' && (m.retryCount || 0) < 3
      );
      resolve(mutations);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function cacheResponse(key: string, data: any) {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(CACHE_STORE, 'readwrite');
    const store = transaction.objectStore(CACHE_STORE);
    store.put({ key, data, timestamp: Date.now() });

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function getCachedResponse(key: string): Promise<CachedResponse | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CACHE_STORE, 'readonly');
    const store = transaction.objectStore(CACHE_STORE);
    const request = store.get(key);

    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

export async function clearExpiredCache(maxAgeMs: number = 24 * 60 * 60 * 1000) {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(CACHE_STORE, 'readwrite');
    const store = transaction.objectStore(CACHE_STORE);
    const request = store.openCursor();
    const cutoff = Date.now() - maxAgeMs;

    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        if (cursor.value.timestamp < cutoff) {
          cursor.delete();
        }
        cursor.continue();
      }
    };

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function getSyncQueueStatus(): Promise<{
  pending: number;
  failed: number;
  total: number;
}> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(SYNC_STORE, 'readonly');
    const store = transaction.objectStore(SYNC_STORE);
    const request = store.getAll();

    request.onsuccess = () => {
      const items = request.result as SyncMetadata[];
      resolve({
        pending: items.filter((i) => i.status === 'pending').length,
        failed: items.filter((i) => i.status === 'failed').length,
        total: items.length,
      });
    };
    request.onerror = () => reject(request.error);
  });
}

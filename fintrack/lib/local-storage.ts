type StorageValue = string | number | boolean | object | null;

export const storageClient = {
    set<T extends StorageValue>(key: string, value: T): void {
        if (typeof window === 'undefined') return;

        try {
            const serialized =
                typeof value === 'string'
                    ? value
                    : JSON.stringify(value);

            localStorage.setItem(key, serialized);
        } catch (error) {
            console.error(`storageClient.set error (key: ${key})`, error);
        }
    },

    get<T>(key: string): T | null {
        if (typeof window === 'undefined') return null;

        try {
            const item = localStorage.getItem(key);
            if (!item) return null;

            return JSON.parse(item) as T;
        } catch {
            // fallback kalau bukan JSON (pure string)
            return localStorage.getItem(key) as T;
        }
    },

    remove(key: string): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(key);
    },

    clear(): void {
        if (typeof window === 'undefined') return;
        localStorage.clear();
    }
};
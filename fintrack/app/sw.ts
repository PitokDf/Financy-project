/// <reference lib="webworker" />
import {
    Serwist,
    CacheFirst,
    NetworkFirst,
    ExpirationPlugin,
    CacheableResponsePlugin,
    type PrecacheEntry,
    type SerwistGlobalConfig,
} from "serwist";

declare const self: ServiceWorkerGlobalScope &
    SerwistGlobalConfig & {
        __SW_MANIFEST: (PrecacheEntry | string)[];
    };

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching: [
        {
            matcher: ({ request }) => request.destination === "document",
            handler: new NetworkFirst({
                cacheName: "pages-cache",
                networkTimeoutSeconds: 4,
                plugins: [new ExpirationPlugin({ maxEntries: 50 })],
            }),
        },
        {
            matcher: ({ request }) =>
                ["style", "script", "font", "image"].includes(request.destination),
            handler: new CacheFirst({
                cacheName: "assets-cache",
                plugins: [
                    new ExpirationPlugin({ maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 30 }),
                    new CacheableResponsePlugin({ statuses: [0, 200] }),
                ],
            }),
        },
        {
            matcher: ({ request, url }) => {
                if (request.method !== "GET") return false;
                return url.pathname.startsWith("/api/") || url.pathname.startsWith("/api/v1/");
            },
            handler: new NetworkFirst({
                cacheName: "api-cache",
                networkTimeoutSeconds: 5,
                plugins: [
                    new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 10 }),
                    new CacheableResponsePlugin({ statuses: [0, 200] }),
                ],
            }),
        },
    ],
    fallbacks: {
        entries: [
            {
                url: "/offline",
                matcher({ request }) {
                    return request.destination === "document";
                },
            },
        ],
    },
});

serwist.addEventListeners();

let currentUserId: string | null = null;

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SET_USER_ID") {
        currentUserId = event.data.userId;
        console.log("[SW] User ID synced:", currentUserId);
    }
});

self.addEventListener("push", (event) => {
    if (!event.data) return;

    try {
        const data = event.data.json();
        
        // Filter: Only show if userId matches or if no userId filter is provided (legacy)
        if (data.userId && currentUserId && data.userId !== currentUserId) {
            console.log("[SW] Skipping notification for another user:", data.userId);
            return;
        }

        const title = data.title || "Fintrack";
        const options = {
            body: data.body || "",
            icon: data.icon || "/icons/icon-192x192.png",
            badge: data.icon || "/icons/badge-72x72.png",
            data: data.url || "/",
            vibrate: [100, 50, 100],
        };

        event.waitUntil(self.registration.showNotification(title, options));
    } catch (e) {
        // ... (fallback handles text data)
        event.waitUntil(
            self.registration.showNotification("Fintrack", {
                body: event.data.text(),
                icon: "/icons/icon-192x192.png",
            })
        );
    }
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    event.waitUntil(
        self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
            if (clientList.length > 0) {
                let client = clientList[0];
                for (let i = 0; i < clientList.length; i++) {
                    if (clientList[i].focused) {
                        client = clientList[i];
                    }
                }
                return client.focus();
            }
            return self.clients.openWindow(event.notification.data || "/");
        })
    );
});


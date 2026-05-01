/// <reference lib="webworker" />
import {
    Serwist,
    StaleWhileRevalidate,
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
            handler: new StaleWhileRevalidate({
                cacheName: "pages-cache",
                plugins: [
                    new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 }),
                    new CacheableResponsePlugin({ statuses: [0, 200] }),
                ],
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
            // Hanya tampilkan halaman offline jika halaman tersebut benar-benar belum pernah dikunjungi (tidak ada di cache)
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

self.addEventListener('fetch', (event: FetchEvent) => {
    const url = new URL(event.request.url);

    if (url.pathname === '/transactions' && event.request.method === 'POST') {
        event.respondWith(
            (async () => {
                const formData = await event.request.formData();
                const file = formData.get('fileCSV') as File;

                if (file) {
                    const cache = await caches.open('shared-target');
                    await cache.put('/shared-file', new Response(file));

                }

                return Response.redirect('/transactions?action=import', 303)
            })()
        )
    }
})

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
        const options: NotificationOptions = {
            body: data.body || "",
            icon: data.icon || "/icons/icon-192x192.png",
            badge: data.badge || "/icons/badge-72x72.png",
            data: data.url || "/"
        };

        event.waitUntil(self.registration.showNotification(title, options));
    } catch {
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
    const urlToOpen = event.notification.data || "/";

    event.waitUntil(
        self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
            // Jika ada tab yang terbuka, navigasikan ke URL tujuan dan fokuskan
            for (const client of clientList) {
                if (client.url.includes(self.location.origin) && "navigate" in client) {
                    return client.navigate(urlToOpen).then((c) => c?.focus());
                }
            }

            // Jika tidak ada tab terbuka, buka jendela baru
            if (self.clients.openWindow) {
                return self.clients.openWindow(urlToOpen);
            }
        })
    );
});


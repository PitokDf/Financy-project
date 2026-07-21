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

const PAGES_CACHE = "pages-v2";
const ASSETS_CACHE = "assets-v2";
const API_CACHE = "api-v2";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:6789/api/v1";
const API_ORIGIN = new URL(API_BASE).origin;
const CRITICAL_API_ROUTES = [
  `${API_BASE}/dashboard`,
  `${API_BASE}/categories`,
  `${API_BASE}/budgets`,
  `${API_BASE}/gamification/stats`,
];

const CRITICAL_PAGE_ROUTES = [
  "/dashboard",
  "/transactions",
  "/budget",
  "/analysis",
  "/achievements",
  "/offline",
];

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: false,
  runtimeCaching: [
    {
      matcher: ({ request }) => request.destination === "document",
      handler: new NetworkFirst({
        cacheName: PAGES_CACHE,
        networkTimeoutSeconds: 5,
        plugins: [
          new ExpirationPlugin({
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 3,
          }),
          new CacheableResponsePlugin({ statuses: [0, 200] }),
        ],
      }),
    },
    {
      matcher: ({ request }) =>
        ["style", "font", "image"].includes(request.destination),
      handler: new CacheFirst({
        cacheName: ASSETS_CACHE,
        plugins: [
          new ExpirationPlugin({
            maxEntries: 120,
            maxAgeSeconds: 60 * 60 * 24 * 30,
          }),
          new CacheableResponsePlugin({ statuses: [0, 200] }),
        ],
      }),
    },
    {
      matcher: ({ url }) => url.origin === API_ORIGIN,
      handler: new NetworkFirst({
        cacheName: API_CACHE,
        networkTimeoutSeconds: 5,
        plugins: [
          new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 30 }),
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

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const pageCache = await caches.open(PAGES_CACHE);
        const apiCache = await caches.open(API_CACHE);
        await Promise.allSettled([
          ...CRITICAL_PAGE_ROUTES.map((route) =>
            pageCache.add(new Request(route)).catch(() => {}),
          ),
          ...CRITICAL_API_ROUTES.map((route) =>
            apiCache
              .add(new Request(route, { credentials: "include" }))
              .catch(() => {}),
          ),
        ]);
      } catch {}
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names.filter((n) => n.endsWith("-v1")).map((n) => caches.delete(n)),
        ),
      ),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SET_USER_ID") {
    currentUserId = event.data.userId;
  }
});

self.addEventListener("push", (event) => {
  if (!event.data) return;
  try {
    const data = event.data.json();
    if (data.userId && currentUserId && data.userId !== currentUserId) return;
    event.waitUntil(
      self.registration.showNotification(data.title || "FinTrack", {
        body: data.body || "",
        icon: "/icons/icon-192x192.png",
        badge: "/icons/badge-72x72.png",
        data: data.url || "/",
      }),
    );
  } catch (_) {
    event.waitUntil(
      self.registration.showNotification("FinTrack", {
        body: event.data.text(),
        icon: "/icons/icon-192x192.png",
      }),
    );
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data || "/";
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        for (const c of clients) {
          if (c.url.includes(self.location.origin) && "navigate" in c) {
            return (c as WindowClient).navigate(url).then((w) => w?.focus());
          }
        }
        return self.clients.openWindow(url);
      }),
  );
});

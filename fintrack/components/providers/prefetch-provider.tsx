"use client";

import { useEffect, useCallback, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/lib/api/client";

const PREFETCH_ROUTES: Record<string, string[]> = {
  "/dashboard": ["/dashboard", "/categories"],
  "/transactions": ["/transactions?limit=10", "/categories"],
  "/budget": ["/budgets", "/categories"],
  "/analysis": [],
  "/achievements": ["/gamification/badges/all", "/gamification/badges", "/gamification/challenges"],
  "/notifications": ["/notifications", "/notifications/unread-count"],
  "/scheduled-expenses": ["/scheduled-expenses"],
};

const prefetchedPaths = new Set<string>();

export function PrefetchProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const lastPathRef = useRef<string>("");

  const prefetchForRoute = useCallback(
    (path: string) => {
      if (prefetchedPaths.has(path)) return;

      const routes = PREFETCH_ROUTES[path];
      if (!routes) return;

      prefetchedPaths.add(path);

      routes.forEach((route) => {
        const queryKey = getQueryKeyForRoute(route);
        if (queryKey) {
          queryClient.prefetchQuery({
            queryKey,
            queryFn: async () => {
              const res = await axiosClient.get(route);
              return res.data;
            },
            staleTime: 2 * 60 * 1000,
          });
        }
      });
    },
    [queryClient]
  );

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath !== lastPathRef.current) {
      lastPathRef.current = currentPath;
      prefetchForRoute(currentPath);
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const link = target.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("//")) return;

      const path = new URL(href, window.location.origin).pathname;
      prefetchForRoute(path);
    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      const link = target.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("//")) return;

      const path = new URL(href, window.location.origin).pathname;
      prefetchForRoute(path);
    };

    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    document.addEventListener("focusin", handleFocusIn, { passive: true });

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [prefetchForRoute]);

  return <>{children}</>;
}

function getQueryKeyForRoute(route: string): string[] | null {
  if (route.startsWith("/dashboard")) return ["dashboard-stats"];
  if (route.startsWith("/transactions")) return ["transactions"];
  if (route.startsWith("/budgets")) return ["budgets"];
  if (route.startsWith("/categories")) return ["categories"];
  if (route.startsWith("/analysis/latest")) return ["analysis", "latest"];
  if (route.startsWith("/gamification/badges/all")) return ["all-badges"];
  if (route.startsWith("/gamification/stats")) return ["user-stats"];
  if (route.startsWith("/gamification/badges")) return ["user-badges"];
  if (route.startsWith("/gamification/challenges")) return ["user-challenges"];
  if (route.startsWith("/notifications/unread-count")) return ["notifications", "unreadCount"];
  if (route.startsWith("/notifications")) return ["notifications"];
  if (route.startsWith("/scheduled-expenses")) return ["scheduled-expenses"];
  return null;
}

export function clearPrefetchCache() {
  prefetchedPaths.clear();
}

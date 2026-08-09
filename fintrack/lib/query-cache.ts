"use client";

import type { QueryClient } from "@tanstack/react-query";

let queryClientRef: QueryClient | null = null;

export function registerQueryClient(client: QueryClient) {
  queryClientRef = client;
}

export function clearQueryCache() {
  queryClientRef?.clear();
}

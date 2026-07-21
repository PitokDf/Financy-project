import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/lib/api/client";
import { cacheResponse, getCachedResponse } from "@/lib/offline/db";

export interface DashboardCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface DashboardSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  savingsRate: number;
}

export interface DashboardResponse {
  summary: DashboardSummary;
  topCategories: DashboardCategory[];
  forecast?: {
    categoryName: string;
    predictedAmount: number;
    targetMonth: number;
  } | null;
  topForecasts?: Array<{
    categoryName: string;
    predictedAmount: number;
    rank: number;
  }>;
}

export function useDashboard() {
  const query = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      try {
        const res = await axiosClient.get("/dashboard");
        const data = (res.data as DashboardResponse) || null;
        if (data) {
          await cacheResponse("/api/dashboard", data);
        }
        return data;
      } catch (error) {
        const cached = await getCachedResponse("/api/dashboard");
        if (cached) {
          console.log("[Dashboard] Serving from offline cache");
          return cached.data as DashboardResponse;
        }
        throw error;
      }
    },
  });

  return {
    data: query.data,
    isLoading: query.isPending,
    error: query.error,
  };
}

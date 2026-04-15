import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/lib/api/client";

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
}

export function useDashboard() {
    const query = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: async () => {
            const res = await axiosClient.get("/dashboard");
            return (res.data as DashboardResponse) || null;
        },
    });

    return {
        data: query.data,
        isLoading: query.isPending,
        error: query.error
    };
}

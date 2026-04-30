import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "@/lib/api/client";
import { toast } from "sonner";

export interface MlClusterResponse {
    id: string;
    index: number;
    name: string;
    suggestedName: string | null;
    color: string;
    size: number;
    totalAmount: number;
    representativeDescriptions: string[];
    members: Array<{
        id: string;
        description: string;
        amount: number;
        date: string;
        reviewRequired?: boolean;   // true jika confidence AI rendah (< threshold)
    }>;
}

export interface AnalysisRunResult {
    runId: string;
    status: string;
    totalTransactions: number;
    kOptimal: number;
    silhouetteScore: number;
    durationMs: number;
    clusters: MlClusterResponse[];
    elbowData?: Array<{ k: number, wcss: number }>;
    preAssignedSummary?: {
        count: number;
        byCategory: Record<string, number>;
    };
}

export interface ClusterMapping {
    index: number;
    name: string;
    color: string;
    icon: string;
    transactionIds?: string[];
}

export interface FinancialStat {
    date: string;
    income: number;
    expense: number;
}

export interface CategoryBreakdown {
    id: string;
    name: string;
    color: string;
    totalAmount: number;
}

export function useAnalysis() {
    const queryClient = useQueryClient();

    const fetchLatestRun = useQuery({
        queryKey: ["analysis", "latest"],
        queryFn: async () => {
            const res = await axiosClient.get("/analysis/latest");
            return res.data as AnalysisRunResult || null;
        },
        retry: false
    });

    const runAnalysisMutation = useMutation({
        mutationFn: async (payload: { lookbackDays?: number, kMin?: number, kMax?: number } = {}) => {
            const res = await axiosClient.post("/analysis/run-v2", payload);
            return res.data as AnalysisRunResult;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["analysis", "latest"], data);
        },
        onError: (error: any) => {
            toast.error(error.message || "Gagal menjalankan analisis AI");
        }
    });

    const confirmAnalysisMutation = useMutation({
        mutationFn: async (payload: { runId: string, clusterMappings: ClusterMapping[] }) => {
            const res = await axiosClient.post("/analysis/confirm", payload);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            queryClient.invalidateQueries({ queryKey: ["user-stats"] });
            queryClient.invalidateQueries({ queryKey: ["analysis", "latest"] });
            toast.success("Kategori berhasil dibuat dan transaksi telah diperbarui!");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Gagal mengkonfirmasi analisis AI");
        }
    });

    const useStats = (startDate?: string, endDate?: string) => useQuery({
        queryKey: ["analysis", "stats", startDate, endDate],
        queryFn: async () => {
            const res = await axiosClient.get("/analysis/stats", {
                params: { startDate, endDate }
            });
            return res.data as FinancialStat[];
        }
    });

    const useCategoryBreakdown = (startDate?: string, endDate?: string) => useQuery({
        queryKey: ["analysis", "categories", startDate, endDate],
        queryFn: async () => {
            const res = await axiosClient.get("/analysis/category-breakdown", {
                params: { startDate, endDate }
            });
            return res.data as CategoryBreakdown[];
        }
    });

    return {
        latestRun: fetchLatestRun.data,
        isLoadingLatest: fetchLatestRun.isLoading,
        runAnalysis: runAnalysisMutation.mutateAsync,
        isRunning: runAnalysisMutation.isPending,
        confirmAnalysis: confirmAnalysisMutation.mutateAsync,
        isConfirming: confirmAnalysisMutation.isPending,
        useStats,
        useCategoryBreakdown
    };
}

export interface MlCluster {
    index: number;
    size: number;
    total_amount: number;
    suggested_name: string;
    representative_descriptions: string[];
    members: Array<{
        transaction_id: string;
    }>;
}
export interface MlPreAssigned {
    transactionId: string;
    categoryId: string;
    categoryName: string;
    similarity: number;
}
export interface MlResult {
    k_optimal: number;
    silhouette_score: number;
    elbow_data: Array<{
        k: number;
        wcss: number;
    }>;
    duration_ms: number;
    clusters: MlCluster[];
    preAssigned: MlPreAssigned[];
}
export interface ExistingCategory {
    id: string;
    name: string;
    keywords?: string[];
}
export declare class AnalysisMLService {
    static runPipeline(transactions: Array<{
        id: string;
        description: string;
        amount: number;
        date: string;
    }>, existingCategories: ExistingCategory[], kMin: number, kMax: number): Promise<MlResult>;
}
//# sourceMappingURL=analysis-ml.service.d.ts.map
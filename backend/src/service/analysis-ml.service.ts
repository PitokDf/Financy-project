import { config } from "@/config";

interface PyCluster {
    cluster_index: number;
    suggested_name: string;
    keywords: string[];
    transaction_ids: string[];
    size: number;
}

interface PyPreAssigned {
    transaction_id: string;
    category_id: string;
    category_name: string;
    similarity: number;
}

interface PyResponse {
    k_optimal: number;
    silhouette_score: number;
    wcss_values: Record<string, number>;
    clusters: PyCluster[];
    pre_assigned: PyPreAssigned[];
    duration_ms: number;
}

export interface MlCluster {
    index: number;
    size: number;
    total_amount: number;
    suggested_name: string;
    representative_descriptions: string[];
    members: Array<{ transaction_id: string }>;
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
    elbow_data: Array<{ k: number; wcss: number }>;
    duration_ms: number;
    clusters: MlCluster[];
    preAssigned: MlPreAssigned[];
}

export interface ExistingCategory {
    id: string;
    name: string;
    keywords?: string[];
}

export class AnalysisMLService {
    static async runPipeline(
        transactions: Array<{ id: string; description: string; amount: number; date: string }>,
        existingCategories: ExistingCategory[],
        kMin: number,
        kMax: number,
    ): Promise<MlResult> {
        const amountMap = new Map(transactions.map((t) => [t.id, t.amount]));

        const response = await fetch(`${config.ML_SERVICE_URL}/analyze`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                transactions: transactions.map((t) => ({ id: t.id, description: t.description })),
                existing_categories: existingCategories.map(c => ({
                    id: c.id,
                    name: c.name,
                    keywords: c.keywords ?? [],
                })),
                k_min: kMin,
                k_max: kMax,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`ML Service error ${response.status}: ${error}`);
        }

        const data: PyResponse = await response.json() as PyResponse;

        const elbow_data = Object.entries(data.wcss_values)
            .map(([k, wcss]) => ({ k: parseInt(k), wcss }))
            .sort((a, b) => a.k - b.k);

        const clusters: MlCluster[] = data.clusters.map((cluster) => {
            const total_amount = cluster.transaction_ids.reduce(
                (sum, id) => sum + Math.abs(amountMap.get(id) ?? 0),
                0,
            );

            return {
                index: cluster.cluster_index,
                size: cluster.size,
                total_amount,
                suggested_name: cluster.suggested_name,
                representative_descriptions: cluster.keywords,
                members: cluster.transaction_ids.map((id) => ({ transaction_id: id })),
            };
        });

        const preAssigned: MlPreAssigned[] = (data.pre_assigned ?? []).map((pa) => ({
            transactionId: pa.transaction_id,
            categoryId: pa.category_id,
            categoryName: pa.category_name,
            similarity: pa.similarity,
        }));

        return {
            k_optimal: data.k_optimal,
            silhouette_score: data.silhouette_score,
            elbow_data,
            duration_ms: data.duration_ms,
            clusters,
            preAssigned,
        };
    }

    static async runPipelineV2(
        transactions: Array<{ id: string; description: string }>
    ) {
        const response = await fetch(`${config.ML_SERVICE_URL}/v2/analyze`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                transactions: transactions.map((t) => ({ id: t.id, description: t.description })),
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`ML Service error ${response.status}: ${error}`);
        }

        const data = await response.json() as any;

        return {
            predictions: data.predictions.map((p: any) => ({
                transactionId: p.transaction_id,
                description: p.description,
                predictedCategory: p.predicted_category,
                confidence: p.confidence,
            })),
            durationMs: data.duration_ms,
        };
    }

    /**
     * Fire-and-forget: send user corrections to the Python ML service for incremental retraining.
     * Each correction is: { description, aiPrediction (what AI said), correctCategory (what user chose) }
     * We only send items where the user changed the AI's suggestion.
     */
    static sendFeedback(corrections: Array<{ description: string; correctCategory: string }>): void {
        if (corrections.length === 0) return;

        const payload = {
            corrections: corrections.map(c => ({
                description: c.description,
                correct_category: c.correctCategory,
            })),
        };

        fetch(`${config.ML_SERVICE_URL}/v2/feedback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }).catch((err) => {
            // Non-critical: log warning only, don't break anything
            console.warn("[AI Feedback] Failed to send feedback to ML service:", err?.message);
        });
    }
}
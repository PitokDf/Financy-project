"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisMLService = void 0;
const config_1 = require("../config");
class AnalysisMLService {
    static async runPipeline(transactions, existingCategories, kMin, kMax) {
        const amountMap = new Map(transactions.map((t) => [t.id, t.amount]));
        const response = await fetch(`${config_1.config.ML_SERVICE_URL}/analyze`, {
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
        const data = await response.json();
        const elbow_data = Object.entries(data.wcss_values)
            .map(([k, wcss]) => ({ k: parseInt(k), wcss }))
            .sort((a, b) => a.k - b.k);
        const clusters = data.clusters.map((cluster) => {
            const total_amount = cluster.transaction_ids.reduce((sum, id) => sum + Math.abs(amountMap.get(id) ?? 0), 0);
            return {
                index: cluster.cluster_index,
                size: cluster.size,
                total_amount,
                suggested_name: cluster.suggested_name,
                representative_descriptions: cluster.keywords,
                members: cluster.transaction_ids.map((id) => ({ transaction_id: id })),
            };
        });
        const preAssigned = (data.pre_assigned ?? []).map((pa) => ({
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
}
exports.AnalysisMLService = AnalysisMLService;
//# sourceMappingURL=analysis-ml.service.js.map
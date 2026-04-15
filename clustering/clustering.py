import re
import time
from collections import Counter
from typing import List, Literal, Optional

import numpy as np
import umap
import hdbscan
from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import normalize
from sklearn.metrics.pairwise import cosine_similarity

STOPWORDS = {
    "di", "ke", "dari", "yang", "dan", "atau", "dengan", "untuk", "pada",
    "ini", "itu", "adalah", "beli", "bayar", "pembayaran", "transfer",
    "biaya", "via", "the", "a", "an", "of", "to", "in", "for", "at",
}

SIMILARITY_THRESHOLD = 0.72
MODEL_NAME = "intfloat/multilingual-e5-small"


class ClusteringService:
    def __init__(self, model_name: str = MODEL_NAME):
        self.model = SentenceTransformer(model_name)

    def run(
        self,
        transactions,
        existing_categories: Optional[List[dict]] = None,
        method: Literal["kmeans", "hdbscan"] = "hdbscan",
        k_min: int = 4,
        k_max: int = 12
    ) -> dict:
        start_time = time.time()

        descriptions = [t.description for t in transactions]
        ids = [t.id for t in transactions]

        # Embedding asli (384 dimensi)
        embeddings = self._embed(descriptions)

        # Reduced embedding untuk clustering (UMAP)
        reduced_embeddings = self._reduce_dimension(embeddings, n_components=5, n_neighbors=15)

        # Pre-assignment ke kategori existing
        pre_assigned = []
        unmatched_indices = list(range(len(transactions)))

        if existing_categories and len(existing_categories) > 0:
            cat_texts = []
            for cat in existing_categories:
                text = cat['name']
                if cat.get('keywords'):
                    text += " " + " ".join(cat['keywords'][:5])
                cat_texts.append(text)

            # Gunakan embedding ASLI (384 dim) untuk similarity dengan kategori
            cat_embeddings = self._embed(cat_texts)

            # Similarity menggunakan embedding asli
            sim_matrix = cosine_similarity(embeddings, cat_embeddings)

            matched = set()
            for tx_idx in range(len(transactions)):
                best_idx = int(np.argmax(sim_matrix[tx_idx]))
                best_sim = float(sim_matrix[tx_idx][best_idx])
                if best_sim >= SIMILARITY_THRESHOLD:
                    cat = existing_categories[best_idx]
                    pre_assigned.append({
                        "transaction_id": ids[tx_idx],
                        "category_id": cat['id'],
                        "category_name": cat['name'],
                        "similarity": round(best_sim, 4)
                    })
                    matched.add(tx_idx)

            unmatched_indices = [i for i in range(len(transactions)) if i not in matched]

        # Clustering hanya pada unmatched
        clusters = []
        wcss_values = {}
        k_optimal = 0
        sil = 0.0

        if len(unmatched_indices) >= 5:
            um = np.array(unmatched_indices)
            unmatched_emb = reduced_embeddings[um]          # pakai reduced untuk clustering
            unmatched_ids = [ids[i] for i in um]
            unmatched_desc = [descriptions[i] for i in um]

            if method == "kmeans":
                k_optimal, wcss_raw = self._find_optimal_k(unmatched_emb, k_min, k_max)
                labels = self._kmeans(unmatched_emb, k_optimal)
                wcss_values = {str(k): v for k, v in wcss_raw.items()}
            else:
                labels = self._hdbscan(unmatched_emb)
                unique_labels = set(labels)
                k_optimal = len(unique_labels) - (1 if -1 in unique_labels else 0)

            sil = self._silhouette(unmatched_emb, labels)
            clusters = self._build_clusters(labels, unmatched_ids, unmatched_desc)

        duration_ms = int((time.time() - start_time) * 1000)

        return {
            "k_optimal": k_optimal,
            "silhouette_score": round(sil, 4),
            "wcss_values": wcss_values,
            "clusters": clusters,
            "pre_assigned": pre_assigned,
            "duration_ms": duration_ms
        }

    def _embed(self, descriptions: List[str]) -> np.ndarray:
        cleaned = []
        for d in descriptions:
            text = d.lower().strip()
            text = re.sub(r'gojek|grab|uber|shopeefood', 'transportasi_online', text)
            text = re.sub(r'starbucks|janji jiwa|kenangan|kopiken', 'jajan_kopi', text)
            text = re.sub(r'indomaret|alfamart|alfamidi', 'minimarket', text)
            text = re.sub(r'shopee|tokopedia|lazada', 'ecommerce', text)
            text = re.sub(r'qris|ovo|dana|gopay|linkaja', 'pembayaran_digital', text)
            text = re.sub(r'\d+', '', text)
            text = re.sub(r'[^\w\s]', ' ', text)
            text = re.sub(r'\s+', ' ', text).strip()
            cleaned.append(text)

        embeddings = self.model.encode(cleaned, batch_size=32, show_progress_bar=False)
        return normalize(embeddings)

    def _reduce_dimension(self, embeddings: np.ndarray, n_components: int = 5, n_neighbors: int = 15):
        reducer = umap.UMAP(
            n_neighbors=n_neighbors,
            n_components=n_components,
            min_dist=0.0,
            metric='cosine',
            random_state=42
        )
        return reducer.fit_transform(embeddings)

    def _hdbscan(self, embeddings: np.ndarray) -> np.ndarray:
        clusterer = hdbscan.HDBSCAN(
            min_cluster_size=5,
            min_samples=3,
            metric='euclidean',
            cluster_selection_method='eom',
            prediction_data=True
        )
        return clusterer.fit_predict(embeddings)

    def _find_optimal_k(self, embeddings: np.ndarray, k_min: int, k_max: int) -> tuple[int, dict]:
        n = len(embeddings)
        actual_k_max = min(k_max, n - 1)
        if actual_k_max < k_min:
            return k_min, {str(k_min): 0.0}

        wcss_dict = {}
        for k in range(k_min, actual_k_max + 1):
            km = KMeans(n_clusters=k, random_state=42, n_init=10)
            km.fit(embeddings)
            wcss_dict[k] = float(km.inertia_)

        optimal_k = self._elbow(wcss_dict, k_min, actual_k_max)
        return optimal_k, wcss_dict

    def _elbow(self, wcss: dict, k_min: int, k_max: int) -> int:
        ks = list(range(k_min, k_max + 1))
        values = [wcss[k] for k in ks]
        if len(ks) < 3:
            return k_min
        curvatures = [values[i] - 2 * values[i+1] + values[i+2] for i in range(len(values)-2)]
        return ks[int(np.argmax(curvatures)) + 1]

    def _kmeans(self, embeddings: np.ndarray, k: int) -> np.ndarray:
        km = KMeans(n_clusters=k, random_state=42, n_init=10)
        return km.fit_predict(embeddings)

    def _silhouette(self, embeddings: np.ndarray, labels: np.ndarray) -> float:
        mask = labels != -1
        if np.sum(mask) < 2 or len(set(labels[mask])) < 2:
            return 0.0
        return float(silhouette_score(embeddings[mask], labels[mask]))

    def _build_clusters(self, labels: np.ndarray, ids: List[str], descriptions: List[str]) -> List[dict]:
        clusters = []
        unique_labels = sorted(list(set(labels)))

        for lbl in unique_labels:
            if lbl == -1:
                continue
            indices = [i for i, l in enumerate(labels) if l == lbl]
            cluster_descriptions = [descriptions[i] for i in indices]
            cluster_ids = [ids[i] for i in indices]
            keywords = self._extract_keywords(cluster_descriptions)

            suggested_name = ", ".join(keywords[:3]) if keywords else f"Kategori {lbl}"

            clusters.append({
                "cluster_index": int(lbl),
                "suggested_name": suggested_name,
                "keywords": keywords,
                "transaction_ids": cluster_ids,
                "size": len(cluster_ids)
            })
        return clusters

    def _extract_keywords(self, descriptions: List[str], top_n: int = 4) -> List[str]:
        words = []
        for desc in descriptions:
            tokens = re.findall(r"\b[a-zA-Z0-9]{3,}\b", desc.lower())
            words.extend(w for w in tokens if w not in STOPWORDS)
        counter = Counter(words)
        return [w for w, _ in counter.most_common(top_n)]
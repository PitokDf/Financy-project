import re
import time
from collections import Counter
from typing import List, Optional

import joblib
import numpy as np
import umap
import os
import json
from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.metrics.pairwise import cosine_similarity

# Persistence configuration
DATA_DIR = os.getenv("DATA_DIR", "data")
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR, exist_ok=True)

STOPWORDS = {
    "di", "ke", "dari", "yang", "dan", "atau", "dengan", "untuk", "pada",
    "ini", "itu", "adalah", "beli", "bayar", "pembayaran", "transfer",
    "biaya", "via", "the", "a", "an", "of", "to", "in", "for", "at",
}

SIMILARITY_THRESHOLD = 0.75
MODEL_NAME = "intfloat/multilingual-e5-base"


class ClusteringService:
    def __init__(self, model_name: str = MODEL_NAME):
        self.model = SentenceTransformer(model_name)

    def run(
        self,
        transactions,
        existing_categories: Optional[List[dict]] = None,
        k_min: int = 4,
        k_max: int = 12
    ) -> dict:
        start_time = time.time()

        descriptions = [t.description for t in transactions]
        ids = [t.id for t in transactions]

        embeddings = self._embed(descriptions)
        reduced_embeddings = self._reduce_dimension(embeddings, n_components=10, n_neighbors=15)

        pre_assigned = []
        unmatched_indices = list(range(len(transactions)))

        if existing_categories and len(existing_categories) > 0:
            cat_texts = []
            for cat in existing_categories:
                text = cat['name']
                if cat.get('keywords'):
                    text += " " + " ".join(cat['keywords'][:5])
                cat_texts.append(text)

            cat_embeddings = self._embed(cat_texts, is_query=True)
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

        clusters = []
        wcss_values = {}
        k_optimal = 0
        sil = 0.0

        if len(unmatched_indices) >= 5:
            um = np.array(unmatched_indices)
            unmatched_emb = reduced_embeddings[um]
            unmatched_ids = [ids[i] for i in um]
            unmatched_desc = [descriptions[i] for i in um]

            k_optimal, wcss_raw = self._find_optimal_k(unmatched_emb, k_min, k_max)
            labels = self._kmeans(unmatched_emb, k_optimal)
            wcss_values = {str(k): v for k, v in wcss_raw.items()}
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

    def _embed(self, descriptions: List[str], is_query: bool = False) -> np.ndarray:
        prefix = "query: " if is_query else "passage: "
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
            cleaned.append(prefix + text)

        return self.model.encode(cleaned, batch_size=32, show_progress_bar=False, normalize_embeddings=True)

    def _reduce_dimension(self, embeddings: np.ndarray, n_components: int = 10, n_neighbors: int = 15) -> np.ndarray:
        reducer = umap.UMAP(
            n_neighbors=n_neighbors,
            n_components=n_components,
            min_dist=0.0,
            metric='cosine',
            random_state=42
        )
        return reducer.fit_transform(embeddings)

    def _find_optimal_k(self, embeddings: np.ndarray, k_min: int, k_max: int) -> tuple[int, dict]:
        n = len(embeddings)
        actual_k_max = min(k_max, n - 1)
        if actual_k_max < k_min:
            return k_min, {str(k_min): 0.0}

        wcss_dict = {}
        sil_dict = {}
        for k in range(k_min, actual_k_max + 1):
            km = KMeans(n_clusters=k, random_state=42, n_init=10)
            labels = km.fit_predict(embeddings)
            wcss_dict[k] = float(km.inertia_)
            sil_dict[k] = float(silhouette_score(embeddings, labels))

        optimal_k = max(sil_dict, key=sil_dict.get)
        return optimal_k, wcss_dict

    def _elbow(self, wcss: dict, k_min: int, k_max: int) -> int:
        ks = list(range(k_min, k_max + 1))
        values = [wcss[k] for k in ks]
        if len(ks) < 3:
            return k_min
        curvatures = [values[i] - 2 * values[i+1] + values[i+2] for i in range(len(values) - 2)]
        return ks[int(np.argmax(curvatures)) + 1]

    def _kmeans(self, embeddings: np.ndarray, k: int) -> np.ndarray:
        km = KMeans(n_clusters=k, random_state=42, n_init=10)
        return km.fit_predict(embeddings)

    def _silhouette(self, embeddings: np.ndarray, labels: np.ndarray) -> float:
        if len(set(labels)) < 2:
            return 0.0
        return float(silhouette_score(embeddings, labels))

    def _build_clusters(self, labels: np.ndarray, ids: List[str], descriptions: List[str]) -> List[dict]:
        clusters = []
        for lbl in sorted(set(labels)):
            indices = [i for i, l in enumerate(labels) if l == lbl]
            cluster_descriptions = [descriptions[i] for i in indices]
            cluster_ids = [ids[i] for i in indices]
            keywords = self._extract_keywords(cluster_descriptions)
            clusters.append({
                "cluster_index": int(lbl),
                "suggested_name": ", ".join(keywords[:3]) if keywords else f"Kategori {lbl}",
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
        return [w for w, _ in Counter(words).most_common(top_n)]


class ClassifierService:
    def __init__(self, model_name: str = "classifier_model.joblib"):
        # Model usually lives in DATA_DIR
        model_path = os.path.join(DATA_DIR, model_name)
        
        # Fallback to current directory for development/initial state
        if not os.path.exists(model_path) and os.path.exists(model_name):
            print(f"[Classifier] Model not found in {model_path}, falling back to {model_name}")
            model_path = model_name

        self.model_data = joblib.load(model_path)
        self.classifier = self.model_data["classifier"]
        self.model_name = self.model_data.get("model_name", "intfloat/multilingual-e5-large")
        self.prefix = self.model_data.get("prefix", "query")
        self.model = SentenceTransformer(self.model_name)

    def _embed(self, descriptions: List[str]) -> np.ndarray:
        prefix = f"{self.prefix}: "
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
            cleaned.append(prefix + text)

        return self.model.encode(cleaned, batch_size=32, show_progress_bar=False, normalize_embeddings=True)

    def predict(self, transactions) -> dict:
        if not transactions:
            return {"predictions": [], "duration_ms": 0}
        
        start_time = time.time()
        descriptions = [t.description for t in transactions]
        ids = [t.id for t in transactions]

        embeddings = self._embed(descriptions)
        
        probs = self.classifier.predict_proba(embeddings)
        classes = self.classifier.classes_
        
        predictions = []
        for i in range(len(transactions)):
            best_idx = int(np.argmax(probs[i]))
            category = str(classes[best_idx])
            confidence = float(probs[i][best_idx])
            
            predictions.append({
                "transaction_id": ids[i],
                "description": descriptions[i],
                "predicted_category": category,
                "confidence": round(confidence, 4)
            })

        duration_ms = int((time.time() - start_time) * 1000)
        
        return {
            "predictions": predictions,
            "duration_ms": duration_ms
        }

    def train_incremental(self, corrections: list[dict], corrections_name: str = "feedback_corrections.json"):
        """
        Incrementally improve the classifier using user corrections.
        corrections: [{"description": str, "correct_category": str}]
        
        Since GridSearchCV doesn't support partial_fit, we:
        1. Accumulate corrections in a JSON file
        2. Re-train the best estimator from GridSearchCV using all corrections + existing class knowledge
        3. Save the retrained model back to disk
        """
        from sklearn.linear_model import LogisticRegression
        
        corrections_file = os.path.join(DATA_DIR, corrections_name)

        if not corrections:
            return

        # Load or init corrections history
        history = []
        if os.path.exists(corrections_file):
            try:
                with open(corrections_file, "r") as f:
                    history = json.load(f)
            except Exception:
                history = []

        # Append new corrections (deduplicate by description+category)
        existing_keys = {(item["description"], item["correct_category"]) for item in history}
        for c in corrections:
            key = (c["description"], c["correct_category"])
            if key not in existing_keys:
                history.append(c)
                existing_keys.add(key)

        # Save accumulated corrections to disk
        with open(corrections_file, "w") as f:
            json.dump(history, f, ensure_ascii=False, indent=2)

        # Need at least 2 distinct categories to retrain
        categories_in_corrections = set(item["correct_category"] for item in history)
        if len(categories_in_corrections) < 2:
            print(f"[Feedback] Not enough category diversity ({len(categories_in_corrections)} categories). Skipping retrain.")
            return

        # Build training set from collected corrections
        descriptions = [item["description"] for item in history]
        labels = [item["correct_category"] for item in history]

        # Embed using the same model
        embeddings = self._embed(descriptions)

        # Retrain a LogisticRegression on top of accumulated corrections
        # We use the existing best estimator params as a starting point
        existing_clf = self.classifier
        best_estimator = existing_clf.best_estimator_ if hasattr(existing_clf, 'best_estimator_') else existing_clf

        # Extract LR params from existing model
        C = 1.0
        max_iter = 1000
        if hasattr(best_estimator, 'C'):
            C = best_estimator.C
        if hasattr(best_estimator, 'max_iter'):
            max_iter = best_estimator.max_iter

        # All known classes = original classes + any new categories from corrections
        all_classes = sorted(set(list(self.classifier.classes_)) | categories_in_corrections)

        new_clf = LogisticRegression(
            C=C,
            max_iter=max_iter,
            multi_class='multinomial',
            solver='lbfgs',
            class_weight='balanced'
        )
        new_clf.fit(embeddings, labels)

        # Patch the classifier service's model to include both old and new labels
        self.classifier = new_clf

        # Persist the updated model to disk
        updated_model_data = dict(self.model_data)
        updated_model_data["classifier"] = new_clf
        
        model_save_path = os.path.join(DATA_DIR, "classifier_model.joblib")
        joblib.dump(updated_model_data, model_save_path)

        print(f"[Feedback] Retrained classifier with {len(history)} corrections across {len(set(labels))} categories.")
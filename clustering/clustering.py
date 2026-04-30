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
from sklearn.metrics import silhouette_score, calinski_harabasz_score
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

# Konfigurasi penyimpanan
DATA_DIR = os.getenv("DATA_DIR", "data")
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR, exist_ok=True)

STOPWORDS = {
    "di", "ke", "dari", "yang", "dan", "atau", "dengan", "untuk", "pada",
    "ini", "itu", "adalah", "via", "the", "a", "an", "of", "to", "in",
    "for", "at", "by", "on", "as", "is", "it", "its",
    "beli", "bayar", "pembayaran", "transfer", "biaya", "senilai", "total",
    "saldo", "tagihan", "tunai", "debit", "kredit", "online", "offline",
    "toko", "warung", "rp", "idr", "ribu", "juta", "rb", "jt",
    "bulan", "minggu", "hari", "jan", "feb", "mar", "apr", "mei", "jun",
    "jul", "agt", "sep", "okt", "nov", "des",
    "juga", "serta", "maupun", "namun", "tetapi", "tapi",
    "karena", "sebab", "oleh", "atas", "bagi", "agar", "supaya",
}

SIMILARITY_THRESHOLD = 0.75
MODEL_NAME = "intfloat/multilingual-e5-large"

CATEGORY_PATTERNS = {
    "Transportasi": [
        "transportasi_online", "bahan_bakar", "parkir_tol", "transportasi_umum",
        "bensin", "bbm", "ojek",
    ],
    "Makanan & Minuman": [
        "kafe_kopi", "restoran_fastfood", "pesan_antar_makanan",
        "makan", "minum", "restoran", "kantin", "catering",
        "food", "snack", "jajan", "kopi", "teh",
    ],
    "Belanja": [
        "minimarket_supermarket", "ecommerce_marketplace",
        "belanja", "shopping", "pasar",
    ],
    "Tagihan & Utilitas": [
        "tagihan_utilitas", "listrik", "air", "internet",
        "wifi", "pulsa", "kuota", "gas", "iuran",
    ],
    "Hiburan & Rekreasi": [
        "streaming_hiburan", "bioskop",
        "game", "hiburan", "karaoke", "gym", "olahraga",
        "liburan", "wisata", "hotel", "konser",
    ],
    "Kesehatan": [
        "apotek_kesehatan", "dokter", "obat", "medis", "kesehatan",
    ],
    "Pendidikan": [
        "kursus", "buku", "sekolah", "kampus", "pendidikan",
        "les", "bimbel", "seminar", "workshop", "pelatihan",
    ],
    "Keuangan & Investasi": [
        "bank", "dompet_digital",
        "investasi", "tabungan", "cicilan", "asuransi",
        "pinjaman", "angsuran", "saham", "deposito",
    ],
    "Rumah Tangga": [
        "rumah", "kontrakan", "kos", "sewa", "renovasi",
        "furniture", "elektronik", "peralatan",
    ],
    "Pakaian & Fashion": [
        "baju", "pakaian", "sepatu", "tas", "fashion",
        "aksesoris", "laundry",
    ],
}


class ClusteringService:
    def __init__(self, model_name: str = MODEL_NAME):
        print(f"[ClusteringService] Loading model: {model_name}")
        self.model = SentenceTransformer(model_name)
        print(f"[ClusteringService] Model loaded.")

    def _preprocess(self, text: str) -> str:
        text = text.lower().strip()
        # Transportasi
        text = re.sub(
            r'\b(gojek|go-jek|grab|uber|shopeefood|maxim|lalamove|ojol|gocar|grabbike|gofood|indriver|bluebird)\b',
            'transportasi_online', text)
        text = re.sub(r'\b(bensin|bbm|pertamax|pertalite|solar|shell|vivo|bp)\b', 'bahan_bakar', text)
        text = re.sub(r'\b(tol|toll|parkir|park)\b', 'parkir_tol', text)
        text = re.sub(r'\b(krl|kereta|mrt|lrt|transjakarta|busway|damri)\b', 'transportasi_umum', text)
        # Kafe & Kopi
        text = re.sub(
            r'\b(starbucks|janji jiwa|kenangan|kopiken|kopi tuku|fore coffee|excelso|jco|dome|anomali|kopi kenangan|djournal)\b',
            'kafe_kopi', text)
        # Restoran
        text = re.sub(
            r'\b(mcdonalds|mcd|kfc|burger king|pizza hut|dominos|subway|wendys|hokben|yoshinoya|marugame|sushi tei|sushitei|solaria)\b',
            'restoran_fastfood', text)
        text = re.sub(r'\b(gofood|grab food|shopee food)\b', 'pesan_antar_makanan', text)
        # Belanja
        text = re.sub(
            r'\b(indomaret|alfamart|alfamidi|lawson|circle k|seven eleven|711|family mart|familymart)\b',
            'minimarket_supermarket', text)
        text = re.sub(
            r'\b(hypermart|carrefour|giant|lottemart|superindo|hero|ranch market|transmart)\b',
            'minimarket_supermarket', text)
        text = re.sub(
            r'\b(shopee|tokopedia|lazada|bukalapak|blibli|zalora|orami|sociolla|sayurbox)\b',
            'ecommerce_marketplace', text)
        # Pembayaran Digital
        text = re.sub(
            r'\b(qris|ovo|dana|gopay|linkaja|shopeepay|flip|jenius|octo|blu|seabank|jago|ajaib|bibit)\b',
            'dompet_digital', text)
        # Hiburan
        text = re.sub(
            r'\b(netflix|spotify|youtube|disneyplus|hbo|prime video|vidio|iflix|viu|mola|catchplay)\b',
            'streaming_hiburan', text)
        text = re.sub(r'\b(cgv|cinepolis|cinema 21|bioskop|xxi|imax)\b', 'bioskop', text)
        # Kesehatan
        text = re.sub(
            r'\b(apotek|apotik|kimia farma|century|guardian|watson|k24|klinik|puskesmas|rsia|rsud)\b',
            'apotek_kesehatan', text)
        # Bank
        text = re.sub(
            r'\b(bca|bni|bri|mandiri|cimb|danamon|permata|btpn|btn|ocbc|hsbc|citibank|panin|maybank|bsi|bsm)\b',
            'bank', text)
        # Utilitas
        text = re.sub(
            r'\b(pln|listrik|indihome|telkom|myrepublic|biznet|iconnet|xl|axis|three|tri|smartfren|telkomsel|im3|indosat)\b',
            'tagihan_utilitas', text)
        # Bersihkan
        text = re.sub(r'\d+', '', text)
        text = re.sub(r'[^\w\s]', ' ', text)
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def run(self, transactions, existing_categories=None, k_min=3, k_max=10):
        start_time = time.time()
        descriptions = [t.description for t in transactions]
        ids = [t.id for t in transactions]

        embeddings = self._embed(descriptions)
        n_neighbors = min(15, len(transactions) - 1)
        reduced_embeddings = self._reduce_dimension(embeddings, n_components=5, n_neighbors=n_neighbors)

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

        min_for_clustering = max(k_min + 1, 5)
        if len(unmatched_indices) >= min_for_clustering:
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
        cleaned = [prefix + self._preprocess(d) for d in descriptions]
        return self.model.encode(cleaned, batch_size=16, show_progress_bar=False, normalize_embeddings=True)

    def _reduce_dimension(self, embeddings: np.ndarray, n_components: int = 5, n_neighbors: int = 15) -> np.ndarray:
        n_neighbors = max(2, min(n_neighbors, len(embeddings) - 1))
        n_components = min(n_components, len(embeddings) - 1)
        reducer = umap.UMAP(
            n_neighbors=n_neighbors, n_components=n_components,
            min_dist=0.0, metric='cosine', random_state=42, low_memory=False
        )
        return reducer.fit_transform(embeddings)

    def _find_optimal_k(self, embeddings: np.ndarray, k_min: int, k_max: int) -> tuple:
        n = len(embeddings)
        actual_k_max = min(k_max, n - 1)
        if actual_k_max < k_min:
            return k_min, {str(k_min): 0.0}

        wcss_dict, sil_dict, ch_dict = {}, {}, {}
        for k in range(k_min, actual_k_max + 1):
            km = KMeans(n_clusters=k, random_state=42, n_init=20, max_iter=500)
            labels = km.fit_predict(embeddings)
            wcss_dict[k] = float(km.inertia_)
            if len(set(labels)) > 1:
                sil_dict[k] = float(silhouette_score(embeddings, labels))
                ch_dict[k] = float(calinski_harabasz_score(embeddings, labels))
            else:
                sil_dict[k] = 0.0
                ch_dict[k] = 0.0

        max_sil = max(sil_dict.values()) or 1.0
        min_sil = min(sil_dict.values())
        max_ch = max(ch_dict.values()) or 1.0
        min_ch = min(ch_dict.values())

        combined = {}
        for k in sil_dict:
            ns = (sil_dict[k] - min_sil) / (max_sil - min_sil) if max_sil != min_sil else 1.0
            nc = (ch_dict[k] - min_ch) / (max_ch - min_ch) if max_ch != min_ch else 1.0
            combined[k] = 0.6 * ns + 0.4 * nc

        return max(combined, key=combined.get), wcss_dict

    def _kmeans(self, embeddings: np.ndarray, k: int) -> np.ndarray:
        km = KMeans(n_clusters=k, random_state=42, n_init=20, max_iter=500)
        return km.fit_predict(embeddings)

    def _silhouette(self, embeddings: np.ndarray, labels: np.ndarray) -> float:
        if len(set(labels)) < 2:
            return 0.0
        return float(silhouette_score(embeddings, labels))

    def _build_clusters(self, labels, ids, descriptions):
        clusters = []
        for lbl in sorted(set(labels)):
            indices = [i for i, l in enumerate(labels) if l == lbl]
            cluster_desc = [descriptions[i] for i in indices]
            cluster_ids = [ids[i] for i in indices]
            keywords = self._extract_keywords(cluster_desc)
            suggested_name = self._suggest_category_name(cluster_desc, keywords)
            clusters.append({
                "cluster_index": int(lbl),
                "suggested_name": suggested_name,
                "keywords": keywords,
                "transaction_ids": cluster_ids,
                "size": len(cluster_ids)
            })
        return clusters

    def _extract_keywords(self, descriptions: List[str], top_n: int = 6) -> List[str]:
        preprocessed = [self._preprocess(d) for d in descriptions]
        if len(preprocessed) < 2:
            return self._extract_keywords_simple(preprocessed, top_n)
        try:
            vectorizer = TfidfVectorizer(
                stop_words=list(STOPWORDS), max_features=200,
                ngram_range=(1, 2), min_df=1, sublinear_tf=True,
            )
            tfidf_matrix = vectorizer.fit_transform(preprocessed)
            feature_names = vectorizer.get_feature_names_out()
            mean_tfidf = np.asarray(tfidf_matrix.mean(axis=0)).flatten()
            top_indices = mean_tfidf.argsort()[-top_n:][::-1]
            keywords = [feature_names[i] for i in top_indices if mean_tfidf[i] > 0]
            return keywords if keywords else self._extract_keywords_simple(preprocessed, top_n)
        except Exception:
            return self._extract_keywords_simple(preprocessed, top_n)

    def _extract_keywords_simple(self, preprocessed_descriptions: List[str], top_n: int = 6) -> List[str]:
        words = []
        for text in preprocessed_descriptions:
            tokens = re.findall(r'\b[a-zA-Z0-9_]{3,}\b', text)
            words.extend(w for w in tokens if w not in STOPWORDS)
        return [w for w, _ in Counter(words).most_common(top_n)]

    def _suggest_category_name(self, descriptions: List[str], keywords: List[str]) -> str:
        all_preprocessed = ' '.join(self._preprocess(d) for d in descriptions)
        # Gunakan token set untuk menghindari partial match (e.g. "minum" ≠ "minuman")
        tokens = set(re.findall(r'\b[a-zA-Z0-9_]+\b', all_preprocessed))
        scores = {}
        for category, pattern_words in CATEGORY_PATTERNS.items():
            score = sum(1 for word in pattern_words if word in tokens)
            if score > 0:
                scores[category] = score
        if scores:
            return max(scores, key=scores.get)
        return ', '.join(keywords[:3]) if keywords else 'Kategori Lainnya'


class ClassifierService:
    def __init__(self, model_name: str = "classifier_model.joblib"):
        model_path = os.path.join(DATA_DIR, model_name)
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

    def predict(self, transactions, top_k: int = 3, confidence_threshold: float = 0.50) -> dict:
        if not transactions:
            return {
                "predictions": [], "duration_ms": 0,
                "review_count": 0, "model_version": self.model_name
            }
        start_time = time.time()
        descriptions = [t.description for t in transactions]
        ids = [t.id for t in transactions]

        embeddings = self._embed(descriptions)
        probs = self.classifier.predict_proba(embeddings)
        classes = self.classifier.classes_

        predictions = []
        review_count = 0

        for i in range(len(transactions)):
            # Ambil top-k kategori berdasarkan probabilitas
            top_indices = np.argsort(probs[i])[::-1][:top_k]
            best_idx = int(top_indices[0])
            best_confidence = float(probs[i][best_idx])
            is_review = best_confidence < confidence_threshold

            if is_review:
                review_count += 1

            # Alternatif (selain prediksi utama)
            alternatives = [
                {
                    "category": str(classes[int(idx)]),
                    "confidence": round(float(probs[i][int(idx)]), 4)
                }
                for idx in top_indices[1:]  # skip index 0 (prediksi utama)
            ]

            predictions.append({
                "transaction_id": ids[i],
                "description": descriptions[i],
                "predicted_category": str(classes[best_idx]),
                "confidence": round(best_confidence, 4),
                "review_required": is_review,
                "alternatives": alternatives,
            })

        return {
            "predictions": predictions,
            "duration_ms": int((time.time() - start_time) * 1000),
            "review_count": review_count,
            "model_version": self.model_name,
        }

    def train_incremental(self, corrections: list, corrections_name: str = "feedback_corrections.json"):
        from sklearn.linear_model import LogisticRegression
        corrections_file = os.path.join(DATA_DIR, corrections_name)
        if not corrections:
            return
        history = []
        if os.path.exists(corrections_file):
            try:
                with open(corrections_file, "r") as f:
                    history = json.load(f)
            except Exception:
                history = []
        existing_keys = {(item["description"], item["correct_category"]) for item in history}
        for c in corrections:
            key = (c["description"], c["correct_category"])
            if key not in existing_keys:
                history.append(c)
                existing_keys.add(key)
        with open(corrections_file, "w") as f:
            json.dump(history, f, ensure_ascii=False, indent=2)
        categories_in_corrections = set(item["correct_category"] for item in history)
        if len(categories_in_corrections) < 2:
            print(f"[Feedback] Not enough category diversity. Skipping retrain.")
            return
        descriptions = [item["description"] for item in history]
        labels = [item["correct_category"] for item in history]
        embeddings = self._embed(descriptions)
        existing_clf = self.classifier
        best_estimator = existing_clf.best_estimator_ if hasattr(existing_clf, 'best_estimator_') else existing_clf
        C = getattr(best_estimator, 'C', 1.0)
        max_iter = getattr(best_estimator, 'max_iter', 1000)
        if isinstance(max_iter, (list, tuple)):
            max_iter = max_iter[0]
        max_iter = max_iter if max_iter > 0 else 1000
        new_clf = LogisticRegression(C=C, max_iter=max_iter, multi_class='multinomial', solver='lbfgs', class_weight='balanced')
        new_clf.fit(embeddings, labels)
        self.classifier = new_clf
        updated_model_data = dict(self.model_data)
        updated_model_data["classifier"] = new_clf
        joblib.dump(updated_model_data, os.path.join(DATA_DIR, "classifier_model.joblib"))
        print(f"[Feedback] Retrained with {len(history)} corrections across {len(set(labels))} categories.")

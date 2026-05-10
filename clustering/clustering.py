import re
import time
import os
import joblib
import numpy as np
from typing import List, Optional, Sequence
from sentence_transformers import SentenceTransformer

from incremental import (
    IncrementalMemory,
    apply_memory_to_probs,
    HIGH_SIM_THRESHOLD,
    BLEND_SIM_THRESHOLD,
    BLEND_WEIGHT_MAX,
)

# Konfigurasi penyimpanan
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.getenv("DATA_DIR", os.path.join(BASE_DIR, "data"))
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR, exist_ok=True)

# Path untuk incremental memory + audit log
MEMORY_PATH = os.getenv("INCREMENTAL_MEMORY_PATH", os.path.join(DATA_DIR, "incremental_memory.npz"))
FEEDBACK_LOG_PATH = os.getenv("FEEDBACK_LOG_PATH", os.path.join(DATA_DIR, "feedback_log.jsonl"))
MAX_MEMORY_SIZE = int(os.getenv("INCREMENTAL_MAX_SIZE", "50000"))

# Threshold bisa di-override via env
MEM_HIGH = float(os.getenv("MEMORY_HIGH_THRESHOLD", str(HIGH_SIM_THRESHOLD)))
MEM_BLEND = float(os.getenv("MEMORY_BLEND_THRESHOLD", str(BLEND_SIM_THRESHOLD)))
MEM_BLEND_WEIGHT = float(os.getenv("MEMORY_BLEND_WEIGHT", str(BLEND_WEIGHT_MAX)))

# Gunakan model E5-large agar sesuai dengan notebook training user
MODEL_NAME = "intfloat/multilingual-e5-large"


class ClassifierService:
    def __init__(self, model_filename: str = "classifier_model.joblib"):
        model_path = os.path.join(DATA_DIR, model_filename)
        if not os.path.exists(model_path):
            model_path = os.path.join(BASE_DIR, model_filename)

        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file {model_filename} tidak ditemukan.")

        print(f"[Classifier] Loading model from: {model_path}")
        self.model_data = joblib.load(model_path)
        self.classifier = self.model_data["classifier"]
        self.model_name = self.model_data.get("model_name", "intfloat/multilingual-e5-large")
        self.prefix = self.model_data.get("prefix", "query")
        self.model = SentenceTransformer(self.model_name)
        # cache prediksi (desc -> np.ndarray probs dari classifier mentah)
        self.cache = {}

        # Incremental memory (exemplar-based, non-destructive)
        self.memory = IncrementalMemory(
            memory_path=MEMORY_PATH,
            log_path=FEEDBACK_LOG_PATH,
            max_size=MAX_MEMORY_SIZE,
        )
        print(f"[Classifier] Incremental memory siap. Size awal: {self.memory.size()}")

    # ---------- utils ----------

    def clean_text_classifier(self, text: str) -> str:
        if not text:
            return ""
        text = str(text).lower().strip()
        text = re.sub(r'\b\d{6,}\b', '', text)   # no. rekening, kode OTP, dsb
        text = re.sub(r'[^\w\s]', ' ', text)
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def _embed(self, descriptions: List[str]) -> np.ndarray:
        prefix = f"{self.prefix}: "
        cleaned = [prefix + self.clean_text_classifier(d) for d in descriptions]
        return self.model.encode(
            cleaned,
            batch_size=32,
            show_progress_bar=False,
            normalize_embeddings=True,
        )

    def _classes(self):
        if hasattr(self.classifier, "classes_"):
            return self.classifier.classes_
        return self.classifier.best_estimator_.classes_

    # ---------- inference ----------

    def predict(self, transactions, top_k: int = 3, confidence_threshold: float = 0.50) -> dict:
        if not transactions:
            return {
                "predictions": [],
                "duration_ms": 0,
                "review_count": 0,
                "model_version": self.model_name,
                "memory_size": self.memory.size(),
            }

        start_time = time.time()
        descriptions = [t.description for t in transactions]

        # 1) cache hanya untuk probabilitas classifier (memory di-apply fresh
        #    setiap request supaya feedback terbaru langsung kepakai).
        uncached_desc = []
        uncached_idx = []
        for i, d in enumerate(descriptions):
            if d not in self.cache:
                uncached_desc.append(d)
                uncached_idx.append(i)

        # 2) embed yang belum ada di cache. Kita perlu embedding juga untuk
        #    lookup memory, jadi embed semua yang belum di-embed.
        desc_to_emb: dict = {}
        if uncached_desc:
            embs = self._embed(uncached_desc)
            probs_batch = self.classifier.predict_proba(embs)

            if len(self.cache) > 50_000:
                self.cache.clear()

            for j, d in enumerate(uncached_desc):
                self.cache[d] = probs_batch[j]
                desc_to_emb[d] = embs[j]

        # untuk description yang probs-nya dari cache, kita tetap butuh embedding
        # buat query memory. embed lagi (murah karena cache internal E5 juga).
        missing_embed = [d for d in descriptions if d not in desc_to_emb]
        if missing_embed:
            embs2 = self._embed(missing_embed)
            for d, e in zip(missing_embed, embs2):
                desc_to_emb[d] = e

        query_embs = np.stack([desc_to_emb[d] for d in descriptions])
        raw_probs = np.stack([self.cache[d] for d in descriptions])

        # 3) lookup memory + blend
        best_sim, best_label = self.memory.lookup(query_embs)
        classes = self._classes()
        probs_all = apply_memory_to_probs(
            raw_probs, classes, best_sim, best_label,
            high_threshold=MEM_HIGH,
            blend_threshold=MEM_BLEND,
            blend_weight_max=MEM_BLEND_WEIGHT,
        )

        predictions = []
        review_count = 0
        memory_hits = 0

        for i in range(len(transactions)):
            top_indices = np.argsort(probs_all[i])[::-1][:top_k]
            best_idx = int(top_indices[0])
            best_confidence = float(probs_all[i][best_idx])
            is_review = best_confidence < confidence_threshold
            if is_review:
                review_count += 1

            from_memory = (
                best_label[i] is not None and best_sim[i] >= MEM_BLEND
            )
            if from_memory:
                memory_hits += 1

            predictions.append({
                "transaction_id": transactions[i].id,
                "description": descriptions[i],
                "predicted_category": str(classes[best_idx]),
                "confidence": round(best_confidence, 4),
                "review_required": is_review,
                "alternatives": [
                    {
                        "category": str(classes[int(idx)]),
                        "confidence": round(float(probs_all[i][int(idx)]), 4),
                    }
                    for idx in top_indices[1:]
                ],
                "memory_hit": from_memory,
                "memory_similarity": round(float(best_sim[i]), 4),
            })

        return {
            "predictions": predictions,
            "duration_ms": int((time.time() - start_time) * 1000),
            "review_count": review_count,
            "model_version": self.model_name,
            "memory_size": self.memory.size(),
            "memory_hits": memory_hits,
        }

    # ---------- incremental learning ----------

    def learn_feedback(
        self,
        descriptions: Sequence[str],
        labels: Sequence[str],
        source: str = "user",
    ) -> dict:
        """
        Ingest koreksi user ke memory. Tidak men-retrain classifier.

        - Description dibersihkan & di-embed dengan prefix yang sama seperti training.
        - Invalidasi cache agar prediksi berikutnya pakai memory terbaru.
        - Skip label yang tidak dikenal classifier (biar konsisten dengan top_k).
          Kalau ingin mengizinkan kategori baru, set env ALLOW_NEW_LABELS=1.
        """
        if len(descriptions) != len(labels):
            raise ValueError("descriptions dan labels harus sama panjangnya")

        if not descriptions:
            return {"added": 0, "updated": 0, "skipped": 0, "total": self.memory.size()}

        allow_new = os.getenv("ALLOW_NEW_LABELS", "0") == "1"
        known = set(str(c) for c in self._classes())

        raws, cleaned, kept_labels = [], [], []
        skipped = 0
        for d, l in zip(descriptions, labels):
            if d is None or l is None:
                skipped += 1
                continue
            c = self.clean_text_classifier(d)
            if not c:
                skipped += 1
                continue
            if not allow_new and str(l) not in known:
                skipped += 1
                continue
            raws.append(str(d))
            cleaned.append(c)
            kept_labels.append(str(l))

        if not cleaned:
            return {
                "added": 0,
                "updated": 0,
                "skipped": skipped,
                "total": self.memory.size(),
            }

        prefix = f"{self.prefix}: "
        embs = self.model.encode(
            [prefix + c for c in cleaned],
            batch_size=32,
            show_progress_bar=False,
            normalize_embeddings=True,
        )

        result = self.memory.add_batch(
            clean_descriptions=cleaned,
            embeddings=embs,
            labels=kept_labels,
            raw_descriptions=raws,
            source=source,
        )

        # invalidasi cache biar prediksi berikutnya langsung pakai memory baru
        for c in cleaned:
            self.cache.pop(c, None)
        # aman: pop juga untuk variasi description mentah yang pernah di-cache
        for d in raws:
            self.cache.pop(d, None)

        result["skipped"] = skipped
        return result

    def memory_stats(self) -> dict:
        return self.memory.stats()

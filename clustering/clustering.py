import re
import time
import json
import os
import joblib
import numpy as np
from typing import List, Optional
from sentence_transformers import SentenceTransformer

# Konfigurasi penyimpanan
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.getenv("DATA_DIR", os.path.join(BASE_DIR, "data"))
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR, exist_ok=True)

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
        self.cache = {}  # Cache untuk menyimpan prediksi probabilitas per deskripsi

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
        return self.model.encode(cleaned, batch_size=32, show_progress_bar=False, normalize_embeddings=True)

    def predict(self, transactions, top_k: int = 3, confidence_threshold: float = 0.50) -> dict:
        if not transactions:
            return {"predictions": [], "duration_ms": 0, "review_count": 0, "model_version": self.model_name}
        
        start_time = time.time()
        descriptions = [t.description for t in transactions]
        
        # Implementasi Caching: Hanya encode dan predict deskripsi yang belum ada di cache
        uncached_descriptions = []
        uncached_indices = []
        
        for i, d in enumerate(descriptions):
            if d not in self.cache:
                uncached_descriptions.append(d)
                uncached_indices.append(i)
                
        if uncached_descriptions:
            embeddings = self._embed(uncached_descriptions)
            probs = self.classifier.predict_proba(embeddings)
            
            # Mencegah memory leak: clear cache jika sudah terlalu besar
            if len(self.cache) > 50000:
                self.cache.clear()
                
            for j, d in enumerate(uncached_descriptions):
                self.cache[d] = probs[j]
                
        # Ambil probabilitas untuk semua transaksi dari cache
        probs_all = [self.cache[d] for d in descriptions]
        classes = self.classifier.classes_ if hasattr(self.classifier, 'classes_') else self.classifier.best_estimator_.classes_

        predictions = []
        review_count = 0

        for i in range(len(transactions)):
            top_indices = np.argsort(probs_all[i])[::-1][:top_k]
            best_idx = int(top_indices[0])
            best_confidence = float(probs_all[i][best_idx])
            is_review = best_confidence < confidence_threshold
            if is_review: review_count += 1

            predictions.append({
                "transaction_id": transactions[i].id,
                "description": descriptions[i],
                "predicted_category": str(classes[best_idx]),
                "confidence": round(best_confidence, 4),
                "review_required": is_review,
                "alternatives": [{"category": str(classes[int(idx)]), "confidence": round(float(probs_all[i][int(idx)]), 4)} for idx in top_indices[1:]],
            })

        return {
            "predictions": predictions,
            "duration_ms": int((time.time() - start_time) * 1000),
            "review_count": review_count,
            "model_version": self.model_name,
        }



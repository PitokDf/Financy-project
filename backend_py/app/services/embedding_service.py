import logging
import re

import numpy as np
from sentence_transformers import SentenceTransformer

logger = logging.getLogger(__name__)

MODEL_NAME = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"
DEFAULT_BATCH = 64

_model: SentenceTransformer | None = None
EMBEDDING_DIM: int | None = None

def get_model() -> SentenceTransformer:
    global _model
    global EMBEDDING_DIM
    if _model is None:
        logger.info(f"[Embedding] membuat model SBERT: {MODEL_NAME}")
        _model = SentenceTransformer(MODEL_NAME)
        EMBEDDING_DIM = int(_model.get_sentence_embedding_dimension())
        logger.info(f"[Embedding] Model siap. Dimensi: {EMBEDDING_DIM}")
    return _model

def preprocess(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

def embed_text(text: str) -> list[float]:
    model = get_model()
    clean = preprocess(text)
    vector = model.encode(clean, normalize_embeddings=True)
    return vector.tolist()

def embbed_text(text: str) -> list[float]:
    return embed_text(text)

def embed_transactions(
    descriptions: list[str],
    batch_size: int = DEFAULT_BATCH,
) -> np.ndarray:
    """
    Mengembalikan numpy array shape (n, dimensi_model).
    normalize_embeddings=True → cosine sim = dot product.
    """
    model = get_model()
    n = len(descriptions)
    logger.info(f"[Embedding] memproses {n} deskripsi (batch={batch_size})...")

    clean_texts = [preprocess(t) for t in descriptions]
    embeddings = model.encode(
        clean_texts,
        batch_size=batch_size,
        show_progress_bar=True,
        normalize_embeddings=True,
        convert_to_numpy=True,
    )
    logger.info(f"[Embedding] Selesai. shape: {embeddings.shape}")
    return embeddings

def cosine_similarity(a: list[float], b: list[float]) -> float:
    va, vb = np.array(a), np.array(b)
    denom = np.linalg.norm(va) * np.linalg.norm(vb)
    return float(np.dot(va, vb) / denom) if denom > 0 else 0.0

def consine_similarity(a: list[float], b: list[float]) -> float:
    return cosine_similarity(a, b)
import logging
import time
 
import numpy as np
from fastapi import APIRouter, HTTPException
 
from app.models.schemas import (
    ClusterRequest,
    ClusterResponse,
    EmbedRequest,
    EmbedResponse,
    EmbedResponseItem,
    FullPipelineRequest,
    HealthResponse,
)
from app.services.embedding_service import (
    MODEL_NAME,
    embed_transactions,
    get_model,
)
from app.services.clustering_service import run_clustering
 
router = APIRouter()
logger = logging.getLogger(__name__)
 
 
# ── GET /health ───────────────────────────────────────────────
 
@router.get("/health", response_model=HealthResponse)
def health_check():
    """Cek apakah server & model SBERT siap."""
    try:
        model_ready = get_model() is not None
    except Exception:
        model_ready = False
 
    return HealthResponse(
        status="ok" if model_ready else "model_loading",
        model_name=MODEL_NAME,
        model_ready=model_ready,
    )
 
 
# ── POST /embed ───────────────────────────────────────────────
 
@router.post("/embed", response_model=EmbedResponse)
def embed_endpoint(body: EmbedRequest):
    """
    Langkah 1 saja: ubah deskripsi transaksi → vektor SBERT.
    Digunakan jika Node.js ingin simpan embedding ke DB sendiri.
    """
    if not body.transactions:
        raise HTTPException(400, "transactions tidak boleh kosong")
 
    descriptions = [t.description for t in body.transactions]
    ids          = [t.id for t in body.transactions]
 
    try:
        embeddings_np = embed_transactions(descriptions)
    except Exception as e:
        logger.exception("[Embed] Error")
        raise HTTPException(500, str(e))
 
    result = [
        EmbedResponseItem(id=ids[i], embedding=embeddings_np[i].tolist())
        for i in range(len(ids))
    ]
 
    return EmbedResponse(
        success=True,
        embeddings=result,
        model_name=MODEL_NAME,
        dimension=int(embeddings_np.shape[1]) if embeddings_np.ndim == 2 else 0,
    )
 
 
# ── POST /cluster ─────────────────────────────────────────────
 
@router.post("/cluster", response_model=ClusterResponse)
def cluster_endpoint(body: ClusterRequest):
    """
    Langkah 2 saja: terima embedding array → jalankan K-Means.
    Digunakan jika embedding sudah tersimpan di DB Node.js.
    """
    if len(body.transaction_ids) != len(body.embeddings):
        raise HTTPException(400, "Jumlah transaction_ids dan embeddings harus sama")
 
    if len(body.transaction_ids) < 10:
        raise HTTPException(400, f"Minimal 10 transaksi. Saat ini: {len(body.transaction_ids)}")
 
    embeddings_np = np.array(body.embeddings, dtype=np.float32)
 
    # Deskripsi & amount tidak tersedia di endpoint ini
    # Gunakan ID sebagai placeholder description
    descriptions = [f"txn_{tid}" for tid in body.transaction_ids]
    amounts      = [0.0] * len(body.transaction_ids)
 
    try:
        result = run_clustering(
            transaction_ids=body.transaction_ids,
            descriptions=descriptions,
            amounts=amounts,
            embeddings=embeddings_np,
            k_min=body.k_min,
            k_max=body.k_max,
        )
    except ValueError as e:
        raise HTTPException(400, str(e))
    except Exception as e:
        logger.exception("[Cluster] Error")
        raise HTTPException(500, str(e))
 
    return result
 
 
# ── POST /pipeline ────────────────────────────────────────────
 
@router.post("/pipeline", response_model=ClusterResponse)
def pipeline_endpoint(body: FullPipelineRequest):
    """
    ONE-SHOT: Node.js kirim transaksi mentah,
    Python langsung kembalikan hasil klaster lengkap.
 
    Ini endpoint utama yang dipakai Node.js.
    """
    if not body.transactions:
        raise HTTPException(400, "transactions tidak boleh kosong")
 
    if len(body.transactions) < 10:
        raise HTTPException(
            400,
            f"Minimal 10 transaksi diperlukan. Saat ini: {len(body.transactions)}"
        )
 
    ids          = [t.id for t in body.transactions]
    descriptions = [t.description for t in body.transactions]
    amounts      = [t.amount for t in body.transactions]
 
    try:
        # ── LANGKAH 1: Embed ─────────────────────────────────
        logger.info(f"[Pipeline] Langkah 1 — Embed {len(ids)} transaksi")
        embeddings_np = embed_transactions(descriptions)
 
        # ── LANGKAH 2: Cluster ───────────────────────────────
        logger.info("[Pipeline] Langkah 2 — K-Means Clustering")
        result = run_clustering(
            transaction_ids=ids,
            descriptions=descriptions,
            amounts=amounts,
            embeddings=embeddings_np,
            k_min=body.k_min,
            k_max=body.k_max,
        )
 
    except ValueError as e:
        raise HTTPException(400, str(e))
    except Exception as e:
        logger.exception("[Pipeline] Error")
        raise HTTPException(500, str(e))
 
    return result
 
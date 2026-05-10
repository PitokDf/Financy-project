from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException

from pydantic import BaseModel, Field
from typing import List, Optional
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("ClusteringService")

from clustering import ClassifierService

classifier_service: ClassifierService = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global classifier_service
    logger.info("[ML Service] Loading models...")
    classifier_service = ClassifierService()
    logger.info("[ML Service] Models loaded successfully.")
    yield


app = FastAPI(title="Clustering Service", lifespan=lifespan)


class TransactionInput(BaseModel):
    id: str
    description: str


@app.get("/health")
def health():
    mem_stats = classifier_service.memory_stats() if classifier_service else {}
    return {"status": "ok", "memory": mem_stats}


class V2AnalyzeRequest(BaseModel):
    transactions: List[TransactionInput]
    top_k: int = 3                          # Jumlah kandidat kategori yang dikembalikan
    confidence_threshold: float = 0.50      # Di bawah ini → ditandai perlu review


class AlternativePrediction(BaseModel):
    category: str
    confidence: float


class PredictionResult(BaseModel):
    transaction_id: str
    description: str
    predicted_category: str
    confidence: float
    review_required: bool
    alternatives: List[AlternativePrediction]
    memory_hit: Optional[bool] = False
    memory_similarity: Optional[float] = 0.0


class V2AnalyzeResponse(BaseModel):
    predictions: List[PredictionResult]
    duration_ms: int
    review_count: int
    model_version: str
    memory_size: Optional[int] = 0
    memory_hits: Optional[int] = 0


@app.post("/v2/analyze", response_model=V2AnalyzeResponse)
def analyze_v2(request: V2AnalyzeRequest):
    if not request.transactions:
        raise HTTPException(status_code=400, detail="Minimal 1 transaksi diperlukan.")
    if not (1 <= request.top_k <= 10):
        raise HTTPException(status_code=400, detail="top_k harus antara 1 dan 10.")
    if not (0.0 <= request.confidence_threshold <= 1.0):
        raise HTTPException(status_code=400, detail="confidence_threshold harus antara 0.0 dan 1.0.")

    logger.info(f"Analyzing {len(request.transactions)} transactions.")

    result = classifier_service.predict(
        request.transactions,
        top_k=request.top_k,
        confidence_threshold=request.confidence_threshold
    )

    logger.info(
        f"Done in {result['duration_ms']}ms. review={result['review_count']} "
        f"memory_hits={result.get('memory_hits', 0)}/{len(request.transactions)}"
    )
    return result


# ---------- Incremental learning endpoints ----------


class FeedbackItem(BaseModel):
    description: str = Field(..., min_length=1, max_length=1000)
    category: str = Field(..., min_length=1, max_length=200)


class FeedbackRequest(BaseModel):
    items: List[FeedbackItem]
    source: str = Field("user", max_length=64)


class FeedbackResponse(BaseModel):
    added: int
    updated: int
    skipped: int
    total: int


@app.post("/v2/feedback", response_model=FeedbackResponse)
def submit_feedback(request: FeedbackRequest):
    """
    Kirim koreksi user (description -> kategori benar) untuk dipelajari secara
    inkremental. Tidak men-retrain classifier dasar; hanya menambah exemplar
    memory yang di-blend saat inferensi.
    """
    if not request.items:
        raise HTTPException(status_code=400, detail="Minimal 1 feedback diperlukan.")
    if len(request.items) > 5000:
        raise HTTPException(status_code=400, detail="Batch feedback maksimum 5000 item.")

    descs = [it.description for it in request.items]
    labels = [it.category for it in request.items]

    try:
        result = classifier_service.learn_feedback(descs, labels, source=request.source)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    logger.info(
        f"Feedback ingested: added={result['added']} updated={result['updated']} "
        f"skipped={result['skipped']} total={result['total']} source={request.source}"
    )
    return result


@app.get("/v2/memory/stats")
def memory_stats():
    return classifier_service.memory_stats()

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
    return {"status": "ok"}


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
    model_config = {"protected_namespaces": ()}

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

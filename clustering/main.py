from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import List, Optional
import time

from clustering import ClusteringService, ClassifierService

clustering_service: ClusteringService = None
classifier_service: ClassifierService = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global clustering_service, classifier_service
    print("[ML Service] Loading Clustering model (Multilingual-E5-Large)...")
    clustering_service = ClusteringService()
    print("Loading Classifier model...")
    classifier_service = ClassifierService()
    print("Models loaded.")
    yield

app = FastAPI(title="Clustering Service", lifespan=lifespan)


class TransactionInput(BaseModel):
    id: str
    description: str


class ExistingCategoryInput(BaseModel):
    id: str
    name: str
    keywords: Optional[List[str]] = []


class AnalyzeRequest(BaseModel):
    transactions: List[TransactionInput]
    existing_categories: Optional[List[ExistingCategoryInput]] = []
    k_min: int = 4
    k_max: int = 12


class ClusterResult(BaseModel):
    cluster_index: int
    suggested_name: str
    keywords: List[str]
    transaction_ids: List[str]
    size: int


class PreAssignedResult(BaseModel):
    transaction_id: str
    category_id: str
    category_name: str
    similarity: float


class AnalyzeResponse(BaseModel):
    k_optimal: int
    silhouette_score: float
    wcss_values: dict
    clusters: List[ClusterResult]
    pre_assigned: List[PreAssignedResult]
    duration_ms: int


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analyze", response_model=AnalyzeResponse)
def analyze(request: AnalyzeRequest):
    if len(request.transactions) < 10:
        raise HTTPException(status_code=400, detail="Minimal 10 transaksi diperlukan.")

    existing_categories = [cat.model_dump() for cat in (request.existing_categories or [])]

    result = clustering_service.run(
        request.transactions,
        existing_categories=existing_categories,
        k_min=request.k_min,
        k_max=request.k_max
    )
    return result


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
    review_required: bool                   # True jika confidence < threshold
    alternatives: List[AlternativePrediction]  # Top-k kandidat lainnya


class V2AnalyzeResponse(BaseModel):
    predictions: List[PredictionResult]
    duration_ms: int
    review_count: int                       # Jumlah transaksi yang perlu review
    model_version: str


@app.post("/v2/analyze", response_model=V2AnalyzeResponse)
def analyze_v2(request: V2AnalyzeRequest):
    if not request.transactions:
        raise HTTPException(status_code=400, detail="Minimal 1 transaksi diperlukan.")
    if not (1 <= request.top_k <= 10):
        raise HTTPException(status_code=400, detail="top_k harus antara 1 dan 10.")
    if not (0.0 <= request.confidence_threshold <= 1.0):
        raise HTTPException(status_code=400, detail="confidence_threshold harus antara 0.0 dan 1.0.")

    result = classifier_service.predict(
        request.transactions,
        top_k=request.top_k,
        confidence_threshold=request.confidence_threshold
    )
    return result


class FeedbackItem(BaseModel):
    description: str
    correct_category: str


class FeedbackRequest(BaseModel):
    corrections: List[FeedbackItem]


class FeedbackResponse(BaseModel):
    received: int
    status: str


@app.post("/v2/feedback", response_model=FeedbackResponse)
async def feedback_v2(request: FeedbackRequest, background_tasks: BackgroundTasks):
    """
    Menerima koreksi dari user dan memicu incremental retraining di background.
    Response langsung dikembalikan (fire-and-forget).
    """
    if not request.corrections:
        return {"received": 0, "status": "skipped"}

    corrections = [
        {"description": item.description, "correct_category": item.correct_category}
        for item in request.corrections
    ]

    # FastAPI BackgroundTasks — proper way, tidak blocking
    background_tasks.add_task(classifier_service.train_incremental, corrections)

    return {"received": len(corrections), "status": "queued"}
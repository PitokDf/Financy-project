from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import time

from clustering import ClusteringService, ClassifierService

clustering_service: ClusteringService = None
classifier_service: ClassifierService = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global clustering_service, classifier_service
    print("Loading SBERT model...")
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


class PredictionResult(BaseModel):
    transaction_id: str
    description: str
    predicted_category: str
    confidence: float


class V2AnalyzeResponse(BaseModel):
    predictions: List[PredictionResult]
    duration_ms: int


@app.post("/v2/analyze", response_model=V2AnalyzeResponse)
def analyze_v2(request: V2AnalyzeRequest):
    if len(request.transactions) < 1:
        raise HTTPException(status_code=400, detail="Minimal 1 transaksi diperlukan.")

    result = classifier_service.predict(request.transactions)
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
async def feedback_v2(request: FeedbackRequest):
    """
    Receives user corrections and triggers incremental model retraining in the background.
    This is fire-and-forget from the caller's perspective.
    """
    if not request.corrections:
        return {"received": 0, "status": "skipped"}

    corrections = [{"description": item.description, "correct_category": item.correct_category} for item in request.corrections]

    # Run in background thread so we don't block the response
    import asyncio
    loop = asyncio.get_event_loop()
    loop.run_in_executor(None, classifier_service.train_incremental, corrections)

    return {"received": len(corrections), "status": "queued"}
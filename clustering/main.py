from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import time

from clustering import ClusteringService


clustering_service: ClusteringService = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global clustering_service
    print("Loading SBERT model...")
    clustering_service = ClusteringService()
    print("Model loaded.")
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
    k_min: int = 2
    k_max: int = 10


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


# ---------- Endpoints ----------

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analyze", response_model=AnalyzeResponse)
def analyze(request: AnalyzeRequest):
    if len(request.transactions) < 10:
        raise HTTPException(status_code=400, detail="Minimal 10 transaksi diperlukan.")

    # Convert pydantic models to dicts for the service
    existing_categories = [cat.model_dump() for cat in (request.existing_categories or [])]

    start = time.time()
    result = clustering_service.run(
        request.transactions,
        existing_categories=existing_categories,
        # method='',
        k_min=request.k_min,
        k_max=request.k_max
    )
    result["duration_ms"] = int((time.time() - start) * 1000)
    return result
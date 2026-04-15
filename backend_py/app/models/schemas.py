
from datetime import datetime
from pydantic import BaseModel, Field
from typing import Literal, Optional
from enum import Enum


# ── Enum ─────────────────────────────────────────────────────

class ConfidenceLevel(str, Enum):
    HIGH   = "HIGH"
    MEDIUM = "MEDIUM"
    LOW    = "LOW"


# ── Request Schemas ──────────────────────────────────────────

class TransactionItem(BaseModel):
    id:          str
    description: str
    amount:      float
    date:        str  # ISO format: "2025-03-01T08:15:00Z"

class EmbedRequest(BaseModel):
    transactions: list[TransactionItem]

class ClusterRequest(BaseModel):
    """
    Diterima dari Node.js setelah embedding.
    embeddings adalah list of [id, vector].
    """
    transaction_ids: list[str]
    embeddings:      list[list[float]]   # shape: [n_transactions, 384]
    k_min:           int = Field(default=2, ge=2)
    k_max:           int = Field(default=8, ge=2)

class FullPipelineRequest(BaseModel):
    """
    One-shot: kirim transaksi mentah, terima klaster langsung.
    Node.js cukup satu kali call.
    """
    transactions: list[TransactionItem]
    k_min:        int = Field(default=2, ge=2)
    k_max:        int = Field(default=8, ge=2)


# ── Response Schemas ─────────────────────────────────────────

class EmbedResponseItem(BaseModel):
    id:        str
    embedding: list[float]

class EmbedResponse(BaseModel):
    success:     bool
    embeddings:  list[EmbedResponseItem]
    model_name:  str
    dimension:   int

class ElbowPoint(BaseModel):
    k:    int
    wcss: float

class ClusterMemberItem(BaseModel):
    transaction_id:       str
    description:          str
    amount:               float
    distance_to_centroid: float

class ClusterItem(BaseModel):
    index:                       int
    size:                        int
    total_amount:                float
    centroid:                    list[float]
    representative_descriptions: list[str]
    members:                     list[ClusterMemberItem]

class ClusterResponse(BaseModel):
    success:          bool
    k_optimal:        int
    silhouette_score: float
    elbow_data:       list[ElbowPoint]
    clusters:         list[ClusterItem]
    duration_ms:      int

class HealthResponse(BaseModel):
    status:     str
    model_name: str
    model_ready: bool


class RecommendItem(BaseModel):
    category_id: str
    score: float


class RecommendCategoryRequest(BaseModel):
    transaction_id: str
    user_id: str
    description: str
    amount: float
    date: datetime
    model_variant: Literal["A", "B"] = "A"


class RecommendCategoryResponse(BaseModel):
    success: bool
    model_variant: str
    suggestions: list[RecommendItem]
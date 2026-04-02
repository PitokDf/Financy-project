import logging

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.ml_routes import router
from app.services.embedding_service import get_model

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s — %(message)s",
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("🚀 FinTrack ML Service starting...")
    get_model()   # pre-load SBERT ke memory
    logger.info("✅ Model SBERT siap.")
    yield
    logger.info("🛑 ML Service shutting down.")

app = FastAPI(
    title="FinTrack ML Service",
    description="SBERT + K-Means pipeline untuk analisis pola pengeluaran",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL Node.js backend
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api/ml", tags=["ML Pipeline"])
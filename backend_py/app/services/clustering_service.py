import logging
import time
from typing import List

import numpy as np
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from pydantic import BaseModel, model_validator
import umap

from app.services.embedding_service import embed_transactions

# ============================================================
# SKEMA DATA
# ============================================================
class ElbowPoint(BaseModel):
    k: int
    wcss: float


class ClusterMemberItem(BaseModel):
    transaction_id: str
    description: str
    amount: float
    cosine_similarity: float
    distance_to_centroid: float = 0.0

    @model_validator(mode="after")
    def _fill_distance(self) -> "ClusterMemberItem":
        self.distance_to_centroid = round(1.0 - self.cosine_similarity, 6)
        return self


class ClusterItem(BaseModel):
    index: int
    size: int
    total_amount: float
    centroid: List[float]
    representative_descriptions: List[str]
    members: List[ClusterMemberItem]


class ClusterResponse(BaseModel):
    success: bool
    k_optimal: int
    silhouette_score: float
    elbow_data: List[ElbowPoint]
    clusters: List[ClusterItem]
    duration_ms: int


# ============================================================
# KONFIGURASI
# ============================================================
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

N_INIT = 10
MAX_ITER = 300
RANDOM_STATE = 42
COSINE_SIM_THRESHOLD = 0.35

# UMAP: reduce ke 30 dimensi sebelum clustering
# n_neighbors: ukuran local neighborhood, 15 bagus untuk data kecil-menengah
# min_dist=0.0: titik-titik dalam cluster didorong sedekat mungkin
UMAP_N_COMPONENTS = 30
UMAP_N_NEIGHBORS = 15


def _reduce_dimensions(embeddings: np.ndarray) -> np.ndarray:
    """
    Kurangi dimensi SBERT (384) → UMAP (~30) sebelum clustering.
    Ini adalah fix utama untuk silhouette score rendah di high-dimensional space.
    """
    n = len(embeddings)
    # n_neighbors tidak boleh >= jumlah sample
    n_neighbors = min(UMAP_N_NEIGHBORS, n - 1)
    n_components = min(UMAP_N_COMPONENTS, n - 1)

    logger.info(f"[UMAP] Reducing {embeddings.shape[1]}D → {n_components}D (n_neighbors={n_neighbors})")
    reducer = umap.UMAP(
        n_components=n_components,
        n_neighbors=n_neighbors,
        min_dist=0.0,
        metric="cosine",
        random_state=RANDOM_STATE,
    )
    reduced = reducer.fit_transform(embeddings)
    logger.info(f"[UMAP] Done. Shape: {reduced.shape}")
    return reduced

# ============================================================
# IMPROVEMENT 1: Description Enrichment
# Expand deskripsi pendek menjadi kalimat kontekstual
# agar SBERT bisa menghasilkan embedding yang lebih bermakna
# ============================================================
_KEYWORD_CONTEXT: dict[str, str] = {
    # Makanan & minuman
    "makan":      "makan makanan di restoran warung makan siang malam",
    "sarapan":    "sarapan makan pagi makanan breakfast",
    "siang":      "makan siang makanan di warung",
    "malam":      "makan malam makanan dinner restoran",
    "pagi":       "sarapan makan pagi makanan",
    "nasi":       "makan nasi makanan warung makan",
    "bakso":      "makan bakso makanan warung",
    "soto":       "makan soto makanan warung makan",
    "ayam":       "makan ayam makanan restoran",
    "pecel":      "makan pecel lele makanan warteg",
    "warteg":     "makan di warteg warung makan",
    "padang":     "makan nasi padang warung padang makanan",
    "mie":        "makan mie makanan warung mie ayam",
    "bubur":      "sarapan bubur ayam makanan pagi",
    "roti":       "sarapan roti makanan pagi breakfast",
    "pizza":      "makan pizza restoran fastfood makanan",
    "burger":     "makan burger fastfood makanan",
    "lunch":      "makan siang lunch makanan",
    "dinner":     "makan malam dinner makanan restoran",
    "breakfast":  "sarapan breakfast makanan pagi",
    "food":       "makan makanan restoran",
    "meal":       "makan makanan restoran",
    "rice":       "makan nasi makanan",
    "noodle":     "makan mie makanan",

    # Kopi & minuman
    "kopi":       "minum kopi minuman kafe coffee shop",
    "ngopi":      "minum kopi nongkrong di kafe coffee",
    "coffee":     "minum kopi minuman coffee shop kafe",
    "starbucks":  "minum kopi starbucks coffee shop minuman",
    "kenangan":   "minum kopi kenangan coffee shop minuman",
    "jiwa":       "minum kopi janji jiwa coffee shop",
    "cappuccino": "minum kopi cappuccino coffee shop minuman",
    "latte":      "minum kopi latte coffee shop minuman",
    "espresso":   "minum kopi espresso coffee shop",
    "teh":        "minum teh minuman warung kafe",
    "jus":        "minum jus buah minuman",
    "boba":       "minum boba minuman kekinian milk tea",
    "milktea":    "minum milk tea boba minuman kekinian",

    # Transportasi
    "bensin":     "isi bensin bahan bakar motor kendaraan transportasi",
    "bbm":        "isi bahan bakar bensin motor kendaraan",
    "solar":      "isi solar bahan bakar kendaraan",
    "pertalite":  "isi bensin pertalite bahan bakar motor",
    "pertamax":   "isi bensin pertamax bahan bakar motor",
    "gojek":      "naik gojek ojek online transportasi",
    "grab":       "naik grab ojek online transportasi",
    "ojek":       "naik ojek transportasi motor",
    "taksi":      "naik taksi transportasi mobil",
    "taxi":       "naik taxi transportasi mobil",
    "bus":        "naik bus transportasi umum",
    "kereta":     "naik kereta transportasi umum",
    "krl":        "naik krl kereta transportasi umum",
    "mrt":        "naik mrt transportasi umum",
    "tol":        "bayar tol jalan tol kendaraan",
    "parkir":     "bayar parkir kendaraan motor",
    "fuel":       "isi bensin bahan bakar kendaraan transportasi",
    "petrol":     "isi bensin bahan bakar motor kendaraan",
    "gas":        "isi bensin bahan bakar kendaraan",
    "ride":       "naik ojek online transportasi",
    "motorbike":  "kendaraan motor transportasi",

    # Belanja & kebutuhan
    "belanja":    "belanja kebutuhan bahan makanan toko supermarket",
    "pasar":      "belanja di pasar tradisional kebutuhan bahan makanan",
    "supermarket":"belanja supermarket kebutuhan rumah tangga",
    "indomaret":  "belanja di indomaret minimarket kebutuhan",
    "alfamart":   "belanja di alfamart minimarket kebutuhan",
    "shopee":     "belanja online shopee ecommerce kebutuhan",
    "tokopedia":  "belanja online tokopedia ecommerce kebutuhan",
    "sayur":      "belanja sayuran bahan makanan pasar",
    "buah":       "belanja buah bahan makanan pasar",
    "sembako":    "belanja sembako kebutuhan pokok bahan makanan",
    "baju":       "belanja pakaian fashion baju toko",
    "sepatu":     "belanja sepatu alas kaki fashion toko",
    "grocery":    "belanja kebutuhan bahan makanan supermarket",
    "groceries":  "belanja kebutuhan bahan makanan supermarket",
    "shopping":   "belanja kebutuhan toko supermarket",
    "market":     "belanja di pasar market kebutuhan bahan makanan",
    "clothes":    "belanja pakaian baju fashion",

    # Tagihan & utilitas
    "listrik":    "bayar tagihan listrik PLN utilitas rumah",
    "pln":        "bayar tagihan listrik PLN utilitas",
    "token":      "beli token listrik PLN utilitas",
    "air":        "bayar tagihan air PDAM utilitas rumah",
    "pdam":       "bayar tagihan air PDAM utilitas",
    "internet":   "bayar tagihan internet wifi bulanan utilitas",
    "indihome":   "bayar internet indihome wifi bulanan",
    "wifi":       "bayar tagihan wifi internet bulanan",
    "pulsa":      "beli pulsa telepon komunikasi",
    "kuota":      "beli kuota internet data seluler",
    "telepon":    "bayar tagihan telepon komunikasi",
    "tv":         "bayar langganan tv kabel streaming",
    "netflix":    "bayar langganan netflix streaming hiburan",
    "spotify":    "bayar langganan spotify musik streaming",
    "icloud":     "bayar langganan icloud penyimpanan",
    "kos":        "bayar kos tempat tinggal sewa bulanan",
    "sewa":       "bayar sewa tempat tinggal kontrakan",
    "kontrakan":  "bayar kontrakan sewa tempat tinggal",
    "rent":       "bayar sewa tempat tinggal bulanan",
    "electricity":"bayar tagihan listrik utilitas rumah",
    "water":      "bayar tagihan air utilitas rumah",
    "bill":       "bayar tagihan utilitas bulanan",
    "subscription":"bayar langganan layanan bulanan",

    # Kesehatan
    "dokter":     "berobat ke dokter kesehatan medis",
    "obat":       "beli obat apotek kesehatan",
    "apotek":     "beli obat di apotek kesehatan",
    "klinik":     "berobat ke klinik kesehatan medis",
    "rs":         "berobat ke rumah sakit kesehatan",
    "bpjs":       "bayar iuran bpjs asuransi kesehatan",
    "vitamin":    "beli vitamin suplemen kesehatan",
    "gym":        "bayar gym olahraga kebugaran",
    "fitness":    "bayar fitness gym olahraga kebugaran",

    # Servis & perawatan
    "servis":     "servis perawatan motor kendaraan bengkel",
    "bengkel":    "servis motor di bengkel perawatan kendaraan",
    "cuci":       "cuci motor kendaraan perawatan",
    "oli":        "ganti oli motor servis kendaraan bengkel",
    "tambal":     "tambal ban motor kendaraan bengkel",
    "service":    "servis perawatan kendaraan bengkel",

    # Hiburan
    "bioskop":    "nonton bioskop film hiburan",
    "nonton":     "nonton film hiburan bioskop",
    "game":       "beli game hiburan gaming",
    "karaoke":    "karaoke hiburan rekreasi",
    "liburan":    "liburan rekreasi wisata perjalanan",
    "hotel":      "menginap hotel perjalanan wisata",
    "tiket":      "beli tiket perjalanan wisata transportasi",

    # Pendidikan
    "buku":       "beli buku pendidikan bacaan",
    "kursus":     "bayar kursus pendidikan belajar",
    "kampus":     "kebutuhan kampus pendidikan kuliah",
    "kuliah":     "kebutuhan kuliah pendidikan kampus",

    # Pemasukan
    "gaji":       "terima gaji pendapatan pekerjaan bulanan",
    "salary":     "terima gaji salary pendapatan pekerjaan",
    "freelance":  "pendapatan freelance pekerjaan sampingan",
    "transfer":   "transfer uang kiriman",
    "payment":    "pembayaran terima uang",
}

def _enrich_description(description: str, amount: float) -> str:
    """
    Expand deskripsi pendek menjadi kalimat kontekstual.
    Strategi:
    1. Cari keyword dari kamus → tambahkan konteks
    2. Tambahkan amount context (kecil/sedang/besar)
    3. Jika tidak ada keyword cocok, gunakan template minimal
    """
    desc_lower = description.lower().strip()
    tokens = desc_lower.split()

    # Kumpulkan konteks dari keyword yang cocok
    found_contexts: list[str] = []
    for token in tokens:
        # exact match
        if token in _KEYWORD_CONTEXT:
            found_contexts.append(_KEYWORD_CONTEXT[token])
        else:
            # partial match (substring)
            for key, ctx in _KEYWORD_CONTEXT.items():
                if key in token or token in key:
                    found_contexts.append(ctx)
                    break

    # Deduplicate konteks
    seen: set[str] = set()
    unique_contexts: list[str] = []
    for ctx in found_contexts:
        if ctx not in seen:
            seen.add(ctx)
            unique_contexts.append(ctx)

    # Amount context
    if amount < 20_000:
        amount_ctx = "pengeluaran kecil murah"
    elif amount < 100_000:
        amount_ctx = "pengeluaran sedang"
    elif amount < 500_000:
        amount_ctx = "pengeluaran besar"
    else:
        amount_ctx = "pengeluaran sangat besar tagihan rutin"

    if unique_contexts:
        enriched = f"{description}. {' '.join(unique_contexts[:2])}. {amount_ctx}."
    else:
        # Fallback: minimal template
        enriched = f"transaksi pengeluaran untuk {description}. {amount_ctx}."

    return enriched


# ============================================================
# HELPER
# ============================================================
def _normalize(v: np.ndarray) -> np.ndarray:
    norm = np.linalg.norm(v)
    return v / norm if norm > 1e-8 else v


def _cosine_sim_to_centroid(embedding: np.ndarray, centroid: np.ndarray) -> float:
    centroid_norm = _normalize(centroid)
    return float(np.dot(embedding, centroid_norm))


def recommend_top3(description: str, centroids: np.ndarray, category_ids: list[str]) -> list[dict]:
    query_vec = embed_transactions([description])[0]
    centroids_norm = np.array([_normalize(c) for c in centroids])
    sims = centroids_norm @ query_vec
    top_idx = np.argsort(sims)[::-1][:3]
    return [{"category_id": category_ids[i], "score": float(sims[i])} for i in top_idx]


# ============================================================
# ELBOW
# ============================================================
def compute_elbow(embeddings: np.ndarray, k_min: int, k_max: int) -> List[ElbowPoint]:
    k_max = min(k_max, len(embeddings) - 1)
    elbow_data: List[ElbowPoint] = []
    logger.info(f"[Elbow] Menghitung WCSS: K={k_min}..{k_max}")
    for k in range(k_min, k_max + 1):
        km = KMeans(n_clusters=k, init="k-means++", n_init=N_INIT, max_iter=MAX_ITER, random_state=RANDOM_STATE)
        km.fit(embeddings)
        elbow_data.append(ElbowPoint(k=k, wcss=float(km.inertia_)))
    return elbow_data


# ============================================================
# K OPTIMAL
# ============================================================
def find_optimal_k_silhouette(embeddings: np.ndarray, k_min: int, k_max: int) -> int:
    n = len(embeddings)
    k_limit = max(k_min, min(int(n / 4), 15))
    k_max = min(k_max, k_limit, n - 1)
    k_min = max(2, k_min)

    if k_max <= k_min:
        return k_min

    scores: list[tuple[int, float]] = []
    logger.info(f"[Silhouette] Mencari K optimal: K={k_min}..{k_max}")

    for k in range(k_min, k_max + 1):
        km = KMeans(n_clusters=k, init="k-means++", n_init=N_INIT, max_iter=MAX_ITER, random_state=RANDOM_STATE)
        labels = km.fit_predict(embeddings)
        score = silhouette_score(embeddings, labels, metric="cosine", random_state=RANDOM_STATE)
        scores.append((k, score))
        logger.info(f"[Silhouette] K={k} → Score={score:.4f}")

    raw_scores = [s for _, s in scores]
    score_range = max(raw_scores) - min(raw_scores)
    n_steps = max(1, k_max - k_min)
    penalty_per_k = (score_range * 0.1) / n_steps

    best_k, best_adjusted = k_min, -np.inf
    for k, score in scores:
        adjusted = score - (k - k_min) * penalty_per_k
        logger.info(f"[Silhouette] K={k} adjusted={adjusted:.4f}")
        if adjusted > best_adjusted:
            best_adjusted = adjusted
            best_k = k

    logger.info(f"[Silhouette] K optimal: {best_k}")
    return best_k


# ============================================================
# MAIN PIPELINE
# ============================================================
def run_clustering(
    transaction_ids: List[str],
    descriptions: List[str],
    amounts: List[float],
    embeddings: np.ndarray | None = None,
    k_min: int = 3,
    k_max: int = 10,
    cosine_sim_threshold: float = COSINE_SIM_THRESHOLD,
) -> ClusterResponse:
    start = time.time()
    n = len(transaction_ids)
    logger.info(f"[Clustering] Mulai. {n} transaksi, K={k_min}..{k_max}")

    if n < 50:
        raise ValueError(f"Minimal 50 transaksi diperlukan. Saat ini: {n}")

    # IMPROVEMENT 1: Enrich descriptions sebelum embedding
    if embeddings is None:
        enriched_descriptions = [
            _enrich_description(desc, amt)
            for desc, amt in zip(descriptions, amounts)
        ]
        logger.info(f"[Clustering] Contoh enriched: '{descriptions[0]}' → '{enriched_descriptions[0]}'")
        embeddings = embed_transactions(enriched_descriptions, amounts=amounts)

    # Normalisasi
    norms = np.linalg.norm(embeddings, axis=1, keepdims=True)
    embeddings = embeddings / np.where(norms > 1e-8, norms, 1.0)

    # IMPROVEMENT 2: Dimensionality reduction sebelum clustering
    embeddings_reduced = _reduce_dimensions(embeddings)

    elbow_data = compute_elbow(embeddings_reduced, k_min, k_max)
    k_optimal = find_optimal_k_silhouette(embeddings_reduced, k_min, k_max)

    logger.info(f"[Clustering] K-Means final K={k_optimal}...")
    km_final = KMeans(
        n_clusters=k_optimal, init="k-means++",
        n_init=N_INIT, max_iter=MAX_ITER, random_state=RANDOM_STATE,
    )
    km_final.fit(embeddings_reduced)

    labels = km_final.labels_
    centroids = km_final.cluster_centers_

    sil_score = float(silhouette_score(embeddings_reduced, labels, metric="cosine", random_state=RANDOM_STATE))
    logger.info(f"[Clustering] Final Silhouette Score: {sil_score:.4f}")

    clusters: List[ClusterItem] = []
    uncategorized_members: List[ClusterMemberItem] = []

    for idx in range(k_optimal):
        indices = np.where(labels == idx)[0]
        if len(indices) == 0:
            continue

        centroid = centroids[idx]
        members: List[ClusterMemberItem] = []
        total_amount = 0.0

        for i in indices:
            cos_sim = _cosine_sim_to_centroid(embeddings_reduced[i], centroid)
            member_item = ClusterMemberItem(
                transaction_id=transaction_ids[i],
                description=descriptions[i],  # tetap pakai deskripsi asli
                amount=amounts[i],
                cosine_similarity=cos_sim,
            )

            if cos_sim < cosine_sim_threshold:
                uncategorized_members.append(member_item)
            else:
                members.append(member_item)
                total_amount += amounts[i]

        if not members:
            continue

        members.sort(key=lambda m: m.cosine_similarity, reverse=True)
        rep_descs = [m.description for m in members[:3]]

        clusters.append(ClusterItem(
            index=idx,
            size=len(members),
            total_amount=total_amount,
            centroid=_normalize(centroid).tolist(),
            representative_descriptions=rep_descs,
            members=members,
        ))

    if uncategorized_members:
        uncategorized_amount = sum(m.amount for m in uncategorized_members)
        uncategorized_members.sort(key=lambda m: m.cosine_similarity)
        clusters.append(ClusterItem(
            index=-1,
            size=len(uncategorized_members),
            total_amount=uncategorized_amount,
            centroid=[],
            representative_descriptions=["Lain-lain / Uncategorized"],
            members=uncategorized_members,
        ))

    clusters.sort(key=lambda c: c.total_amount if c.index != -1 else -1, reverse=True)

    new_idx = 0
    for cluster in clusters:
        if cluster.index != -1:
            cluster.index = new_idx
            new_idx += 1

    duration_ms = int((time.time() - start) * 1000)
    logger.info(f"[Clustering] Selesai dalam {duration_ms}ms")

    return ClusterResponse(
        success=True,
        k_optimal=k_optimal,
        silhouette_score=sil_score,
        elbow_data=elbow_data,
        clusters=clusters,
        duration_ms=duration_ms,
    )
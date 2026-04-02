import logging
import time
from typing import List

import numpy as np
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from pydantic import BaseModel

# ============================================================
# SKEMA DATA (Pydantic Models)
# ============================================================
class ElbowPoint(BaseModel):
    k: int
    wcss: float

class ClusterMemberItem(BaseModel):
    transaction_id: str
    description: str
    amount: float
    distance_to_centroid: float

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
# KONFIGURASI DAN LOGGING
# ============================================================
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Konfigurasi KMeans
N_INIT = 10
MAX_ITER = 300
RANDOM_STATE = 42

# ============================================================
# MODUL 2: FUNGSI-FUNGSI EVALUASI CLUSTERING
# ============================================================
def compute_elbow(embeddings: np.ndarray, k_min: int, k_max: int) -> List[ElbowPoint]:
    """Menghitung nilai WCSS (Inertia) untuk setiap K (hanya untuk data visual, tidak dipakai mencari K)."""
    k_max = min(k_max, len(embeddings) - 1)
    elbow_data: List[ElbowPoint] = []
 
    logger.info(f"[Elbow] Menghitung WCSS: K={k_min}..{k_max}")
 
    for k in range(k_min, k_max + 1):
        km = KMeans(n_clusters=k, init="k-means++", n_init=N_INIT, max_iter=MAX_ITER, random_state=RANDOM_STATE)
        km.fit(embeddings)
        elbow_data.append(ElbowPoint(k=k, wcss=float(km.inertia_)))
 
    return elbow_data

def find_optimal_k_silhouette(embeddings: np.ndarray, k_min: int, k_max: int) -> int:
    """Mencari K terbaik berdasarkan nilai Silhouette Score tertinggi."""
    k_max = min(k_max, len(embeddings) - 1)
    best_k = k_min
    best_score = -1.0
    
    logger.info(f"[Silhouette] Mencari K optimal: K={k_min}..{k_max}")
    
    for k in range(k_min, k_max + 1):
        km = KMeans(n_clusters=k, init="k-means++", n_init=N_INIT, max_iter=MAX_ITER, random_state=RANDOM_STATE)
        labels = km.fit_predict(embeddings)
        
        # Euclidean dipakai di sini karena embeddings sudah di-normalize,
        # sehingga Euclidean proporsional dengan Cosine Distance.
        score = silhouette_score(embeddings, labels, metric="euclidean", random_state=RANDOM_STATE)
        logger.info(f"[Silhouette] K={k} → Score={score:.4f}")
        
        if score > best_score:
            best_score = score
            best_k = k
            
    logger.info(f"[Silhouette] K optimal ditemukan: {best_k} (Score: {best_score:.4f})")
    return best_k

# ============================================================
# MODUL 3: MAIN PIPELINE CLUSTERING
# ============================================================
def run_clustering(
    transaction_ids: List[str],
    descriptions: List[str],
    amounts: List[float],
    embeddings: np.ndarray,
    k_min: int = 4, # Dinaikkan menjadi 4 agar tidak terlalu sedikit klaster
    k_max: int = 10, # Dinaikkan menjadi 10 agar algoritma punya ruang eksplorasi
    distance_threshold: float = 0.70 # TAMBAHAN: Batas jarak untuk anomali
) -> ClusterResponse:
    start = time.time()
    n = len(transaction_ids)
 
    logger.info(f"[Clustering] Mulai. {n} transaksi, K={k_min}..{k_max}")
    
    if n < 10:
        raise ValueError(f"Minimal 10 transaksi. Saat ini: {n}")
        
    # [PERBAIKAN 1]: PCA DIHAPUS. Kita gunakan full 384 dimensi dari SBERT.
    
    # ── LANGKAH A: Cari K Optimal dengan Silhouette Score ──
    # [PERBAIKAN 2]: Ganti fungsi pencarian K dari kurva WCSS ke Silhouette Score
    elbow_data = compute_elbow(embeddings, k_min, k_max) # Disimpan untuk response frontend
    k_optimal = find_optimal_k_silhouette(embeddings, k_min, k_max)
 
    # ── LANGKAH B: K-Means final dengan K optimal ────────────
    logger.info(f"[Clustering] Menjalankan K-Means final dengan K={k_optimal}...")
    km_final = KMeans(
        n_clusters=k_optimal,
        init="k-means++",
        n_init=N_INIT,
        max_iter=MAX_ITER,
        random_state=RANDOM_STATE,
    )
    km_final.fit(embeddings)
 
    labels    = km_final.labels_           # shape: (n,)
    centroids = km_final.cluster_centers_  # shape: (k, 384)
 
    # Hitung final score
    sil_score = float(silhouette_score(embeddings, labels, metric="euclidean", random_state=RANDOM_STATE))
    logger.info(f"[Clustering] Final Silhouette Score: {sil_score:.4f}")
 
    # ── LANGKAH C: Susun ClusterItem ─────────────────────────
    clusters: List[ClusterItem] = []
    uncategorized_members: List[ClusterMemberItem] = [] # Buat penampung data anomali
    
    for idx in range(k_optimal):
        mask = (labels == idx)
        indices = np.where(mask)[0]
        
        if len(indices) == 0:
            continue
 
        centroid = centroids[idx]
        members = []
        total_amount = 0.0
 
        for i in indices:
            # Hitung jarak Euclidean ke centroid (semakin kecil, semakin representatif)
            dist = float(np.linalg.norm(embeddings[i] - centroid))
            
            member_item = ClusterMemberItem(
                transaction_id=transaction_ids[i],
                description=descriptions[i],
                amount=amounts[i],
                distance_to_centroid=dist,
            )
            
            # FILTER: Jika jarak terlalu jauh, lempar ke 'Lain-lain'
            if dist > distance_threshold:
                uncategorized_members.append(member_item)
            else:
                members.append(member_item)
                total_amount += amounts[i]
 
        # Jika cluster jadi kosong setelah di-filter, lewati
        if not members:
            continue

        # Urutkan anggota dari yang terdekat ke centroid
        members.sort(key=lambda m: m.distance_to_centroid)
        
        # Ambil maksimal 3 deskripsi terdekat sebagai representasi
        rep_descs = [m.description for m in members[:3]]
 
        clusters.append(ClusterItem(
            index=idx,
            size=len(members),
            total_amount=total_amount,
            centroid=centroid.tolist(),
            representative_descriptions=rep_descs,
            members=members,
        ))

    # TAMBAHAN: Buat klaster "Lainnya" jika ada data yang nyasar
    if uncategorized_members:
        uncategorized_amount = sum(m.amount for m in uncategorized_members)
        uncategorized_members.sort(key=lambda m: m.distance_to_centroid, reverse=True)
        clusters.append(ClusterItem(
            index=-1, # Index khusus untuk Lainnya
            size=len(uncategorized_members),
            total_amount=uncategorized_amount,
            centroid=[],
            representative_descriptions=["Lain-lain / Uncategorized"],
            members=uncategorized_members,
        ))

    # Urutkan klaster berdasarkan total pengeluaran (total_amount) terbesar
    # "Lainnya" (index -1) biarkan ditaruh di urutan paling bawah
    clusters.sort(key=lambda c: c.total_amount if c.index != -1 else -1, reverse=True)
    
    # Perbaiki index agar urut 0, 1, 2, ... (Kecuali klaster Lainnya)
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

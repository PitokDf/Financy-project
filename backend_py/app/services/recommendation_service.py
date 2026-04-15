from __future__ import annotations

import functools

from app.services.clustering_service import recommend_top3
from app.services.embedding_service import embed_transactions


CATEGORY_PROTOTYPES: dict[str, list[str]] = {
    "cat_food":      ["makan siang", "restoran", "warteg", "nasi padang", "bakso", "soto",
                      "ayam geprek", "mie ayam", "pecel lele", "warung makan"],
    "cat_snack":     ["snack", "cemilan", "jajan", "gorengan", "roti", "kue", "keripik"],
    "cat_transport": ["isi bensin", "parkir", "tol", "ojek online", "grab", "gojek", "kereta"],
    "cat_coffee":    ["kopi", "starbucks", "janji jiwa", "kopi kenangan", "cafe", "espresso",
                      "americano", "kopi susu"],
    "cat_bills":     ["tagihan listrik", "internet", "wifi", "air pdam", "pln", "token listrik",
                      "galon air"],
    "cat_subscribe": ["netflix", "spotify", "youtube premium", "disney plus", "langganan"],
    "cat_grocery":   ["belanja supermarket", "indomaret", "alfamart", "sayur pasar", "beras",
                      "minyak goreng", "bumbu dapur"],
    "cat_health":    ["obat", "apotek", "dokter", "klinik", "vitamin", "bpjs", "rumah sakit"],
    "cat_pulsa":     ["pulsa", "kuota internet", "paket data"],
}


# ============================================================
# IMPROVEMENT: Cache centroids — tidak direbuild tiap call
# ============================================================
@functools.lru_cache(maxsize=1)
def _build_centroids_cached() -> tuple[np.ndarray, list[str]]:
    """
    Build & cache centroid per kategori.
    lru_cache(maxsize=1) cukup karena CATEGORY_PROTOTYPES statis.
    Kalau prototypes perlu diupdate runtime, panggil _build_centroids_cached.cache_clear().
    """
    category_ids = list(CATEGORY_PROTOTYPES.keys())
    texts = [" ".join(CATEGORY_PROTOTYPES[cid]) for cid in category_ids]
    vectors = embed_transactions(texts)
    return vectors, category_ids


def invalidate_centroid_cache() -> None:
    """Panggil ini jika CATEGORY_PROTOTYPES diubah saat runtime."""
    _build_centroids_cached.cache_clear()


# ============================================================
# MAIN
# ============================================================
def recommend_category_top3(description: str, model_variant: str = "A") -> list[dict]:
    centroids, category_ids = _build_centroids_cached()
    recommendations = recommend_top3(description, centroids, category_ids)

    if model_variant == "B":
        # IMPROVEMENT: Bonus proporsional terhadap skor (bukan nilai flat),
        # agar tidak mendistorsi gap antar skor yang sudah akurat
        boosted = [
            {
                "category_id": item["category_id"],
                "score": float(item["score"] * (1.0 + (0.05 if idx == 0 else 0.02))),
            }
            for idx, item in enumerate(recommendations)
        ]
        recommendations = boosted

    return recommendations[:3]
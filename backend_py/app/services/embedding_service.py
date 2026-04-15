import logging
import re

import numpy as np
from sentence_transformers import SentenceTransformer

logger = logging.getLogger(__name__)

MODEL_NAME = "paraphrase-multilingual-mpnet-base-v2"
DEFAULT_BATCH = 64

_model: SentenceTransformer | None = None
EMBEDDING_DIM: int | None = None


def get_model() -> SentenceTransformer:
    global _model, EMBEDDING_DIM
    if _model is None:
        logger.info(f"[Embedding] Memuat model: {MODEL_NAME}")
        _model = SentenceTransformer(MODEL_NAME)
        EMBEDDING_DIM = int(_model.get_sentence_embedding_dimension())
        logger.info(f"[Embedding] Model siap. Dimensi: {EMBEDDING_DIM}")
    return _model


# ============================================================
# IMPROVEMENT 1: Amount bin — lebih semantik, tidak mencemari
#                embedding space dengan angka raw
# ============================================================
def get_amount_bin(amount: float) -> str:
    if amount < 15_000:
        return "sangat_kecil"
    elif amount < 50_000:
        return "kecil"
    elif amount < 150_000:
        return "sedang"
    elif amount < 500_000:
        return "besar"
    else:
        return "sangat_besar"


# ============================================================
# IMPROVEMENT 2: Category hints lebih lengkap + hierarki jelas
# ============================================================
_CATEGORY_RULES: list[tuple[str, list[str]]] = [
    ("minuman",              ["kopi", "coffee", "latte", "matcha", "es teh", "teh tarik", "boba",
                              "thai tea", "jus", "minuman", "minum", "susu", "yakult"]),
    ("makanan_berat",        ["makan", "sarapan", "lunch", "dinner", "malam", "nasi", "warung",
                              "resto", "restoran", "warteg", "padang", "sunda", "seafood", "mie",
                              "bakso", "soto", "sate", "ayam", "bebek", "ikan", "pecel", "lele",
                              "geprek", "uduk", "kuning", "bubur", "ketoprak"]),
    ("jajan_snack",          ["jajan", "snack", "cemilan", "roti", "donat", "martabak", "gorengan",
                              "keripik", "coklat", "permen", "biscuit", "wafer"]),
    ("kebutuhan_dapur",      ["sayur", "lauk", "pasar", "ikan", "daging", "ayam mentah", "bumbu",
                              "dapur", "beras", "minyak", "gula", "garam", "telur", "tahu", "tempe"]),
    ("belanja_rumah_tangga", ["belanja", "minimarket", "supermarket", "indomaret", "alfamart",
                              "hypermart", "lottemart", "carefour", "mall", "toko", "sabun",
                              "sampo", "deterjen", "pewangi", "pembersih", "sikat", "pasta gigi"]),
    ("belanja_online",       ["shopee", "tokopedia", "lazada", "bukalapak", "blibli", "online",
                              "cod", "ongkir"]),
    ("tagihan_utilitas",     ["listrik", "air", "galon", "pln", "pdam", "token", "meteran",
                              "gas", "elpiji"]),
    ("tagihan_internet_tv",  ["internet", "wifi", "indihome", "firstmedia", "biznet", "myrepublic",
                              "netflix", "spotify", "youtube premium", "disney", "vidio", "main",
                              "streaming", "langganan"]),
    ("komunikasi",           ["pulsa", "kuota", "data", "telkomsel", "xl", "indosat", "by.u",
                              "tri", "smartfren"]),
    ("digital_wallet",       ["top up", "gopay", "dana", "shopeepay", "ovo", "linkaja",
                              "e-money", "flazz", "tapcash", "brizzi", "uang elektronik"]),
    ("game",                 ["game", "valorant", "mlbb", "mobile legend", "ff", "free fire",
                              "pubg", "diamond", "uc", "voucher game"]),
    ("transportasi",         ["bensin", "pertalite", "pertamax", "bbm", "spbu", "grab", "gojek",
                              "ojol", "ojek", "angkot", "busway", "transjakarta", "mrt", "kereta",
                              "commuter", "parkir", "tol", "tiket", "kapal", "pesawat"]),
    ("kendaraan",            ["servis", "service", "motor", "mobil", "ban", "oli", "cuci motor",
                              "cuci mobil", "bengkel", "sparepart", "suku cadang", "stiker"]),
    ("kesehatan",            ["apotek", "obat", "sakit", "klinik", "dokter", "puskesmas",
                              "rumah sakit", "sehat", "vitamin", "suplemen", "masker",
                              "hand sanitizer", "bpjs"]),
    ("pendidikan",           ["buku", "alat tulis", "sekolah", "kuliah", "kursus", "les",
                              "spp", "uang sekolah", "stationery"]),
    ("hiburan",              ["bioskop", "cinema", "xxi", "cgv", "nonton", "konser", "event",
                              "tiket", "rekreasi", "wisata", "liburan"]),
    ("sosial_agama",         ["sedekah", "zakat", "infaq", "donasi", "sumbangan", "masjid",
                              "gereja", "pura", "jariyah", "amal"]),
    ("laundry_kebersihan",   ["laundry", "cuci", "setrika", "dry clean"]),
    ("kado_sosial",          ["kado", "hadiah", "gift", "ultah", "ulang tahun", "nikah",
                              "wedding", "angpau", "arisan"]),
]


def get_category_hint(description: str) -> str:
    text = description.lower()
    for category, keywords in _CATEGORY_RULES:
        if any(kw in text for kw in keywords):
            return category
    return "lainnya"


# ============================================================
# IMPROVEMENT 3: Stopwords lebih lengkap + normalisasi singkatan
# ============================================================
INDONESIAN_STOPWORDS = {
    "bayar", "beli", "isi", "untuk", "dan", "yg", "yang", "di", "ke", "dari",
    "dengan", "transaksi", "pembayaran", "id", "ref", "no", "nomor", "tgl",
    "tanggal", "nya", "ini", "itu", "juga", "ada", "sudah", "telah", "atau",
    "via", "by", "at", "the", "a",
}

_ABBREVIATION_MAP: dict[str, str] = {
    "indo": "indomaret",
    "alfa": "alfamart",
    "spbu": "bensin",
    "bbm": "bensin",
    "atm": "bank",
    "gor": "olahraga",
    "rs": "rumah sakit",
    "pusk": "puskesmas",
    "ojol": "ojek online",
    "trf": "transfer",
    "trx": "transaksi",
}


def preprocess(text: str) -> str:
    if not text:
        return ""
    # Untuk model Transformer seperti MPNet, kita TIDAK perlu membuang stopwords
    # karena mereka menggunakan context/attention. Kita hanya perlu cleaning basic 
    # dan me-replace singkatan umum.
    text = text.strip().lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text).strip()

    words = []
    for w in text.split():
        words.append(_ABBREVIATION_MAP.get(w, w))

    return " ".join(words)


# ============================================================
# IMPROVEMENT 4: Enrichment pakai amount_bin (bukan angka raw)
#                agar tidak merusak ruang embedding semantik
# ============================================================
def embed_transactions(
    descriptions: list[str],
    amounts: list[float] | None = None,
    batch_size: int = DEFAULT_BATCH,
) -> np.ndarray:
    model = get_model()
    n = len(descriptions)

    enriched_texts = []
    for i, desc in enumerate(descriptions):
        clean = preprocess(desc)
        hint = get_category_hint(clean) # Menggunakan clean desc untuk hint

        # Transformer bekerja lebih baik dengan kalimat natural yang memiliki relasi semantik,
        # dari pada sekadar concenating token aneh seperti "harga:murah"
        kalimat = f"transaksi {clean}"
        if hint != "lainnya":
            kalimat += f" untuk kategori {hint.replace('_', ' ')}"
            
        if amounts and i < len(amounts):
            amt_bin = get_amount_bin(amounts[i])
            kalimat += f" dengan nominal {amt_bin.replace('_', ' ')}"

        enriched_texts.append(kalimat)

    logger.info(f"[Embedding] Memproses {n} transaksi...")
    embeddings = model.encode(
        enriched_texts,
        batch_size=batch_size,
        show_progress_bar=True,
        normalize_embeddings=True,
        convert_to_numpy=True,
    )
    logger.info(f"[Embedding] Selesai. Shape: {embeddings.shape}")
    return embeddings


# ── Alias & utils ────────────────────────────────────────────
def embed_text(text: str) -> list[float]:
    model = get_model()
    vector = model.encode(preprocess(text), normalize_embeddings=True)
    return vector.tolist()


def embbed_text(text: str) -> list[float]:
    return embed_text(text)


def cosine_similarity(a: list[float], b: list[float]) -> float:
    va, vb = np.array(a), np.array(b)
    denom = np.linalg.norm(va) * np.linalg.norm(vb)
    return float(np.dot(va, vb) / denom) if denom > 0 else 0.0


def consine_similarity(a: list[float], b: list[float]) -> float:
    return cosine_similarity(a, b)
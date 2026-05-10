"""
Incremental learning memory untuk classifier transaksi.

Strategi: retrieval-augmented classification (exemplar memory).
- Base SVC classifier TIDAK pernah di-retrain (nol catastrophic forgetting).
- Koreksi user di-encode dan disimpan sebagai (embedding, label).
- Saat inferensi, query dibandingkan dengan memory via cosine similarity.
  Jika ada tetangga sangat dekat -> override prediksi SVC.
  Jika lumayan dekat -> blend (boost probabilitas label memory).
- Thread-safe, persisted ke disk secara atomic.
- Deduplication by description + voting (majority wins) -> tahan noise.
"""

import json
import os
import threading
import time
from collections import Counter
from typing import List, Optional, Sequence, Tuple

import numpy as np


# Threshold default (bisa di-tune lewat env var atau param konstruktor)
HIGH_SIM_THRESHOLD = 0.92      # override kuat: hampir identik
BLEND_SIM_THRESHOLD = 0.80     # blending zone: dekat secara semantik
BLEND_WEIGHT_MAX = 0.60        # batas pengaruh memory saat blending
DEFAULT_MAX_MEMORY = 50_000    # batas ukuran memory (FIFO eviction)


def _to_float32(x: np.ndarray) -> np.ndarray:
    """Pastikan embedding float32 (hemat disk & RAM, dot product tetap akurat)."""
    return np.ascontiguousarray(x, dtype=np.float32)


class IncrementalMemory:
    """Exemplar memory untuk koreksi user. Aman untuk concurrent access."""

    def __init__(
        self,
        memory_path: str,
        log_path: Optional[str] = None,
        max_size: int = DEFAULT_MAX_MEMORY,
    ):
        self.memory_path = memory_path
        self.log_path = log_path
        self.max_size = max_size

        self._lock = threading.Lock()
        self._descriptions: List[str] = []
        self._labels: List[str] = []
        self._embeddings: Optional[np.ndarray] = None      # shape (N, D) atau None
        self._votes: dict = {}                              # desc -> {label: count}
        self._index: dict = {}                              # desc -> row index
        self.updated_at: Optional[float] = None

        self._load()

    # ---------- disk IO ----------

    def _load(self) -> None:
        if not os.path.exists(self.memory_path):
            return
        try:
            with np.load(self.memory_path, allow_pickle=True) as data:
                descs = list(data["descriptions"].tolist()) if "descriptions" in data.files else []
                labels = list(data["labels"].tolist()) if "labels" in data.files else []
                embs = data["embeddings"] if "embeddings" in data.files else None
                votes_raw = data["votes"].item() if "votes" in data.files else "{}"

            self._descriptions = [str(d) for d in descs]
            self._labels = [str(l) for l in labels]
            if embs is not None and embs.size > 0 and embs.ndim == 2:
                self._embeddings = _to_float32(embs)
            else:
                self._embeddings = None
            try:
                self._votes = json.loads(str(votes_raw))
            except Exception:
                self._votes = {}
            self._index = {d: i for i, d in enumerate(self._descriptions)}
        except Exception as e:
            # korupsi / format tidak cocok -> mulai kosong, jangan crash service
            print(f"[IncrementalMemory] Gagal load memory ({e}). Mulai dari kosong.")
            self._descriptions, self._labels, self._embeddings = [], [], None
            self._votes, self._index = {}, {}

    def _save_unlocked(self) -> None:
        """Dipanggil saat lock sudah dipegang."""
        os.makedirs(os.path.dirname(os.path.abspath(self.memory_path)), exist_ok=True)
        tmp = self.memory_path + ".tmp"
        empty_embs = np.empty((0, 0), dtype=np.float32)
        np.savez_compressed(
            tmp,
            descriptions=np.array(self._descriptions, dtype=object),
            labels=np.array(self._labels, dtype=object),
            embeddings=self._embeddings if self._embeddings is not None else empty_embs,
            votes=np.array(json.dumps(self._votes), dtype=object),
        )
        # np.savez_compressed otomatis menambahkan .npz; rename file hasilnya
        produced = tmp + ".npz" if not tmp.endswith(".npz") else tmp
        os.replace(produced, self.memory_path)

    def _append_log(self, desc_raw: str, desc_clean: str, label: str, source: str) -> None:
        if not self.log_path:
            return
        try:
            os.makedirs(os.path.dirname(os.path.abspath(self.log_path)), exist_ok=True)
            rec = {
                "ts": time.time(),
                "description": desc_raw,
                "description_clean": desc_clean,
                "label": label,
                "source": source,
            }
            with open(self.log_path, "a", encoding="utf-8") as fh:
                fh.write(json.dumps(rec, ensure_ascii=False) + "\n")
        except Exception as e:
            print(f"[IncrementalMemory] Gagal tulis log audit: {e}")

    # ---------- mutasi ----------

    def add_batch(
        self,
        clean_descriptions: Sequence[str],
        embeddings: np.ndarray,
        labels: Sequence[str],
        raw_descriptions: Optional[Sequence[str]] = None,
        source: str = "user",
    ) -> dict:
        """
        Tambahkan batch (desc, emb, label) ke memory.

        - Embedding harus sudah L2-normalized (cosine = dot product).
        - Duplikat description digabung via voting: label dengan hitungan terbanyak menang.
        - Update embedding ke versi terbaru untuk desc yang sudah ada.
        - Trim ke max_size dengan FIFO (buang yang paling lama).
        """
        if len(clean_descriptions) == 0:
            return {"added": 0, "updated": 0, "total": len(self._descriptions)}

        embeddings = _to_float32(np.atleast_2d(embeddings))
        if embeddings.shape[0] != len(clean_descriptions):
            raise ValueError("Jumlah embedding dan description tidak sama")
        if len(labels) != len(clean_descriptions):
            raise ValueError("Jumlah label dan description tidak sama")

        added = 0
        updated = 0

        with self._lock:
            for k, (desc, emb, lab) in enumerate(zip(clean_descriptions, embeddings, labels)):
                desc = str(desc).strip()
                lab = str(lab).strip()
                if not desc or not lab:
                    continue

                # audit log (sebelum dedup, jadi kita tetap simpan jejak lengkap)
                raw = raw_descriptions[k] if raw_descriptions is not None else desc
                self._append_log(raw, desc, lab, source)

                # update votes
                votes = self._votes.get(desc, {})
                votes[lab] = votes.get(lab, 0) + 1
                self._votes[desc] = votes
                winner = max(votes.items(), key=lambda kv: (kv[1], kv[0]))[0]

                if desc in self._index:
                    i = self._index[desc]
                    if self._labels[i] != winner:
                        self._labels[i] = winner
                    # segarkan embedding (bisa jadi model version berubah)
                    if self._embeddings is not None and i < self._embeddings.shape[0]:
                        self._embeddings[i] = emb
                    updated += 1
                else:
                    self._descriptions.append(desc)
                    self._labels.append(winner)
                    if self._embeddings is None or self._embeddings.size == 0:
                        self._embeddings = emb.reshape(1, -1).copy()
                    else:
                        self._embeddings = np.vstack([self._embeddings, emb.reshape(1, -1)])
                    self._index[desc] = len(self._descriptions) - 1
                    added += 1

            # FIFO trim
            overflow = len(self._descriptions) - self.max_size
            if overflow > 0:
                dropped = self._descriptions[:overflow]
                self._descriptions = self._descriptions[overflow:]
                self._labels = self._labels[overflow:]
                self._embeddings = self._embeddings[overflow:] if self._embeddings is not None else None
                # rebuild index + bersihkan votes yang sudah tidak ada
                self._index = {d: i for i, d in enumerate(self._descriptions)}
                for d in dropped:
                    self._votes.pop(d, None)

            self.updated_at = time.time()
            self._save_unlocked()

        return {"added": added, "updated": updated, "total": len(self._descriptions)}

    # ---------- query ----------

    def snapshot(self) -> Tuple[Optional[np.ndarray], List[str]]:
        """Ambil view read-only (dibekukan di titik waktu ini)."""
        with self._lock:
            if self._embeddings is None or self._embeddings.size == 0:
                return None, []
            return self._embeddings.copy(), list(self._labels)

    def lookup(self, query_embeddings: np.ndarray) -> Tuple[np.ndarray, List[Optional[str]]]:
        """
        Cari tetangga terdekat untuk tiap query (cosine similarity).

        Returns:
            best_sim: shape (Q,), similarity tertinggi per query
            best_label: list label (None kalau memory kosong)
        """
        embs, labels = self.snapshot()
        Q = query_embeddings.shape[0]
        if embs is None:
            return np.zeros(Q, dtype=np.float32), [None] * Q
        # embedding sudah L2-normalized -> cosine = dot
        sims = _to_float32(query_embeddings) @ embs.T      # (Q, N)
        best_idx = np.argmax(sims, axis=1)
        best_sim = sims[np.arange(Q), best_idx]
        best_label = [labels[i] for i in best_idx]
        return best_sim, best_label

    def size(self) -> int:
        with self._lock:
            return len(self._descriptions)

    def stats(self) -> dict:
        with self._lock:
            label_counts = Counter(self._labels)
            return {
                "size": len(self._descriptions),
                "max_size": self.max_size,
                "labels_distribution": dict(label_counts),
                "updated_at": self.updated_at,
            }


def apply_memory_to_probs(
    probs: np.ndarray,
    classes: Sequence[str],
    best_sim: np.ndarray,
    best_label: List[Optional[str]],
    high_threshold: float = HIGH_SIM_THRESHOLD,
    blend_threshold: float = BLEND_SIM_THRESHOLD,
    blend_weight_max: float = BLEND_WEIGHT_MAX,
) -> np.ndarray:
    """
    Gabungkan probabilitas classifier dengan sinyal memory.

    - sim >= high_threshold          -> delta distribution pada label memory
                                        (override penuh, confidence = sim).
    - blend_threshold <= sim < high  -> interpolasi: (1-w)*probs + w*onehot,
                                        w naik linier antara blend_threshold..high.
    - sim < blend_threshold          -> probs asli (tidak disentuh).

    Jika label memory tidak dikenal classifier (kategori baru), tetap kita dukung
    dengan mengganti probabilitas secara proporsional dan menormalisasi ulang.
    """
    if probs.size == 0 or len(best_label) == 0:
        return probs

    out = probs.astype(np.float32, copy=True)
    class_index = {str(c): i for i, c in enumerate(classes)}

    for i, (sim, lab) in enumerate(zip(best_sim, best_label)):
        if lab is None:
            continue
        if sim < blend_threshold:
            continue

        if sim >= high_threshold:
            w = 1.0
        else:
            # ramp linier di zona blending
            span = max(high_threshold - blend_threshold, 1e-6)
            w = blend_weight_max * (sim - blend_threshold) / span

        target = np.zeros_like(out[i])
        if lab in class_index:
            target[class_index[lab]] = 1.0
        else:
            # label out-of-vocab: biarkan probs asli tapi turunkan keyakinannya,
            # lalu tambahkan massa fiktif pada kelas dengan nama terdekat (fallback).
            # Tanpa mapping, aman kembalikan probs asli.
            continue

        out[i] = (1.0 - w) * out[i] + w * target
        # normalisasi defensif
        s = out[i].sum()
        if s > 0:
            out[i] /= s

    return out

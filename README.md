# Fintrack

Aplikasi web manajemen keuangan pribadi yang mengkategorikan transaksi secara otomatis dari deskripsi teks, mengelompokkan pola pengeluaran dengan K-Means + Sentence-BERT, dan belajar dari koreksi pengguna secara inkremental tanpa retrain penuh.

**Tugas Akhir** — Politeknik Negeri Padang, Program Studi Sarjana Terapan Teknologi Rekayasa Perangkat Lunak.

---

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Arsitektur](#arsitektur)
- [Stack Teknologi](#stack-teknologi)
- [Struktur Repository](#struktur-repository)
- [Prasyarat](#prasyarat)
- [Quick Start (Docker Compose)](#quick-start-docker-compose)
- [Setup Pengembangan Lokal](#setup-pengembangan-lokal)
- [Variabel Lingkungan](#variabel-lingkungan)
- [ML Pipeline](#ml-pipeline)
- [Incremental Learning](#incremental-learning)
- [Endpoint API Utama](#endpoint-api-utama)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Lisensi](#lisensi)

---

## Fitur Utama

- **Kategorisasi otomatis** transaksi via Sentence-BERT (E5-Large) + SVM RBF kernel.
- **Clustering pola pengeluaran** menggunakan K-Means dengan elbow + silhouette sebagai pemilih k optimal.
- **Incremental learning** berbasis exemplar memory — belajar dari koreksi user tanpa melakukan retrain SVM (nol _catastrophic forgetting_).
- **Peramalan bulanan** per kategori menggunakan Simple Moving Average (SMA).
- **Target anggaran (budget goals)** dengan alert otomatis di 80% dan 100% pemakaian.
- **Notifikasi & reminder** berbasis event (budget alert, pola baru, reminder pencatatan harian, push notification via Web Push).
- **Ekspor laporan** PDF (ringkasan + grafik) dan Excel (.xlsx).
- **Gamifikasi**: streak harian, koleksi badge, poin XP, tantangan mingguan.
- **Import CSV** transaksi dan dashboard visualisasi (pie chart, line chart, elbow chart).
- **Progressive Web App** dengan offline support via Serwist.

## Arsitektur

```
                           ┌──────────────────┐
                           │  fintrack (Next) │   Next.js 16 App Router
                           │     :3000        │   React 19, PWA
                           └────────┬─────────┘
                                    │ HTTPS (axios)
                                    ▼
┌───────────────────┐      ┌──────────────────┐       ┌───────────────────┐
│     Redis         │◄────►│  backend (API)   │──────►│  clustering (ML)  │
│     :6379         │      │  Express + Prisma│  REST │  FastAPI          │
│  queue + cache    │      │     :6789        │       │     :8000         │
└───────────────────┘      └────────┬─────────┘       └────────┬──────────┘
                                    │                           │
                                    ▼                           ▼
                           ┌──────────────────┐       ┌───────────────────┐
                           │   PostgreSQL     │       │ classifier_model  │
                           │    (external)    │       │ incremental_mem   │
                           └──────────────────┘       └───────────────────┘
```

- **fintrack** (frontend): Next.js App Router, mobile-first, PWA dengan service worker.
- **backend** (API): Express 5 + Prisma + BullMQ untuk worker async (notifikasi, gamifikasi).
- **clustering** (ML service): FastAPI yang membungkus Sentence-BERT encoder + SVC classifier + incremental memory.
- **Redis**: job queue (BullMQ) dan cache.
- **PostgreSQL**: sumber kebenaran data transaksional.

## Stack Teknologi

| Layer      | Teknologi                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------- |
| Frontend   | Next.js 16, React 19, TanStack Query, Tailwind CSS 4, shadcn/ui, Recharts, Zustand, Serwist (PWA) |
| Backend    | Node.js (Bun dev, tsc build), Express 5, Prisma 7, Zod, BullMQ, Web Push, pdfmake, xlsx           |
| ML Service | Python 3.10, FastAPI, Sentence-Transformers, scikit-learn (SVC), PyTorch CPU                      |
| Data       | PostgreSQL, Redis                                                                                 |
| DevOps     | Docker, docker-compose                                                                            |

## Struktur Repository

```
.
├── fintrack/              # Next.js frontend
├── backend/               # Express API + Prisma
│   ├── src/
│   │   ├── controller/    # Route handlers
│   │   ├── service/       # Business logic (analysis, forecast, gamification, dsb.)
│   │   ├── repositories/  # Prisma data access
│   │   ├── routes/        # Express routers
│   │   ├── schemas/       # Zod validators
│   │   ├── queue/         # BullMQ producers
│   │   ├── worker/        # BullMQ consumers
│   │   └── jobs/          # Scheduled jobs
│   └── prisma/            # Schema, migrations, seeds
├── clustering/            # FastAPI ML service
│   ├── main.py            # FastAPI app + endpoints
│   ├── clustering.py      # ClassifierService (encoder + SVC + memory blend)
│   ├── incremental.py     # IncrementalMemory (exemplar-based)
│   ├── train_script.ipynb # Notebook pelatihan model dasar
│   └── data/              # Model bundle, base dataset, incremental memory
├── docker-compose.yml
└── docs/                  # Dokumen dan diagram
```

## Prasyarat

- **Docker & docker-compose** (rekomendasi untuk deployment terintegrasi)
- **Node.js ≥ 20** dan **Bun** (untuk dev backend dan frontend)
- **Python ≥ 3.10** (untuk dev ML service)
- **PostgreSQL 14+** (bisa eksternal atau container tambahan)
- **Redis 7+** (otomatis lewat compose)

## Quick Start (Docker Compose)

1. Salin env template:

   ```bash
   cp backend/.env.example backend/.env
   ```

2. Isi minimal: `DATABASE_URL`, `JWT_SECRET`, `REDIS_PASSWORD`, `CLIENT_URL`, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`.

3. Build image backend dan clustering:

   ```bash
   docker build -t financy-backend:latest backend
   docker build -t financy-clustering:latest clustering
   ```

4. Jalankan stack:

   ```bash
   docker compose up -d
   ```

5. Jalankan migrasi Prisma (sekali, di host dengan akses ke DATABASE_URL):

   ```bash
   cd backend
   bun install
   bunx prisma migrate deploy
   ```

6. Frontend dev:

   ```bash
   cd fintrack
   bun install
   bun dev
   ```

Service akan dapat diakses di:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:6789/api/v1`
- ML service: `http://localhost:8001` (host) → `:8000` (container)

## Setup Pengembangan Lokal

### Backend

```bash
cd backend
cp .env.example .env
bun install
bunx prisma generate
bunx prisma migrate dev
bun dev
```

API tersedia di `http://localhost:6789`. Healthcheck: `GET /api/v1/health`.

### ML Service

```bash
cd clustering
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Butuh file `classifier_model.joblib` di root `clustering/` atau di `data/` — hasil training dari `train_script.ipynb`. Model pertama kali boot akan men-download Sentence-Transformer `intfloat/multilingual-e5-large` (~2.2 GB).

### Frontend

```bash
cd fintrack
cp .env.example .env  # kalau ada, selain itu buat manual
bun install
bun dev
```

Isi minimal di `fintrack/.env`:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:6789/api/v1
NEXT_PUBLIC_VAPID_PUBLIC_KEY=<isi sama dengan backend>
```

## Variabel Lingkungan

### backend/.env (utama)

| Variabel                                          | Keterangan                                               |
| ------------------------------------------------- | -------------------------------------------------------- |
| `PORT`                                            | Port Express (default `6789`)                            |
| `DATABASE_URL`                                    | Koneksi PostgreSQL                                       |
| `JWT_SECRET`                                      | Secret untuk signing JWT                                 |
| `JWT_ISSUER`                                      | Issuer claim JWT                                         |
| `CLIENT_URL`                                      | URL frontend (dipakai di CORS dan link email)            |
| `ALLOWED_ORIGINS`                                 | Daftar origin CORS, comma-separated                      |
| `COOKIES_DOMAIN`                                  | Domain cookie (production)                               |
| `TOKEN_SET_IN`                                    | `cookie` (default) atau `header`                         |
| `ML_SERVICE_URL`                                  | URL FastAPI ML service (default `http://localhost:8000`) |
| `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`      | Redis untuk BullMQ & cache                               |
| `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`           | Web Push                                                 |
| `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX_REQUESTS` | Rate limiting                                            |
| `UPLOAD_MAX_SIZE`, `UPLOAD_DIR`                   | Upload file (CSV import)                                 |
| `CACHE_TTL`                                       | TTL cache in-memory                                      |

### clustering (opsional)

| Variabel                  | Default                            | Keterangan                                                 |
| ------------------------- | ---------------------------------- | ---------------------------------------------------------- |
| `DATA_DIR`                | `clustering/data`                  | Lokasi model bundle + memory                               |
| `INCREMENTAL_MEMORY_PATH` | `$DATA_DIR/incremental_memory.npz` | File persistent memory                                     |
| `FEEDBACK_LOG_PATH`       | `$DATA_DIR/feedback_log.jsonl`     | Audit log feedback                                         |
| `INCREMENTAL_MAX_SIZE`    | `50000`                            | Kapasitas memory (FIFO eviction)                           |
| `MEMORY_HIGH_THRESHOLD`   | `0.92`                             | Similarity untuk override penuh                            |
| `MEMORY_BLEND_THRESHOLD`  | `0.80`                             | Similarity untuk mulai blending                            |
| `MEMORY_BLEND_WEIGHT`     | `0.60`                             | Bobot maksimum memory di zona blending                     |
| `ALLOW_NEW_LABELS`        | `0`                                | Set `1` untuk menerima label di luar vocabulary classifier |

### fintrack/.env

| Variabel                       | Keterangan                                |
| ------------------------------ | ----------------------------------------- |
| `NEXT_PUBLIC_API_URL`          | URL absolut backend API                   |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | Public key Web Push (harus match backend) |

## ML Pipeline

Alur analisis V2 (`POST /api/v1/analysis/run-v2`):

1. Backend ambil transaksi user tanpa kategori → kirim ke `POST /v2/analyze`.
2. ML service membersihkan deskripsi (lowercase, hapus angka panjang, trim), di-encode dengan E5 (`query: <text>`), dinormalisasi L2.
3. Probabilitas diambil dari SVC (RBF kernel) yang di-training di notebook dengan 42 kategori pre-defined.
4. Incremental memory di-query via cosine similarity terhadap embedding user sebelumnya.
5. Probabilitas di-blend dengan memory (lihat bagian berikut).
6. Hasil prediksi dikelompokkan menjadi "pseudo-cluster" per kategori, dipersist sebagai `AnalysisRun` + `Cluster` + anggotanya.
7. User meninjau dan memilih konfirmasi nama kategori akhir. Setelah confirm:
   - Backend meng-upsert `Category`, menghubungkan transaksi ke kategori final.
   - Pasangan `(description, category_name)` dikirim fire-and-forget ke `POST /v2/feedback` untuk memperkuat memory.

## Incremental Learning

Pendekatan: **retrieval-augmented classification dengan exemplar memory**. Classifier SVM dasar tidak di-retrain, jadi akurasi pada distribusi asli terjaga.

### Cara kerja

- Setiap koreksi user di-encode dan disimpan sebagai tuple `(description, embedding, label)`.
- Saat inferensi, query di-cosine-similarity dengan seluruh memory.
- Logika blending tiap prediksi:

  | Similarity (sim)    | Aksi                                           |
  | ------------------- | ---------------------------------------------- |
  | `sim ≥ 0.92`        | Override penuh → label memory menang           |
  | `0.80 ≤ sim < 0.92` | Blend linier antara probs SVC dan label memory |
  | `sim < 0.80`        | Probs SVC dipakai apa adanya                   |

### Ketahanan

- **Voting dedup**: satu description dengan beberapa label dimenangkan oleh label terbanyak — satu misclick tidak meracuni memory.
- **FIFO bounded**: memory dibatasi `INCREMENTAL_MAX_SIZE` entry untuk mencegah bloat.
- **Out-of-vocab skip**: label yang tidak dikenal classifier di-skip secara default.
- **Thread-safe**: mutasi memory di-guard dengan lock; persist atomic (tmp file + rename).
- **Audit log**: setiap ingest tercatat di `feedback_log.jsonl` dengan timestamp dan sumber.

### API Memory

- `POST /v2/feedback` — kirim batch koreksi `{items: [{description, category}, ...], source}`.
- `GET /v2/memory/stats` — ukuran memory, distribusi label, waktu update terakhir.
- `GET /health` — status service + ringkasan memory.

## Endpoint API Utama

Semua endpoint backend di-prefix `/api/v1` dan membutuhkan JWT di cookie atau header `Authorization: Bearer <token>` (kecuali `/auth/*`).

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`

### Transaksi

- `GET /transactions` — list + filter + search
- `POST /transactions`
- `PUT /transactions/:id`
- `DELETE /transactions/:id`
- `POST /transactions/import` — upload CSV

### Analisis (clustering)

- `POST /analysis/run-v2` — jalankan klasifikasi dan pengelompokan
- `POST /analysis/confirm` — konfirmasi mapping cluster → kategori; juga memicu submit feedback ke ML
- `GET /analysis/latest` — status run terakhir
- `GET /analysis/stats` — agregasi harian
- `GET /analysis/category-breakdown`

### Budget, Forecast, Notification, Export, Gamification, Dashboard

Lihat `backend/src/routes/` untuk rute lengkap per modul.

### ML service

- `POST /v2/analyze` — klasifikasi transaksi
- `POST /v2/feedback` — ingest koreksi user
- `GET  /v2/memory/stats`
- `GET  /health`

## Testing

Backend (Jest + Supertest):

```bash
cd backend
bun test
bun test --coverage
```

ML service — smoke test untuk modul memory:

```bash
cd clustering
source venv/bin/activate
pytest  # kalau ada suite tambahan, atau jalankan skrip ad-hoc
```

Frontend: belum ada test runner terkonfigurasi secara default. Tambahkan Vitest / Playwright sesuai kebutuhan.

## Troubleshooting

- **Backend tidak bisa panggil ML service**: pastikan `ML_SERVICE_URL` valid dari sudut pandang container (di compose: `http://clustering:8000`).
- **First boot ML lambat**: download model E5-Large ~2.2 GB. Setelah di-cache di `model_cache/` akan cepat.
- **Memory hilang setelah restart container**: pastikan `./clustering/data` di-mount sebagai volume (sudah di `docker-compose.yml`).
- **Akurasi turun setelah banyak feedback**: turunkan `MEMORY_BLEND_WEIGHT` atau naikkan `MEMORY_HIGH_THRESHOLD`. Anda juga bisa hapus `incremental_memory.npz` untuk reset memory tanpa menyentuh model dasar.
- **Prisma error di production**: jalankan `bunx prisma migrate deploy` (bukan `dev`). Pastikan `DATABASE_URL` menunjuk ke DB yang sama dengan yang dipakai aplikasi.

## Lisensi

MIT © Pito Desri Pauzi

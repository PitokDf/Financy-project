# BAB IV HASIL IMPLEMENTASI DAN PEMBAHASAN

## 4.1 Kondisi Implementasi Saat Ini

### 4.1.1 Backend
- Struktur arsitektur route-controller-service-repository sudah tersedia.
- Modul auth dan user telah berjalan.
- Skema database sudah mengakomodasi hampir seluruh fitur domain TA.
- Response API telah menggunakan format terstandar.

### 4.1.2 Web Frontend
- Halaman utama fitur sudah tersedia (home, analytics, budget, history, export, notifications, cluster confirm, transaksi tambah/impor).
- Integrasi auth web dengan backend sudah tersedia.
- Sebagian halaman masih menggunakan data statis dan belum sepenuhnya terhubung endpoint domain.

### 4.1.3 Layanan Machine Learning
- Service Python berbasis FastAPI telah tersedia.
- Endpoint health, embed, cluster, dan pipeline sudah disiapkan.
- Pipeline clustering sudah mengembalikan nilai k optimal, silhouette score, dan ringkasan klaster.

## 4.2 Gap Analysis terhadap Target TA

1. Integrasi penuh backend domain finansial belum lengkap (transaksi, budget, analytics, notifikasi, ekspor, gamifikasi).
2. Integrasi backend Node.js ke ML service Python perlu penyelesaian end-to-end.
3. Sinkronisasi kontrak API frontend-backend perlu dirapikan agar konsisten.
4. Pengujian performa dan evaluasi acceptance rate perlu dijalankan pada data nyata.

## 4.3 Strategi Penyelesaian

- Prioritaskan modul transaksional inti sebelum fitur engagement.
- Kunci kontrak API dan schema validasi lebih awal.
- Integrasikan ML pipeline setelah data transaksi dan kategori stabil.
- Tutup dengan observability, testing, dan dokumentasi hasil evaluasi.

## 4.4 Skenario Uji dan Metrik Keberhasilan

### Skenario Uji Inti
1. User register/login dan menjaga sesi aktif.
2. User input transaksi dan impor CSV.
3. Sistem menganalisis pola pengeluaran dan menampilkan saran klaster.
4. User konfirmasi klaster menjadi kategori.
5. Sistem menghitung budget progress dan memberi notifikasi threshold.
6. Sistem menampilkan forecast kategori prioritas.
7. User ekspor laporan dan meninjau histori aktivitas.

### Metrik Keberhasilan
- Silhouette score hasil clustering.
- Durasi proses analisis per sejumlah transaksi.
- Latensi endpoint utama.
- Acceptance rate saran klaster.
- Konsistensi pencatatan pengguna (streak/aktivitas).

## 4.5 Pembahasan

Pendekatan Sentence-BERT + K-Means memberikan nilai tambah karena dapat menangkap kemiripan semantik deskripsi transaksi yang sulit ditangani rule-based. Dengan konfirmasi pengguna pada tahap akhir, sistem tetap menjaga kontrol manusia sehingga hasil kategorisasi lebih relevan secara praktis. Integrasi modul pendukung (budget, notifikasi, gamifikasi) memperluas manfaat dari sekadar pencatatan menjadi pendamping keputusan finansial.

## 4.6 Hasil Uji Endpoint dan Evaluasi Clustering

### 4.6.1 Hasil Uji Integrasi Endpoint

Uji dilakukan secara langsung pada lingkungan pengembangan menggunakan dua service aktif: backend Node.js (Express + Prisma) dan backend Python (FastAPI ML). Pengujian dilakukan dengan skenario end-to-end: register, login, input transaksi expense tanpa kategori, lalu trigger analisis clustering.

Ringkasan hasil uji:

1. **Uji endpoint ML FastAPI**
	- `GET /api/ml/health` → **200 OK**
	- `POST /api/ml/embed` → **200 OK**, jumlah embedding sesuai input, dimensi vektor **384**
	- `POST /api/ml/cluster` → **200 OK**, nilai `k_optimal` berhasil dihitung
	- `POST /api/ml/pipeline` → **200 OK**, output berisi cluster, silhouette score, dan durasi proses

2. **Uji endpoint backend Node.js**
	- `POST /api/v1/auth/register` → **201 Created**
	- `POST /api/v1/auth/login` → **200 OK** (access token diterbitkan)
	- `POST /api/v1/transactions` (12 transaksi expense tanpa kategori) → berhasil tersimpan
	- `POST /api/v1/transactions/analyze` → **200 OK** dengan hasil:
	  - `totalTransactions`: 12
	  - `kOptimal`: 5
	  - `silhouetteScore`: 0.1533
	  - `durationMs`: 557
	  - `clustersCreated`: 5

Hasil ini menunjukkan integrasi **TS backend → ML pipeline Python → penyimpanan hasil analisis** telah berjalan secara end-to-end.

### 4.6.2 Evaluasi Kualitas Clustering

Evaluasi kualitas cluster dilakukan menggunakan metrik utama **Silhouette Score** dengan rentang nilai $-1$ sampai $1$.

- Mendekati $1$: cluster terpisah dengan baik.
- Sekitar $0$: overlap antar-cluster tinggi.
- Negatif: banyak data masuk cluster yang tidak sesuai.

Pada pengujian ini diperoleh nilai silhouette pada kisaran **0.149–0.153**. Nilai tersebut mengindikasikan kualitas cluster berada pada level **cukup** untuk baseline sistem rekomendasi kategori, namun belum optimal untuk otomatisasi penuh tanpa verifikasi pengguna.

Interpretasi praktis:

1. Model sudah mampu membentuk grup transaksi berdasarkan kemiripan semantik deskripsi.
2. Pemisahan antar grup masih memiliki overlap, terutama pada deskripsi transaksi yang pendek/ambigu.
3. Mekanisme cluster `index = -1` (uncategorized/outlier) berhasil menangkap data yang kurang representatif terhadap centroid utama.

### 4.6.3 Implikasi terhadap Tujuan TA

Dengan hasil tersebut, pendekatan saat ini sudah memenuhi tujuan fungsional TA untuk:

1. Menyediakan pengelompokan pengeluaran otomatis berbasis NLP.
2. Menyajikan rekomendasi kategori sebagai bantuan keputusan pengguna.
3. Menjaga human-in-the-loop melalui konfirmasi pengguna sebelum kategorisasi final.

Artinya, sistem layak diposisikan sebagai **decision support** untuk manajemen keuangan pribadi, bukan sebagai klasifikasi final sepenuhnya otomatis.

### 4.6.4 Rekomendasi Peningkatan

Untuk peningkatan kualitas pada iterasi berikutnya, disarankan:

1. Menambah jumlah dan keragaman data transaksi riil per pengguna.
2. Melakukan normalisasi teks domain-spesifik (singkatan, typo, merek, slang).
3. Menyetel ulang parameter `distance_threshold`, `k_min`, dan `k_max` berbasis eksperimen.
4. Menambahkan metrik evaluasi lanjutan (misalnya acceptance rate rekomendasi cluster oleh pengguna).


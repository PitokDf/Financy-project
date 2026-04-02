# BAB III METODOLOGI PENELITIAN DAN PERANCANGAN SISTEM

## 3.1 Metode Pelaksanaan

Penelitian menggunakan pendekatan **prototyping iteratif**:
1. Studi literatur dan analisis kebutuhan.
2. Perancangan arsitektur dan basis data.
3. Implementasi modul inti dan modul pendukung secara bertahap.
4. Pengujian fungsional, integrasi, dan performa.
5. Evaluasi hasil serta penyusunan laporan.

## 3.2 Arsitektur Sistem

### 3.2.1 Arsitektur Logis

- **Frontend (Web)**: Next.js
- **Backend API**: Express.js + TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **ML Service**: FastAPI (Python) untuk embedding dan clustering
- **Caching/Scheduler**: Redis dan job scheduler backend

### 3.2.2 Alur Data Utama

1. Pengguna mencatat transaksi via frontend.
2. Backend menyimpan transaksi ke database.
3. Ketika analisis dijalankan, backend mengirim data transaksi ke ML service.
4. ML service menghasilkan cluster, silhouette score, dan data elbow.
5. Backend menyimpan hasil analisis dan mengirim saran klaster ke frontend.
6. Pengguna mengonfirmasi klaster menjadi kategori final.

## 3.3 Perancangan Modul

### 3.3.1 Modul Manajemen Pengguna
- Registrasi, login, refresh token, logout, profil pengguna.

### 3.3.2 Modul Transaksi
- CRUD pemasukan/pengeluaran.
- Filter berdasarkan tanggal, tipe, kategori.
- Impor CSV dan pencatatan batch impor.

### 3.3.3 Modul Analisis Pola
- Vektorisasi deskripsi transaksi menggunakan Sentence-BERT.
- Penentuan K optimal.
- Clustering dengan K-Means.
- Penyimpanan hasil run analisis dan data klaster.

### 3.3.4 Modul Budget Goal
- Penetapan limit pengeluaran per kategori/klaster.
- Monitoring progres penggunaan budget.
- Trigger notifikasi saat mendekati/melewati batas.

### 3.3.5 Modul Forecasting
- Prediksi pengeluaran kategori prioritas menggunakan SMA.
- Visualisasi hasil prediksi pada dashboard analytics.

### 3.3.6 Modul Notifikasi dan Reminder
- Notifikasi event-driven (budget warning, badge unlocked, analysis done).
- Reminder pencatatan harian.

### 3.3.7 Modul Ekspor dan Log Aktivitas
- Ekspor PDF (ringkasan visual) dan Excel (data mentah).
- Log aktivitas dan riwayat dengan pencarian/filter.

### 3.3.8 Modul Gamifikasi
- Akumulasi XP berdasarkan aktivitas.
- Leveling pengguna.
- Badge achievement.
- Streak harian dan challenge mingguan.

## 3.4 Perancangan Basis Data (Ringkas)

Entitas utama:
- User
- Transaction
- Category
- AnalysisRun
- Cluster
- BudgetGoal
- Forecast
- Notification
- ReminderConfig
- ExportLog
- ImportBatch
- Gamification, Badge, UserBadge, UserChallenge

Relasi utama:
- Satu user memiliki banyak transaksi, kategori, budget, notifikasi, dan run analisis.
- Satu run analisis memiliki banyak cluster.
- Cluster dapat dipetakan ke kategori saat konfirmasi pengguna.

## 3.5 Kebutuhan Fungsional dan Non-Fungsional

### Fungsional
- Auth, transaksi, impor CSV, clustering, budget, notifikasi, forecast, ekspor, log aktivitas, gamifikasi.

### Non-fungsional
- Keamanan autentikasi dan hash password.
- Performa API dan dashboard.
- Keandalan hasil perhitungan dan analisis.
- Skalabilitas modul backend.
- Usability antarmuka web responsif.

## 3.6 Metode Pengujian

1. **Unit Testing**: service/repository utility kritikal.
2. **Integration Testing**: endpoint API antar modul.
3. **System Testing**: skenario end-to-end user.
4. **Performance Testing**: durasi analisis clustering, latency endpoint utama.
5. **User Validation**: tingkat penerimaan hasil klaster.

## 3.7 Rencana Implementasi Mingguan (Sprint)

1. Sprint 1: Stabilitas auth dan session.
2. Sprint 2: CRUD transaksi + filter.
3. Sprint 3: CSV import end-to-end.
4. Sprint 4: Kategori + budget goals.
5. Sprint 5: Integrasi ML pipeline.
6. Sprint 6: Konfirmasi klaster ke kategori.
7. Sprint 7: Forecasting SMA + analytics.
8. Sprint 8: Notifikasi + reminder + activity log.
9. Sprint 9: Ekspor PDF/Excel.
10. Sprint 10: Gamifikasi + hardening + final testing.

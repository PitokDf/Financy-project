# Laporan Tugas Akhir (Draft Lengkap)

## Rancang Bangun Aplikasi Web Manajemen Keuangan Pribadi dengan Analisis Pola Pengeluaran Menggunakan Sentence-BERT dan K-Means Clustering

**Nama**: Pito Desri Pauzi  
**NIM**: 2211083044  
**Program Studi**: Sarjana Terapan Teknologi Rekayasa Perangkat Lunak  
**Institusi**: Politeknik Negeri Padang  
**Tahun**: 2026  

---

## Pernyataan Ruang Lingkup

Dokumen ini disusun dengan **fokus implementasi aplikasi web**. Implementasi aplikasi mobile tidak termasuk dalam cakupan laporan dan pengujian.

---

## Abstrak

Aplikasi manajemen keuangan pribadi pada umumnya masih mengandalkan kategorisasi transaksi secara manual. Proses tersebut memakan waktu, rentan inkonsistensi, dan membatasi kemampuan pengguna dalam menemukan pola pengeluaran yang sebenarnya. Penelitian ini merancang dan membangun aplikasi web manajemen keuangan pribadi yang mampu melakukan analisis pola pengeluaran secara otomatis menggunakan pendekatan machine learning.

Metode utama yang digunakan adalah Sentence-BERT untuk mengubah deskripsi transaksi menjadi representasi vektor semantik (embedding), kemudian K-Means Clustering untuk mengelompokkan transaksi berdasarkan kedekatan makna. Selain itu, sistem dilengkapi fitur budgeting, notifikasi dan reminder, forecasting berbasis Simple Moving Average (SMA), ekspor laporan, riwayat aktivitas, serta gamifikasi untuk meningkatkan konsistensi pengguna.

Arsitektur sistem menerapkan model client-server: frontend dibangun menggunakan Next.js, backend menggunakan Express.js dan Prisma ORM, database PostgreSQL, serta layanan machine learning terpisah berbasis FastAPI. Hasil yang diharapkan adalah aplikasi web yang cerdas, responsif, dan mampu memberikan wawasan finansial yang lebih kontekstual bagi pengguna.

**Kata kunci**: manajemen keuangan pribadi, sentence-bert, k-means clustering, forecasting SMA, gamifikasi, aplikasi web.

---

# BAB I PENDAHULUAN

## 1.1 Latar Belakang

Pengelolaan keuangan pribadi menjadi kebutuhan penting untuk menjaga kestabilan finansial. Namun, banyak pengguna mengalami kesulitan mencatat transaksi secara konsisten dan memahami kebiasaan pengeluaran secara mendalam. Aplikasi pencatat keuangan yang ada umumnya hanya menyediakan pencatatan dasar dengan kategori statis yang ditentukan pengguna.

Pendekatan tersebut bersifat reaktif karena wawasan yang muncul terbatas pada kategori yang telah ditetapkan sebelumnya. Kondisi ini menyebabkan pola pengeluaran tersembunyi, seperti kebiasaan belanja tertentu berdasarkan konteks semantik deskripsi transaksi, tidak teridentifikasi secara otomatis.

Penelitian ini menawarkan solusi berupa aplikasi web yang memadukan pemrosesan bahasa alami dan clustering tanpa label. Dengan Sentence-BERT dan K-Means, sistem dapat membantu pengguna menemukan pola pengeluaran secara otomatis, lalu memanfaatkannya untuk budgeting, notifikasi cerdas, forecasting, dan peningkatan engagement melalui gamifikasi.

## 1.2 Rumusan Masalah

1. Bagaimana mengubah deskripsi transaksi menjadi embedding semantik yang representatif menggunakan Sentence-BERT?
2. Bagaimana menerapkan K-Means Clustering untuk menemukan pola pengeluaran yang bermakna dari data transaksi?
3. Bagaimana merancang forecasting pengeluaran berbasis data historis menggunakan Simple Moving Average?
4. Bagaimana mengintegrasikan fitur pendukung (budget, notifikasi, ekspor, log aktivitas, gamifikasi) ke dalam satu platform web?
5. Bagaimana menyajikan hasil analisis dan fitur finansial melalui antarmuka web yang intuitif dan responsif?

## 1.3 Tujuan Penelitian

1. Membangun pipeline analisis teks transaksi menggunakan Sentence-BERT.
2. Menerapkan K-Means untuk otomatisasi pengelompokan pola pengeluaran.
3. Membangun modul forecasting pengeluaran bulanan menggunakan SMA.
4. Mengembangkan fitur budgeting, notifikasi, ekspor laporan, riwayat aktivitas, dan gamifikasi.
5. Mengimplementasikan aplikasi web end-to-end dengan pengalaman pengguna yang baik.

## 1.4 Manfaat Penelitian

### Bagi Pengguna
- Mengurangi beban kategorisasi manual.
- Mendapatkan insight pengeluaran yang lebih relevan.
- Meningkatkan konsistensi pencatatan melalui reminder dan gamifikasi.

### Bagi Akademik
- Menjadi studi kasus integrasi NLP embedding, clustering unsupervised, forecasting sederhana, dan desain produk digital keuangan.

### Bagi Pengembangan Sistem
- Menyediakan fondasi arsitektur modular untuk pengembangan fitur lanjutan pada domain personal finance.

## 1.5 Batasan Masalah

1. Sistem difokuskan pada platform **web**.
2. Analisis utama pada transaksi pengeluaran.
3. Metode ML yang digunakan: Sentence-BERT + K-Means (tanpa perbandingan algoritma lain secara mendalam).
4. Forecasting menggunakan Simple Moving Average sebagai baseline.
5. Mata uang yang didukung: IDR.
6. Fitur clustering dijalankan ketika data transaksi memenuhi ambang minimum.

---

# BAB II TINJAUAN PUSTAKA

## 2.1 Manajemen Keuangan Pribadi Digital

Aplikasi personal finance modern tidak hanya menuntut kemampuan pencatatan, tetapi juga kemampuan analisis perilaku pengeluaran. Tantangan utama yang sering ditemukan adalah friksi input data dan rendahnya retensi pengguna.

## 2.2 Sentence-BERT untuk Embedding Teks

Sentence-BERT merupakan pendekatan representasi kalimat berbasis transformer yang menghasilkan embedding vektor semantik. Dalam konteks transaksi keuangan, embedding memungkinkan deskripsi yang secara makna serupa dipetakan berdekatan di ruang vektor.

## 2.3 K-Means Clustering

K-Means adalah algoritma unsupervised untuk mempartisi data ke dalam sejumlah klaster berdasarkan jarak terhadap centroid. Pada penelitian ini, K-Means digunakan untuk menemukan pola pengeluaran tanpa memerlukan data berlabel.

## 2.4 Evaluasi Clustering

Evaluasi clustering dilakukan menggunakan:
- **Elbow Method** untuk observasi perubahan WCSS terhadap jumlah klaster.
- **Silhouette Score** untuk menilai kualitas pemisahan klaster.
- **User acceptance rate** sebagai evaluasi praktis penerimaan hasil klaster pada pengguna.

## 2.5 Forecasting Simple Moving Average (SMA)

SMA digunakan untuk memprediksi nilai periode berikutnya berdasarkan rata-rata nilai historis dalam jendela tertentu. Metode ini dipilih karena sederhana, mudah dijelaskan, dan sesuai sebagai baseline forecasting.

## 2.6 Gamifikasi

Gamifikasi menerapkan elemen permainan (XP, badge, streak, challenge) pada konteks non-game untuk meningkatkan motivasi dan engagement. Dalam aplikasi keuangan, gamifikasi membantu membentuk kebiasaan pencatatan.

---

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

---

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

---

# BAB V PENUTUP

## 5.1 Kesimpulan

1. Rancangan sistem web manajemen keuangan berbasis analisis pola pengeluaran dapat diwujudkan dengan arsitektur modular client-server.
2. Integrasi Sentence-BERT dan K-Means berpotensi meningkatkan otomatisasi kategorisasi transaksi dan kualitas insight pengguna.
3. Fitur pendukung seperti budget, notifikasi, forecasting, ekspor, dan gamifikasi memperkuat nilai guna sistem secara keseluruhan.
4. Implementasi saat ini telah memiliki fondasi kuat pada skema data dan prototipe antarmuka, dengan pekerjaan lanjutan difokuskan pada integrasi domain end-to-end dan validasi empiris.

## 5.2 Saran Pengembangan

1. Menambahkan eksperimen perbandingan algoritma clustering lain pada fase lanjutan.
2. Menambah model forecasting yang lebih adaptif untuk pola musiman.
3. Menyediakan personalisasi rekomendasi finansial berbasis histori perilaku pengguna.
4. Menambahkan observability lebih dalam (tracing, metrik sistem real-time).

---

# Daftar Pustaka (Ringkas)

1. Reimers, N., & Gurevych, I. Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks. 2019.
2. Kaufman, L., & Rousseeuw, P. J. Finding Groups in Data: An Introduction to Cluster Analysis.
3. Hyndman, R. J., & Athanasopoulos, G. Forecasting: Principles and Practice.
4. Dokumentasi Next.js.
5. Dokumentasi Prisma ORM.
6. Referensi jurnal terkait aplikasi personal finance, machine learning, dan gamifikasi.

---

# Lampiran A — Checklist Implementasi Teknis

## A.1 Backend
- [ ] Modul transaksi (CRUD + filter + pagination)
- [ ] Modul impor CSV
- [ ] Modul analisis (trigger + simpan hasil run + cluster)
- [ ] Modul konfirmasi klaster
- [ ] Modul budget goals
- [ ] Modul forecasting SMA
- [ ] Modul notifikasi + reminder
- [ ] Modul export PDF/Excel
- [ ] Modul activity log
- [ ] Modul gamifikasi

## A.2 Frontend Web
- [ ] Hubungkan seluruh halaman fitur ke API backend
- [ ] Konsolidasi state management dan error handling
- [ ] Integrasi chart analytics dari data nyata
- [ ] Integrasi halaman cluster confirm dengan hasil analisis backend

## A.3 Quality Assurance
- [ ] Unit test service kritikal
- [ ] Integration test endpoint utama
- [ ] Uji performa analisis
- [ ] Uji usability skenario pengguna

---

# Lampiran B — Catatan untuk Sidang/Bimbingan

1. Tekankan kontribusi utama: integrasi NLP embedding + clustering untuk personal finance.
2. Jelaskan bahwa forecasting SMA dipilih sebagai baseline yang interpretatif.
3. Tampilkan hasil metrik kuantitatif (silhouette, durasi) dan kualitatif (acceptance rate).
4. Tunjukkan perbandingan kondisi sebelum dan sesudah fitur otomatisasi.

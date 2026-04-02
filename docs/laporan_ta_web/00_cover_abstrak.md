# Laporan Tugas Akhir (Draft)

## Rancang Bangun Aplikasi Web Manajemen Keuangan Pribadi dengan Analisis Pola Pengeluaran Menggunakan Sentence-BERT dan K-Means Clustering

**Nama**: Pito Desri Pauzi  
**NIM**: 2211083044  
**Program Studi**: Sarjana Terapan Teknologi Rekayasa Perangkat Lunak  
**Institusi**: Politeknik Negeri Padang  
**Tahun**: 2026  

---

## Pernyataan Ruang Lingkup

Dokumen ini disusun dengan fokus implementasi **aplikasi web**. Implementasi aplikasi mobile tidak termasuk dalam cakupan laporan dan pengujian.

---

## Abstrak

Aplikasi manajemen keuangan pribadi pada umumnya masih mengandalkan kategorisasi transaksi secara manual. Proses tersebut memakan waktu, rentan inkonsistensi, dan membatasi kemampuan pengguna dalam menemukan pola pengeluaran yang sebenarnya. Penelitian ini merancang dan membangun aplikasi web manajemen keuangan pribadi yang mampu melakukan analisis pola pengeluaran secara otomatis menggunakan pendekatan machine learning.

Metode utama yang digunakan adalah Sentence-BERT untuk mengubah deskripsi transaksi menjadi representasi vektor semantik (embedding), kemudian K-Means Clustering untuk mengelompokkan transaksi berdasarkan kedekatan makna. Selain itu, sistem dilengkapi fitur budgeting, notifikasi dan reminder, forecasting berbasis Simple Moving Average (SMA), ekspor laporan, riwayat aktivitas, serta gamifikasi untuk meningkatkan konsistensi pengguna.

Arsitektur sistem menerapkan model client-server: frontend dibangun menggunakan Next.js, backend menggunakan Express.js dan Prisma ORM, database PostgreSQL, serta layanan machine learning terpisah berbasis FastAPI. Hasil yang diharapkan adalah aplikasi web yang cerdas, responsif, dan mampu memberikan wawasan finansial yang lebih kontekstual bagi pengguna.

**Kata kunci**: manajemen keuangan pribadi, sentence-bert, k-means clustering, forecasting SMA, gamifikasi, aplikasi web.

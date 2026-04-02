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

1. Sistem difokuskan pada platform web.
2. Analisis utama pada transaksi pengeluaran.
3. Metode ML yang digunakan: Sentence-BERT + K-Means (tanpa perbandingan algoritma lain secara mendalam).
4. Forecasting menggunakan Simple Moving Average sebagai baseline.
5. Mata uang yang didukung: IDR.
6. Fitur clustering dijalankan ketika data transaksi memenuhi ambang minimum.

# Draf Jurnal Ilmiah - Financy Project

**Judul (Bahasa Indonesia):**
Aplikasi Web Manajemen Keuangan dengan Klasterisasi Transaksi Otomatis Menggunakan S-BERT dan Logistic Regression

**Title (English):**
Web-Based Financial Management Application with Automatic Transaction Clustering Using S-BERT and Logistic Regression

---

### ABSTRAK
Pengelolaan keuangan pribadi sangat penting untuk mencapai stabilitas finansial, namun pengguna seringkali terhambat oleh proses kategorisasi transaksi manual yang membosankan. Penelitian ini mengusulkan solusi otomatisasi kategorisasi transaksi pada aplikasi manajemen keuangan berbasis web menggunakan model **Sentence-BERT (S-BERT)** dan algoritma **Logistic Regression**. Berbeda dengan pendekatan konvensional yang kaku, sistem ini mengimplementasikan metode **Incremental Learning** yang memungkinkan model beradaptasi secara dinamis berdasarkan koreksi atau feedback dari pengguna. Deskripsi transaksi diekstraksi menjadi embedding semantik menggunakan S-BERT (varian Multilingual-E5) untuk menangkap konteks makna teks meskipun menggunakan bahasa yang bervariasi atau tidak terstruktur. Hasil klasifikasi kemudian diproses untuk memberikan wawasan keuangan yang personal bagi pengguna. Integrasi fitur feedback loop memastikan akurasi kategorisasi meningkat seiring dengan intensitas penggunaan aplikasi. Hasil dari penelitian ini adalah sebuah aplikasi Personal Financial Management (PFM) cerdas yang mampu meminimalkan interaksi manual pengguna dalam pencatatan transaksi melalui kategorisasi otomatis yang adaptif.

**Kata kunci:** Manajemen Keuangan, S-BERT, Logistic Regression, Incremental Learning, Kategorisasi Otomatis.

---

### ABSTRACT
*Personal financial management is crucial for achieving financial stability, yet users are often hindered by the tedious manual transaction categorization process. This research proposes an automated transaction categorization solution for a web-based financial management application using the **Sentence-BERT (S-BERT)** model and the **Logistic Regression** algorithm. Unlike rigid conventional approaches, this system implements an **Incremental Learning** method that allows the model to adapt dynamically based on user corrections or feedback. Transaction descriptions are extracted into semantic embeddings using S-BERT (Multilingual-E5 variant) to capture the conceptual meaning of text despite varied or unstructured language. The classification results are then processed to provide personalized financial insights for users. The integration of a feedback loop feature ensures that categorization accuracy increases with application usage intensity. The result of this study is an intelligent Personal Financial Management (PFM) application capable of minimizing manual user interaction in transaction recording through adaptive and accurate automatic categorization.*

**Keywords:** Financial Management, S-BERT, Logistic Regression, Incremental Learning, Automatic Categorization.

---

### 1. PENDAHULUAN

Pengelolaan keuangan pribadi (*Personal Financial Management*) merupakan aspek krusial dalam mencapai stabilitas ekonomi individu. Secara ideal, setiap individu diharapkan memiliki catatan keuangan yang terstruktur untuk membantu pengambilan keputusan finansial yang tepat. Perkembangan teknologi *Progressive Web App* (PWA) saat ini telah memungkinkan aplikasi pencatatan keuangan diakses secara fleksibel lintas perangkat dengan performa menyerupai aplikasi natif, yang seharusnya meningkatkan disiplin pengguna dalam melakukan pencatatan.

Namun, efektivitas aplikasi PFM sering kali terhambat oleh beban kognitif pengguna dalam proses kategorisasi transaksi manual [3]. Masalah ini menjadi lebih kompleks ketika pengguna harus menangani volume data transaksi yang besar, misalnya saat melakukan migrasi data melalui fitur *import* CSV. Tanpa sistem otomatisasi yang cerdas, pengguna harus menentukan kategori untuk ratusan baris transaksi secara satu per satu. Selain itu, deskripsi transaksi yang tidak terstruktur dan penggunaan bahasa yang variatif membuat sistem berbasis aturan (*rule-based*) tradisional sering kali gagal melakukan klasifikasi secara akurat. Jika masalah ini tidak ditangani, aplikasi PFM hanya akan menjadi beban tambahan bagi pengguna daripada memberikan solusi efisiensi.

Mengingat tantangan tersebut, penelitian ini mengusulkan solusi melalui pengembangan aplikasi Financy yang mengintegrasikan model *Sentence-BERT* (S-BERT) dan algoritma *Logistic Regression*. Solusi ini unik karena tidak hanya menawarkan kategorisasi otomatis berbasis makna semantik [1], tetapi juga menyediakannya dalam platform PWA yang ringan dan responsif. Mekanisme *Incremental Learning* yang diimplementasikan memastikan sistem dapat beradaptasi secara mandiri dari koreksi pengguna. Dengan integrasi ini, Financy diharapkan mampu meminimalkan hambatan interaksi manual dan memberikan otomatisasi yang cerdas bahkan untuk pengolahan data transaksi dalam skala besar.

---

### 2. METODOLOGI PENELITIAN

#### 2.1. Arsitektur Sistem
Aplikasi dibangun menggunakan arsitektur *Client-Server*. Sisi klien menggunakan *Next.js* yang dikonfigurasi sebagai *Progressive Web App* (PWA) untuk memastikan aksesibilitas tinggi. Sisi server menggunakan *Python FastAPI* untuk melayani permintaan klasifikasi secara *real-time*. Komunikasi antar layanan dilakukan melalui protokol RESTful API, memungkinkan pemisahan beban komputasi AI dari antarmuka pengguna.

#### 2.2. Ekstraksi Fitur Semantik (S-BERT)
Teks transaksi diproses melalui pipa data (*pipeline*) yang terdiri dari *case folding*, pembersihan karakter khusus, dan penghapusan *stop words*. Data yang telah dibersihkan kemudian diubah menjadi vektor numerik menggunakan model S-BERT dengan varian *Multilingual-E5*. Model ini dipilih karena kemampuannya menangkap konteks semantik Bahasa Indonesia dengan sangat baik, sehingga deskripsi transaksi yang berbeda namun memiliki makna serupa akan berada dalam jarak vektor yang berdekatan [1].

#### 2.3. Klasifikasi dan Incremental Learning
Vektor hasil S-BERT diklasifikasikan ke dalam kategori keuangan menggunakan algoritma *Logistic Regression*. Inovasi utama dalam metodologi ini adalah penerapan *Incremental Learning*. Setiap koreksi kategori yang dilakukan oleh pengguna melalui antarmuka disimpan dalam berkas *feedback*. Sistem secara periodik melakukan pelatihan ulang (*retraining*) model *classifier* di latar belakang menggunakan akumulasi data koreksi tersebut, sehingga model menjadi semakin personal dan akurat seiring waktu [3].

---

### 3. HASIL DAN PEMBAHASAN

#### 3.1. Implementasi Antarmuka PWA
Aplikasi Financy berhasil diimplementasikan dengan antarmuka yang responsif. Fitur PWA memungkinkan pengguna menginstal aplikasi langsung dari peramban, memberikan akses cepat dan kemampuan bekerja secara luring (*offline*). Dashboard utama menyajikan ringkasan keuangan dan tren pengeluaran yang datanya diperbarui secara otomatis berdasarkan hasil klasifikasi AI.

#### 3.2. Pengujian Fitur Import CSV dan Otomatisasi
Pengujian pada fitur *Import* CSV menunjukkan efektivitas sistem dalam menangani data massal. Saat pengguna mengunggah berkas transaksi, sistem mampu melakukan kategorisasi otomatis untuk seluruh baris data dalam waktu singkat (rata-rata di bawah 2 detik untuk 100 transaksi). Hal ini secara signifikan mengurangi waktu yang dibutuhkan pengguna dibandingkan dengan metode kategorisasi manual.

#### 3.3. Analisis Feedback Loop
Hasil pengujian mekanisme *feedback* menunjukkan bahwa model *Logistic Regression* dapat diperbarui tanpa mengganggu stabilitas sistem. Proses *retraining* yang berjalan sebagai *background task* memastikan pengguna tetap dapat menggunakan aplikasi tanpa jeda (*lag*). Dengan bertambahnya data koreksi, tingkat kesalahan prediksi pada deskripsi transaksi yang serupa terbukti menurun, menunjukkan bahwa sistem berhasil melakukan adaptasi terhadap preferensi kategori unik pengguna.

---

### 4. KESIMPULAN

Penelitian ini berhasil mengembangkan aplikasi manajemen keuangan cerdas "Financy" yang mengintegrasikan teknologi S-BERT dan *Logistic Regression* untuk otomatisasi kategorisasi transaksi. Penggunaan PWA memberikan aksesibilitas yang luas bagi pengguna, sementara fitur kategorisasi otomatis berhasil mengatasi hambatan beban kognitif dalam pencatatan manual, terutama pada pengolahan data berskala besar seperti fitur *import* CSV. Mekanisme *Incremental Learning* terbukti efektif dalam membuat sistem menjadi lebih adaptif dan personal. Pengembangan selanjutnya dapat difokuskan pada pengayaan dataset klasifikasi dan integrasi fitur peramalan (*forecasting*) yang lebih kompleks untuk memberikan wawasan finansial yang lebih mendalam bagi pengguna.

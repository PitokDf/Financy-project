# BAB IV IMPLEMENTASI DAN PENGUJIAN

## 4.1 Implementasi

### 4.1.1 Lingkungan Implementasi
Pada tahap ini, website dihosting dengan menggunakan lingkungan perangkat sebagai berikut:

**Tabel 4. 1 Spesifikasi perangkat implementasi**

| Nama | Spesifikasi |
| :--- | :--- |
| Server | Virtual Private Server (VPS) |
| Lokasi Server | Malaysia - Kuala Lumpur |
| Sistem Operasi | Ubuntu 24.04 LTS |
| CPU Core | 4 |
| RAM | 16 GB |
| Storage | 200 GB |

### 4.1.2 Implementasi Pengembangan Aplikasi

**1. Implementasi Frontend**
Implementasi pada frontend menggunakan architecture domain driven design (DDD) menggunakan Nuxt.js, dengan struktur folder sebagai berikut:
a) Infrastructure berisikan konfigurasi untuk berkomunikasi dengan backend. Di dalamnya terdapat bagian http yang mendefinisikan klien HTTP untuk proses interaksi ke API dan menyimpan daftar route backend.
b) Domain berisikan struktur data utama aplikasi. Terdapat folder models yang menyimpan sekumpulan interface untuk mendefinisikan bentuk tipe data secara statis, baik untuk data request yang dikirimkan ke server maupun struktur response (hasil) yang diterima dari server.
c) Application berfungsi sebagai pusat pengatur logika bisnis dan state (status) aplikasi. Terdapat tiga bagian utama di dalamnya:
   1) Services: Bertugas sebagai penghubung komunikasi API (dari infrastructure) dengan tampilan antarmuka. Bagian ini berisikan fungsi-fungsi untuk memproses, mengambil, dan memanipulasi data sebelum diserahkan ke antarmuka pengguna.
   2) Stores: Digunakan untuk menyimpan data yang dibutuhkan di berbagai halaman yang berbeda (contohnya menyimpan sesi pengguna yang sedang login).
   3) Utils: Kumpulan fungsi helper untuk menangani format logika yang sering digunakan berulang kali seperti mengatur tema.
d) Presentation (Pages dan Components)
   1) Pages: Direktori yang berisikan file-file tampilan untuk merepresentasikan satu halaman di dalam aplikasi. Struktur dalam direktori ini digunakan untuk membangun sistem perpindahan halaman (routing) secara otomatis yang merupakan bawaan dari Nuxt.js.
   2) Components: Berisikan kumpulan komponen antarmuka yang reusable (dapat digunakan berulang kali) untuk membentuk tampilan halaman.
e) Composables, Layouts, Middleware dan Plugins Merupakan kumpulan direktori pendukung fungsionalitas framwork Nuxt.js:
   1) Composables: Untuk menyimpan fungsi-fungsi logika antarmuka yang bisa dipakai dan dipanggil kembali di berbagai komponen.
   2) Layouts: Berfungsi mengatur kerangka dasar tata letak halaman (seperti kerangka tetap untuk sidebar, header, atau footer).
   3) Middleware: Berfungsi sebagai pembatas sebelum masuk ke suatu halaman, contohnya untuk mencegah pengguna yang belum login mengakses halaman dashboard.

Kode frontend diupload ke repositori GitHub. Selanjutnya, proses deployment ke server dijalankan dengan memanfaatkan Jenkins sebagai continuous integration (CI) dan ArgoCD sebagai continuous delivery (CD). Kedua tools tersebut telah terintegrasi ke dalam sistem melalui kontainerisasi menggunakan Docker. Tampilan halaman frontend website dapat diakses melalui link berikut: https://zamfis.nekosukuriputo.dev/

**2. Implementasi Backend**
Implementasi pada backend menggunakan architecture service, route, controller dengan Express.js, struktur folder sebagai berikut:
a) Folder config berisi pengaturan dan konfigurasi inti aplikasi. Direktori ini menangani hal - hal seperti konfigurasi koneksi database.
b) Folder controllers Tempat menampung controller yang berperan sebagai pusat kendali untuk menerima request HTTP.
c) Folder errors digunakan untuk menyimpan pengaturan sistem penanganan error
d) Folder middlewares digunakan untuk keamanan, seperti memvalidasi token otentikasi (auth middleware) atau mencegah pengiriman permintaan berulang (rate limiter).
e) Folder routes berfungsi sebagai pengatur endpoint API.
f) Folder services digunakan untuk mengatur seluruh alur kerja dan logika bisnis utama aplikasi.
g) Folder templates Tempat digunakan untuk template, khususnya untuk kerangka dasar dokumen HTML yang akan dikirim melalui sistem email aplikasi.
h) Folder utils berisi kumpulan fungsi yang bersifat penting seperti hashing password.
i) Folder validator berfungsi sebagai aturan validasi input pada backend.
j) Folder prisma digunakan untuk arsitektur tabel database di dalam aplikasi menggunakan Prisma ORM.

Terdapat total 65 endpoint untuk mengintegrasikan backend dengan tampilan website, yang meliputi proses authentifikasi, user, keuangan atau transaksi, media pembayaran, jenis kas, konten, favorit transaksi, kelompok kurban, dan peserta kurban.

Kode backend diupload ke repositori GitHub. Selanjutnya, proses deployment ke server dijalankan dengan memanfaatkan Jenkins sebagai continuous integration (CI) dan ArgoCD sebagai continuous delivery (CD). Kedua tools tersebut telah terintegrasi ke dalam sistem melalui kontainerisasi menggunakan Docker. Pada proses build kontainer, skema basis data didapatkan secara otomatis melalui perintah migrate dari Prisma ORM yang dijalankan di dalam Dockerfile, sedangkan environment variable dikonfigurasi pada pengaturan server.

Backend yang digunakan sebagai API dalam sistem dapat diakses melalui link berikut: https://zamfis-backend.nekosukuriputo.dev, dan dokumentasi seluruh API dapat diakses melalui link berikut: https://documenter.getpostman.com/view/24259787/2sBXwvKpAj

**3. Implementasi Menggunakan Model**
Prediksi pada sistem dibuat secara terpisah (microservice) REST API menggunakan bahasa pemrograman Python dengan framework Flask. layanan akan menerima data transaksi historis dari sistem backend utama, lalu mengolahnya menjadi angka proyeksi peramalan yang mempertimbangkan efek atau lonjakan pada fitur penanggalan seperti hari besar islam sebelum hasil akhir prediksi dikembalikan kepada pengguna dalam format JSON.

Kode service model diupload ke repositori GitHub. Selanjutnya, sama seperti backend, service model ini juga menggunakan Jenkins sebagai continuous integration (CI) dan ArgoCD sebagai continuous delivery (CD). Endpoint dari service model ini dipanggil melalui sistem backend utama yang bertindak sebagai perantara antara antarmuka pengguna dan sistem prediksi. Service model dapat diakses belalui link berikut: https://zamfis-model.nekosukuriputo.dev

**4. Integrasi Sistem**
Setelah semua modul selesai dikembangkan secara terpisah, dilakukan proses integrasi untuk memastikan komunikasi antara tampilan web dan server berjalan lancar. Berikut adalah alur komunikasi yang terjadi:
a) Pengguna melakukan aksi dengan menjalankan fitur yang ada di frontend.
b) Frontend melakukan pemanggilan terhadap endpoint pada backend yang berkaitan dengan fitur tersebut.
c) Backend mengambil informasi dari database.
d) Khusus untuk fitur peramalan, backend melakukan pemanggilan ke service model untuk diproses, kemudian menerima hasil prediksi dalam format JSON.
e) Hasil dikirim kembali ke frontend dalam format JSON.
f) Frontend menampilkan hasil kepada pengguna.

**5. Tampilan Antarmuka Aplikasi**
Gambar 4.1 menunjukan hasil implementasi dari tampilan halaman beranda, yang ditampilkan sebagai halaman pertama saat membuka website Zamfis. Tampilan ini menampilkan foto surau dan juga ucapan selamat datang di website surau. Selanjutnya hasil implementasi jadwal shalat dapat dilihat pada gambar 4.2, dimana jadwal shalat yang ditampilkan disini adalah untuk wilayah Padang dan sekitarnya menggunakan API dari myquran.com.

*Gambar 4. 1 Halaman beranda*

*Gambar 4. 2 Halaman jadwal shalat*

Selanjutnya, Gambar 4.3 menampilkan bagian landing page yang memuat sejarah Surau, sedangkan Gambar 4.4 menampilkan riwayat transaksi dan donasi yang tercatat pada Surau. Pada halaman tersebut, pengguna dapat melakukan filter transaksi serta melakukan pencarian transaksi berdasarkan uraian.

*Gambar 4. 3 Halaman sejarah surau*

*Gambar 4. 4 Halaman riwayat transaksi*

Pada gambar 4.5 menampilkan halaman kurban yang berisi daftar peserta kurban Surau, pengguna juga dapat memfilter data peserta berdasarkan tahun pelaksanaan. Gambar 4.6 menampilkan halaman Berita dan Artikel yang memuat informasi terkini seputar kegiatan Surau Zam Zam.

*Gambar 4. 5 Halaman kurban*

*Gambar 4. 6 Halaman berita*

Pada Gambar 4.7 menampilkan halaman susunan struktur pengurus Surau Zam-Zam. Kemudian pada Gambar 4.8 menampilkan halaman Imsakiyah yang memuat jadwal imsakiyah selama bulan Ramadan. Jadwal imsakiyah tersebut juga dapat diunduh oleh pengguna melalui tombol download Imsakiyah.

*Gambar 4. 7 Halaman pengurus*

*Gambar 4. 8 Halaman imsakiyah*

Gambar 4.9 menunjukan tampilan halaman login, pengguna diminta untuk memasukan email dan password yang sudah tedaftar pada sistem. Pada gambar 4.10 menampilkan implementasi halaman lupa password pengguna diminta untuk memasukkan email yang sudah terdaftar, kemudian backend mengirim link verifikasi ke email tersebut.

*Gambar 4. 9 Halaman login*

*Gambar 4. 10 Halaman lupa password*

Gambar 4.11 menampilkan halaman reset password setelah pengguna melakukan verifikasi melalui link verifikasi yang dikirimkan melalui email. Jika email dan password sesuai maka pengguna dapat masuk ke halaman dashboard yang ditampilkan pada gambar 4.12. Halaman dashboard berisi informasi jumlah saldo kas saat ini sesuai jenis kas, terdapat juga grafik chart uang masuk dan uang keluar pada masing masing jenis kas, pengguna dapat melakukan filter tahun sesuai dengan keinginan ingin melihat grafik tahun berapa ataupun menampilkan grafik pertahun dari seluruh kas yang ada.

*Gambar 4. 11 Halaman lupa password (reset password)*

*Gambar 4. 12 Halaman dashboard*

Pada halaman dashboard bagian paling bawah terdapat tombol untuk mengarah ke halaman prediksi yang ditampilkan pada gambar 4.13. Pada halaman prediksi ini pengguna dapat memilih prediksi uang masuk atau uang keluar, setelah dipilih maka akan tampil halaman hasil prediksi yang ditampilkan pada gambar 4.14.

*Gambar 4. 13 Halaman prediksi*

*Gambar 4. 14 Halaman hasil prediksi*

Setelah melalukan prediksi, khusus untuk prediksi uang masuk pengguna dapat melakukan atur budget prediksi yang ditampilkan pada gambar 4.15. Selain itu pengguna dapat menyimpan hasil prediksi yang dapat dilihat kembali pada halaman riwayat prediksi yang ditampilkan pada gambar 4.16.

*Gambar 4. 15 Halaman atur budget prediksi*

*Gambar 4. 16 Halaman riwayat prediksi*

Gambar 4.17 menampilkan halaman laporan keuangan, pada menu ini pengguna dapat melakukan filter untuk mencari laporan, filter bisa perbulan, pertahun jenis kas tertentu ataupun pada rentang waktu tertentu. Selain itu pengguna juga dapat melakukan export ke dalam format Excel.

*Gambar 4. 17 Halaman laporan keuangan*

Untuk menambah data keuangan pengguna dapat mengakses menu keuangan yang ditampilkan pada gambar 4.18. Pada halaman keuangan pengguna dapat mencari berdasarkan uraian, mengedit, menghapus, memulihkan laporan, maupun menghapus laporan permanent dari database. Jika pengguna klik tombol tambah data keuangan maka akan tampil form yang dapat disisi ditampilkan pada gambar 4.19, pada halaman ini pengguna juga dapat langsung memasukan uraian favorit melalui tombol Bintang disebelah kolom uraian. Jika pengguna melakukan edit data maka akan muncul popup untuk mengedit data yang ditampilkan pada gambar 4.20.

*Gambar 4. 18 Halaman keuangan*

*Gambar 4. 19 Halaman tambah data keuangan*

*Gambar 4. 20 Halaman edit data keuangan*

Gambar 4.21 menampilkan implementasi dari halaman jenis kas. Pengguna dapat melakukan tambah data jenis kas menggunakan tombol tambah jenis kas, kemudian akan menampilkan form yang dapat disisi sesuai pada gambar 4.22, jika pengguna ingin mengedit jenis kas maka akan menampilkan popup edit data ditampilkan pada gambar 4.23. Pengguna juga dapat menyimpan ke draft menggunakan hapus, dan dapat memulihkan kembali.

*Gambar 4. 21 Halaman jenis kas*

*Gambar 4. 22 Halaman tambah jenis ka*

*Gambar 4. 23 Halaman edit jenis kas*

Gambar 4.24 menampilkan implementasi dari halaman media pembayaran. Pengguna dapat melakukan tambah data media pembayaran menggunakan tombol tambah media pembayaran, kemudian akan menampilkan form yang dapat disisi sesuai pada gambar 4.25 contohnya seperti: cash, bank nagari, dan lain - lain, jika pengguna ingin mengedit media pembayaran maka akan menampilkan popup edit data ditampilkan pada gambar 4.26. Pengguna juga dapat menyimpan ke draft menggunakan hapus, dan dapat memulihkan kembali.

*Gambar 4. 24 Halaman media pembayaran*

*Gambar 4. 25 Halaman tambah media pembayaran*

*Gambar 4. 26 Halaman edit media pembayaran*

Gambar 4.27 menampilkan implementasi dari halaman konten, pada halaman ini pengguna dapat memilih publish atau tidak sebuah konten dengan menekan button di kolom status. Pengguna dapat melakukan tambah data konten menggunakan tombol tambah konten, kemudian akan menampilkan form yang dapat disisi sesuai pada gambar 4.28 khusus untuk jenis konten seperti imsakiyah, pengurus dan sejarah hanya bisa dibuat satu saja karena di bagian landing page hanya terdiri dari satu konten. Jika pengguna ingin mengedit konten maka akan menampilkan popup edit data ditampilkan pada gambar 4.29. Pengguna juga dapat menyimpan ke draft menggunakan hapus, dan memulihkan kembali. Khusus untuk menu konten data yang sudah dihapus otomatis terhapus dari database setelah 30 hari dihapus oleh pengguna, hal ini dilakukan untuk menghemat penyimpanan server.

*Gambar 4. 27 Halaman konten*

*Gambar 4. 28 Halaman tambah konten*

*Gambar 4. 29 Halaman edit konten*

Gambar 4.30 menampilkan implementasi dari halaman favorit transaksi. Pengguna dapat melakukan tambah data favorit menggunakan tombol tambah favorit, kemudian akan menampilkan form yang dapat disisi sesuai pada gambar 4.31, selain tambah melalui menu favorit pengguna juga dapat menambahkan favorit saat menambahkan data keuanan pada kolom uraian. Jika pengguna ingin mengedit favorit maka akan menampilkan popup edit data ditampilkan pada gambar 4.32. Pengguna juga dapat menyimpan ke draft menggunakan hapus, dan dapat memulihkan kembali.

*Gambar 4. 30 Halaman favorit transaksi*

*Gambar 4. 31 Halaman tambah favorit*

*Gambar 4. 32 Menu edit favorit*

Gambar 4.33 menampilkan implementasi dari halaman kelompok kurban, pada halaman ini pengguna dapat mencari nama kelompok dan juga dapat memfilter berdasarkan tahun. Pengguna dapat melakukan tambah kelompok kurban menggunakan tombol tambah kelompok kurban, kemudian akan menampilkan form yang dapat disisi sesuai pada gambar 4.34. Jika pengguna ingin mengedit maka akan menampilkan popup edit data ditampilkan pada gambar 4.35. Pengguna juga dapat menyimpan ke draft menggunakan hapus, dan dapat memulihkan kembali kelompok kurban.

*Gambar 4. 33 Halaman kelompok kurban*

*Gambar 4. 34 Halaman tambah kelompok kurban*

*Gambar 4. 35 Halaman edit kelompok kurban*

Gambar 4.36 menampilkan implementasi dari halaman peserta kurban, pada halaman ini pengguna dapat mencari nama peserta dan juga dapat memfilter berdasarkan tahun dan juga mencari nama peserta. Pengguna dapat melakukan tambah kelompok kurban menggunakan tombol tambah peserta, kemudian akan menampilkan form yang dapat disisi sesuai pada gambar 4.34, peserta kurban bisa dibuat hanya ketika sudah ada menambahkan kelompok kurban sebelumnya. Jika pengguna ingin mengedit maka akan menampilkan popup edit data ditampilkan pada gambar 4.35. Pengguna juga dapat menyimpan ke draft menggunakan hapus, dan dapat memulihkan kembali kelompok kurban.

*Gambar 4. 36 Halaman peserta kurban*

*Gambar 4. 37 Halaman tambah peserta kurban*

*Gambar 4. 38 Halaman edit peserta kurban*

Gambar 4.39 menampilkan implementasi dari halaman user, pada halaman ini pengguna dapat mencari nama user, menonaktifkan suatu akun menggunakan tombol pada kolom status. Pengguna dapat melakukan tambah kelompok kurban menggunakan tombol tambah pengguna, kemudian akan menampilkan form yang dapat disisi sesuai pada gambar 4.40, setelah menambah akun maka link verifikasi akan terkirim melalui email, kemudian baru pengguna bisa login. Jika pengguna ingin mengedit maka akan menampilkan popup edit data ditampilkan pada gambar 4.41. Pengguna juga dapat menghapus akun menggunakan tombol hapus pada halaman user.

*Gambar 4.39 Halaman user*

*Gambar 4. 40 Halaman tambah user*

*Gambar 4. 41 Halaman edit user*

Gambar 4.42 adalah implementasi dari halaman setting, pada halaman ini pengguna dapat merubah foto profil, nama, ataupun mengganti kata sandi baru akun pengguna.

*Gambar 4. 42 Halaman setting*

## 4.2 Pengujian

### 4.2.1 Pengujian Blackbox
Pengujian dilakukan menggunakan laptop Lenovo LOQ 15IRX9 dengan browser Google Chrome pada sistem yang telah dihosting dan terhubung dengan jaringan internet. Tabel 4.2 menunjukkan hasil pengujian terhadap fitur yang berkaitan dengan autentikasi seperti, login, lupa password dan logout.

**Tabel 4. 2 Pengujian fitur autentikasi**

| Proses yang diuji | Output yang diharapkan | Aktual output | Status |
| :--- | :--- | :--- | :--- |
| Login | Semua form email dan password harus terisi sebelum mengklik tombol login | Muncul pesan form harus diisi. | Sesuai |
| Login | Muncul pesan email tidak terdafar saat input email yang tidak ada di database. | Muncul pesan bahwa email belum terdaftar. | Sesuai |
| Login | Muncul pesan error password salah saat input password yang salah. | Muncul pesan bahwa password salah | Sesuai |
| Login | Masuk ke menu dashboard saat memasukkan email dan password yang benar | Muncul pemberitahuan login berhasil dan masuk bisa masuk ke dashboard. | Sesuai |
| Lupa password | Muncul pesan bahwa email tidak terdaftar saat memasukkan email yang belum ada pada database. | Muncul pesan email tidak terdaftar. | Sesuai |
| Lupa password | Mengirim email verifikasi ketika memasukkan email yang benar | Muncul pesan di email untuk reset password | Sesuai |
| Reset password | Masuk kehalaman reset password ketika klik link verifikasi dari email. | Masuk kehalaman reset password. | Sesuai |
| Reset password | Berhasil masuk kehalaman login ketika sudah reset password dan login dengan password baru. | Muncul pesan berhasil reset password dihalaman login dan berhasil login dengan password baru | Sesuai |
| Logout | Menuju halaman beranda profil surau ketika klik logout | Menuju kehalaman beranda profil surau | Sesuai |

Hasil pengujian pada halaman dashboard dan prediksi dapat dilihat pada tabel 4.3 berikut ini:

**Tabel 4. 3 Pengujian fitur halaman dashboard dan prediksi**

| Proses yang diuji | Output yang diharapkan | Aktual output | Status |
| :--- | :--- | :--- | :--- |
| Dashoard | Saat memilih filter tahun, tampil grafik tahun tersebut dan jumlah uang masuk dan uang keluar perbulan pada tahun tersebut. | Grafik berubah sesuai data tahun yang dipilih | Sesuai |
| Prediksi | Saat mengklik tombol buka halaman prediksi pindah kehalaman prediksi | Pindah ke halaman prediksi | Sesuai |
| Prediksi | Saat klik prediksi uang keluar tampil hasil prediksi | Muncul hasil prediksi uang keluar | Sesuai |
| Prediksi | Saat klik tombol simpan prediksi, hasil prediksi uang keluar tersimpan ke halaman Riwayat prediksi | Hasil prediksi tersimpan ke halaman riwayat | Sesuai |
| Prediksi | Saat klik prediksi uang masuk tampil hasil prediksi. | Muncul hasil prediksi uang masuk | Sesuai |
| Prediksi | Saat klik simpan hasil prediksi uang masuk masuk kehalaman atur rencana anggaran hasil prediksi dan bisa rencana anggaran melalui form. | Pindah ke halaman atur budget dan bisa isi form atur rencana anggaran. | Sesuai |
| Prediksi | Saat klik simpan rencana anggaran, hasil tersimpan dan pindah kehalaman riwayat prediksi. | Hasil tersimpan ke halaman riwayat prediksi. | Sesuai |
| Prediksi | Saat klik rencana anggaran di halaman Riwayat prediksi bisa melalukan edit data rencana anggaran. | Tampil rencana sebelumnya dan bisa mengedit atau menambahkan rencana yang baru. | Sesuai |
| Prediksi | Saat, hapus prediksi di halaman riwayat prediksi muncul pesan konfirmasi hapus kemudian hasil prediksi terhapus | Muncul pesan konfirmasi hapus prediksi dan prediksi bisa dihapus | Sesuai |

Hasil pengujian pada halaman laporan kauangan dapat dilihat pada tabel 4.4 berikut ini:

**Tabel 4. 4 Pengujian fitur halaman laporan keuangan**

| Proses yang diuji | Output yang diharapkan | Aktual output | Status |
| :--- | :--- | :--- | :--- |
| Halaman laporan keuangan | Saat memilih filter search, tahun ataupun jenis kas tertentu tampil hasil filter yang berkaitan beserta jumlah kas sesuai pencarian. | Tampil hasil pencarian dengan keyword idul untuk jenis kas surau dan tahun 2024 beserta jumlahnya. | Sesuai |
| Halaman laporan keuangan | Jika klik tombol export Excel maka akan muncul popup format export | Muncul popup format export | Sesuai |
| Halaman laporan keuangan | Ketika pengguna klik tombol export sekarang file Excel laporan terdownload | File Excel terdownload otomatis. | Sesuai |

Hasil pengujian pada halaman keuangan dapat dilihat pada tabel 4.5 berikut ini:

**Tabel 4. 5 Pengujian fitur halaman keuangan**

| Proses yang diuji | Output yang diharapkan | Aktual output | Status |
| :--- | :--- | :--- | :--- |
| Halaman keuangan | Ketika masukan keyword pada fitur search muncul hasil dari keyword | Muncul hasil search keyword | Sesuai |
| Halaman keuangan | Ketika klik tombol tambah keuanan maka akan pindah kehalaman tambah data keuangan, pengguna juga bisa langsung menambahkan uraian favorit serta bisa menambah data baru. | Muncul halaman tambah data keuangan dan beserta form yang harus diisi, kemudian ketika klik simpan maka data akan tersimpan. | Sesuai |
| Halaman keuangan | Ketika klik aksi edit maka akan muncul popup edit data kemudian data akan berhasil tersimpan jika diedit | Muncul popup edit data dan data bisa diedit. | Sesuai |
| Halaman keuangan | Ketika klik aksi hapus akan muncul pesan konfirmasi dan data pindah ke draft. | Muncul pesan konfirmasi, data yang sudah dihapus pindah ke draft | Sesuai |
| Halaman keuangan | Ketika data dihapus atau pada tab draft maka data tidak masuk perhitungan di halaman dashboard | Data 100jt yang dimasukkan tado tidak masuk pehitungan dashboard. | Sesuai |
| Halaman keuangan | Saat di tab draft data bisa dipulihkan dengan klik aksi pulihkan | Muncul pesan konfirmasi dan data bisa dipulihkan. | Sesuai |

Hasil pengujian pada halaman jenis kas dan media pembayaran dapat dilihat pada tabel 4.6 berikut ini:

**Tabel 4. 6 Pengujian fitur halaman jenis kas dan media pembayaran**

| Proses yang diuji | Output yang diharapkan | Aktual output | Status |
| :--- | :--- | :--- | :--- |
| Halaman jenis kas dan media pembayaran | Ketika masukan keyword pada fitur search muncul hasil dari keyword | Muncul hasil search keyword | Sesuai |
| Halaman jenis kas dan media pembayaran | Ketika klik tombol tambah maka akan pindah kehalaman tambah data dan bisa menambah data baru. | Muncul halaman tambah data dan beserta form yang harus diisi, kemudian ketika klik simpan maka data akan tersimpan. | Sesuai |
| Halaman jenis kas dan media pembayaran | Ketika klik aksi edit maka akan muncul popup edit data kemudian data akan berhasil tersimpan jika diedit | Muncul popup edit data dan data bisa diedit. | Sesuai |
| Halaman jenis kas dan media pembayaran | Ketika klik aksi hapus akan muncul pesan konfirmasi dan data pindah ke draft. | Muncul pesan konfirmasi, data yang sudah dihapus pindah ke draft. | Sesuai |
| Halaman jenis kas dan media pembayaran | Saat di tab draft data bisa dipulihkan dengan klik aksi pulihkan. | Muncul pesan konfirmasi dan data sudah dipulihkan. | Sesuai |

Hasil pengujian pada halaman konten untuk landing page dapat dilihat pada tabel 4.7 berikut ini:

**Tabel 4. 7 Pengujian fitur halaman konten**

| Proses yang diuji | Output yang diharapkan | Aktual output | Status |
| :--- | :--- | :--- | :--- |
| Halaman konten | Ketika masukan keyword pada fitur search muncul hasil dari keyword | Muncul hasil search keyword | Sesuai |
| Halaman konten | Ketika klik tombol tambah content maka akan pindah kehalaman tambah kontent dan bisa menambah data baru. | Muncul halaman tambah konten dan beserta form yang harus diisi, kemudian ketika klik simpan maka data akan tersimpan. | Sesuai |
| Halaman konten | Untuk jenis konten imsakiyah, pengurus dan sejarah hanya bisa dibuat satu saja. | Jenis konten imsakiyah, pengurus dan sejarah tidak bisa dipilih karena sudah ada. | Sesuai |
| Halaman landing page berita | Konten yang baru saja ditambahkan muncul pada halaman lending page. | Berita yang baru ditambahkan muncul pada landing page | Sesuai |
| Halaman konten | Ketika mengklik tombol di kolom status, muncul pesan konfirmasi dan kontent tidak dipublish dan tidak tampil di landing page | Status konten jadi draft dan tidak muncul di landing page | Sesuai |
| Halaman konten | Ketika klik aksi edit maka akan muncul popup edit data kemudian data akan berhasil tersimpan jika diedit | Muncul popup edit data dan data bisa diedit. | Sesuai |
| Halaman konten | Ketika klik aksi hapus akan muncul pesan konfirmasi dan data pindah ke draft dan data tidak tampil di landing. | Muncul pesan konfirmasi dan data pindah ke tab draft dan tidak tampil di landing page. | Sesuai |
| Halaman konten | Saat di tab draft data bisa dipulihkan dengan klik aksi pulihkan. | Muncul pesan konfirmasi dan data bisa dipulihkan. | Sesuai |

Hasil pengujian pada halaman favorit transaksi dapat dilihat pada tabel 4.8 berikut ini:

**Tabel 4. 8 Pengujian fitur halaman favorit transaksi**

| Proses yang diuji | Output yang diharapkan | Aktual output | Status |
| :--- | :--- | :--- | :--- |
| Halaman favorit transaksi | Ketika masukan keyword pada fitur search muncul hasil dari keyword | Muncul hasil search keyword | Sesuai |
| Halaman favorit transaki | Ketika klik tombol tambah favorit maka akan pindah kehalaman tambah favorit dan bisa menambah data baru. | Muncul halaman tambah jenis kas dan beserta form yang harus diisi, kemudian ketika klik simpan maka data akan tersimpan. | Sesuai |
| Halaman favorit transaki | Sesudah menambahkan favorit maka data masuk ke menu tambah keuangan kolom uraian dan bisa langsung digunakan | Favorit terbaru muncul di halaman tambah data keuangan bagian kolom uraian. | Sesuai |
| Halaman favorit transaki | Ketika klik aksi edit maka akan muncul popup edit data kemudian data akan berhasil tersimpan jika diedit | Muncul popup edit data dan data bisa diedit. | Sesuai |
| Halaman favorit transaki | Ketika klik aksi hapus akan muncul pesan konfirmasi dan data pindah ke draft. | Muncul pesan konfirmasi dan data terhapus | Sesuai |

Hasil pengujian pada halaman kelompok kurban dan peserta kurban dapat dilihat pada tabel 4.9 berikut ini:

**Tabel 4. 9 Pengujian fitur halaman kelompok kurban dan peserta kurban**

| Proses yang diuji | Output yang diharapkan | Aktual output | Status |
| :--- | :--- | :--- | :--- |
| Halaman kelompok kurban dan peserta kurban | Ketika masukan keyword pada fitur search muncul hasil dari keyword | Muncul hasil search keyword | Sesuai |
| Filter pada halaman peserta kurban | Saat memasukkan filter pada halaman peserta kurban hasil sesuai dengan filter yang diterapkan | Hasil data sesuai dengan filter yang diterapkan | Sesuai |
| Halaman kelompok kurban dan peserta kurban | Ketika klik tombol tambah data maka akan pindah kehalaman tambah data dan bisa menambah data baru. | Muncul halaman tambah data dan beserta form yang harus diisi, kemudian ketika klik simpan maka data akan tersimpan. | Sesuai |
| Halaman peserta kurban | Ketika memasukkan tahun yang salah belum ada kelompok kurban maka opsi tipe kurban kelompok maka tidak bisa disimpan harus membuat kelompok terlebih dahulu | Muncul pesan silahkan pilih kelompok kurban dan tidak bisa disimpan | Sesuai |
| Halaman peserta kurban | Ketika memilih tipe kurban kelompok maksimal hanya bisa 7 orang | Maksimal perkelompok kurban hanya bisa 7 orang, setelah 7 orang maka kelompok tersebut tidak bisa dipilih | Sesuai |
| Halaman kelompok kurban dan peserta kurban | Ketika klik aksi edit maka akan muncul popup edit data kemudian data akan berhasil tersimpan jika diedit | Muncul popup edit data dan data bisa diedit. | Sesuai |
| Halaman kelompok kurban | Ketika klik aksi hapus akan muncul pesan konfirmasi dan data pindah ke draft. | Muncul pesan konfirmasi dan data terhapus | Sesuai |
| Halaman peserta kurban | Ketika klik aksi hapus akan muncul pesan konfirmasi dan data terhapus. | Data terhapus dan tidak tampil dibagian frontend karena sistem soft delete. | Sesuai |

Hasil pengujian pada halaman user pada dashboard dapat dilihat pada tabel 4.10 berikut ini:

**Tabel 4. 10 Pengujian fitur halaman user**

| Proses yang diuji | Output yang diharapkan | Aktual output | Status |
| :--- | :--- | :--- | :--- |
| Halaman user | Ketika masukan keyword pada fitur search muncul hasil dari keyword sesuai dengan nama dan email. | Muncul hasil search keyword | Sesuai |
| Halaman user | Ketika klik tombol tambah data maka akan pindah kehalaman tambah data dan bisa menambah data baru. | Muncul halaman tambah data dan beserta form yang harus diisi, kemudian ketika klik simpan maka data akan tersimpan. | Sesuai |
| Halaman user | Sesudah menambahkan data muncul link verifikasi melalui email yang didaftarkan. | Muncul link verifikasi melalui email yang didaftarkan | Sesuai |
| Halaman user | Saat status akun ke nonaktif maka status nonaktif dan pengguna tidak bisa login | Status akun dinonaktifkan dan ketika pengguna login pada halaman login muncul pesan akun dinonaktifkan. | Sesuai |
| Halaman user | Ketika status akun diaktifkan kembali muncul link verifikasi melalui email | Muncul link verifikasi ketika akun sudah diaktifkan kembali | Sesuai |
| Halaman user | Ketika klik aksi edit maka akan muncul popup edit data kemudian data akan berhasil tersimpan jika diedit | Muncul popup edit data dan data bisa diedit. | Sesuai |
| Halaman user | Ketika klik aksi hapus akan muncul pesan konfirmasi dan data terhapus. | Data terhapus dan tidak tampil dibagian frontend karena sistem soft delete. | Sesuai |
| Halaman user | Halaman user tidak tampil ketika yang login adalah pengguna dengan role admin | Menu user tidak tampil | Sesuai |

Hasil pengujian pada halaman setting pada dashboard dapat dilihat pada tabel 4.11 berikut ini:

**Tabel 4. 11 Pengujian fitur halaman setting**

| Proses yang diuji | Output yang diharapkan | Aktual output | Status |
| :--- | :--- | :--- | :--- |
| Halaman setting | Ketika pengguna masukan nama baru, nama di profil berganti. | Nama profil berganti | Sesuai |
| Halaman setting | Ketika pengguna mengganti foto profil muncul popup untuk menyesuaikan foto profil kemudian ketika klik tombol simpan foto terganti | Muncul popup atur foto profil ketika disimpan foto terganti | Sesuai |
| Halaman setting | Ketika pengguna mengganti password dengan memasukkan kolom konfirmasi password beda maka muncul pesan password tidak cocok | Muncul pesan password tidak cocok | Sesuai |
| Halaman setting | Ketika mengganti password dengan benar maka pengguna bisa login dengan password terbaru | Password terganti dan pengguna bisa login dengan password baru | Sesuai |

### 4.2.2 Pengujian Kualitas Model
Pengujian kualitas model dilakukan untuk menilai kemampuan model hybrid Prophet dan LightGBM dalam melakukan peramalan. Pengujian menggunakan metode Time Series Cross-Validation dengan pendekatan rolling - origin (expanding window), yaitu model dilatih pada window data historis lalu diuji pada periode bulan berikutnya, kemudian titik asal pelatihan digeser maju secara bertahap sehingga urutan kronologis data tetap terjaga. Pendekatan ini dipilih agar estimasi kinerja yang diperoleh mencerminkan kondisi nyata, yakni data masa lalu digunakan untuk memprediksi masa depan.

Data yang digunakan berjumlah 72 bulan (Januari 2020 – Desember 2025), dibagi secara kronologis menjadi 58 bulan data latih (80%) dan 14 bulan data uji (20%). Proses cross - validation dijalankan pada porsi data training dengan window latih awal sepanjang 18 bulan, horizon pengujian 3 bulan per fold, dan pergeseran 3 bulan, sehingga terbentuk 14 fold validasi. Adapun 14 bulan data uji tetap dipisahkan untuk evaluasi akhir guna mengukur kemampuan generalisasi model. Metrik evaluasi yang digunakan adalah Weighted Mean Absolute Percentage Error (WMAPE) dan Root Mean Squared Error (RMSE).

**1. Data Kas Uang Masuk**
Hasil Time Series Cross-Validation untuk peramalan uang masuk ditampilkan pada Tabel 4.12, sedangkan Gambar 4.43 memperlihatkan nilai WMAPE pada setiap fold.

**Tabel 4. 12 Hasil pengujian setiap fold data uang masuk**

| Fold | Periode Uji | WMAPE | RMSE |
| :--- | :--- | :--- | :--- |
| 1 | Juli - September 2021 | 77.09% | Rp2.444.926 |
| 2 | Oktober - Desember 2021 | 32.42% | Rp1.192.531 |
| 3 | Januari – Maret 2022 | 47.03% | Rp2.119.560 |
| 4 | April – Juni 2022 | 57.60% | Rp6.621.204 |
| 5 | Juli – September 2022 | 42.00% | Rp2.735.305 |
| 6 | Oktober – Desember 2022 | 28.76% | Rp1.014.766 |
| 7 | Januari – Maret 2023 | 12.16% | Rp960.866 |
| 8 | April – Juni 2023 | 18.34% | Rp1.930.968 |
| 9 | Juli – September 2023 | 45.19% | Rp2.647.826 |
| 10 | Oktober - Desember 2023 | 19.81% | Rp785.482 |
| 11 | Januari – Maret 2024 | 16.07% | Rp1.918.078 |
| 12 | April – Juni 2024 | 16.73% | Rp1.245.898 |
| 13 | Juli - September 2024 | 20.45% | Rp1.115.898 |
| 14 | Oktober 2024 | 24.50% | Rp1.296.445 |
| | **Rata - Rata** | **32.73%** | **Rp2.002.125** |

*Gambar 4. 43 Nilai WMAPE setiap fold pada data uang masuk*

Berdasarkan Tabel 4.12, model memperoleh rata-rata WMAPE validasi sebesar 32.73% dengan rata-rata RMSE sebesar Rp2.002.125. Nilai WMAPE pada fold awal tergolong tinggi, misalnya 77.09% pada fold pertama, karena model masih dilatih dengan data yang sangat terbatas (18 bulan) dan periode pengujiannya bertepatan dengan masa pandemi. Seiring bertambahnya panjang window training, kinerja model membaik dan cenderung stabil pada kisaran 12% - 25% mulai fold ketujuh (periode 2023 dan seterusnya). Pola ini menunjukkan bahwa model semakin baik ketika data historis yang tersedia semakin banyak.

Setelah estimasi kinerja diperoleh, model dievaluasi pada 14 bulan data training (20% dari seluruh data), dengan hasil pada Tabel 4.13.

**Tabel 4. 13 Hasil Evaluasi Akhir pada data testing kas uang masuk**

| Metrik | Prophet | Hybrid |
| :--- | :--- | :--- |
| WMAPE | 19.93% | 21.05% |
| RMSE | Rp2.489.017 | Rp2.294.823 |

Pada data uji, model hybrid memperoleh WMAPE sebesar 21.05% dengan RMSE sebesar Rp2.294.823. Dibandingkan Prophet murni, penambahan koreksi residual LightGBM berhasil menurunkan RMSE dari Rp2.489.017 menjadi Rp2.294.823, yang menandakan model hybrid lebih mampu meredam kesalahan berukuran besar. Adapun nilai WMAPE hybrid relatif setara dengan Prophet, dengan selisih sekitar satu persen. Hal ini menunjukkan bahwa pada data uang masuk, kontribusi utama komponen LightGBM terletak pada pengurangan besar, sementara tingkat kesalahan persentase keseluruhan tetap berada pada kisaran yang baik untuk data kas yang bersifat fluaktif. Nilai WMAPE data uji yang lebih rendah daripada rata rata validasi juga memperkuat indikasi bahwa model memiliki kemampuan generalisasi yang baik ketika dilatih menggunakan keseluruhan data training.

Pengujian metrik juga dilakukan menggunakan perhitungan manual sesuai gambar 4.44 yaitu dengan RMSE menggunakan rumus (3) dan WMAPE menggunakan rumus (4), sehingga diperoleh hasil sebagai berikut:
WMAPE = 17.269.012 / 82.599.150 * 100% = 20.91%
RMSE = √(73.007.290.347.378 / 14) = Rp2.283.595

*Gambar 4. 44 Pengujian metrik manual pada data kas uang masuk*

**2. Data Kas Uang Keluar**
Dengan prosedur yang sama, hasil Time Series Cross-Validation untuk peramalan uang keluar disajikan pada Tabel 4.14, dan Gambar 4.45 menampilkan nilai WMAPE pada setiap fold.

**Tabel 4. 14 Hasil pengujian setiap fold data uang keluar**

| Fold | Periode Uji | WMAPE | RMSE |
| :--- | :--- | :--- | :--- |
| 1 | Juli - September 2021 | 33.35% | Rp991.242 |
| 2 | Oktober - Desember 2021 | 13.20% | Rp248.602 |
| 3 | Januari – Maret 2022 | 16.50% | Rp393.400 |
| 4 | April – Juni 2022 | 77.00% | Rp4.182.457 |
| 5 | Juli – September 2022 | 21.28% | Rp669.496 |
| 6 | Oktober – Desember 2022 | 23.36% | Rp831.431 |
| 7 | Januari – Maret 2023 | 11.48% | Rp344.469 |
| 8 | April – Juni 2023 | 39.51% | Rp2.443.925 |
| 9 | Juli – September 2023 | 27.82% | Rp975.663 |
| 10 | Oktober - Desember 2023 | 9.08% | Rp271.517 |
| 11 | Januari – Maret 2024 | 59.92% | Rp6.781.600 |
| 12 | April – Juni 2024 | 18.58% | Rp1.181.255 |
| 13 | Juli – September 2024 | 23.73% | Rp907.186 |
| 14 | Oktober 2024 | 31.88% | Rp912.186 |
| | **Rata - Rata** | **29.05%** | **Rp1.509.602** |

*Gambar 4. 45 Nilai WMAPE setiap fold pada data uang keluar*

Berdasarkan Tabel 4.14, model memperoleh rata-rata WMAPE validasi sebesar 29,05% dengan rata-rata RMSE sebesar Rp1.509.602. Sebagaimana pada data uang masuk, beberapa fold menunjukkan WMAPE yang tinggi, terutama fold keempat (77,00%) dan fold kesebelas (59,92%), yang berkaitan dengan adanya lonjakan pengeluaran pada periode tersebut karena berkaitan dengan hari besar islam. Di luar kedua fold tersebut, sebagian besar fold berada pada kisaran 9% - 32%, bahkan beberapa fold mencapai WMAPE yang sangat rendah seperti 9.08% pada fold kesepuluh dan 11,48% pada fold ketujuh. Hal ini menunjukkan bahwa pola pengeluaran diluar hari besar islam.

Hasil evaluasi akhir pada 14 bulan (20% dari seluruh data) data testing yang terpisah disajikan pada Tabel 4.15.

**Tabel 4. 15 Hasil Evaluasi Akhir pada data testing kas uang keluar**

| Metrik | Prophet | Hybrid |
| :--- | :--- | :--- |
| WMAPE | 18,07% | 13,66% |
| RMSE | Rp1.002.693 | Rp800.168 |

Pada data uji, model hybrid memperoleh WMAPE sebesar 13.66% dengan RMSE sebesar Rp800.168. Berbeda dengan data uang masuk, pada data uang keluar penambahan koreksi residual LightGBM memberikan perbaikan yang konsisten pada kedua metrik WMAPE menurun dari 18.07% menjadi 13.66%, dan RMSE menurun dari Rp1.002.693 menjadi Rp800.168. Hal ini menunjukkan bahwa komponen LightGBM efektif menangkap pola residual yang belum tertangkap Prophet pada data pengeluaran. Nilai WMAPE sebesar 13,66% tergolong baik dan mengindikasikan bahwa model hybrid mampu meramalkan pengeluaran kas dengan tingkat kesalahan yang rendah serta memiliki kemampuan yang baik pada data yang belum pernah dilihat sebelumnya.

Pengujian metrik juga dilakukan menggunakan perhitungan manual sesuai gambar 4.46 yaitu dengan RMSE menggunakan rumus (3) dan WMAPE menggunakan rumus (4), sehingga diperoleh hasil sebagai berikut:
WMAPE = 7.948.333 / 58.203.141 * 100% = 13.66%
RMSE = √(8.963.768.334.126 / 14) = Rp800.168

*Gambar 4. 46 Pengujian metrik manual pada data kas uang keluar*

## 4.3 Analisis Hasil Pengujian
Berdasarkan seluruh tahap pengujian, model hybrid Prophet dan LightGBM menunjukkan hasil dalam meramalkan kas Surau Zam-Zam, dengan WMAPE sebesar 20,91% (RMSE Rp2.283.595) pada uang masuk dan 13,66% (RMSE Rp800.168) pada uang keluar. Tingkat kesalahan tersebut tergolong baik untuk data kas yang bersifat banyak fluaksi.

Model pada data uang keluar menghasilkan kesalahan yang lebih rendah karena dilakukan filter yang menggunakan IQR didominasi biaya operasional rutin yang polanya teratur, sedangkan pemasukan donasi lebih fluktuatif akibat lonjakan pada periode keagamaan tertentu. Kontribusi LightGBM juga berbeda, pada uang keluar koreksi residual memperbaiki kedua metrik sekaligus, sementara pada uang masuk perannya lebih dominan menurunkan RMSE dengan WMAPE yang relatif setara dengan Prophet. Adapun rata-rata WMAPE hasil Cross-Validation yang lebih tinggi terutama disebabkan oleh fold awal yang dilatih dengan data terbatas, dan kinerja model membaik seiring bertambahnya data training.

Keterbatasan akurasi bersumber dari jumlah data yang relatif terbatas, pola musiman berbasis kalender Hijriah, serta transaksi tidak rutin berukuran besar yang sulit diprediksi.

# BAB V PENUTUP

## 5.1 Kesimpulan
Berdasarkan hasil perancangan, implementasi, dan pengujian yang telah dilakukan, maka dapat diperoleh kesimpulan sebagai berikut:

1. Model peramalan (forecasting model) untuk arus kas Surau Zam-Zam telah berhasil dirancang dan dibangun. Model tersebut mampu menganalisis serta mengidentifikasi pola data historis donasi, mencakup pola tren jangka panjang maupun pola musiman yang dipengaruhi oleh kalender Hijriah dan hari besar Islam.
2. Metode hybrid time series forecasting yang mengombinasikan Prophet untuk menangkap pola tren dan musiman dengan LightGBM sebagai residual learning telah berhasil diterapkan untuk meningkatkan akurasi prediksi. Pada data uang keluar, penambahan koreksi residual LightGBM menurunkan WMAPE dari 18,07% menjadi 13,66% dan RMSE dari Rp1.002.693 menjadi Rp800.168. Sementara pada data uang masuk, model hybrid memperoleh WMAPE sebesar 20,91% dengan RMSE sebesar Rp2.283.595, di mana kontribusi utama LightGBM berupa penurunan nilai RMSE dibandingkan model Prophet.
3. Situs web profil Surau Zam-Zam telah berhasil dirancang dan dibangun dengan menyediakan layanan informasi publik yang mencakup informasi keuangan, jadwal salat, sejarah surau, pengurus surau, kegiatan atau berita surau, peserta kurban, dan imsakiyah.

## 5.2 Saran
Sistem yang dibangun pada tugas akhir ini masih memiliki sejumlah keterbatasan, sehingga terdapat beberapa saran yang dapat dijadikan acuan untuk pengembangan selanjutnya, yaitu:

1. Menambah rentang dan jumlah data historis yang digunakan untuk pelatihan model. Hasil time series cross-validation menunjukkan bahwa tingkat kesalahan prediksi pada fold - fold awal tergolong tinggi akibat keterbatasan data, dan kinerja model membaik serta cenderung stabil seiring bertambahnya panjang data training. Oleh karena itu, penambahan rentang data historis pada periode berikutnya diharapkan dapat meningkatkan akurasi dan kestabilan model secara keseluruhan.
2. Menerapkan mekanisme pelatihan ulang (retraining) model secara otomatis dan terjadwal. Pada saat ini pelatihan ulang masih dilakukan secara manual satu tahun sekali, sehingga disarankan untuk mengintegrasikan proses retraining ke dalam alur otomatisasi sistem agar model dapat lebih baik diri terhadap perubahan pola arus kas seiring bertambahnya akumulasi data di periode mendatang.
3. Menambahkan metode baru untuk mengatur rencana anggaran dari hasil prediksi, misalnya melalui penerapan pembagian anggaran secara otomatis berdasarkan skala prioritas kebutuhan operasional surau. Dengan demikian, pengurus tidak perlu menentukan alokasi anggaran secara manual sebagaimana yang berjalan saat ini, sehingga proses perencanaan keuangan dapat dilakukan secara lebih baik.
4. Mengembangkan fitur aplikasi lebih lanjut seperti fitur notifikasi atau peringatan dini terkait kondisi saldo kas menggunakan payment gateway untuk menambahkan data otomatis melalui QRIS.

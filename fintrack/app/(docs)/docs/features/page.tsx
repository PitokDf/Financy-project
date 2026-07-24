import Link from 'next/link'
import type { Metadata } from 'next'
import {
  PiggyBank,
  BarChart3,
  Sparkles,
  Download,
  Bell,
  ArrowRight,
  ArrowLeft,
  CreditCard,
  CalendarDays,
  FileSpreadsheet,
  FileText,
  Target,
  AlertTriangle,
  CheckCircle2,
  Smartphone,
  Mic,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fitur FinTrack - Manajemen Transaksi, Analisis AI, Anggaran, dan Ekspor',
  description:
    'Pelajari semua fitur FinTrack: pencatatan transaksi dengan kategorisasi otomatis, analisis keuangan interaktif, AI clustering, anggaran bulanan, ekspor laporan, dan notifikasi cerdas.',
  alternates: {
    canonical: '/docs/features',
  },
  openGraph: {
    title: 'Fitur FinTrack - Panduan Lengkap',
    description:
      'Pelajari semua fitur FinTrack: pencatatan transaksi, analisis AI, anggaran, dan ekspor laporan.',
    url: 'https://fintrack.pitok.my.id/docs/features',
    siteName: 'FinTrack',
    locale: 'id_ID',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Fitur FinTrack' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fitur FinTrack - Panduan Lengkap',
    description: 'Pelajari semua fitur FinTrack untuk manajemen keuangan pribadi.',
    images: ['/og-image.png'],
  },
}

const features = [
  {
    id: 'manajemen-transaksi',
    icon: CreditCard,
    iconBgClass: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0',
    iconClass: 'w-4 h-4 sm:w-5 sm:h-5 text-primary',
    title: 'Manajemen Transaksi',
    description:
      'FinTrack memungkinkan Anda mencatat setiap transaksi pemasukan dan pengeluaran dengan cepat dan mudah. Setiap transaksi terdiri dari tanggal, deskripsi, nominal, tipe (pemasukan/pengeluaran), dan kategori.',
    subsections: [
      {
        heading: 'Cara Mencatat Transaksi',
        type: 'ol' as const,
        items: [
          'Buka halaman Dashboard atau Transaksi',
          <>Tekan tombol <strong className="text-foreground">&ldquo;+&rdquo;</strong> di tengah bawah layar</>,
          'Pilih tipe transaksi: Pemasukan atau Pengeluaran',
          'Isi deskripsi transaksi (minimal 5 karakter)',
          'Masukkan nominal dalam Rupiah',
          'Pilih kategori dari daftar yang tersedia',
          'Tambahkan catatan jika diperlukan',
          'Simpan transaksi',
        ],
      },
      {
        heading: 'Kategorisasi Otomatis',
        type: 'p' as const,
        content: (
          <>
            Saat Anda menulis deskripsi seperti &ldquo;Beli bensin&rdquo; atau &ldquo;Bayar listrik&rdquo;,
            FinTrack membaca deskripsi transaksi dan menggunakan model <strong className="text-foreground">SBERT + Logistic Regression</strong> untuk menentukan kategori yang paling cocok berdasarkan konteks kalimat. Fitur ini bisa diaktifkan atau dimatikan
            melalui menu <strong className="text-foreground">Profil &gt; Preferensi &gt; Kategorisasi Otomatis</strong>.
          </>
        ),
      },
      {
        heading: 'Import CSV',
        type: 'p' as const,
        content: (
          <>
            Jika Anda sudah memiliki data transaksi dalam format CSV, FinTrack menyediakan
            fitur impor massal. Format yang didukung: <strong className="text-foreground">Tanggal &middot; Deskripsi &middot; Nominal &middot; Tipe</strong>.
            File akan diproses dan transaksi akan otomatis masuk ke dalam sistem.
          </>
        ),
      },
      {
        heading: 'Pengeluaran Terjadwal',
        type: 'p' as const,
        content: (
          <>
            Untuk pengeluaran rutin bulanan seperti bayar listrik atau langganan, Anda bisa
            mengatur pengeluaran terjadwal. Sistem akan otomatis membuat transaksi pada
            tanggal yang telah ditentukan setiap bulannya.
          </>
        ),
      },
    ],
  },
  {
    id: 'catat-dengan-suara',
    icon: Mic,
    iconBgClass: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0',
    iconClass: 'w-4 h-4 sm:w-5 sm:h-5 text-rose-500',
    title: 'Catat dengan Suara',
    description:
      'FinTrack mendukung pencatatan transaksi menggunakan suara. Cukup tekan tombol mikrofon, sebutkan deskripsi dan nominal, dan transaksi akan otomatis terbuat.',
    subsections: [
      {
        heading: 'Cara Menggunakan',
        type: 'ol' as const,
        items: [
          'Tekan tombol mikrofon di halaman Dashboard',
          'Sebutkan deskripsi dan nominal, contoh: "Beli bensin dua puluh ribu"',
          'Tunggu hingga proses selesai',
          'Transaksi akan otomatis terbuat dengan kategori yang sesuai',
        ],
      },
      {
        heading: 'Format yang Didukung',
        type: 'p' as const,
        content: <>FinTrack memahami bahasa Indonesia percakapan, termasuk angka dalam bentuk kata: "seribu", "dua puluh ribu", "sejuta", dsb. Sistem juga mendeteksi tipe transaksi secara otomatis berdasarkan kata kunci seperti "gaji", "bonus", atau "dikasih" untuk pemasukan.</>,
      },
      {
        heading: 'Catatan',
        type: 'p' as const,
        content: <>Fitur ini menggunakan Web Speech API dan hanya tersedia di browser yang mendukung (Chrome, Edge). Pastikan microfon diizinkan oleh browser Anda.</>,
      },
    ],
  },
  {
    id: 'analisis-keuangan',
    icon: BarChart3,
    iconBgClass: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0',
    iconClass: 'w-4 h-4 sm:w-5 sm:h-5 text-blue-500',
    title: 'Analisis Keuangan',
    description:
      'Halaman Analisis menyajikan visualisasi data keuangan Anda dalam berbagai grafik interaktif. Anda bisa melihat pola pengeluaran, perbandingan pemasukan vs pengeluaran, serta breakdown pengeluaran per kategori.',
    subsections: [
      {
        heading: 'Yang Bisa Dilihat',
        type: 'ul' as const,
        items: [
          { icon: <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />, text: <><strong className="text-foreground">Total Saldo</strong>  - Ringkasan pemasukan dan pengeluaran bulan ini</> },
          { icon: <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />, text: <><strong className="text-foreground">Tren Arus Kas</strong>  - Grafik aliran uang masuk vs keluar dari waktu ke waktu</> },
          { icon: <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />, text: <><strong className="text-foreground">Breakdown Pengeluaran</strong>  - Proporsi pengeluaran per kategori dalam pie chart</> },
          { icon: <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />, text: <><strong className="text-foreground">Pola Pengeluaran Harian</strong>  - Hari dengan pengeluaran tertinggi dalam seminggu</> },
          { icon: <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />, text: <><strong className="text-foreground">Savings Rate</strong>  - Persentase tabungan bersih dari total pemasukan</> },
        ],
      },
      {
        heading: 'Rentang Waktu',
        type: 'p' as const,
        content: <>Anda bisa memilih rentang waktu: 7 hari, 30 hari, bulan ini, atau 3 bulan terakhir untuk melihat data sesuai periode yang diinginkan.</>,
      },
    ],
  },
  {
    id: 'ai-smart-clustering',
    icon: Sparkles,
    iconBgClass: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0',
    iconClass: 'w-4 h-4 sm:w-5 sm:h-5 text-violet-500',
    title: 'AI Smart Clustering',
    description:
      <>FinTrack menggunakan model <strong className="text-foreground">SBERT (multilingual-e5-large) + Logistic Regression</strong> untuk mengkategorikan transaksi secara otomatis berdasarkan deskripsi. Model ini dilatih dengan 17 kategori pengeluaran dan mampu memahami konteks bahasa Indonesia maupun Inggris.</>,
    subsections: [
      {
        heading: 'Cara Kerja',
        type: 'ol' as const,
        items: [
          'Deskripsi transaksi diubah menjadi vektor embedding menggunakan SBERT',
          'Vektor embedding diproses oleh model Logistic Regression untuk prediksi kategori',
          'Hasil prediksi ditampilkan beserta confidence score untuk setiap transaksi',
          'Transaksi dengan confidence rendah ditandai untuk review manual Anda',
          'Anda bisa mengonfirmasi atau mengoreksi hasil prediksi AI',
          <>Tekan <strong className="text-foreground">&ldquo;Terapkan ke Aplikasi&rdquo;</strong> untuk menyimpan</>,
        ],
      },
      {
        heading: 'Confidence Score',
        type: 'p' as const,
        content: <>Setiap prediksi kategori memiliki <strong className="text-foreground">confidence score</strong> yang menunjukkan seberapa yakin model terhadap hasilnya. Transaksi dengan confidence rendah akan ditandai agar Anda bisa meninjau dan mengoreksi secara manual.</>,
      },
      {
        heading: 'AI Forecast',
        type: 'p' as const,
        content: <>Berdasarkan data historis, FinTrack memprediksi 3 kategori pengeluaran terbesar untuk bulan depan menggunakan algoritma <strong className="text-foreground">Simple Moving Average (SMA)</strong>. Prediksi ini membantu Anda merencanakan anggaran lebih awal.</>,
      },
    ],
  },
  {
    id: 'anggaran-planner',
    icon: Target,
    iconBgClass: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0',
    iconClass: 'w-4 h-4 sm:w-5 sm:h-5 text-amber-500',
    title: 'Anggaran & Planner',
    description:
      'Fitur Anggaran memungkinkan Anda menetapkan batas pengeluaran per kategori untuk setiap periode (mingguan, bulanan, atau tahunan). Sistem akan memantau realisasi anggaran secara real-time.',
    subsections: [
      {
        heading: 'Status Anggaran',
        type: 'ul' as const,
        items: [
          { icon: <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />, text: <><strong className="text-foreground">Aman</strong>  - Pengeluaran masih di bawah batas anggaran</> },
          { icon: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />, text: <><strong className="text-foreground">Perhatian</strong>  - Pengeluaran sudah mendekati batas anggaran</> },
          { icon: <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />, text: <><strong className="text-foreground">Terlampaui</strong>  - Pengeluaran melebihi batas anggaran</> },
        ],
      },
      {
        heading: 'Cara Membuat Anggaran',
        type: 'ol' as const,
        items: [
          <>Buka menu <strong className="text-foreground">Anggaran</strong> dari navigasi bawah</>,
          <>Tekan tombol <strong className="text-foreground">&ldquo;Tambah Anggaran Baru&rdquo;</strong></>,
          'Pilih kategori pengeluaran',
          'Masukkan jumlah anggaran (minimal Rp 1.000)',
          'Pilih periode: Mingguan, Bulanan, atau Tahunan',
          'Simpan anggaran',
        ],
      },
    ],
  },
  {
    id: 'ekspor-laporan',
    icon: Download,
    iconBgClass: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0',
    iconClass: 'w-4 h-4 sm:w-5 sm:h-5 text-emerald-500',
    title: 'Ekspor Laporan',
    description:
      'FinTrack memungkinkan Anda mengunduh laporan keuangan dalam berbagai format untuk keperluan dokumentasi, analisis lebih lanjut, atau keperluan pajak.',
    subsections: [
      {
        heading: 'Format yang Didukung',
        type: 'ul' as const,
        items: [
          { icon: <FileSpreadsheet className="w-4 h-4 text-primary shrink-0 mt-0.5" />, text: <><strong className="text-foreground">CSV</strong>  - Kompatibel dengan Excel dan Google Sheets</> },
          { icon: <FileSpreadsheet className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />, text: <><strong className="text-foreground">XLSX</strong>  - Format Microsoft Excel native</> },
          { icon: <FileText className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />, text: <><strong className="text-foreground">PDF</strong>  - Laporan siap cetak dan dibagikan</> },
        ],
      },
      {
        heading: 'Cara Mengekspor',
        type: 'ol' as const,
        items: [
          <>Buka <strong className="text-foreground">Profil &gt; Ekspor Data</strong></>,
          'Pilih format yang diinginkan',
          'Tentukan periode data (Semua Data, Bulan, atau Tahun)',
          <>Tekan <strong className="text-foreground">&ldquo;Unduh&rdquo;</strong></>,
          'File akan otomatis terunduh ke perangkat Anda',
        ],
      },
    ],
  },
  {
    id: 'notifikasi-cerdas',
    icon: Bell,
    iconBgClass: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0',
    iconClass: 'w-4 h-4 sm:w-5 sm:h-5 text-rose-500',
    title: 'Notifikasi Cerdas',
    description:
      'FinTrack menyediakan sistem notifikasi cerdas yang membantu Anda tetap terinformasi tentang kondisi keuangan dan pencapaian.',
    subsections: [
      {
        heading: 'Jenis Notifikasi',
        type: 'ul' as const,
        items: [
          { icon: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />, text: <><strong className="text-foreground">Peringatan Anggaran</strong>  - Notifikasi saat pengeluaran mendekati batas anggaran</> },
          { icon: <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />, text: <><strong className="text-foreground">Pencapaian</strong>  - Notifikasi saat Anda mencapai milestone tertentu</> },
          { icon: <CalendarDays className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />, text: <><strong className="text-foreground">Pengingat Harian</strong>  - Pengingat pada pukul 20:00 untuk mencatat transaksi hari ini</> },
        ],
      },
      {
        heading: 'Mengaktifkan Notifikasi',
        type: 'p' as const,
        content: (
          <>
            Buka <strong className="text-foreground">Profil &gt; aktifkan toggle &ldquo;Push Notification&rdquo;</strong>.
            Pastikan browser Anda mengizinkan notifikasi dari FinTrack. Untuk pengingat harian,
            aktifkan toggle <strong className="text-foreground">&ldquo;Pengingat Harian&rdquo;</strong> di menu yang sama.
          </>
        ),
      },
    ],
  },
  {
    id: 'pwa-offline',
    icon: Smartphone,
    iconBgClass: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0',
    iconClass: 'w-4 h-4 sm:w-5 sm:h-5 text-cyan-500',
    title: 'PWA & Offline Support',
    description:
      'FinTrack dibangun sebagai Progressive Web App (PWA), artinya Anda bisa menginstalnya langsung dari browser seperti aplikasi native.',
    subsections: [
      {
        heading: 'Fitur Offline',
        type: 'ul' as const,
        items: [
          { icon: <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />, text: 'Catat transaksi meskipun tanpa koneksi internet' },
          { icon: <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />, text: 'Data secara otomatis tersinkronisasi saat online kembali' },
          { icon: <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />, text: 'Akses dashboard dan data transaksi secara offline' },
        ],
      },
      {
        heading: 'Cara Menginstal',
        type: 'p' as const,
        content: <>Buka FinTrack di browser Chrome (desktop atau mobile), lalu klik tombol &ldquo;Instal&rdquo; atau &ldquo;Tambahkan ke Layar Utama&rdquo; yang muncul di address bar.</>,
      },
    ],
  },
]

export default function FeaturesPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://fintrack.pitok.my.id' },
      { '@type': 'ListItem', position: 2, name: 'Dokumentasi', item: 'https://fintrack.pitok.my.id/docs' },
      { '@type': 'ListItem', position: 3, name: 'Fitur', item: 'https://fintrack.pitok.my.id/docs/features' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="space-y-8 sm:space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground transition-colors">Dokumentasi</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Fitur</span>
        </nav>

        {/* Header */}
        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Fitur FinTrack
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            FinTrack menyediakan berbagai fitur canggih untuk membantu Anda mengelola keuangan
            pribadi secara efektif. Berikut penjelasan lengkap setiap fitur yang tersedia.
          </p>
        </div>

        {/* Feature Sections */}
        {features.map((feature, idx) => (
          <section key={feature.id}>
            {idx > 0 && <hr className="border-border/50 mb-8 sm:mb-10" />}
            <div id={feature.id} className="space-y-3 sm:space-y-4 scroll-mt-20">
              {/* Icon + Title */}
              <div className="flex items-center gap-3">
                <div className={feature.iconBgClass}>
                  <feature.icon className={feature.iconClass} />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-foreground">{feature.title}</h2>
              </div>

              {/* Content */}
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed sm:pl-[52px]">
                <p>{feature.description}</p>

                {feature.subsections.map((sub, subIdx) => (
                  <div key={subIdx}>
                    <h3 className="text-sm font-semibold text-foreground">{sub.heading}</h3>
                    {sub.type === 'ol' && (
                      <ol className="list-decimal list-inside space-y-1.5 mt-1.5">
                        {(sub.items as React.ReactNode[]).map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ol>
                    )}
                    {sub.type === 'ul' && (
                      <ul className="space-y-2 mt-1.5">
                        {(sub.items as { icon: React.ReactNode; text: React.ReactNode }[]).map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            {item.icon}
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {sub.type === 'p' && (
                      <p className="mt-1.5">{sub.content}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-border/50">
          <Link
            href="/docs"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <Link
            href="/docs/faq"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            Pertanyaan Umum
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  )
}

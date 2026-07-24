import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pertanyaan Umum (FAQ) FinTrack - Jawaban Lengkap',
  description:
    'Temukan jawaban atas pertanyaan umum tentang FinTrack: cara menambahkan transaksi, mengatur anggaran, kategorisasi otomatis, keamanan data, ekspor laporan, dan notifikasi.',
  alternates: {
    canonical: '/docs/faq',
  },
  openGraph: {
    title: 'Pertanyaan Umum (FAQ) - FinTrack',
    description:
      'Jawaban lengkap atas pertanyaan yang sering ditanyakan tentang FinTrack.',
    url: 'https://fintrack.pitok.my.id/docs/faq',
    siteName: 'FinTrack',
    locale: 'id_ID',
    type: 'article',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FAQ FinTrack' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pertanyaan Umum (FAQ) - FinTrack',
    description: 'Jawaban lengkap atas pertanyaan yang sering ditanyakan tentang FinTrack.',
    images: ['/og-image.png'],
  },
}

const FAQ_DATA = [
  {
    question: 'Bagaimana cara menambahkan transaksi baru di FinTrack?',
    answer:
      'Buka halaman Dashboard atau Transaksi, lalu tekan tombol "+" di tengah bawah layar. Pilih tipe transaksi (Pemasukan/Pengeluaran), isi deskripsi (minimal 5 karakter), masukkan nominal, pilih kategori, dan simpan. Kategori akan otomatis terisi jika fitur kategorisasi otomatis aktif.',
  },
  {
    question: 'Bagaimana cara kerja kategorisasi otomatis?',
    answer:
      'FinTrack membaca deskripsi transaksi dan menggunakan model SBERT (multilingual-e5-large) + Logistic Regression untuk menentukan kategori paling cocok berdasarkan konteks kalimat. Misalnya, "Beli bensin" akan otomatis masuk kategori "Transportasi". Fitur ini bisa diaktifkan atau dimatikan di menu Profil > Preferensi > Kategorisasi Otomatis.',
  },
  {
    question: 'Apa itu fitur AI Lab dan bagaimana cara menggunakannya?',
    answer:
      'AI Lab adalah halaman khusus untuk mengkategorikan transaksi tanpa kategori menggunakan model SBERT + Logistic Regression. Buka halaman Analisis > AI Lab, tekan "Jalankan Prediksi", dan AI akan menganalisis semua transaksi tanpa kategori. Anda bisa meninjau hasil prediksi, memberi nama kategori, lalu menerapkannya ke aplikasi.',
  },
  {
    question: 'Bagaimana cara mengatur anggaran bulanan?',
    answer:
      'Buka menu Anggaran dari navigasi bawah. Tekan "Tambah Anggaran Baru", pilih kategori pengeluaran, masukkan jumlah anggaran (minimal Rp 1.000), pilih periode (Mingguan/Bulanan/Tahunan), lalu simpan. Sistem akan memantau realisasi anggaran dan mengirim notifikasi saat mendekati batas.',
  },
  {
    question: 'Bagaimana cara mengekspor data keuangan?',
    answer:
      'Buka Profil > Ekspor Data. Pilih format yang diinginkan (CSV, Excel, atau PDF) dan tentukan periode data (Semua Data, Bulan, atau Tahun). Tekan "Unduh" dan file akan langsung terunduh ke perangkat Anda. Format CSV kompatibel dengan Excel dan Google Sheets.',
  },
  {
    question: 'Apakah data saya aman di FinTrack?',
    answer:
      'Ya, data Anda disimpan dengan aman di server kami. FinTrack menggunakan autentikasi berbasis token (JWT) dan tidak pernah menyimpan kata sandi dalam bentuk asli. Semua komunikasi antara aplikasi dan server menggunakan enkripsi HTTPS.',
  },
  {
    question: 'Bagaimana cara mengaktifkan notifikasi push?',
    answer:
      'Buka Profil > aktifkan toggle "Push Notification". Pastikan browser Anda mengizinkan notifikasi dari FinTrack. Setelah aktif, Anda akan menerima notifikasi peringatan anggaran, pencapaian, dan pengingat harian pada pukul 20:00 untuk mencatat transaksi.',
  },
  {
    question: 'Bisakah saya menggunakan FinTrack secara offline?',
    answer:
      'Ya, FinTrack adalah Progressive Web App (PWA) yang mendukung penggunaan offline. Anda bisa mencatat transaksi meskipun tanpa koneksi internet. Data akan secara otomatis tersinkronisasi ke server saat koneksi tersedia kembali. Install FinTrack dari browser untuk pengalaman terbaik.',
  },
  {
    question: 'Bagaimana cara melihat prediksi pengeluaran bulan depan?',
    answer:
      'FinTrack menyediakan fitur AI Forecast yang memprediksi 3 kategori pengeluaran terbesar untuk bulan depan menggunakan algoritma Simple Moving Average (SMA). Anda bisa melihat prediksi ini di halaman Dashboard pada bagian "AI Forecast Ranking" atau di halaman AI Lab.',
  },
  {
    question: 'Bagaimana cara mengatur pengeluaran terjadwal?',
    answer:
      'Buka halaman Transaksi, pilih tab "Terjadwal". Tekan "Baru" untuk menambah pengeluaran terjadwal. Masukkan deskripsi, jumlah, tanggal dalam bulan, dan kategori. Pengeluaran ini akan otomatis muncul setiap bulan pada tanggal yang ditentukan.',
  },
  {
    question: 'Bagaimana cara mencatat transaksi dengan suara?',
    answer:
      'Di halaman Dashboard, tekan tombol mikrofon, lalu sebutkan deskripsi dan nominal. Contoh: "Beli kopi tujuh ribu". FinTrack akan memproses ucapan Anda dan otomatis membuat transaksi. Fitur ini menggunakan Web Speech API dan tersedia di Chrome atau Edge.',
  },
  {
    question: 'Format suara seperti apa yang dimengerti FinTrack?',
    answer:
      'FinTrack memahami bahasa Indonesia percakapan. Anda bisa menyebut angka dalam bentuk kata seperti "dua puluh ribu" atau "sejuta". Sistem juga mendeteksi tipe transaksi: kata seperti "gaji" atau "bonus" akan dikategorikan sebagai pemasukan, selain itu dianggap pengeluaran.',
  },
]

const FAQPage = () => {
  const faqPageLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://fintrack.pitok.my.id' },
      { '@type': 'ListItem', position: 2, name: 'Dokumentasi', item: 'https://fintrack.pitok.my.id/docs' },
      { '@type': 'ListItem', position: 3, name: 'FAQ', item: 'https://fintrack.pitok.my.id/docs/faq' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageLd).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="space-y-6 sm:space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground transition-colors">Dokumentasi</Link>
          <span>/</span>
          <span className="text-foreground font-medium">FAQ</span>
        </nav>

        {/* Header */}
        <div className="space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Pertanyaan Umum (FAQ)
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Berikut adalah pertanyaan yang sering ditanyakan tentang penggunaan FinTrack.
            Jika Anda tidak menemukan jawaban yang dicari, hubungi kami melalui email di
            pitokfauzi@pitok.my.id.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-0 divide-y divide-border/50 border border-border/50 rounded-xl overflow-hidden">
          {FAQ_DATA.map((faq, index) => (
            <details key={index} className="group">
              <summary className="flex items-center justify-between gap-3 p-3.5 sm:p-4 cursor-pointer text-sm font-medium text-foreground hover:bg-muted/30 transition-colors list-none">
                <span>{faq.question}</span>
                <svg
                  className="w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        {/* Still have questions */}
        <section className="text-center py-6 sm:py-8 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10 space-y-3">
          <h2 className="text-base sm:text-lg font-bold text-foreground">Masih Ada Pertanyaan?</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Hubungi kami melalui email atau WhatsApp untuk bantuan lebih lanjut.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <a
              href="mailto:pitokfauzi@pitok.my.id"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Email Kami
            </a>
            <a
              href="https://wa.me/6283180541892"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 border-t border-border/50">
          <Link
            href="/docs/features"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Detail Fitur
          </Link>
          <Link
            href="/docs"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            Kembali ke Beranda
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  )
}

export default FAQPage

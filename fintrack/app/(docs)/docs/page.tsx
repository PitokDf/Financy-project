import Link from 'next/link'
import type { Metadata } from 'next'
import {
  PiggyBank,
  BarChart3,
  Sparkles,
  Download,
  Bell,
  ArrowRight,
  FileText,
  HelpCircle,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dokumentasi FinTrack - Panduan Lengkap Manajemen Keuangan Pribadi',
  description:
    'Pelajari cara menggunakan FinTrack untuk mengelola keuangan pribadi. Panduan lengkap fitur pencatatan transaksi, analisis AI, anggaran bulanan, dan ekspor laporan.',
  alternates: {
    canonical: '/docs',
  },
  openGraph: {
    title: 'Dokumentasi FinTrack - Panduan Lengkap Manajemen Keuangan',
    description:
      'Pelajari cara menggunakan FinTrack untuk mengelola keuangan pribadi dengan fitur AI clustering dan analisis pola pengeluaran.',
    url: 'https://fintrack.pitok.my.id/docs',
    siteName: 'FinTrack',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FinTrack Documentation' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dokumentasi FinTrack',
    description: 'Panduan lengkap menggunakan FinTrack untuk manajemen keuangan pribadi.',
    images: ['/og-image.png'],
  },
}

const FEATURES = [
  {
    icon: PiggyBank,
    title: 'Manajemen Transaksi',
    description: 'Catat pemasukan dan pengeluaran harian dengan mudah. Kategori transaksi secara otomatis terisi berdasarkan catatan yang Anda tulis.',
    href: '/docs/features#manajemen-transaksi',
  },
  {
    icon: BarChart3,
    title: 'Analisis Keuangan',
    description: 'Visualisasikan pola pengeluaran, arus kas, dan breakdown per kategori dalam grafik interaktif.',
    href: '/docs/features#analisis-keuangan',
  },
  {
    icon: Sparkles,
    title: 'AI Smart Clustering',
    description: 'Algoritma K-means mengelompokkan transaksi serupa untuk membantu Anda memahami kebiasaan finansial.',
    href: '/docs/features#ai-smart-clustering',
  },
  {
    icon: PiggyBank,
    title: 'Anggaran & Planner',
    description: 'Tetapkan anggaran per kategori dan pantau realisasinya secara real-time dengan notifikasi otomatis.',
    href: '/docs/features#anggaran-planner',
  },
  {
    icon: Download,
    title: 'Ekspor Laporan',
    description: 'Unduh laporan keuangan dalam format CSV, Excel, atau PDF untuk keperluan dokumentasi atau analisis lebih lanjut.',
    href: '/docs/features#ekspor-laporan',
  },
  {
    icon: Bell,
    title: 'Notifikasi Cerdas',
    description: 'Terima pengingat saat mendekati batas anggaran, pencapaian baru, dan pengingat harian untuk mencatat transaksi.',
    href: '/docs/features#notifikasi-cerdas',
  },
]

export default function DocsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'FinTrack',
    url: 'https://fintrack.pitok.my.id',
    description:
      'Aplikasi manajemen keuangan pribadi yang memanfaatkan klasterisasi transaksi otomatis dan asisten AI untuk mempermudah monitoring pengeluaran.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web (PWA)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'IDR',
    },
    author: {
      '@type': 'Person',
      name: 'Pito Desri Pauzi',
    },
    inLanguage: ['id', 'en'],
  }

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FinTrack',
    url: 'https://fintrack.pitok.my.id',
    logo: 'https://fintrack.pitok.my.id/logo.png',
    founder: {
      '@type': 'Person',
      name: 'Pito Desri Pauzi',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="space-y-10 sm:space-y-12">
        {/* Hero */}
        <section className="text-center space-y-3 sm:space-y-4 py-4 sm:py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <Sparkles className="w-3 h-3" />
            Didukung oleh AI
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
            Dokumentasi FinTrack
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
            Panduan lengkap menggunakan FinTrack untuk mengelola keuangan pribadi.
            Pelajari cara mencatat transaksi, menganalisis pola pengeluaran, mengatur anggaran,
            dan memanfaatkan fitur AI untuk keputusan finansial yang lebih baik.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 pt-2">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Mulai Sekarang
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/docs/features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Lihat Fitur
            </Link>
          </div>
        </section>

        {/* Apa itu FinTrack */}
        <section id="tentang" className="space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">Apa itu FinTrack?</h2>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>
              FinTrack adalah aplikasi manajemen keuangan pribadi berbasis Progressive Web App (PWA)
              yang dirancang khusus untuk pengguna Indonesia. Aplikasi ini membantu Anda mencatat
              setiap transaksi pemasukan dan pengeluaran, menganalisis pola kebiasaan finansial,
              serta mengatur anggaran bulanan secara efektif.
            </p>
            <p>
              Yang membedakan FinTrack dari aplikasi serupa adalah integrasi kecerdasan buatan (AI)
              di dalamnya. Fitur <strong>AI Smart Clustering</strong> secara otomatis mengelompokkan
              transaksi berdasarkan pola deskripsi, sehingga Anda tidak perlu repot mengategorikan
              satu per satu. Selain itu, fitur <strong>AI Forecast</strong> memprediksi pengeluaran
              bulan depan menggunakan algoritma Simple Moving Average (SMA).
            </p>
            <p>
              FinTrack juga mendukung penggunaan secara offline, sehingga Anda tetap bisa mencatat
              transaksi meskipun tidak terhubung ke internet. Data akan secara otomatis tersinkronisasi
              saat koneksi tersedia kembali.
            </p>
          </div>
        </section>

        {/* Fitur Utama */}
        <section id="fitur" className="space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">Fitur Utama</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            FinTrack menyediakan enam fitur inti untuk membantu Anda mengelola keuangan secara menyeluruh.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {FEATURES.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="group flex items-start gap-3 p-3 sm:p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="space-y-0.5 sm:space-y-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">Pelajari Lebih Lanjut</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/docs/features"
              className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group"
            >
              <FileText className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Detail Fitur</p>
                <p className="text-xs text-muted-foreground">Penjelasan lengkap setiap fitur FinTrack</p>
              </div>
            </Link>
            <Link
              href="/docs/faq"
              className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group"
            >
              <HelpCircle className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Pertanyaan Umum</p>
                <p className="text-xs text-muted-foreground">Jawaban atas pertanyaan yang sering ditanyakan</p>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-6 sm:py-8 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10">
          <h2 className="text-base sm:text-lg font-bold text-foreground">Siap Mengelola Keuangan?</h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 mb-4">
            Daftar sekarang dan mulai lacak pengeluaran Anda dengan FinTrack.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Buat Akun Gratis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </>
  )
}

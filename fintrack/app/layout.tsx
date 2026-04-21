import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/providers/theme-provider';
import PWAProvider from '@/components/providers/pwa-provider';
import { QueryClientLayout } from '@/components/providers/query-client-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'FinTrack - Manajemen Keuangan Pribadi dan Klasterisasi',
    template: '%s | FinTrack',
  },
  description: 'Aplikasi manajemen keuangan pribadi yang memanfaatkan klasterisasi transaksi otomatis dan asisten AI untuk mempermudah monitoring pengeluaran.',
  metadataBase: new URL('https://fintrack.pitok.my.id'),
  keywords: [
    'Manajemen Keuangan',
    'FinTrack',
    'Personal Finance',
    'Klasterisasi',
    'Pengeluaran',
    'AI',
    'Fintech',
    'Indonesia',
  ],
  authors: [{ name: 'Pito Desri Pauzi' }],
  creator: 'FinTrack',
  publisher: 'FinTrack',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'FinTrack - Manajemen Keuangan Pribadi Inovatif',
    description: 'Aplikasi manajemen keuangan pribadi dengan klasterisasi transaksi otomatis berbasis AI untuk membantu Anda mencapai kebebasan finansial.',
    url: 'https://fintrack.pitok.my.id',
    siteName: 'FinTrack',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    images: [{ url: '/og-image.png' }],
    card: 'summary_large_image',
    title: 'FinTrack - Kelola Keuangan dengan Mudah',
    description: 'Aplikasi manajemen keuangan pribadi cerdas dari Indonesia, memaksimalkan klasterisasi AI.',
    creator: '@fintrack_id',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#10b981" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#059669" />
        <link rel="apple-touch-icon" href="/globe.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FinTrack" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientLayout>
            {children}
          </QueryClientLayout>
          <PWAProvider />
          <Toaster
            position="top-center"
            richColors
            closeButton
            toastOptions={{
              style: { borderRadius: '12px' },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

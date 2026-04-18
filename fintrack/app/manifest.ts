import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'FinTrack - Manajemen Keuangan Pribadi',
        short_name: 'FinTrack',
        description: 'Aplikasi manajemen keuangan pribadi dengan klasterisasi transaksi otomatis',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#10b981',
        lang: 'id-ID',
        shortcuts: [
            {
                name: 'Buka Dashboard',
                short_name: 'Dashboard',
                description: 'Lihat ringkasan keuangan Anda',
                url: '/dashboard',
                icons: [{ src: '/icons/icon-dashboard-192x192.png', sizes: '192x192', type: 'image/png' }],
            },
            {
                name: 'Kelola Transaksi',
                short_name: 'Transaksi',
                description: 'Lihat dan catat transaksi terbaru',
                url: '/transactions',
                icons: [{ src: '/icons/icon-transactions-192x192.png', sizes: '192x192', type: 'image/png' }],
            },
            {
                name: 'Tambah Transaksi',
                short_name: 'Tambah',
                description: 'Catat transaksi terbaru',
                url: '/transactions?action=add',
                icons: [{ src: '/icons/icon-add-transactions-192x192.png', sizes: '192x192', type: 'image/png' }],
            },
            {
                name: 'Lihat Analisis AI',
                short_name: 'Analisis',
                description: 'Pantau klasterisasi pengeluaran',
                url: '/analysis',
                icons: [{ src: '/icons/icon-analysis-192x192.png', sizes: '192x192', type: 'image/png' }],
            }
        ],
        icons: [
            {
                src: '/icons/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/icons/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
            },
            {
                src: '/icons/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
        screenshots: [
            {
                src: '/screenshots/dashboard_mobile.png',
                sizes: '390x844',
                type: 'image/png',
                label: 'Tampilan dashboard FinTrack',
            },
            {
                src: '/screenshots/transaksi_mobile.png',
                sizes: '390x844',
                type: 'image/png',
                label: 'Tampilan transaksi FinTrack',
            },
            {
                src: '/screenshots/analisis_mobile.png',
                sizes: '360x740',
                type: 'image/png',
                label: 'Tampilan analisis FinTrack',
            },
            {
                src: '/screenshots/anggaran_mobile.png',
                sizes: '390x844',
                type: 'image/png',
                label: 'Tampilan anggaran FinTrack',
            },
            {
                src: '/screenshots/desktop.png',
                sizes: '778x974',
                type: 'image/png',
                form_factor: 'wide',
                label: 'Tampilan desktop FinTrack',
            },
        ],
    };
}
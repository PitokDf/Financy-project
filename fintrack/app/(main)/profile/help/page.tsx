'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
    HelpCircle,
    MessageCircle,
    BookOpen,
    ChevronRight,
    Mail,
    ExternalLink,
    Sparkles,
    PiggyBank,
    BarChart3,
    Download,
    Shield,
    Bell,
    ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FaqItem {
    question: string;
    answer: string;
}

const FAQ_DATA: FaqItem[] = [
    {
        question: 'Bagaimana cara menambahkan transaksi?',
        answer: 'Buka halaman Dashboard atau Transaksi, lalu klik tombol "+" yang ada di tengah bawah layar. Pilih tipe transaksi (Pemasukan/Pengeluaran), isi detail, dan simpan.'
    },
    {
        question: 'Bagaimana cara mengatur anggaran bulanan?',
        answer: 'Buka menu Anggaran dari navigasi bawah. Anda bisa membuat anggaran baru per kategori untuk setiap bulan. Sistem akan memantau dan mengirim notifikasi jika pengeluaran mendekati batas.'
    },
    {
        question: 'Apa itu fitur AI Lab?',
        answer: 'AI Lab adalah fitur analisis cerdas yang menggunakan machine learning untuk mengelompokkan dan mengkategorikan transaksi Anda secara otomatis. Akses melalui halaman Analisis > AI Lab.'
    },
    {
        question: 'Bagaimana cara mengekspor data?',
        answer: 'Buka Profil > Ekspor Data. Anda bisa memilih format (CSV, Excel, atau PDF) dan periode waktu yang diinginkan. File akan langsung terunduh ke perangkat Anda.'
    },
    {
        question: 'Apakah data saya aman?',
        answer: 'Ya, data Anda dienkripsi dan disimpan dengan aman di server kami. Kami menggunakan autentikasi berbasis token dan tidak pernah menyimpan kata sandi dalam bentuk asli.'
    },
    {
        question: 'Bagaimana cara mengaktifkan notifikasi?',
        answer: 'Buka Profil > aktifkan toggle "Notifikasi Push". Pastikan browser Anda mengizinkan notifikasi dari FinTrack. Anda akan menerima pengingat anggaran dan pencapaian.'
    },
];

interface FeatureInfo {
    icon: React.ElementType;
    title: string;
    description: string;
}

const FEATURES: FeatureInfo[] = [
    {
        icon: PiggyBank,
        title: 'Manajemen Transaksi',
        description: 'Catat pemasukan dan pengeluaran harian secara mudah dengan kategorisasi otomatis.'
    },
    {
        icon: BarChart3,
        title: 'Analisis Keuangan',
        description: 'Lihat pola pengeluaran, arus kas, dan analisis kategori dalam grafik interaktif.'
    },
    {
        icon: Sparkles,
        title: 'AI Smart Clustering',
        description: 'Algoritma AI mengelompokkan transaksi serupa untuk membantu Anda memahami kebiasaan keuangan.'
    },
    {
        icon: Download,
        title: 'Ekspor Laporan',
        description: 'Unduh laporan keuangan dalam format CSV, Excel, atau PDF untuk kebutuhan Anda.'
    },
    {
        icon: Shield,
        title: 'Anggaran & Planner',
        description: 'Tetapkan anggaran per kategori dan pantau realisasinya secara real-time.'
    },
    {
        icon: Bell,
        title: 'Notifikasi Cerdas',
        description: 'Terima pengingat saat mendekati batas anggaran dan capai pencapaian baru.'
    },
];

function FaqAccordionItem({ item }: { item: FaqItem }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-border/50 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full py-3.5 px-4 text-left hover:bg-muted/30 transition-colors"
            >
                <span className="text-sm font-medium text-foreground pr-4">{item.question}</span>
                <ChevronDown className={cn(
                    "w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200",
                    isOpen && "rotate-180"
                )} />
            </button>
            <div className={cn(
                "grid transition-all duration-200 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}>
                <div className="overflow-hidden">
                    <p className="text-xs text-muted-foreground leading-relaxed px-4 pb-3.5">
                        {item.answer}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function HelpPage() {
    return (
        <div className="animate-fade-in space-y-5">
            {/* Hero Info */}
            <Card className="border-border/50 py-0 shadow-none overflow-hidden">
                <CardContent className="p-0">
                    <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-5">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                                <HelpCircle className="w-5 h-5 text-primary" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-semibold text-foreground">
                                    Pusat Bantuan FinTrack
                                </p>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Temukan jawaban atas pertanyaan umum, pelajari fitur-fitur yang tersedia, atau hubungi tim dukungan kami.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                    Hubungi Kami
                </p>
                <Card className="border-border/50 py-0 gap-0 shadow-none divide-y divide-border/50">
                    <a
                        href="mailto:pitokfauzi@pitok.my.id"
                        className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                            <Mail className="w-4 h-4 text-blue-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">Email Dukungan</p>
                            <p className="text-xs text-muted-foreground">pitokfauzi@pitok.my.id</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground/50" />
                    </a>
                    <a
                        href="https://wa.me/6283180541892"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                            <MessageCircle className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">WhatsApp</p>
                            <p className="text-xs text-muted-foreground">Chat langsung dengan developer</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground/50" />
                    </a>
                </Card>
            </div>

            {/* FAQ Section */}
            <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                    Pertanyaan Umum (FAQ)
                </p>
                <Card className="border-border/50 py-0 gap-0 shadow-none">
                    {FAQ_DATA.map((faq, i) => (
                        <FaqAccordionItem key={i} item={faq} />
                    ))}
                </Card>
            </div>

            {/* Features Guide */}
            <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                    Fitur FinTrack
                </p>
                <div className="grid grid-cols-1 gap-2.5">
                    {FEATURES.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <Card key={i} className="border-border/50 py-0 shadow-none">
                                <CardContent className="p-3.5">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <Icon className="w-4 h-4 text-primary" />
                                        </div>
                                        <div className="space-y-0.5 min-w-0">
                                            <p className="text-sm font-medium text-foreground">{feature.title}</p>
                                            <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

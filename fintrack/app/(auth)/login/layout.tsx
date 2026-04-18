import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Masuk ke Akun Anda',
    description: 'Masuk ke FinTrack untuk memantau keuangan, melihat data transaksi, dan mendapatkan ringkasan cerdas dengan AI.',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

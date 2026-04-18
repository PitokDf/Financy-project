import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Daftar Akun Baru',
    description: 'Bergabunglah dengan FinTrack untuk mencapai kebebasan finansial melalui manajemen keuangan otomatis dan pintar.',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

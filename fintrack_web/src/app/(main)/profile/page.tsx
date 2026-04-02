import { ProfileHero } from "@/components/pages/profile/profile-hero";
import { StatsRow } from "@/components/pages/profile/stats-row";
import { SettingsGroup, LogoutButton } from "@/components/pages/profile/settings-group";
import { User, ShieldCheck, DollarSign, AlertTriangle, CalendarClock, Clock, Bot, BarChart4 } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="pb-6 bg-background min-h-full">
            <ProfileHero />
            <StatsRow />

            <SettingsGroup
                title="Akun"
                items={[
                    { icon: User, iconColor: "text-emerald-700 dark:text-emerald-500", iconBg: 'bg-emerald-100 dark:bg-emerald-900/40', title: 'Edit Profil', type: 'link' },
                    { icon: ShieldCheck, iconColor: "text-blue-700 dark:text-blue-500", iconBg: 'bg-blue-100 dark:bg-blue-900/40', title: 'Keamanan & Password', type: 'link' },
                    { icon: DollarSign, iconColor: "text-amber-700 dark:text-amber-500", iconBg: 'bg-amber-100 dark:bg-amber-900/40', title: 'Mata Uang', desc: 'Saat ini: IDR (Rupiah)', type: 'value', value: 'IDR' },
                ]}
            />

            <SettingsGroup
                title="Notifikasi"
                items={[
                    { icon: AlertTriangle, iconColor: "text-rose-700 dark:text-rose-500", iconBg: 'bg-rose-100 dark:bg-rose-900/40', title: 'Peringatan Budget', desc: 'Notif saat > 80% budget terpakai', type: 'toggle', checked: true },
                    { icon: CalendarClock, iconColor: "text-emerald-700 dark:text-emerald-500", iconBg: 'bg-emerald-50 dark:bg-emerald-900/20', title: 'Reminder Harian', desc: 'Pengingat catat transaksi', type: 'toggle', checked: false },
                    { icon: Clock, iconColor: "text-amber-700 dark:text-amber-500", iconBg: 'bg-amber-100 dark:bg-amber-900/40', title: 'Waktu Reminder', type: 'value', value: '21:00' },
                ]}
            />

            <SettingsGroup
                title="Analisis AI"
                items={[
                    { icon: Bot, iconColor: "text-emerald-700 dark:text-emerald-500", iconBg: 'bg-emerald-100 dark:bg-emerald-900/40', title: 'Auto-analisis', desc: 'Jalankan otomatis tiap 50 transaksi baru', type: 'toggle', checked: true },
                    { icon: BarChart4, iconColor: "text-blue-700 dark:text-blue-500", iconBg: 'bg-blue-100 dark:bg-blue-900/40', title: 'Jumlah Klaster (K)', desc: 'Default: otomatis (Elbow Method)', type: 'value', value: 'Auto' },
                ]}
            />

            <div className="px-5">
                <LogoutButton />
            </div>
        </div>
    )
}

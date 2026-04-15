'use client'

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { ChevronRight, Download, Globe, HelpCircle, Moon, Shield, Trash2, User, Smartphone, AlertTriangle, Clock } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { useUserSettings } from "@/hooks/use-user-settings";
import { usePushNotifications } from "@/hooks/use-push-notifications";
import { NotificationPermissionDialog } from "@/components/notification-permission-dialog";
import { useRouter } from 'next/navigation';
import { useState } from "react";

interface MenuItem {
    icon: React.ElementType;
    label: string;
    description?: string;
    badge?: string;
    badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
    action?: () => void;
    href?: string;
    isDanger?: boolean;
    leftContent?: React.ReactNode;
}

export function MenuSection() {
    const { theme, setTheme } = useTheme()
    const { settings, updateSetting } = useUserSettings()
    const { isSubscribed, subscribeUser, unsubscribeUser } = usePushNotifications()
    const [showPermissionDialog, setShowPermissionDialog] = useState(false)
    const router = useRouter()
    const mounted = true

    const handleThemeChange = (isDark: boolean) => {
        const newTheme = isDark ? 'dark' : 'light';
        setTheme(newTheme);
    };

    const handlePushToggle = async (enabled: boolean) => {
        if (enabled) {
            // Show educational UI first
            setShowPermissionDialog(true);
        } else {
            const success = await unsubscribeUser();
            if (success) {
                updateSetting('pushNotifications', false);
            }
        }
    };

    const confirmPushSubscription = async () => {
        setShowPermissionDialog(false);
        const success = await subscribeUser();
        if (success) {
            updateSetting('pushNotifications', true);
        }
    };

    const MENU_SECTIONS: { title: string; items: MenuItem[] }[] = [
        {
            title: 'Akun',
            items: [
                {
                    icon: User,
                    label: 'Edit Profil',
                    description: 'Ubah nama dan foto profil',
                    action: () => router.push('/profile/edit-profile'),
                },
                {
                    icon: Shield,
                    label: 'Keamanan',
                    description: 'Ubah kata sandi & autentikasi',
                    action: () => router.push('/profile/change-password'),
                },
            ],
        },
        {
            title: 'Notifikasi & Peringatan',
            items: [
                {
                    icon: Smartphone,
                    label: 'Push Notification',
                    description: !mounted ? 'Memuat...' : (isSubscribed ? 'Aktif (Perangkat ini)' : 'Tidak aktif'),
                    leftContent: <Switch
                        checked={mounted && isSubscribed && (settings?.pushNotifications ?? true)}
                        onCheckedChange={handlePushToggle}
                    />
                },
                {
                    icon: AlertTriangle,
                    label: 'Peringatan Anggaran',
                    description: 'Saat anggaran hampir habis',
                    leftContent: <Switch checked={settings?.budgetAlerts ?? true} onCheckedChange={(v) => updateSetting('budgetAlerts', v)} />
                },
                {
                    icon: Clock,
                    label: 'Pengingat Harian',
                    description: 'Ingatkan mencatat transaksi (20:00)',
                    leftContent: <Switch checked={settings?.dailyReminder ?? true} onCheckedChange={(v) => updateSetting('dailyReminder', v)} />
                },
            ],
        },
        {
            title: 'Preferensi',
            items: [
                {
                    icon: Moon,
                    label: 'Mode Gelap',
                    description: !mounted ? 'Memuat...' : (theme === 'dark' ? 'Mode Gelap aktif' : 'Mode Terang aktif'),
                    leftContent: <Switch checked={mounted && theme === 'dark'} onCheckedChange={handleThemeChange} />
                },
                {
                    icon: Globe,
                    label: 'Bahasa',
                    description: 'Indonesia (ID)',
                    action: () => toast.info('Fitur dalam pengembangan'),
                },
            ],
        },
        {
            title: 'Data',
            items: [
                {
                    icon: Download,
                    label: 'Ekspor Data',
                    description: 'Unduh laporan keuangan',
                    action: () => toast.success('Ekspor data sedang diproses...'),
                },
                {
                    icon: Trash2,
                    label: 'Hapus Semua Data',
                    description: 'Tindakan tidak dapat diurungkan',
                    action: () => toast.error('Fitur dalam pengembangan'),
                    isDanger: true,
                },
            ],
        },
        {
            title: 'Lainnya',
            items: [
                {
                    icon: HelpCircle,
                    label: 'Bantuan & Dukungan',
                    action: () => toast.info('Fitur dalam pengembangan'),
                },
            ],
        },
    ];

    return (
        <div className="space-y-6">
            {MENU_SECTIONS.map((section) => (
                <div key={section.title}>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                        {section.title}
                    </p>
                    <Card className="border-border/50 py-0 gap-0 shadow-none divide-y divide-border/50">
                        {section.items.map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={idx}
                                    onClick={item.action}
                                    className={cn(
                                        'w-full flex items-center gap-3 p-4 transition-colors text-left',
                                        item.action && 'hover:bg-muted/50 cursor-pointer',
                                        idx === 0 && 'rounded-t-lg',
                                        idx === section.items.length - 1 && 'rounded-b-lg'
                                    )}
                                >
                                    <div
                                        className={cn(
                                            'w-9 h-9 rounded-xl flex items-center justify-center shrink-0',
                                            item.isDanger
                                                ? 'bg-destructive/10'
                                                : 'bg-muted'
                                        )}
                                    >
                                        <Icon
                                            className={cn(
                                                'w-4 h-4',
                                                item.isDanger ? 'text-destructive' : 'text-muted-foreground'
                                            )}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p
                                            className={cn(
                                                'text-sm font-semibold',
                                                item.isDanger ? 'text-destructive' : 'text-foreground'
                                            )}
                                        >
                                            {item.label}
                                        </p>
                                        {item.description && (
                                            <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                                        )}
                                    </div>
                                    {item.badge && (
                                        <Badge variant="default" className="text-[10px] px-1.5 h-4 shrink-0">
                                            {item.badge}
                                        </Badge>
                                    )}
                                    {item.leftContent ? item.leftContent : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
                                </div>
                            );
                        })}
                    </Card>
                </div>
            ))}

            <NotificationPermissionDialog
                isOpen={showPermissionDialog}
                onOpenChange={setShowPermissionDialog}
                onConfirm={confirmPushSubscription}
            />
        </div>
    )
}

'use client'

import { useCallback, useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Bell, BellRing, ShieldCheck, Zap, Clock } from 'lucide-react'
import { usePushNotifications } from '@/hooks/use-push-notifications'
import { useUserSettings } from '@/hooks/use-user-settings'

const DISMISS_KEY = 'fintrack_notification_prompt_dismissed_at'

const DEFAULT_COOLDOWN_MS = 3 * 24 * 60 * 60 * 1000 // 3 hari

interface NotificationPromptModalProps {
    dismissCooldownMs?: number
}

export function NotificationPromptModal({
    dismissCooldownMs = DEFAULT_COOLDOWN_MS,
}: NotificationPromptModalProps) {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { isSubscribed, subscribeUser } = usePushNotifications()
    const { updateSetting } = useUserSettings()

    useEffect(() => {
        if (isSubscribed) return
        if (typeof window === 'undefined') return
        if (!('Notification' in window)) return
        if (Notification.permission === 'denied') return

        // Cek apakah sudah di-dismiss sebelumnya dan masih dalam cooldown
        const dismissedAt = localStorage.getItem(DISMISS_KEY)
        if (dismissedAt) {
            const elapsed = Date.now() - parseInt(dismissedAt, 10)
            if (elapsed < dismissCooldownMs) return
        }

        // Delay sedikit agar halaman profile selesai render dulu
        const timer = setTimeout(() => setOpen(true), 1200)
        return () => clearTimeout(timer)
    }, [isSubscribed, dismissCooldownMs])

    const handleDismiss = useCallback(() => {
        localStorage.setItem(DISMISS_KEY, Date.now().toString())
        setOpen(false)
    }, [])

    const handleActivate = useCallback(async () => {
        setLoading(true)
        try {
            const success = await subscribeUser()
            if (success) {
                updateSetting('pushNotifications', true)
                // Hapus dismiss record supaya tidak mengganggu flow
                localStorage.removeItem(DISMISS_KEY)
            }
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }, [subscribeUser, updateSetting])

    // Jangan render apapun jika sudah subscribed
    if (isSubscribed) return null

    return (
        <Dialog open={open} onOpenChange={(v) => !v && handleDismiss()}>
            <DialogContent className="sm:max-w-md" showCloseButton={false}>
                <DialogHeader>
                    {/* Animated bell icon */}
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-3 relative">
                        <BellRing className="w-8 h-8 text-primary animate-bounce" />
                        <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background animate-pulse" />
                    </div>
                    <DialogTitle className="text-center text-lg">
                        Jangan Lewatkan Info Penting!
                    </DialogTitle>
                    <DialogDescription className="text-center pt-1.5 text-[13px] leading-relaxed">
                        Aktifkan notifikasi untuk mendapatkan peringatan anggaran, pengingat harian, dan info penting lainnya secara real-time.
                    </DialogDescription>
                </DialogHeader>

                {/* Feature highlights */}
                <div className="space-y-2.5 py-2">
                    <FeatureItem
                        icon={Zap}
                        iconBg="bg-emerald-500/10"
                        iconColor="text-emerald-500"
                        title="Peringatan Anggaran"
                        description="Tahu langsung saat pengeluaran hampir melewati batas."
                    />
                    <FeatureItem
                        icon={Clock}
                        iconBg="bg-amber-500/10"
                        iconColor="text-amber-500"
                        title="Pengingat Harian"
                        description="Reminder untuk mencatat transaksi agar tidak lupa."
                    />
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button
                        variant="ghost"
                        onClick={handleDismiss}
                        disabled={loading}
                        className="sm:flex-1 h-10 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                        Nanti saja
                    </Button>
                    <Button
                        onClick={handleActivate}
                        disabled={loading}
                        className="sm:flex-1 font-bold cursor-pointer h-10 gap-2"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Mengaktifkan...
                            </span>
                        ) : (
                            <>
                                <Bell className="w-4 h-4" />
                                Aktifkan Notifikasi
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function FeatureItem({
    icon: Icon,
    iconBg,
    iconColor,
    title,
    description,
}: {
    icon: React.ElementType
    iconBg: string
    iconColor: string
    title: string
    description: string
}) {
    return (
        <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border/40 transition-colors hover:bg-muted/60">
            <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-4 h-4 ${iconColor}`} />
            </div>
            <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight">{title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            </div>
        </div>
    )
}

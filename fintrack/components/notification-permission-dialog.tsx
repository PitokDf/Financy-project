'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Bell, ShieldCheck, Zap } from "lucide-react"

interface NotificationPermissionDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function NotificationPermissionDialog({
  isOpen,
  onOpenChange,
  onConfirm,
}: NotificationPermissionDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Bell className="w-6 h-6 text-primary animate-bounce fill-primary/20" />
          </div>
          <DialogTitle className="text-center text-xl">Aktifkan Notifikasi?</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Tetap terhubung dengan keuangan Anda dan dapatkan update real-time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-semibold">Peringatan Anggaran</p>
              <p className="text-xs text-muted-foreground">Dapatkan info saat pengeluaran Anda hampir melewati batas.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-semibold">Keamanan Akun</p>
              <p className="text-xs text-muted-foreground">Notifikasi instan untuk aktivitas mencurigakan.</p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="sm:flex-1">
            Nanti saja
          </Button>
          <Button onClick={onConfirm} className="sm:flex-1 font-bold">
            Ya, Aktifkan!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

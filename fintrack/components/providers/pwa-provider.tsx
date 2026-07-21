'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X, Wifi, Bell, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/lib/zustand/auth-store';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface NavigatorExtended extends Navigator {
  standalone?: boolean;
}

interface WindowExtended extends Window {
  MSStream?: unknown;
}

const DISMISSED_KEY = 'fintrack-pwa-dismissed';
const DISMISS_COOLDOWN = 7 * 24 * 60 * 60 * 1000;

function isRecentlyDismissed(): boolean {
  try {
    const ts = localStorage.getItem(DISMISSED_KEY);
    if (!ts) return false;
    return Date.now() - parseInt(ts) < DISMISS_COOLDOWN;
  } catch {
    return false;
  }
}

export default function PWAProvider() {
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as NavigatorExtended).standalone ||
      document.referrer.includes('android-app://');

    const ios =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as WindowExtended).MSStream;

    setIsStandalone(standalone);
    setIsIOS(ios);

    if (ios && !standalone && !isRecentlyDismissed()) {
      setShowBanner(true);
    }

    if ('serviceWorker' in navigator) {
      if (window.isSecureContext) {
        navigator.serviceWorker
          .register('/sw/sw.js', { type: 'module', scope: '/' })
          .then((reg) => {
            console.log('PWA: SW registered:', reg.scope);
            if ('sync' in reg) {
              reg.sync.register('fintrack-mutations').catch(() => {});
            }
          })
          .catch((err) => console.error('PWA: SW registration failed:', err));
      }
    }

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (!isRecentlyDismissed()) {
        setShowBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        if (reg.active && user?.id) {
          reg.active.postMessage({ type: 'SET_USER_ID', userId: user.id });
        }
      });
    }
  }, [user?.id]);

  const handleInstall = async () => {
    if (isIOS) {
      toast.info('iOS: Tekan tombol "Share" lalu pilih "Add to Home Screen"');
      return;
    }
    if (!deferredPrompt) {
      toast.error('Prompt belum siap. Coba refresh halaman.');
      return;
    }
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowBanner(false);
      toast.success('FinTrack berhasil diinstall!');
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    try { localStorage.setItem(DISMISSED_KEY, Date.now().toString()); } catch {}
  };

  if (!showBanner || isStandalone) return null;

  return (
    <div id="pwa-install-banner" className="fixed bottom-20 left-4 right-4 z-50 animate-slide-up">
      <div className="glass rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shrink-0">
            <Download className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Install FinTrack</p>
            <p className="text-xs text-muted-foreground">
              {isIOS ? 'Tambahkan ke layar utama' : 'Akses lebih cepat dari layar utama'}
            </p>
          </div>
          <Button id="pwa-install-button" size="sm" onClick={handleInstall} className="shrink-0 text-xs px-3">
            {isIOS ? 'Cara Install' : 'Install'}
          </Button>
          <button id="pwa-dismiss-button" onClick={handleDismiss} className="shrink-0 p-1 rounded-full hover:bg-muted transition-colors" aria-label="Tutup">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        {!isIOS && (
          <div className="mt-3 pt-3 border-t border-border/50 flex gap-4">
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[11px] text-muted-foreground">Akses Offline</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[11px] text-muted-foreground">Notifikasi Push</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[11px] text-muted-foreground">Lebih Cepat</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
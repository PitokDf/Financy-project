'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
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

export default function PWAProvider() {
  const [pwaState, setPwaState] = useState(() => {
    if (typeof window === 'undefined') {
      return {
        showInstallBanner: false,
        isIOS: false,
        isStandalone: false,
      };
    }

    // Detect standalone mode
    const isStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as NavigatorExtended).standalone ||
      document.referrer.includes('android-app://');

    // Detect iOS
    const ios =
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as WindowExtended).MSStream;

    // Check if dismissed more than 7 days ago
    const dismissedTimestamp = localStorage.getItem('fintrack-pwa-dismissed-timestamp');
    const sevenDaysInMs = 60 * 1000;
    const recentlyDismissed = dismissedTimestamp && (Date.now() - parseInt(dismissedTimestamp)) <= sevenDaysInMs;

    return {
      showInstallBanner: ios && !isStandaloneMode && !recentlyDismissed,
      isIOS: ios,
      isStandalone: isStandaloneMode,
    };
  });
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const { user } = useAuthStore();

  // Sync userId to Service Worker for notification filtering
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.active) {
          registration.active.postMessage({
            type: "SET_USER_ID",
            userId: user?.id || null,
          });
        }
      });
    }
  }, [user?.id]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      if (!window.isSecureContext) {
        console.warn(
          'PWA: Service Worker skipped (not secure). Use HTTPS or localhost.'
        );
      } else {
        navigator.serviceWorker
          .register('/sw/sw.js', { type: 'module', scope: '/' })
          .then((reg) => {
            console.log(
              'PWA: Service Worker registered successfully:',
              reg.scope
            );
          })
          .catch((err) => {
            console.error(
              'PWA: Service Worker registration failed:',
              err
            );
          });
      }
    }

    // beforeinstallprompt event
    const handler = (e: Event) => {
      e.preventDefault();

      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);

      // Check if dismissed more than 7 days ago
      const dismissedTimestamp = localStorage.getItem('fintrack-pwa-dismissed-timestamp');
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
      const shouldShow = !dismissedTimestamp || (Date.now() - parseInt(dismissedTimestamp)) > sevenDaysInMs;

      if (shouldShow) {
        setPwaState((prev) => ({
          ...prev,
          showInstallBanner: true,
        }));
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (pwaState.isIOS) {
      toast.info(
        'Instalasi iOS: Tekan tombol "Share" lalu pilih "Add to Home Screen"'
      );
      return;
    }

    if (!deferredPrompt) {
      if (!window.isSecureContext) {
        toast.error(
          'Gagal install: koneksi tidak aman (gunakan HTTPS/localhost)'
        );
      } else {
        toast.error(
          'Prompt belum siap. Coba refresh halaman.'
        );
      }
      return;
    }

    await deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setPwaState((prev) => ({
        ...prev,
        showInstallBanner: false,
      }));
    }
  };

  const handleDismiss = () => {
    setPwaState((prev) => ({
      ...prev,
      showInstallBanner: false,
    }));
    // Store timestamp instead of permanent dismissal
    localStorage.setItem('fintrack-pwa-dismissed-timestamp', Date.now().toString());
  };

  if (!pwaState.showInstallBanner || pwaState.isStandalone) return null;

  return (
    <div
      id="pwa-install-banner"
      className="fixed bottom-20 left-4 right-4 z-50 animate-slide-up"
    >
      <div className="glass rounded-2xl p-4 shadow-xl flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shrink-0">
          <Download className="w-5 h-5 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">
            Install FinTrack
          </p>
          <p className="text-xs text-muted-foreground">
            {pwaState.isIOS
              ? 'Tambahkan ke layar utama'
              : 'Akses lebih cepat dari layar utama'}
          </p>
        </div>

        <Button
          id="pwa-install-button"
          size="sm"
          onClick={handleInstall}
          className="shrink-0 text-xs px-3"
        >
          {pwaState.isIOS ? 'Cara Install' : 'Install'}
        </Button>

        <button
          id="pwa-dismiss-button"
          onClick={handleDismiss}
          className="shrink-0 p-1 rounded-full hover:bg-muted transition-colors"
          aria-label="Tutup"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
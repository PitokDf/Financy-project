'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/zustand/auth-store';

export default function RootPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (isAuthenticated) {
              router.replace('/dashboard');
            } else {
              router.replace('/login');
            }
          }, 300);
          return prev;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <img src="/logo.png" alt="FinTrack" className="w-14 h-14 rounded-xl" />
        <p className="text-sm text-muted-foreground font-medium">Memuat FinTrack...</p>
        <div className="w-48 bg-muted rounded-full h-1">
          <div
            className="bg-primary h-1 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

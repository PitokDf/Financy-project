'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/zustand/auth-store';

export default function RootPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
          <span className="text-white font-black text-2xl">F</span>
        </div>
        <p className="text-sm text-muted-foreground font-medium">Memuat FinTrack...</p>
      </div>
    </div>
  );
}

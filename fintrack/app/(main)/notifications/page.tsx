'use client';

import { useNotifications, Notification } from '@/hooks/use-notifications';
import {
  Bell,
  CheckCheck,
  Trash2,
  Wallet,
  Trophy,
  TrendingUp,
  Calendar,
  Flame,
  Loader2
} from 'lucide-react';
import { formatDistanceToNow, isToday, isYesterday, isWithinInterval, subDays, startOfDay } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { getColor, getIcon } from './_components/utils';
import { useMemo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

type FlatItem =
  | { type: 'header'; label: string; id: string }
  | { type: 'item'; notification: Notification };

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useNotifications();

  const natificationElementRef = useRef<HTMLDivElement>(null);

  const flatItems = useMemo<FlatItem[]>(() => {
    if (notifications.length === 0) return [];

    const groups: Record<string, Notification[]> = {
      'Hari Ini': [],
      'Kemarin': [],
      'Minggu Ini': [],
      'Sebelumnya': [],
    };

    const now = new Date();
    const today = startOfDay(now);
    const yesterday = startOfDay(subDays(now, 1));
    const lastWeek = startOfDay(subDays(now, 7));

    notifications.forEach((n) => {
      const date = new Date(n.createdAt);
      if (isToday(date)) {
        groups['Hari Ini'].push(n);
      } else if (isYesterday(date)) {
        groups['Kemarin'].push(n);
      } else if (isWithinInterval(date, { start: lastWeek, end: yesterday })) {
        groups['Minggu Ini'].push(n);
      } else {
        groups['Sebelumnya'].push(n);
      }
    });

    const result: FlatItem[] = [];
    Object.entries(groups).forEach(([label, items]) => {
      if (items.length > 0) {
        result.push({ type: 'header', label, id: `header-${label}` });
        items.forEach((item) => {
          result.push({ type: 'item', notification: item });
        });
      }
    });

    return result;
  }, [notifications]);

  const notificaitonVirtualizer = useVirtualizer({
    count: flatItems.length,
    getScrollElement: () => natificationElementRef.current,
    estimateSize: (index) => (flatItems[index]?.type === 'header' ? 40 : 100),
  });

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      {notifications.length > 0 && (
        <div className="px-4 py-3 -mt-4 -mx-4 flex justify-between items-end bg-background/80 backdrop-blur-md border-b border-border/40 sticky top-0 z-20">
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
              {unreadCount > 0 ? `${unreadCount} Belum Dibaca` : 'Semua Sudah Dibaca'}
            </p>
          </div>
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 text-[9px] font-black tracking-tighter text-primary hover:bg-primary/10 px-3 py-0.5 rounded-full transition-all border border-primary/20 bg-primary/5 active:scale-90"
          >
            <CheckCheck className="w-3 h-3" />
            <span>BACA SEMUA</span>
          </button>
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground animate-pulse font-medium">Memuat kabar terbaru...</p>
          </div>
        )}

        {!isLoading && notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 px-10 text-center animate-in zoom-in-95 duration-700">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6 relative border border-primary/10">
              <Bell className="w-10 h-10 text-primary/20" />
            </div>
            <h3 className="text-lg font-bold mb-2 tracking-tight">Hening Sekali di Sini</h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[220px] mx-auto font-medium opacity-80">
              Anda belum memiliki kabar baru. Tetap catat transaksi Anda untuk mendapatkan insights cerdas!
            </p>
          </div>
        )}

        {notifications.length > 0 && (
          <div className="h-full overflow-y-auto" ref={natificationElementRef}>
            <div
              style={{
                height: `${notificaitonVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative'
              }}
            >
              {notificaitonVirtualizer.getVirtualItems().map((vir) => {
                const item = flatItems[vir.index];

                if (item.type === 'header') {
                  return (
                    <div
                      key={item.id}
                      ref={notificaitonVirtualizer.measureElement}
                      data-index={vir.index}
                      className="z-10 bg-background/95 backdrop-blur-md sticky top-0 py-3 border-b border-border/10"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        transform: `translateY(${vir.start}px)`,
                      }}
                    >
                      <h3 className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] px-4">
                        {item.label}
                      </h3>
                    </div>
                  );
                }

                const n = item.notification;

                return (
                  <div
                    key={n.id}
                    ref={notificaitonVirtualizer.measureElement}
                    data-index={vir.index}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      transform: `translateY(${vir.start}px)`,
                    }}
                  >
                    <div
                      onClick={() => !n.isRead && markAsRead(n.id)}
                      className={cn(
                        "relative flex items-center gap-4 p-4 transition-all duration-200 border-b border-border/30 active:bg-accent/5 select-none",
                        !n.isRead ? "bg-primary/5" : "bg-transparent"
                      )}
                    >
                      <div className="shrink-0">
                        <div className={cn(
                          "w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300",
                          !n.isRead
                            ? `bg-${getColor(n.type)}/10 text-primary-foreground shadow-sm`
                            : "bg-muted text-muted-foreground opacity-60"
                        )}>
                          {getIcon(n.type)}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <h4 className={cn(
                            "text-[13px] font-bold truncate tracking-tight transition-colors",
                            !n.isRead ? "text-foreground" : "text-muted-foreground"
                          )}>
                            {n.title}
                          </h4>
                          <span className="text-[9px] font-semibold text-muted-foreground/50 whitespace-nowrap">
                            {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true, locale: id })}
                          </span>
                        </div>
                        <p className={cn(
                          "text-[11px] leading-snug line-clamp-2 transition-colors",
                          !n.isRead ? "text-foreground/80 font-medium" : "text-muted-foreground/50 font-normal"
                        )}>
                          {n.message}
                        </p>
                      </div>

                      <div className="shrink-0 flex items-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(n.id);
                          }}
                          className="p-2 text-muted-foreground/20 active:text-destructive active:bg-destructive/10 rounded-full transition-all"
                          aria-label="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {!n.isRead && (
                        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-3 bg-primary rounded-full" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useUserSettings } from "@/hooks/use-user-settings";

const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export function LocaleSync() {
  const locale = useLocale();
  const router = useRouter();
  const { settings, isLoading } = useUserSettings();
  const lastSynced = useRef<string | null>(null);

  useEffect(() => {
    const preferred = settings?.language;
    if (isLoading || !preferred || preferred === locale) return;
    if (lastSynced.current === preferred) return;

    lastSynced.current = preferred;
    document.cookie = `NEXT_LOCALE=${preferred}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax`;
    router.refresh();
  }, [settings?.language, isLoading, locale, router]);

  return null;
}

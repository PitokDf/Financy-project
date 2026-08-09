"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useUserSettings } from "@/hooks/use-user-settings";
import { setLocaleCookie } from "@/lib/locale-cookie";

export function LocaleSync() {
  const locale = useLocale();
  const router = useRouter();
  const { settings, isLoading, isFetching } = useUserSettings();
  const lastSynced = useRef<string | null>(null);

  useEffect(() => {
    const preferred = settings?.language;
    if (isLoading || isFetching || !preferred || preferred === locale) return;
    if (lastSynced.current === preferred) return;

    lastSynced.current = preferred;
    setLocaleCookie(preferred);
    router.refresh();
  }, [settings?.language, isLoading, isFetching, locale, router]);

  return null;
}

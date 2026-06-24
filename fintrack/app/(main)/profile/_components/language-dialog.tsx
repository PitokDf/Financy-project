"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface LanguageDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LanguageDialog({ isOpen, onClose }: LanguageDialogProps) {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("profile");

  if (!isOpen) return null;

  const handleSelectLanguage = (newLocale: string) => {
    if (newLocale !== locale) {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      if (newLocale === "en") {
        toast.success("Language changed to English");
      } else {
        toast.success("Bahasa berhasil diubah ke Indonesia");
      }
      router.refresh();
    }
    onClose();
  };

  const OPTIONS = [
    {
      value: "id",
      label: "Bahasa Indonesia",
      description: "Indonesia (ID)",
    },
    {
      value: "en",
      label: "English",
      description: "English (EN)",
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet from bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl p-5 pb-8 shadow-2xl border-t border-border/50 animate-in slide-in-from-bottom-5 duration-300">
        <div className="max-w-2xl mx-auto">
          {/* Handle */}
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-5" />

          <h2 className="text-base font-bold text-foreground mb-1">
            {t("language")}
          </h2>
          <p className="text-xs text-muted-foreground mb-5">
            Pilih bahasa aplikasi Anda / Select your application language
          </p>

          <div className="space-y-2">
            {OPTIONS.map((opt) => {
              const isActive = locale === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => handleSelectLanguage(opt.value)}
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                    isActive
                      ? "border-primary bg-primary/10 text-primary font-semibold"
                      : "border-border bg-muted/40 text-muted-foreground"
                  )}
                >
                  <div>
                    <p className={cn("text-sm font-semibold", isActive ? "text-primary" : "text-foreground")}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{opt.description}</p>
                  </div>
                  {isActive && <Check className="w-4 h-4 text-primary shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  Download,
  Globe,
  HelpCircle,
  Moon,
  Shield,
  Trash2,
  User,
  Smartphone,
  AlertTriangle,
  Clock,
  Sparkles,
  AlarmClock,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { useUserSettings } from "@/hooks/use-user-settings";
import { usePushNotifications } from "@/hooks/use-push-notifications";
import { NotificationPermissionDialog } from "@/components/notification-permission-dialog";
import { ExportDialog } from "./export-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ConfirmDeleteData } from "./confirm-delete-data";
import { useLocale, useTranslations } from "next-intl";
import { LanguageDialog } from "./language-dialog";
import { TimePicker } from "@/components/ui/time-picker";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  description?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  action?: () => void;
  href?: string;
  isDanger?: boolean;
  leftContent?: React.ReactNode;
}

export function MenuSection() {
  const { theme, setTheme } = useTheme();
  const { settings, updateSetting } = useUserSettings();
  const { isSubscribed, subscribeUser, unsubscribeUser } =
    usePushNotifications();
  const [showPermissionDialog, setShowPermissionDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const router = useRouter();
  const mounted = true;
  const locale = useLocale();
  const t = useTranslations("profile");
  const tCommon = useTranslations("common");

  const handleThemeChange = (isDark: boolean) => {
    const newTheme = isDark ? "dark" : "light";
    setTheme(newTheme);
  };

  const handlePushToggle = async (enabled: boolean) => {
    if (enabled) {
      setShowPermissionDialog(true);
    } else {
      const success = await unsubscribeUser();
      if (success) {
        updateSetting("pushNotifications", false);
      }
    }
  };

  const confirmPushSubscription = async () => {
    setShowPermissionDialog(false);
    const success = await subscribeUser();
    if (success) {
      updateSetting("pushNotifications", true);
    }
  };

  const MENU_SECTIONS: { title: string; items: MenuItem[] }[] = [
    {
      title: t("account"),
      items: [
        {
          icon: User,
          label: t("editProfile"),
          description: t("editProfileDesc"),
          action: () => router.push("/profile/edit-profile"),
        },
        {
          icon: Shield,
          label: t("security"),
          description: t("securityDesc"),
          action: () => router.push("/profile/change-password"),
        },
      ],
    },
    {
      title: t("notifications"),
      items: [
        {
          icon: Smartphone,
          label: t("pushNotification"),
          description: !mounted
            ? tCommon("loading")
            : isSubscribed
              ? t("pushNotificationActive")
              : t("pushNotificationInactive"),
          leftContent: (
            <Switch
              checked={
                mounted && isSubscribed && (settings?.pushNotifications ?? true)
              }
              onCheckedChange={handlePushToggle}
            />
          ),
        },
        {
          icon: AlertTriangle,
          label: t("budgetAlert"),
          description: t("budgetAlertDesc"),
          leftContent: (
            <Switch
              checked={settings?.budgetAlerts ?? true}
              onCheckedChange={(v) => updateSetting("budgetAlerts", v)}
            />
          ),
        },
        {
          icon: Clock,
          label: t("dailyReminder"),
          description: t("dailyReminderDesc"),
          leftContent: (
            <Switch
              checked={settings?.dailyReminder ?? true}
              onCheckedChange={(v) => updateSetting("dailyReminder", v)}
            />
          ),
        },
        {
          icon: AlarmClock,
          label: t("reminderTime"),
          description: t("reminderTimeDesc"),
          leftContent: (
            <TimePicker
              value={settings?.reminderTime ?? "20:00"}
              onValueChange={(v) => updateSetting("reminderTime", v)}
              className="h-9 w-27.5 px-3"
            />
          ),
        },
      ],
    },
    {
      title: t("preferences"),
      items: [
        {
          icon: Moon,
          label: t("darkMode"),
          description: !mounted
            ? tCommon("loading")
            : theme === "dark"
              ? t("darkModeActive")
              : t("darkModeInactive"),
          leftContent: (
            <Switch
              checked={mounted && theme === "dark"}
              onCheckedChange={handleThemeChange}
            />
          ),
        },
        {
          icon: Sparkles,
          label: t("autoCategorize"),
          description: t("autoCategorizeDesc"),
          leftContent: (
            <Switch
              checked={settings?.autoCategorize ?? true}
              onCheckedChange={(v) => updateSetting("autoCategorize", v)}
            />
          ),
        },
        {
          icon: Globe,
          label: t("language"),
          description: t("languageActive"),
          action: () => setShowLanguageDialog(true),
        },
      ],
    },
    {
      title: t("data"),
      items: [
        {
          icon: Download,
          label: t("exportData"),
          description: t("exportDataDesc"),
          action: () => setShowExportDialog(true),
        },
        {
          icon: Trash2,
          label: t("deleteData"),
          description: t("deleteDataDesc"),
          action: () => setShowDeleteDialog(true),
          isDanger: true,
        },
      ],
    },
    {
      title: t("others"),
      items: [
        {
          icon: HelpCircle,
          label: t("help"),
          action() {
            router.push("/profile/help");
          },
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {MENU_SECTIONS.map((section) => (
        <div key={section.title}>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            {section.title}
          </p>
          <Card className="border-border/50 py-0 gap-0 shadow-none divide-y divide-border/50">
            {section.items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={item.action}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 transition-colors text-left",
                    item.action && "hover:bg-muted/50 cursor-pointer",
                    idx === 0 && "rounded-t-lg",
                    idx === section.items.length - 1 && "rounded-b-lg",
                  )}
                >
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                      item.isDanger ? "bg-destructive/10" : "bg-muted",
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4",
                        item.isDanger
                          ? "text-destructive"
                          : "text-muted-foreground",
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        item.isDanger ? "text-destructive" : "text-foreground",
                      )}
                    >
                      {item.label}
                    </p>
                    {item.description && (
                      <p className="text-xs text-muted-foreground truncate">
                        {item.description}
                      </p>
                    )}
                  </div>
                  {item.badge && (
                    <Badge
                      variant="default"
                      className="text-[10px] px-1.5 h-4 shrink-0"
                    >
                      {item.badge}
                    </Badge>
                  )}
                  {item.leftContent ? (
                    item.leftContent
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                </div>
              );
            })}
          </Card>
        </div>
      ))}

      <NotificationPermissionDialog
        isOpen={showPermissionDialog}
        onOpenChange={setShowPermissionDialog}
        onConfirm={confirmPushSubscription}
      />

      <ExportDialog
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
      />

      <ConfirmDeleteData
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />

      <LanguageDialog
        isOpen={showLanguageDialog}
        onClose={() => setShowLanguageDialog(false)}
        onLanguageChange={(l) => updateSetting("language", l)}
      />
    </div>
  );
}

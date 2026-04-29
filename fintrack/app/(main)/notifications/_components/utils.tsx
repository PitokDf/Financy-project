import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Brain,
  Calendar,
  CheckCheck,
  Flame,
  TrendingUp,
  Trophy,
  Wallet,
} from "lucide-react";

import type { Notification } from "@/hooks/use-notifications";

export type NotificationType = Notification["type"];

type NotificationConfig = {
  icon: LucideIcon;
  textColor: string;
  bgColor: string;
};

const notificationConfig: Partial<Record<NotificationType, NotificationConfig>> = {
  BUDGET_ALERT: {
    icon: Wallet,
    textColor: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  ACHIEVEMENT: {
    icon: Trophy,
    textColor: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  LEVEL_UP: {
    icon: TrendingUp,
    textColor: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  PATTERN_FOUND: {
    icon: Brain,
    textColor: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  STREAK_WARNING: {
    icon: Flame,
    textColor: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  REMINDER: {
    icon: Calendar,
    textColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  CHALLENGE_COMPLETE: {
    icon: CheckCheck,
    textColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
};

const defaultConfig: NotificationConfig = {
  icon: Bell,
  textColor: "text-gray-500",
  bgColor: "bg-gray-500/10",
};

export const getNotificationConfig = (
  type: NotificationType
): NotificationConfig => {
  return notificationConfig[type] ?? defaultConfig;
};
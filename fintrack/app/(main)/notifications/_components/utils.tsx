import { Notification } from "@/hooks/use-notifications";
import { Bell, Calendar, CheckCheck, Flame, TrendingUp, Trophy, Wallet } from "lucide-react";

export const getIcon = (type: Notification['type']) => {
  switch (type) {
    case 'BUDGET_ALERT': return <Wallet className="w-5 h-5 text-orange-500" />;
    case 'ACHIEVEMENT': return <Trophy className="w-5 h-5 text-yellow-500" />;
    case 'LEVEL_UP': return <TrendingUp className="w-5 h-5 text-green-500" />;
    case 'PATTERN_FOUND': return <Brain className="w-5 h-5 text-purple-500" />;
    case 'STREAK_WARNING': return <Flame className="w-5 h-5 text-red-500" />;
    case 'REMINDER': return <Calendar className="w-5 h-5 text-blue-500" />;
    case 'CHALLENGE_COMPLETE': return <CheckCheck className="w-5 h-5 text-emerald-500" />;
    default: return <Bell className="w-5 h-5 text-gray-500" />;
  }
};

export const Brain = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.105 4 4 0 0 0 6.003 0 4 4 0 0 0 .5-8.105 4 4 0 0 0-2.5-5.77A3 3 0 0 0 12 5Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.52 8.105 4 4 0 0 1-6.003 0 4 4 0 0 1-.5-8.105 4 4 0 0 1 2.5-5.77A3 3 0 0 1 12 5Z" />
  </svg>
);
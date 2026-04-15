"use client";

import { useRouter } from "next/navigation";
import {
    ChevronLeft,
    Trophy,
    Target,
    Zap,
    Box,
    Flame,
    Award,
    CheckCircle2
} from "lucide-react";
import { useGamification, UserChallenge } from "@/hooks/use-gamification";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TYPE_ICONS: Record<string, any> = {
    WEEKLY_TRANSACTIONS: Box,
    BUDGET_GOALS: Target,
    ANALYSIS_COUNT: Zap,
    STREAK_MAINTAIN: Flame,
};

export default function AchievementsPage() {
    const { stats, challenges, badges, progressToNextLevel, xpToNextLevel } = useGamification();

    const activeChallenges = challenges.filter(c => !c.isCompleted);
    const completedChallenges = challenges.filter(c => c.isCompleted);

    return (
        <div className="animate-fade-in space-y-6 pb-24">
            {/* Level & XP Card (Profile Style) */}
            <Card className="border-border/50 py-0 shadow-none overflow-hidden">
                <div className="gradient-primary h-16 relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                </div>
                <CardContent className="px-4 pb-5 -mt-6 relative z-10">
                    <div className="flex items-end gap-3 mb-4">
                        <div className="w-14 h-14 -mt-12 rounded-2xl bg-background border-2 border-primary flex items-center justify-center ring-4 ring-primary/10">
                            <span className="text-2xl font-black text-primary">{stats?.level || 1}</span>
                        </div>
                        <div className="flex-1 pb-1">
                            <h2 className="font-bold text-foreground leading-tight">Level {stats?.level || 1}</h2>
                            <p className="text-xs text-muted-foreground font-medium">
                                {stats?.xp || 0} / {xpToNextLevel} XP
                            </p>
                        </div>
                        <Badge variant="outline" className="mb-1 border-primary/20 text-primary bg-primary/5 text-[10px] font-bold">
                            {stats?.xp || 0} TOTAL XP
                        </Badge>
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            <span>Progress Level</span>
                            <span>{Math.round(progressToNextLevel)}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden border border-border/50">
                            <div
                                className="h-full gradient-primary transition-all duration-1000 ease-out"
                                style={{ width: `${progressToNextLevel}%` }}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Weekly Challenges Section */}
            <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                    Tantangan Mingguan
                </p>
                <Card className="border-border/50 py-0 gap-0 shadow-none divide-y divide-border/50 overflow-hidden">
                    {activeChallenges.length > 0 ? activeChallenges.map((uc) => {
                        const Icon = TYPE_ICONS[uc.challenge.type] || Trophy;
                        return (
                            <div key={uc.id} className="p-4 flex flex-col gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0 border border-border/50">
                                        <Icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start gap-2">
                                            <p className="text-sm font-bold text-foreground leading-tight">
                                                {uc.challenge.title}
                                            </p>
                                            <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-md shrink-0">
                                                +{uc.challenge.xpReward} XP
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                            {uc.challenge.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-1.5 bg-muted/30 p-2 rounded-lg">
                                    <div className="flex justify-between text-[9px] font-bold text-muted-foreground uppercase">
                                        <span>Progres</span>
                                        <span>{uc.current} / {uc.challenge.target}</span>
                                    </div>
                                    <div className="h-1.5 bg-background rounded-full overflow-hidden border border-border/50">
                                        <div
                                            className="h-full bg-primary transition-all duration-700"
                                            style={{ width: `${Math.min((uc.current / uc.challenge.target) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="p-8 text-center">
                            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-50" />
                            <p className="text-sm font-bold text-foreground">Semua Beres!</p>
                            <p className="text-xs text-muted-foreground mt-1">Anda telah menyelesaikan semua tantangan minggu ini.</p>
                        </div>
                    )}
                </Card>
            </div>

            {/* Completed Challenges */}
            {completedChallenges.length > 0 && (
                <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                        Selesai Minggu Ini
                    </p>
                    <Card className="border-border/50 py-0 shadow-none divide-y divide-border/50 overflow-hidden opacity-75">
                        {completedChallenges.map((uc) => (
                            <div key={uc.id} className="flex items-center gap-3 p-4 bg-emerald-500/5">
                                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-foreground line-through decoration-muted-foreground/30">
                                        {uc.challenge.title}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground">Selesai • +{uc.challenge.xpReward} XP didapat</p>
                                </div>
                                <div className="p-1 rounded-full bg-emerald-500 text-white">
                                    <CheckCircle2 className="w-3 h-3" />
                                </div>
                            </div>
                        ))}
                    </Card>
                </div>
            )}

            {/* Badges Section */}
            <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                    Koleksi Lencana
                </p>
                <div className="grid grid-cols-4 gap-3">
                    {badges && badges.length > 0 ? badges.map((ub) => (
                        <div key={ub.id} className="flex flex-col items-center gap-2">
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center border shadow-sm transition-transform active:scale-95"
                                style={{ backgroundColor: ub.badge.color + '15', borderColor: ub.badge.color + '40' }}
                            >
                                <Award className="w-8 h-8" style={{ color: ub.badge.color }} />
                            </div>
                            <span className="text-[10px] font-bold text-center text-foreground leading-tight px-1 truncate w-full">
                                {ub.badge.name}
                            </span>
                        </div>
                    )) : (
                        <div className="col-span-4 py-8 text-center bg-muted/30 rounded-2xl border border-dashed border-border/50 text-muted-foreground">
                            <Award className="w-8 h-8 mx-auto mb-2 opacity-20" />
                            <p className="text-xs">Belum ada lencana yang terkoleksi</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

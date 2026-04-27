"use client";

import {
    Trophy, Target, Zap, Box, Flame, Award, CheckCircle2,
} from "lucide-react";
import { useGamification } from "@/hooks/use-gamification";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { cn } from "@/lib/utils";
import * as LucideIcon from 'lucide-react'

const TYPE_ICONS: Record<string, any> = {
    WEEKLY_TRANSACTIONS: Box,
    BUDGET_GOALS: Target,
    ANALYSIS_COUNT: Zap,
    STREAK_MAINTAIN: Flame,
};

export default function AchievementsPage() {
    const { stats, challenges, badges, allBadges, progressToNextLevel, xpToNextLevel } = useGamification();

    const activeChallenges = challenges.filter((c) => !c.isCompleted);
    const completedChallenges = challenges.filter((c) => c.isCompleted);
    const userBadgeIds = new Set(badges.map(ub => ub.badge.id))

    return (
        <div className="animate-fade-in space-y-6">

            {/* ── HERO: Level ── */}
            <Card className="border-amber-500/15 bg-linear-to-br from-amber-500/10 via-orange-500/5 to-transparent shadow-none">
                <CardContent className="p-5">
                    <div className="flex items-center gap-4 mb-5">
                        <div className="relative shrink-0">
                            <div className="absolute inset-0 rounded-full bg-amber-400 blur-xl opacity-30" />
                            <div className="w-16 h-16 rounded-full bg-linear-to-br from-amber-300 via-amber-500 to-orange-600 p-[2px] relative z-10">
                                <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-br from-amber-400 to-orange-600">
                                        {stats?.level || 1}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600/80 mb-0.5">Level</p>
                            <h2 className="text-2xl font-black text-foreground tracking-tight leading-none mb-1">
                                {stats?.level || 1}
                            </h2>
                            <p className="text-xs text-muted-foreground">{stats?.xp || 0} XP total</p>
                        </div>

                        <div className="text-right shrink-0">
                            <p className="text-[10px] text-muted-foreground mb-0.5">Ke Level {(stats?.level || 1) + 1}</p>
                            <p className="text-sm font-bold text-foreground">{xpToNextLevel} XP</p>
                        </div>
                    </div>

                    <div className="h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-linear-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progressToNextLevel}%` }}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* ── MISI MINGGUAN ── */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground">Misi Mingguan</h3>
                    <Badge variant="secondary" className="text-[10px] font-semibold">
                        {activeChallenges.length} tersisa
                    </Badge>
                </div>

                {activeChallenges.length > 0 ? (
                    <div className="space-y-2">
                        {activeChallenges.map((uc) => {
                            const Icon = TYPE_ICONS[uc.challenge.type] || Trophy;
                            const progress = Math.min((uc.current / uc.challenge.target) * 100, 100);

                            return (
                                <Card key={uc.id} className="shadow-none py-0 border-border/50">
                                    <CardContent className="p-3.5 flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                            <Icon className="w-4.5 h-4.5 text-primary" strokeWidth={2} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-2 relative">
                                                <p className="text-sm font-semibold text-foreground leading-tight">
                                                    {uc.challenge.title}
                                                </p>
                                                <div className="flex items-center gap-2">
                                                    <InfoTooltip
                                                        title={uc.challenge.title}
                                                        content={uc.challenge.description}
                                                    />
                                                    <Badge variant="secondary" className="text-[10px] font-bold text-amber-600 bg-amber-500/10 border-0 shrink-0 flex items-center gap-0.5 px-1.5">
                                                        <Zap className="w-3 h-3 fill-amber-500" />
                                                        {uc.challenge.xpReward}
                                                    </Badge>
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary rounded-full transition-all duration-700"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                                <p className="text-[10px] text-muted-foreground">
                                                    {uc.current} / {uc.challenge.target}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <Card className="shadow-none border-border/50">
                        <CardContent className="p-6 text-center">
                            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                            <p className="text-sm font-semibold text-foreground">Semua Misi Selesai!</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Kembali minggu depan untuk misi baru.</p>
                        </CardContent>
                    </Card>
                )}

                {completedChallenges.length > 0 && (
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-0.5 pt-1">
                            Selesai
                        </p>
                        {completedChallenges.map((uc) => (
                            <div key={uc.id} className="flex items-center gap-3 px-1 py-2.5 opacity-50">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                <p className="text-sm text-foreground line-through flex-1 truncate">
                                    {uc.challenge.title}
                                </p>
                                <span className="text-[10px] text-muted-foreground shrink-0">
                                    +{uc.challenge.xpReward} XP
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── LENCANA ── */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-foreground">Koleksi Lencana</h3>
                    <Badge variant="secondary" className="text-[10px] font-semibold">
                        {badges?.length || 0} lencana
                    </Badge>
                </div>

                <Card className="shadow-none py-0 border-border/50">
                    <CardContent className="p-4">
                        {allBadges && allBadges.length > 0 ? (
                            <div className="grid grid-cols-3 gap-3">
                                {allBadges.map((badge) => {
                                    const isUserBadge = userBadgeIds.has(badge.id);
                                    const IconName = badge.icon as keyof typeof LucideIcon;
                                    const IconComponent = (IconName && LucideIcon[IconName]) ? (LucideIcon[IconName] as LucideIcon.LucideIcon) : null;

                                    return (<div
                                        key={badge.id}
                                        className={cn(
                                            "w-full relative flex flex-col items-center gap-2 p-3 rounded-2xl bg-secondary/50 transition-transform duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                            !isUserBadge && "grayscale"
                                        )}
                                    >
                                        <InfoTooltip
                                            triggerClassName="absolute right-0 top-0"
                                            content={
                                                <div className="text-center">
                                                    <p className="font-bold text-sm text-foreground mb-1">{badge.name}</p>
                                                    <p className="text-xs text-muted-foreground leading-relaxed">{badge.description}</p>
                                                </div>
                                            }
                                        />
                                        <div
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center"
                                            style={{ backgroundColor: badge.color + '18' }}
                                        >
                                            {IconComponent ? <IconComponent className="w-6 h-6" style={{ color: badge.color }} /> : <Award className="w-6 h-6" style={{ color: badge.color }} />}
                                        </div>
                                        <span className="text-[11px] font-semibold text-foreground text-center w-full block truncate leading-tight">
                                            {badge.name}
                                        </span>
                                    </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="py-6 text-center">
                                <Award className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                                <p className="text-sm font-semibold text-foreground">Koleksi Masih Kosong</p>
                                <p className="text-xs text-muted-foreground mt-0.5">Selesaikan misi untuk mendapatkan lencana.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
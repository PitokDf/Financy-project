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
import { useGamification } from "@/hooks/use-gamification";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfoTooltip } from "@/components/ui/info-tooltip";

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
        <div className="animate-fade-in space-y-4 pb-24 px-1">
            {/* Level Centerpiece */}
            <div className="relative pt-6 pb-2 text-center flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-linear-to-b from-amber-500/10 via-amber-500/5 to-transparent -z-10 rounded-4xl blur-xl" />

                <div className="relative mb-3 group">
                    <div className="absolute inset-0 bg-amber-500 rounded-full blur-lg opacity-30 animate-pulse group-hover:opacity-50 transition-opacity" />
                    <div className="w-24 h-24 rounded-full bg-linear-to-br from-amber-300 via-amber-500 to-orange-600 p-1 shadow-xl shadow-amber-500/30 relative z-10 mx-auto transition-transform hover:scale-105 duration-300">
                        <div className="w-full h-full bg-background rounded-full border-[3px] border-background flex items-center justify-center relative overflow-hidden">
                            {/* Inner glow/noise */}
                            <div className="absolute inset-0 bg-linear-to-br from-amber-500/10 to-transparent" />
                            <span className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-br from-amber-400 to-orange-600 drop-shadow-sm">
                                {stats?.level || 1}
                            </span>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-black text-foreground mb-1.5 tracking-tight">Level {stats?.level || 1}</h2>
                <Badge variant="secondary" className="bg-amber-500/15 text-amber-600 border-amber-500/30 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest mb-5 shadow-sm">
                    {stats?.xp || 0} Total XP
                </Badge>

                <div className="w-full max-w-sm mx-auto space-y-2.5">
                    <div className="flex justify-between text-xs font-bold text-muted-foreground px-1">
                        <span>XP Saat Ini</span>
                        <span className="text-foreground">{xpToNextLevel} XP ke Lv {stats?.level ? stats.level + 1 : 2}</span>
                    </div>
                    <div className="h-3 bg-muted/60 rounded-full overflow-hidden border border-border/50 shadow-inner p-0.5">
                        <div
                            className="h-full bg-linear-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-1000 ease-out relative shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]"
                            style={{ width: `${progressToNextLevel}%` }}
                        >
                            <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_ease-in-out_infinite]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Weekly Challenges Section */}
            <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                    <h3 className="font-bold text-lg flex items-center gap-1.5 tracking-tight">
                        <Target className="w-5 h-5 text-primary" /> Misi Mingguan
                    </h3>
                    <Badge variant="secondary" className="bg-primary/10 text-primary text-[10px] font-bold">
                        {activeChallenges.length} Tersisa
                    </Badge>
                </div>

                <div className="grid gap-3">
                    {activeChallenges.length > 0 ? activeChallenges.map((uc) => {
                        const Icon = TYPE_ICONS[uc.challenge.type] || Trophy;
                        const progress = Math.min((uc.current / uc.challenge.target) * 100, 100);

                        return (
                            <Card key={uc.id} className="border-border/60 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                                <CardContent className="p-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:scale-105 transition-transform duration-300 shadow-sm shadow-primary/5">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start gap-2 mb-0.5">
                                                <p className="text-sm font-bold text-foreground leading-tight">
                                                    {uc.challenge.title}
                                                </p>
                                                <span className="text-[10px] font-black text-amber-600 bg-amber-500/15 border border-amber-500/20 px-1.5 py-0.5 rounded-md shrink-0 flex items-center gap-1">
                                                    <Zap className="w-3 h-3 fill-amber-500" />
                                                    {uc.challenge.xpReward} XP
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-muted-foreground leading-relaxed mb-2.5">
                                                {uc.challenge.description}
                                            </p>

                                            {/* Progress */}
                                            <div className="space-y-1.5">
                                                <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                                                    <span className="uppercase tracking-wider">Progres</span>
                                                    <span className="text-foreground">{uc.current} / {uc.challenge.target}</span>
                                                </div>
                                                <div className="h-2 bg-muted rounded-full overflow-hidden border border-border/50 shadow-inner">
                                                    <div
                                                        className="h-full bg-primary transition-all duration-700 relative"
                                                        style={{ width: `${progress}%` }}
                                                    >
                                                        <div className="absolute inset-0 bg-white/20" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    }) : (
                        <div className="p-8 text-center bg-card border border-border/50 rounded-2xl shadow-sm">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-2.5 border border-emerald-500/20">
                                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                            </div>
                            <p className="text-base font-black text-foreground">Semua Misi Selesai!</p>
                            <p className="text-[11px] text-muted-foreground mt-1">Kembali lagi minggu depan untuk misi baru.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Completed Challenges */}
            {completedChallenges.length > 0 && (
                <div className="space-y-3">
                    <h3 className="font-bold text-[11px] text-muted-foreground uppercase tracking-wider px-1">
                        Selesai Minggu Ini
                    </h3>
                    <div className="grid gap-2 opacity-75 hover:opacity-100 transition-opacity">
                        {completedChallenges.map((uc) => (
                            <div key={uc.id} className="flex items-center gap-2.5 p-2.5 bg-card border border-border/50 rounded-xl">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-foreground line-through decoration-muted-foreground/30">
                                        {uc.challenge.title}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                                        <Zap className="w-3 h-3 text-amber-500" /> +{uc.challenge.xpReward} XP Didapat
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Badges Section */}
            <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                    <h3 className="font-bold text-lg flex items-center gap-1.5 tracking-tight">
                        <Award className="w-5 h-5 text-amber-500" /> Koleksi Lencana
                    </h3>
                    <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 text-[10px] font-bold">
                        {badges?.length || 0} Lencana
                    </Badge>
                </div>

                <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
                    <div className="grid grid-cols-4 gap-y-5 gap-x-2">
                        {badges && badges.length > 0 ? badges.map((ub) => (
                            <div key={ub.id} className="flex flex-col items-center gap-3 relative group">
                                <InfoTooltip
                                    content={
                                        <div className="text-center p-2 max-w-[200px]">
                                            <div className="w-12 h-12 mx-auto mb-3 rounded-2xl flex items-center justify-center border shadow-inner" style={{ backgroundColor: ub.badge.color + '15', borderColor: ub.badge.color + '40' }}>
                                                <Award className="w-6 h-6" style={{ color: ub.badge.color }} />
                                            </div>
                                            <p className="font-black text-base mb-1 text-foreground">{ub.badge.name}</p>
                                            <p className="text-xs text-muted-foreground leading-relaxed">{ub.badge.description}</p>
                                        </div>
                                    }
                                >
                                    <button type="button" className="w-full flex flex-col items-center cursor-pointer outline-none">
                                        <div className="relative">
                                            {/* Glow behind badge */}
                                            <div
                                                className="absolute inset-0 rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                                                style={{ backgroundColor: ub.badge.color }}
                                            />
                                            <div
                                                className="w-16 h-16 rounded-[1.2rem] flex items-center justify-center border transition-all duration-300 group-hover:scale-105 active:scale-95 shadow-sm relative z-10 bg-background"
                                                style={{
                                                    borderColor: ub.badge.color + '40',
                                                    boxShadow: `inset 0 0 15px ${ub.badge.color}10, 0 4px 10px -2px ${ub.badge.color}20`
                                                }}
                                            >
                                                <Award className="w-8 h-8" style={{ color: ub.badge.color, filter: `drop-shadow(0 2px 4px ${ub.badge.color}60)` }} />
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black text-center text-foreground leading-tight px-0.5 truncate w-full mt-2 group-hover:text-amber-500 transition-colors">
                                            {ub.badge.name}
                                        </span>
                                    </button>
                                </InfoTooltip>
                            </div>
                        )) : (
                            <div className="col-span-4 py-8 text-center text-muted-foreground">
                                <div className="w-14 h-14 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Award className="w-7 h-7 opacity-20" />
                                </div>
                                <p className="text-[13px] font-bold text-foreground">Koleksi Masih Kosong</p>
                                <p className="text-[11px] mt-0.5">Selesaikan misi untuk mendapatkan lencana eksklusif.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

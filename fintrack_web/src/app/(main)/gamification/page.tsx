import { ChevronLeft, Flame, Award, Trophy, Star } from "lucide-react";
import Link from "next/link";

export default function GamificationPage() {
  return (
    <div className="pb-8 bg-muted/20 min-h-dvh">
      <div className="bg-[#064e3b] px-5 pt-10 pb-8 text-white relative rounded-b-[2rem] shadow-sm">
        <div className="absolute top-10 right-0 w-32 h-32 rounded-full bg-[#10b981]/20 blur-xl" />

        <div className="flex items-center gap-4 relative z-10 mb-8">
          <Link
            href="/profile"
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 active:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </Link>
          <h2 className="text-[20px] font-black tracking-tight">Gamifikasi</h2>
        </div>

        <div className="text-center relative z-10">
          <div className="text-6xl mb-3">🥷</div>
          <h1 className="text-2xl font-black">Level 7 · Financial Ninja</h1>
          <p className="text-emerald-100/80 text-sm mt-1">680 XP dari 1000 XP menuju level berikutnya</p>

          <div className="w-full h-2.5 bg-black/20 rounded-full mt-5 overflow-hidden border border-white/10">
            <div className="h-full w-[68%] bg-gradient-to-r from-emerald-300 to-emerald-100 rounded-full" />
          </div>
        </div>
      </div>

      <div className="px-5 mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border/60 bg-background p-4 shadow-sm text-center">
          <Flame className="w-5 h-5 mx-auto text-rose-500" />
          <p className="text-2xl font-black mt-2">7</p>
          <p className="text-xs text-muted-foreground font-semibold">Hari Streak</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-background p-4 shadow-sm text-center">
          <Trophy className="w-5 h-5 mx-auto text-amber-500" />
          <p className="text-2xl font-black mt-2">89</p>
          <p className="text-xs text-muted-foreground font-semibold">Total Catatan</p>
        </div>
      </div>

      <div className="px-5 mt-6">
        <h3 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest pl-1 mb-3">Koleksi Badge</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 text-center">
            <Award className="w-5 h-5 mx-auto text-emerald-600" />
            <p className="text-[11px] font-bold mt-2">Pencatat Setia</p>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 text-center">
            <Star className="w-5 h-5 mx-auto text-blue-600" />
            <p className="text-[11px] font-bold mt-2">Analis Pemula</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-muted/30 p-4 text-center opacity-70">
            <Award className="w-5 h-5 mx-auto text-muted-foreground" />
            <p className="text-[11px] font-bold mt-2 text-muted-foreground">Streak 30</p>
          </div>
        </div>
      </div>
    </div>
  );
}

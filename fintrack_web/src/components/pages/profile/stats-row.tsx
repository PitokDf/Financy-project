export function StatsRow() {
    return (
        <div className="mx-5 -mt-6 bg-background rounded-2xl shadow-xl shadow-black/5 border border-border/50 flex overflow-hidden relative z-20">
            <div className="flex-1 py-4 text-center border-r border-border/50">
                <p className="text-lg font-black text-emerald-600 dark:text-emerald-500 font-mono">🔥7</p>
                <p className="text-[10px] text-muted-foreground font-semibold mt-1 uppercase tracking-wider">Streak</p>
            </div>
            <div className="flex-1 py-4 text-center border-r border-border/50">
                <p className="text-lg font-black text-emerald-600 dark:text-emerald-500 font-mono">89</p>
                <p className="text-[10px] text-muted-foreground font-semibold mt-1 uppercase tracking-wider">Catatan</p>
            </div>
            <div className="flex-1 py-4 text-center border-r border-border/50">
                <p className="text-lg font-black text-emerald-600 dark:text-emerald-500 font-mono">6</p>
                <p className="text-[10px] text-muted-foreground font-semibold mt-1 uppercase tracking-wider">Badge</p>
            </div>
            <div className="flex-1 py-4 text-center">
                <p className="text-lg font-black text-emerald-600 dark:text-emerald-500 font-mono">1.2k</p>
                <p className="text-[10px] text-muted-foreground font-semibold mt-1 uppercase tracking-wider">XP</p>
            </div>
        </div>
    )
}

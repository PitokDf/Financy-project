export function BudgetSummary() {
    return (
        <div className="flex gap-2.5 mx-5 mt-5">
            <div className="flex-1 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl p-3 border border-emerald-100 dark:border-emerald-900/50 flex flex-col items-center justify-center shadow-sm">
                <span className="text-base drop-shadow-sm pb-1">✅</span>
                <p className="text-[10px] text-emerald-800 dark:text-emerald-400 font-extrabold uppercase tracking-widest mt-0.5">3 Aman</p>
            </div>
            <div className="flex-1 bg-amber-50 dark:bg-amber-950/40 rounded-2xl p-3 border border-amber-200 dark:border-amber-900/50 flex flex-col items-center justify-center shadow-sm">
                <span className="text-base drop-shadow-sm pb-1">⚠️</span>
                <p className="text-[10px] text-amber-800 dark:text-amber-500 font-extrabold uppercase tracking-widest mt-0.5">2 Waspada</p>
            </div>
            <div className="flex-1 bg-rose-50 dark:bg-rose-950/40 rounded-2xl p-3 border border-rose-200 dark:border-rose-900/50 flex flex-col items-center justify-center shadow-sm">
                <span className="text-base drop-shadow-sm pb-1">🚨</span>
                <p className="text-[10px] text-rose-800 dark:text-rose-500 font-extrabold uppercase tracking-widest mt-0.5">1 Lebih</p>
            </div>
        </div>
    )
}

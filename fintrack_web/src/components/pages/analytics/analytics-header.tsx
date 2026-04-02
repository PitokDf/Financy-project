export function AnalyticsHeader() {
    return (
        <div className="bg-[#064e3b] px-5 py-5 pb-6 text-white relative overflow-hidden rounded-b-3xl">
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-[#10b981]/20 blur-xl" />
            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold tracking-tight">Analisis Pola</h2>
                    <p className="text-[10px] text-[#6ee7b7] font-medium mt-0.5 tracking-wide">SBERT + K-Means Clustering</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-inner">
                    <span className="text-xl">📊</span>
                </div>
            </div>
        </div>
    )
}

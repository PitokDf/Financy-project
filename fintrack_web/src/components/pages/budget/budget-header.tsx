import { EyeOff } from "lucide-react";

export function BudgetHeader() {
    return (
        <div className="bg-[#064e3b] px-5 py-6 pb-10 text-white relative overflow-hidden rounded-b-[2rem]">
            <div className="absolute -right-10 top-0 w-32 h-32 rounded-full bg-[#10b981]/20 blur-xl" />
            <div className="absolute -left-5 -bottom-5 w-24 h-24 rounded-full bg-[#34d399]/10 blur-xl" />

            <div className="flex justify-between items-center relative z-10 mb-5">
                <h2 className="text-[22px] font-black tracking-tight">Target Anggaran</h2>
                <div className="flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm border border-white/10 shadow-inner">
                    <span className="text-[11px] text-[#6ee7b7] font-bold tracking-wide">Maret 2025</span>
                </div>
            </div>

            <div className="relative z-10">
                <p className="text-[11px] text-[#6ee7b7] font-semibold tracking-wider mb-0.5 uppercase">Sisa Anggaran Total</p>
                <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-black text-white tracking-tighter font-mono">Rp 1.48M</h1>
                    <div className="w-[26px] h-[26px] rounded-full bg-white/10 flex items-center justify-center cursor-pointer border border-white/5 shadow-sm active:bg-white/20 transition-colors">
                        <EyeOff className="w-3.5 h-3.5 text-white/80" />
                    </div>
                </div>

                {/* Visual Progress Bar Total */}
                <div className="w-full h-2.5 bg-black/20 rounded-full mt-5 overflow-hidden border border-white/10 shadow-inner">
                    <div className="h-full bg-gradient-to-r from-[#10b981] to-[#34d399] rounded-full" style={{ width: '65%' }} />
                </div>
                <div className="flex justify-between text-[11px] text-[#6ee7b7] mt-2 font-bold tracking-wide">
                    <span>Terpakai: Rp 2.74M</span>
                    <span>Total: Rp 4.22M</span>
                </div>
            </div>
        </div>
    )
}

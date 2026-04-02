import { UserPen } from "lucide-react";
import Link from "next/link";

export function ProfileHero() {
    return (
        <div className="bg-gradient-to-br from-[#064e3b] to-[#047857] px-5 pt-8 pb-14 text-center relative overflow-hidden rounded-b-[2.5rem]">
            {/* Background Orbs */}
            <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-emerald-400/10 blur-2xl" />
            <div className="absolute right-0 bottom-0 w-32 h-32 rounded-full bg-emerald-400/10 blur-2xl" />

            <div className="relative inline-block mb-3 z-10">
                <div className="w-20 h-20 rounded-full border-[3px] border-white/20 bg-emerald-500 flex items-center justify-center text-3xl font-black text-white shadow-xl mx-auto ring-4 ring-[#064e3b]">
                    P
                </div>
                <div className="absolute right-0 bottom-0 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.2)] border-2 border-[#047857]">
                    <UserPen className="w-3.5 h-3.5 text-[#064e3b]" />
                </div>
            </div>

            <h2 className="text-[22px] font-black text-white tracking-tight relative z-10">Pito Desri Pauzi</h2>
            <p className="text-xs text-[#6ee7b7] mt-0.5 relative z-10 font-medium">pito@email.com</p>

            <Link href="/gamification" className="inline-flex mt-4 items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 relative z-10 border border-white/10 shadow-sm">
                <span className="text-lg leading-none pt-[1px]">🥷</span>
                <span className="text-[11px] font-bold text-white tracking-wide">Level 7 &bull; Financial Ninja</span>
            </Link>
        </div>
    )
}

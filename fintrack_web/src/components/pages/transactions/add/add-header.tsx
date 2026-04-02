import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AddHeader() {
    return (
        <div className="bg-[#064e3b] px-5 py-6 pb-20 text-white relative rounded-b-[2.5rem] shadow-md">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#10b981]/10 blur-2xl" />

            <div className="flex justify-between items-center mb-8 relative z-10">
                <Link href="/home" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 active:bg-white/20 transition-colors">
                    <ChevronLeft className="w-5 h-5 text-white" />
                </Link>
                <div className="bg-white/10 p-1 rounded-full flex gap-1 border border-white/20 shadow-inner">
                    <Button variant="ghost" className="px-5 h-8 rounded-full bg-white hover:bg-white text-[#064e3b] hover:text-[#064e3b] text-[11px] font-bold shadow-sm transition-all text-center">Pengeluaran</Button>
                    <Button variant="ghost" className="px-5 h-8 rounded-full hover:bg-transparent text-white/80 hover:text-white text-[11px] font-bold transition-all text-center">Pemasukan</Button>
                </div>
                <div className="w-10 h-10" />
            </div>

            <div className="text-center relative z-10">
                <p className="text-[10px] text-[#6ee7b7] font-extrabold tracking-widest mb-2 opacity-90 uppercase">Nominal Transaksi</p>
                <div className="flex items-center justify-center text-5xl font-black font-mono tracking-tighter w-full px-5">
                    <span className="text-3xl text-emerald-400 mr-1.5 mt-1 align-top select-none">Rp</span>
                    <Input
                        type="number"
                        placeholder="0"
                        autoFocus
                        className="bg-transparent border-none text-white w-min min-w-[30px] max-w-[200px] text-left focus-visible:ring-0 placeholder:text-white/30 text-5xl font-black p-0 h-auto"
                        style={{ fieldSizing: "content" } as any}
                    />
                </div>
            </div>
        </div>
    )
}

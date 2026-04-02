import { ChevronLeft, Bot, Send, Sparkles, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AiChatPage() {
    return (
        <div className="flex flex-col bg-muted/10 h-dvh relative pb-[140px]">
            {/* Header */}
            <div className="bg-background px-5 pt-8 pb-4 sticky top-0 z-30 border-b border-border/50 flex items-center gap-4 shadow-sm">
                <Link href="/home" className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center border border-border/50 active:bg-muted transition-colors">
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                </Link>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-800">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-background rounded-full" />
                    </div>
                    <div>
                        <h2 className="text-[16px] font-black tracking-tight leading-tight">AI Assistant</h2>
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold">Online &bull; Siap membantu</p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 flex flex-col">
                {/* AI Welcome */}
                <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-1 border border-emerald-200/50">
                        <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="bg-background border border-border/60 p-3.5 rounded-2xl rounded-tl-[4px] shadow-sm">
                        <p className="text-[13px] text-foreground leading-relaxed font-semibold">
                            Halo! Saya analis keuangan pribadi Anda. Ada yang ingin ditanyakan seputar pengeluaran atau target bulan ini?
                        </p>
                    </div>
                </div>

                {/* User Message */}
                <div className="flex gap-3 max-w-[85%] ml-auto justify-end">
                    <div className="bg-[#064e3b] text-white p-3.5 rounded-2xl rounded-tr-[4px] shadow-md">
                        <p className="text-[13px] leading-relaxed font-medium">Berapa total pengeluaran saya buat jajan kopi bulan ini?</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground flex-shrink-0 mt-1 border border-border/50">
                        <UserIcon className="w-4 h-4" />
                    </div>
                </div>

                {/* AI Response */}
                <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-1 border border-emerald-200/50">
                        <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-background border border-emerald-500/30 dark:border-emerald-500/20 p-3.5 rounded-2xl rounded-tl-[4px] shadow-[0_2px_10px_rgba(16,185,129,0.05)]">
                        <p className="text-[13px] text-foreground leading-relaxed font-semibold mb-3">
                            Bulan ini Anda sudah menghabiskan <strong className="text-emerald-600 dark:text-emerald-500">Rp 960.000</strong> untuk kategori "Jajan Kopi".
                        </p>
                        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/50 p-2.5 rounded-xl flex gap-2.5 shadow-sm">
                            <span className="text-sm">⚠️</span>
                            <p className="text-[11px] text-amber-800 dark:text-amber-500 font-bold leading-relaxed pr-1">Ini 15% lebih tinggi dari batas aman anggaran Anda. Kurangi frekuensi ngopi di luar untuk 2 minggu ke depan ya!</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Input Area above BottomNav */}
            <div className="fixed bottom-[72px] left-0 right-0 max-w-md mx-auto w-full bg-background/80 backdrop-blur-xl border-t border-border/50 p-4 pb-5 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-40">
                <div className="flex items-center gap-3">
                    <Input
                        placeholder="Tanya tentang keuanganmu..."
                        className="flex-1 bg-background border-border/60 rounded-full h-12 px-5 text-[13px] font-semibold focus-visible:ring-emerald-500/30 shadow-sm"
                    />
                    <Button size="icon" className="w-12 h-12 rounded-full bg-[#064e3b] hover:bg-[#047857] text-white shadow-md flex-shrink-0 transition-transform active:scale-95">
                        <Send className="w-5 h-5 -ml-0.5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

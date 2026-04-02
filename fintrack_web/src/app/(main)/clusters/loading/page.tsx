import { Bot, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";

async function waitFor(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function ClusterLoadingPage() {
  await waitFor(2600);
  redirect("/clusters/confirm");

  return (
    <div className="min-h-dvh bg-[#064e3b] text-white px-6 py-10 flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-[0_0_40px_rgba(52,211,153,0.3)] mb-8 animate-pulse">
        <Bot className="w-11 h-11 text-emerald-300" />
      </div>

      <div className="max-w-xs space-y-4">
        <div className="flex items-center justify-center gap-2 text-emerald-200 font-bold text-sm tracking-wide">
          <Sparkles className="w-4 h-4" />
          Memproses Data CSV
        </div>
        <h1 className="text-2xl font-black tracking-tight">AI sedang menganalisis transaksi...</h1>
        <p className="text-sm text-emerald-100/80 leading-relaxed">
          Membersihkan data, membuat embedding semantik, dan menyusun klaster pengeluaran.
        </p>
      </div>
    </div>
  );
}

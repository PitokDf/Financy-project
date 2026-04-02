import { Utensils, Car, Coffee, ShoppingCart, HeartPulse, Gamepad2, Receipt, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export function CategoryGrid() {
    const cats = [
        { icon: Utensils, name: 'Makanan', bg: 'bg-amber-100 dark:bg-amber-950/40', text: 'text-amber-700 dark:text-amber-500' },
        { icon: Car, name: 'Transport', bg: 'bg-emerald-100 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-500' },
        { icon: Coffee, name: 'Kopi', bg: 'bg-rose-100 dark:bg-rose-950/40', text: 'text-rose-700 dark:text-rose-500' },
        { icon: ShoppingCart, name: 'Belanja', bg: 'bg-blue-100 dark:bg-blue-950/40', text: 'text-blue-700 dark:text-blue-500' },
        { icon: HeartPulse, name: 'Kesehatan', bg: 'bg-purple-100 dark:bg-purple-950/40', text: 'text-purple-700 dark:text-purple-500' },
        { icon: Gamepad2, name: 'Hiburan', bg: 'bg-indigo-100 dark:bg-indigo-950/40', text: 'text-indigo-700 dark:text-indigo-500' },
        { icon: Receipt, name: 'Tagihan', bg: 'bg-rose-100 dark:bg-rose-950/40', text: 'text-rose-700 dark:text-rose-500' },
        { icon: PlusCircle, name: 'Lainnya', bg: 'bg-muted/70', text: 'text-muted-foreground' },
    ];

    return (
        <Card className="mx-5 -mt-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-border/60 relative z-20">
            <CardContent className="p-5">
                <h3 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest mb-4 pl-1">Pilih Kategori</h3>
                <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                    {cats.map((c, i) => {
                        const Icon = c.icon;
                        return (
                            <div key={i} className="flex flex-col items-center gap-2.5 cursor-pointer group">
                                <div className={`w-14 h-14 rounded-[20px] ${c.bg} flex items-center justify-center text-2xl shadow-sm border border-border/30 group-active:scale-95 transition-transform`}>
                                    <Icon className={`w-6 h-6 ${c.text}`} />
                                </div>
                                <span className={`text-[10px] font-bold text-center ${c.text}`}>{c.name}</span>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-8 border-t border-border/50 pt-5">
                    <h3 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest mb-3 pl-1">Catatan (Opsional)</h3>
                    <Textarea
                        placeholder="Contoh: Makan siang bareng tim..."
                        className="w-full bg-muted/40 border-border/60 rounded-2xl p-4 text-[13px] font-medium resize-none h-24 focus-visible:ring-emerald-500/30"
                    />
                </div>

                <Button className="w-full mt-6 h-14 rounded-2xl bg-[#064e3b] hover:bg-[#047857] text-white font-bold transition-all shadow-md text-[14px]">
                    Simpan Transaksi
                </Button>
            </CardContent>
        </Card>
    )
}

import { cn } from "@/lib/utils";
import { Coffee, Utensils, Car, Ticket, BriefcaseBusiness } from "lucide-react";

type IconType = React.ElementType;

const historyData = [
    {
        date: 'Hari Ini - 10 Mar 2025',
        total: '-Rp 68.000',
        items: [
            { id: '1', name: 'Kopi Kenangan', category: 'Jajan Kopi', time: '08:30', amount: 32000, type: 'expense', icon: Coffee as IconType, bgColor: 'bg-rose-100 dark:bg-rose-950/40', iconColor: 'text-rose-600 dark:text-rose-500' },
            { id: '2', name: 'Nasi Padang Mande', category: 'Makanan', time: '12:15', amount: 36000, type: 'expense', icon: Utensils as IconType, bgColor: 'bg-amber-100 dark:bg-amber-950/40', iconColor: 'text-amber-600 dark:text-amber-500' },
        ]
    },
    {
        date: 'Kemarin - 9 Mar 2025',
        total: '-Rp 92.000',
        items: [
            { id: '3', name: 'Grab ke kampus', category: 'Transportasi', time: '07:45', amount: 18000, type: 'expense', icon: Car as IconType, bgColor: 'bg-emerald-100 dark:bg-emerald-950/40', iconColor: 'text-emerald-600 dark:text-emerald-500' },
            { id: '4', name: 'Tiket Bioskop', category: 'Hiburan', time: '19:00', amount: 74000, type: 'expense', icon: Ticket as IconType, bgColor: 'bg-indigo-100 dark:bg-indigo-950/40', iconColor: 'text-indigo-600 dark:text-indigo-500' },
        ]
    },
    {
        date: '1 Maret 2025',
        total: '+Rp 7.500.000',
        items: [
            { id: '5', name: 'Gaji Bulanan', category: 'Pemasukan', time: '09:00', amount: 7500000, type: 'income', icon: BriefcaseBusiness as IconType, bgColor: 'bg-emerald-100 dark:bg-emerald-950/40', iconColor: 'text-emerald-600 dark:text-emerald-500' },
        ]
    }
];

export function HistoryList() {
    return (
        <div className="pb-8 pt-2">
            {historyData.map((group, i) => (
                <div key={i} className="mb-4">
                    {/* Date Header */}
                    <div className="flex justify-between items-center px-5 py-2.5 bg-muted/40 border-y border-border/40 backdrop-blur-sm">
                        <p className="text-[10px] font-extrabold uppercase text-muted-foreground tracking-widest">{group.date}</p>
                        <p className={cn(
                            "text-[11px] font-black font-mono tracking-tight",
                            group.total.startsWith('+') ? "text-emerald-600 dark:text-emerald-500" : "text-muted-foreground"
                        )}>{group.total}</p>
                    </div>

                    {/* Items */}
                    <div className="px-5 mt-2">
                        {group.items.map((item, j) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.id} className={cn(
                                    "flex items-center gap-3 py-3.5",
                                    j !== group.items.length - 1 && "border-b border-border/40"
                                )}>
                                    <div className={cn("w-[42px] h-[42px] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-border/30", item.bgColor)}>
                                        <Icon className={cn("w-5 h-5", item.iconColor)} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[14px] font-bold text-foreground truncate leading-tight">{item.name}</p>
                                        <p className="text-[11px] text-muted-foreground mt-1 truncate font-semibold">{item.category} &bull; {item.time}</p>
                                    </div>
                                    <div className={cn(
                                        "text-[14px] font-black font-mono tracking-tight",
                                        item.type === 'income' ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"
                                    )}>
                                        {item.type === 'income' ? '+' : '-'}{item.amount.toLocaleString('id-ID')}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

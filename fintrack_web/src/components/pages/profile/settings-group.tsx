import { ChevronRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SettingItem {
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    title: string;
    desc?: string;
    type: 'link' | 'toggle' | 'value';
    value?: string;
    checked?: boolean;
}

interface SettingsGroupProps {
    title: string;
    items: SettingItem[];
}

export function SettingsGroup({ title, items }: SettingsGroupProps) {
    return (
        <div className="mt-6 mx-5">
            <h3 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest pl-1 mb-2.5">
                {title}
            </h3>
            <div className="bg-background rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                {items.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={idx}
                            className={cn(
                                "flex items-center gap-3.5 p-3.5 hover:bg-muted/30 cursor-pointer transition-colors",
                                idx !== items.length - 1 && "border-b border-border/50"
                            )}
                        >
                            <div className={cn("w-10 h-10 rounded-[14px] flex items-center justify-center border border-border/10", item.iconBg)}>
                                <Icon className={cn("w-5 h-5", item.iconColor)} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-bold text-foreground leading-tight truncate">{item.title}</p>
                                {item.desc && <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug truncate">{item.desc}</p>}
                            </div>

                            {item.type === 'link' && <ChevronRight className="w-4 h-4 text-muted-foreground/60 flex-shrink-0" />}
                            {item.type === 'value' && (
                                <div className="flex items-center text-[12px] font-bold text-emerald-600 dark:text-emerald-500 gap-0.5 tracking-wide flex-shrink-0">
                                    {item.value} <ChevronRight className="w-4 h-4 text-emerald-600/60 dark:text-emerald-500/60" />
                                </div>
                            )}
                            {item.type === 'toggle' && (
                                <div className={cn(
                                    "w-11 h-6 rounded-full relative transition-colors duration-300 flex-shrink-0",
                                    item.checked ? "bg-emerald-500" : "bg-muted-foreground/30"
                                )}>
                                    <div className={cn(
                                        "absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-sm",
                                        item.checked ? "right-0.5 translate-x-0" : "left-0.5 translate-x-0"
                                    )} />
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export function LogoutButton() {
    return (
        <Button variant="outline" className="w-full h-14 mt-8 mb-8 rounded-2xl bg-rose-100 dark:bg-rose-900/30 hover:bg-rose-200 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 font-bold border-rose-200 dark:border-rose-900/50 shadow-sm transition-colors text-[13px] tracking-wide gap-2">
            <LogOut className="w-[18px] h-[18px]" strokeWidth={2.5} />
            Keluar dari Akun
        </Button>
    )
}

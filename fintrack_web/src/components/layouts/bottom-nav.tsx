'use client'

import { BarChart3, Home, Plus, Target, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/analytics", label: "Analisis", icon: BarChart3 },
    { href: "/transactions/add", label: "Add", icon: Plus },
    { href: "/budget", label: "Budget", icon: Target },
    { href: "/profile", label: "Profil", icon: User },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav aria-label="Navigasi utama" className="relative px-4 pb-4 pt-2 pointer-events-none">
            <div className="max-w-md mx-auto relative flex items-end justify-around bg-white/85 backdrop-blur-xl border border-border shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] px-2 h-16 pointer-events-auto">

                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    const Icon = item.icon;

                    if (item.label === 'Add') {
                        return (
                            <div key={item.href} className="relative flex-1 flex justify-center h-full">
                                <Link
                                    href={item.href}
                                    aria-label={item.label}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={cn(
                                        "absolute -top-5 flex items-center justify-center w-14 h-14 rounded-full rotate-45 transform transition-all duration-300 bg-linear-to-br from-primary to-violet-600 active:scale-95 shadow-lg shadow-primary/20",
                                        isActive ? "ring-4 ring-white" : ""
                                    )}
                                >
                                    <Icon
                                        className="-rotate-45 text-white w-7 h-7"
                                        strokeWidth={2.5}
                                    />
                                </Link>
                            </div>
                        );
                    }

                    // Item navigasi standar
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={isActive ? 'page' : undefined}
                            className="relative flex flex-col items-center justify-center flex-1 h-full gap-1 group"
                        >
                            <div className={cn(
                                "p-1 rounded-xl transition-all duration-300",
                                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground/60 group-hover:text-foreground"
                            )}>
                                <Icon
                                    className={cn(
                                        "w-5.5 h-5.5 transition-transform duration-300",
                                        isActive ? "scale-110" : ""
                                    )}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                            </div>

                            <span className={cn(
                                "text-[10px] font-bold transition-all duration-300",
                                isActive ? "text-primary translate-y-0 opacity-100" : "text-muted-foreground opacity-80"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

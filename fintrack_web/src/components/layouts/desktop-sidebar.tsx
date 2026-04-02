'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Home, Plus, Target, User, WalletCards, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/home", label: "Dashboard", icon: Home },
    { href: "/analytics", label: "Analisis", icon: BarChart3 },
    { href: "/transactions/add", label: "Tambah", icon: Plus },
    { href: "/budget", label: "Budget", icon: Target },
    { href: "/profile", label: "Profil", icon: User },
];

export function DesktopSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-border/60 lg:bg-background">
            <div className="flex h-full flex-col px-5 py-6">
                <div className="flex items-center gap-3 rounded-3xl border border-emerald-500/15 bg-emerald-500/8 px-4 py-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
                        <WalletCards className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400">Fintrack</p>
                        <h2 className="text-lg font-black tracking-tight text-foreground">Personal Finance</h2>
                    </div>
                </div>

                <div className="mt-6 space-y-2">
                    <p className="px-3 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Menu utama</p>
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={isActive ? 'page' : undefined}
                                className={cn(
                                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors",
                                    isActive
                                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <Icon className={cn("h-4.5 w-4.5", isActive && "text-emerald-600 dark:text-emerald-400")} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-6 rounded-3xl border border-border/60 bg-muted/20 p-4">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                        Insight cepat
                    </div>
                    <div className="mt-4 space-y-3">
                        <div className="rounded-2xl border border-border/60 bg-background px-4 py-3">
                            <p className="text-xs text-muted-foreground">Streak pencatatan</p>
                            <p className="mt-1 text-xl font-black">7 hari</p>
                        </div>
                        <div className="rounded-2xl border border-border/60 bg-background px-4 py-3">
                            <p className="text-xs text-muted-foreground">Budget waspada</p>
                            <p className="mt-1 text-xl font-black text-amber-600 dark:text-amber-400">2 kategori</p>
                        </div>
                    </div>
                </div>

                <div className="mt-auto rounded-3xl border border-border/60 bg-background p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Ruang kerja</p>
                    <p className="mt-2 text-sm text-foreground/90">
                        Dashboard ini dioptimalkan untuk review cepat, budgeting, dan analisis pengeluaran.
                    </p>
                </div>
            </div>
        </aside>
    );
}
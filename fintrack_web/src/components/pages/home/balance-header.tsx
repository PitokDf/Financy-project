import { ArrowDownRight, ArrowUpRight, Bell, CalendarDays, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export function BalanceHeader() {
    return (
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 text-white shadow-[0_20px_60px_-24px_rgba(16,185,129,0.55)]">
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute right-16 top-24 h-36 w-36 rounded-full bg-white/10 blur-2xl" />

            <div className="relative z-10 p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-lg font-black shadow-inner">
                                    P
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-emerald-50/80">Selamat pagi</p>
                                    <h2 className="text-xl font-black tracking-tight">Pito 👋</h2>
                                </div>
                            </div>

                            <Button asChild variant="ghost" size="icon" className="h-11 w-11 rounded-full bg-white/10 text-white hover:bg-white/15 hover:text-white">
                                <Link href="/notifications" aria-label="Buka notifikasi">
                                    <Bell className="h-5 w-5" />
                                </Link>
                            </Button>
                        </div>

                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-50/75">Total Saldo</p>
                            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                                {formatCurrency(4280000, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </h1>
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium backdrop-blur-sm">
                                <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                                Periode aktif: Maret 2025
                            </div>
                        </div>
                    </div>

                    <Card className="border-white/10 bg-white/10 text-white shadow-none backdrop-blur-xl xl:w-[320px]">
                        <CardContent className="p-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-50/70">Ringkasan bulan ini</p>
                                    <p className="mt-1 text-lg font-bold">Performa stabil</p>
                                </div>
                                <div className="rounded-2xl bg-white/10 p-3">
                                    <CalendarDays className="h-5 w-5" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between rounded-2xl bg-black/10 px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15">
                                            <ArrowDownRight className="h-5 w-5 text-emerald-200" strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-emerald-50/70">Pemasukan</p>
                                            <p className="font-bold">Rp 7.50M</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-emerald-100/80">+8.2%</span>
                                </div>

                                <div className="flex items-center justify-between rounded-2xl bg-black/10 px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-400/15">
                                            <ArrowUpRight className="h-5 w-5 text-rose-200" strokeWidth={2.5} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-emerald-50/70">Pengeluaran</p>
                                            <p className="font-bold">Rp 3.22M</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-emerald-100/80">-1.1%</span>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-50/70">Sisa anggaran</p>
                                        <p className="mt-1 text-2xl font-black">Rp 1.48M</p>
                                    </div>
                                    <Target className="h-5 w-5 text-emerald-100" />
                                </div>
                                <div className="mt-4 h-2 rounded-full bg-black/20">
                                    <div className="h-2 w-[65%] rounded-full bg-gradient-to-r from-emerald-300 to-emerald-100" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

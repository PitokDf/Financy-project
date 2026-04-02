import { BalanceHeader } from "@/components/pages/home/balance-header";
import { BudgetPreview } from "@/components/pages/home/budget-preview";
import { TransactionList } from "@/components/pages/home/transaction-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bell, Download, Plus, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-muted/20">
            <div className="mx-auto w-full max-w-md lg:max-w-none">
                <section className="lg:hidden pb-28">
                    <BalanceHeader />

                    <div className="px-4 pt-4 space-y-4">
                        <BudgetPreview />
                        <TransactionList />
                    </div>

                    <Link
                        href="/transactions/add"
                        aria-label="Tambah transaksi"
                        className="fixed bottom-24 right-5 z-40 h-14 w-14 rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center active:scale-95 transition-transform"
                    >
                        <Plus className="h-6 w-6" />
                    </Link>
                </section>

                <section className="hidden lg:block px-6 xl:px-8 py-8">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-end justify-between gap-6">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/15 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Dashboard Keuangan Pribadi
                                </div>
                                <div>
                                    <h1 className="text-3xl font-black tracking-tight text-foreground">Ringkasan finansial Anda hari ini</h1>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Pantau saldo, budgeting, dan aktivitas transaksi dalam satu tampilan yang fokus untuk kerja harian.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Button variant="outline" className="rounded-full bg-background/80">
                                    <Bell className="mr-2 h-4 w-4" />
                                    Notifikasi
                                </Button>
                                <Button variant="outline" className="rounded-full bg-background/80">
                                    <Download className="mr-2 h-4 w-4" />
                                    Ekspor
                                </Button>
                                <Button asChild className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white">
                                    <Link href="/transactions/add">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Tambah Transaksi
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-8 xl:grid-cols-3 items-start">
                            <section className="space-y-6 xl:col-span-2">
                                <BalanceHeader />

                                <div className="grid gap-6 xl:grid-cols-2">
                                    <BudgetPreview />
                                    <TransactionList />
                                </div>
                            </section>

                            <aside className="space-y-6 xl:sticky xl:top-6">
                                <Card className="border-border/60 shadow-sm overflow-hidden">
                                    <CardHeader className="space-y-1.5 pb-3">
                                        <CardTitle className="text-base font-bold">Insight Bulanan</CardTitle>
                                        <p className="text-sm text-muted-foreground">Ringkasan cepat untuk keputusan harian.</p>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/8 p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-400">
                                                    <TrendingUp className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-muted-foreground">Cashflow bulan ini</p>
                                                    <p className="text-lg font-black tracking-tight">Rp 1.06M</p>
                                                </div>
                                            </div>
                                            <p className="mt-3 text-sm text-muted-foreground">
                                                Pengeluaran naik tipis pada kategori konsumsi. Budget kopi mendekati batas.
                                            </p>
                                        </div>

                                        <div className="grid gap-3">
                                            <div className="rounded-2xl border border-border/60 bg-background p-4">
                                                <p className="text-xs font-semibold text-muted-foreground">Transaksi hari ini</p>
                                                <p className="mt-1 text-2xl font-black tracking-tight">12</p>
                                                <p className="mt-1 text-sm text-muted-foreground">4 pemasukan, 8 pengeluaran</p>
                                            </div>
                                            <div className="rounded-2xl border border-border/60 bg-background p-4">
                                                <p className="text-xs font-semibold text-muted-foreground">Budget waspada</p>
                                                <p className="mt-1 text-2xl font-black tracking-tight text-amber-600 dark:text-amber-400">2</p>
                                                <p className="mt-1 text-sm text-muted-foreground">Kategori sudah melewati 80%</p>
                                            </div>
                                        </div>

                                        <Button variant="outline" className="w-full rounded-2xl border-dashed border-emerald-500/30 bg-emerald-500/5 text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-400">
                                            Lihat Analisis Detail
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </aside>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

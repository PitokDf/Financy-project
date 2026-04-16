'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Search, Plus, X, TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { TransactionForm } from './_components/transaction-form';
import { TransactionCard } from '@/components/shared/transaction-card';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ImportCsvModal } from './_components/import-csv-modal';
import { DisplayTransaction, useTransactionsPage } from './use-transactions-page';
import { Suspense, useCallback, useRef, useMemo, useState } from 'react';
import { TransactionsSkeleton } from './_components/skeleton';

type FlatItem =
    | { type: 'header'; date: string; count: number }
    | { type: 'item'; transaction: DisplayTransaction };

function TransactionsContent() {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const parentRef = useRef<HTMLDivElement>(null);
    const [showImportModal, setShowImportModal] = useState(false);

    const {
        search,
        setSearch,
        filter,
        setFilter,
        showAddModal,
        setShowAddModal,
        showDeleteModal,
        setShowDeleteModal,
        setIdToDelete,
        grouped,
        hasMore,
        loadMore,
        totalIncome,
        totalExpense,
        handleCreateTransaction,
        handleDeleteTransaction,
        formatDate,
        isLoading
    } = useTransactionsPage();


    const flatItems = useMemo<FlatItem[]>(() => {
        return grouped.flatMap(([date, transactions]) => [
            { type: 'header', date, count: transactions.length },
            ...transactions.map((transaction) => ({ type: 'item' as const, transaction })),
        ]);
    }, [grouped]);

    const virtualizer = useVirtualizer({
        count: flatItems.length,
        getScrollElement: () => parentRef.current,
        estimateSize: (i) => (flatItems[i].type === 'header' ? 36 : 72),
        overscan: 5,
    });

    const lastItemRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (observerRef.current) observerRef.current.disconnect();

            observerRef.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting && hasMore) loadMore();
            });

            if (node) observerRef.current.observe(node);
        },
        [hasMore, loadMore]
    );
    if (isLoading) return <TransactionsSkeleton />;

    return (
        <div className="animate-fade-in flex flex-col h-screen">
            {/* Header stats & filter */}
            <div className="pb-2 shrink-0">
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                            <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Pemasukan</span>
                        </div>
                        <p className="text-base font-bold text-emerald-700 dark:text-emerald-300">{formatCurrency(totalIncome)}</p>
                    </div>
                    <div className="rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                            <TrendingDown className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
                            <span className="text-xs text-red-600 dark:text-red-400 font-medium">Pengeluaran</span>
                        </div>
                        <p className="text-base font-bold text-red-600 dark:text-red-400">{formatCurrency(totalExpense)}</p>
                    </div>
                </div>

                <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Cari transaksi..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 h-11 rounded-xl pr-9"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-muted-foreground hover:text-foreground"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>

                <div className="flex gap-2">
                    {(['ALL', 'INCOME', 'EXPENSE'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                'flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200',
                                filter === f
                                    ? f === 'INCOME'
                                        ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-200 dark:shadow-emerald-900'
                                        : f === 'EXPENSE'
                                            ? 'bg-red-500 text-white shadow-sm shadow-red-200 dark:shadow-red-900'
                                            : 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                            )}
                        >
                            {f === 'ALL' ? 'Semua' : f === 'INCOME' ? 'Pemasukan' : 'Pengeluaran'}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            {flatItems.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                        <Search className="w-7 h-7 text-muted-foreground" />
                    </div>
                    <p className="font-semibold text-foreground">Tidak ada transaksi</p>
                    <p className="text-sm text-muted-foreground mt-1">Coba ubah kata kunci pencarian</p>
                </div>
            ) : (
                <div ref={parentRef} className="overflow-auto flex-1">
                    <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
                        {virtualizer.getVirtualItems().map((virtualItem) => {
                            const item = flatItems[virtualItem.index];
                            const isLast = virtualItem.index === flatItems.length - 1;

                            return (
                                <div
                                    key={virtualItem.key}
                                    ref={isLast ? lastItemRef : null}
                                    style={{
                                        position: 'absolute',
                                        top: virtualItem.start,
                                        width: '100%',
                                        padding: '2px 0',
                                    }}
                                >
                                    {item.type === 'header' ? (
                                        <div className="flex items-center gap-2 py-1">
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                                                {formatDate(item.date)}
                                            </p>
                                            <div className="flex-1 h-px bg-border" />
                                            <p className="text-xs text-muted-foreground">{item.count} transaksi</p>
                                        </div>
                                    ) : (
                                        <TransactionCard
                                            {...item.transaction}
                                            categoryColor={item.transaction.categoryColor ?? '#6b7280'}
                                            onDelete={(trxID) => {
                                                setShowDeleteModal(true);
                                                setIdToDelete(trxID);
                                            }}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* FAB */}
            <div className="fixed bottom-24 right-4 z-30 flex flex-col gap-3">
                <Button
                    size="icon"
                    onClick={() => setShowImportModal(true)}
                    className="w-12 h-12 rounded-full shadow-lg bg-white border border-emerald-100 text-emerald-600 hover:bg-emerald-50 ml-auto dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400"
                    aria-label="Import CSV"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                </Button>
                <Button
                    size="icon"
                    className="w-14 h-14 rounded-2xl shadow-lg shadow-primary/30 border-0"
                    style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
                    onClick={() => setShowAddModal(true)}
                    aria-label="Tambah transaksi"
                >
                    <Plus className="w-6 h-6 text-white" />
                </Button>
            </div>

            <ConfirmDialog
                icon={<Trash2 className='text-red-500' />}
                title="Hapus Transaksi"
                description="Apakah anda yakin ingin menghapus transaksi ini?"
                onConfirm={handleDeleteTransaction}
                onCancel={() => { setShowDeleteModal(false); setIdToDelete(''); }}
                open={showDeleteModal}
                confirmVariant={'destructive'}
                onOpenChange={setShowDeleteModal}
            />

            <TransactionForm
                isOpen={showAddModal}
                onOpenChange={setShowAddModal}
                onSubmit={handleCreateTransaction}
            />

            <ImportCsvModal
                isOpen={showImportModal}
                onOpenChange={setShowImportModal}
            />
        </div>
    );
}

export default function TransactionsPage() {
    return (
        <Suspense fallback={<TransactionsSkeleton />}>
            <TransactionsContent />
        </Suspense>
    );
}
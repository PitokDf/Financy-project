import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTransactions } from '@/hooks/use-transactions';
import type { TransactionType } from '@/types';
import { TransactionValues } from './_components/schema';

export type FilterType = 'ALL' | 'INCOME' | 'EXPENSE';

export interface DisplayTransaction {
    id: string;
    description: string;
    amount: number;
    type: TransactionType;
    date: string;
    category: string;
    categoryColor: string;
    categoryIcon: string;
}

const GROUP_BY_DATE = (transactions: DisplayTransaction[]) => {
    const groups: Record<string, DisplayTransaction[]> = {};
    transactions.forEach((tx) => {
        const key = tx.date;
        if (!groups[key]) groups[key] = [];
        groups[key].push(tx);
    });
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
};

export function useTransactionsPage() {
    const searchParams = useSearchParams();
    const action = searchParams.get('action');
    const [search, setSearchRaw] = useState('');
    const setSearch = (val: string) => { setSearchRaw(val); };

    const [filter, setFilterRaw] = useState<FilterType>('ALL');
    const setFilter = (val: FilterType) => { setFilterRaw(val); };

    const [showAddModal, setShowAddModal] = useState(false || action === 'add');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState('');

    const {
        transactions,
        totalIncome,
        totalExpense,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        hasNextPage,
        fetchNextPage,
        isLoading
    } = useTransactions(search, filter);
    const grouped = useMemo(() => GROUP_BY_DATE(transactions as DisplayTransaction[]), [transactions]);

    const hasMore = hasNextPage;
    const loadMore = () => fetchNextPage();

    const handleCreateTransaction = (values: TransactionValues, id?: string) => {
        const mappedData = {
            description: values.description,
            amount: Number(values.jumlah),
            type: values.type,
            date: new Date(values.date).toISOString(),
            categoryId: values.category || undefined,
        };

        if (id) {
            updateTransaction({ id, data: mappedData }, {
                onSuccess: () => {
                    setShowAddModal(false);
                }
            });
        } else {
            createTransaction(mappedData, {
                onSuccess: () => {
                    setShowAddModal(false);
                }
            });
        }
    };

    const handleDeleteTransaction = async () => {
        await deleteTransaction(idToDelete);
    };

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (d.toDateString() === today.toDateString()) return 'Hari Ini';
        if (d.toDateString() === yesterday.toDateString()) return 'Kemarin';
        return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
    };

    return {
        search,
        setSearch,
        filter,
        setFilter,
        showAddModal,
        setShowAddModal,
        showDeleteModal,
        setShowDeleteModal,
        idToDelete,
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
    };
}

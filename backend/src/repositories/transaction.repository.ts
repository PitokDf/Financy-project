import prisma from "@/config/prisma";

export class TransactionRepository {
    public getAllPaginated = async (userId: string, cursor?: string, limit = 20, search?: string, type?: string) => {
        const where: any = { userId };

        if (type && type !== 'ALL') {
            where.type = type;
        }

        if (search) {
            where.OR = [
                { description: { contains: search, mode: 'insensitive' } },
                { category: { name: { contains: search, mode: 'insensitive' } } }
            ];
        }

        const [transactions, incomeAgg, expenseAgg] = await Promise.all([
            prisma.transaction.findMany({
                where,
                take: limit + 1,
                skip: cursor ? 1 : undefined,
                cursor: cursor ? { id: cursor } : undefined,
                include: { category: true },
                orderBy: [
                    { date: "desc" },
                    { createdAt: "desc" },
                    { id: "desc" }
                ],
            }),
            prisma.transaction.aggregate({
                where: { ...where, type: 'INCOME' },
                _sum: { amount: true }
            }),
            prisma.transaction.aggregate({
                where: { ...where, type: 'EXPENSE' },
                _sum: { amount: true }
            })
        ]);

        return {
            transactions,
            totalIncome: incomeAgg._sum.amount || 0,
            totalExpense: expenseAgg._sum.amount || 0
        };
    }

    public create = async (userId: string, data: any) => {
        return prisma.transaction.create({
            data: {
                ...data,
                userId,
            },
        });
    }

    public createCsvImport = async (userId: string, filename: string, rowCount: number) => {
        return prisma.csvImport.create({
            data: {
                userId,
                filename,
                rowCount,
                successCount: 0,
                errorCount: 0
            }
        });
    }

    public createMany = async (data: any[]) => {
        return prisma.transaction.createMany({
            data
        });
    }

    public updateCsvImportSuccessCount = async (id: string, successCount: number) => {
        return prisma.csvImport.update({
            where: { id },
            data: { successCount }
        });
    }

    public delete = async (userId: string, trxId: string) => {
        return prisma.transaction.delete({
            where: {
                userId,
                id: trxId,
            },
        });
    }

    public findForAnalysis = async (userId: string, startDate: Date, endDate: Date = new Date()) => {
        return prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
                type: 'EXPENSE',
                categoryId: null,
            },
            orderBy: [
                { date: "asc" },
                { createdAt: "asc" }
            ],
        });
    }

    public findByCategory = async (userId: string, categoryId: string, take = 3) => {
        return prisma.transaction.findMany({
            where: {
                userId,
                categoryId,
            },
            orderBy: [
                { date: "desc" },
                { createdAt: "desc" }
            ],
            take,
        });
    }

    public updateCluster = async (transactionIds: string[], clusterId: string) => {
        if (!transactionIds.length) return { count: 0 };

        return prisma.transaction.updateMany({
            where: {
                id: {
                    in: transactionIds,
                },
            },
            data: {
                clusterId,
            },
        });
    }

    public updateCategoryByTransactionIds = async (transactionIds: string[], categoryId: string) => {
        if (!transactionIds.length) return { count: 0 };

        return prisma.transaction.updateMany({
            where: {
                id: {
                    in: transactionIds,
                },
            },
            data: {
                categoryId,
            },
        });
    }

    public getSumExpenseByCategoryAndDate = async (userId: string, categoryId: string, startDate: Date, endDate: Date) => {
        return prisma.transaction.aggregate({
            where: {
                userId,
                categoryId,
                type: 'EXPENSE',
                date: {
                    gte: startDate,
                    lte: endDate
                }
            },
            _sum: { amount: true }
        });
    }

    public getMonthlyAggregates = async (userId: string, categoryId: string, monthsLimit = 6) => {
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - monthsLimit);
        startDate.setDate(1); // Start from the beginning of the month

        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                categoryId,
                type: 'EXPENSE',
                date: { gte: startDate }
            },
            select: {
                amount: true,
                date: true
            },
            orderBy: { date: 'desc' }
        });

        const aggregates = new Map<string, number>();

        transactions.forEach(t => {
            const year = t.date.getFullYear();
            const month = t.date.getMonth() + 1;
            const key = `${year}-${month.toString().padStart(2, '0')}`;

            const current = aggregates.get(key) || 0;
            aggregates.set(key, current + Math.abs(Number(t.amount)));
        });

        return Array.from(aggregates.entries())
            .map(([monthKey, total]) => ({ monthKey, total }))
            .sort((a, b) => b.monthKey.localeCompare(a.monthKey)); // Most recent first
    }

    public getAllForExport = async (userId: string, month?: number, year?: number) => {
        const where: any = { userId };

        if (month && year) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0); // Last day of month
            where.date = { gte: startDate, lte: endDate };
        } else if (year) {
            const startDate = new Date(year, 0, 1);
            const endDate = new Date(year, 11, 31);
            where.date = { gte: startDate, lte: endDate };
        }

        return prisma.transaction.findMany({
            where,
            include: { category: true },
            orderBy: [{ date: 'asc' }, { createdAt: 'asc' }]
        });
    }
}
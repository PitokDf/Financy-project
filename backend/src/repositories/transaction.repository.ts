import prisma from "@/config/prisma";

export class TransactionRepository {
  public getAllPaginated = async (
    userId: string,
    cursor?: string,
    limit = 20,
    search?: string,
    type?: string,
  ) => {
    const where: any = { userId };

    if (type && type !== "ALL") {
      where.type = type;
    }

    if (search) {
      where.OR = [
        { description: { contains: search, mode: "insensitive" } },
        { category: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    const [transactions, incomeAgg, expenseAgg] = await Promise.all([
      prisma.transaction.findMany({
        where,
        take: limit + 1,
        skip: cursor ? 1 : undefined,
        cursor: cursor ? { id: cursor } : undefined,
        include: { category: true },
        orderBy: [{ date: "desc" }, { createdAt: "desc" }, { id: "desc" }],
      }),
      prisma.transaction.aggregate({
        where: { ...where, type: "INCOME" },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      }),
    ]);

    return {
      transactions,
      totalIncome: incomeAgg._sum.amount || 0,
      totalExpense: expenseAgg._sum.amount || 0,
    };
  };

  public create = async (userId: string, data: any) => {
    return prisma.transaction.create({
      data: {
        ...data,
        userId,
      },
    });
  };

  public createMany = async (data: any[]) => {
    return prisma.transaction.createMany({
      data,
    });
  };

  public delete = async (userId: string, trxId: string) => {
    return prisma.transaction.delete({
      where: {
        userId,
        id: trxId,
      },
    });
  };

  public update = async (userId: string, trxId: string, data: any) => {
    return prisma.transaction.update({
      where: {
        userId,
        id: trxId,
      },
      data,
    });
  };

  public findById = async (userId: string, trxId: string) => {
    return prisma.transaction.findFirst({
      where: { userId, id: trxId },
    });
  };

  public findForAnalysis = async (
    userId: string,
    startDate: Date,
    endDate: Date = new Date(),
  ) => {
    return prisma.transaction.findMany({
      where: {
        userId,
        // date: {
        //     gte: startDate,
        //     lte: endDate,
        // },
        type: "EXPENSE",
        categoryId: null,
      },
      orderBy: [{ date: "asc" }, { createdAt: "asc" }],
    });
  };

  public findByCategory = async (
    userId: string,
    categoryId: string,
    take = 3,
  ) => {
    return prisma.transaction.findMany({
      where: {
        userId,
        categoryId,
      },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
      take,
    });
  };

  public updateCluster = async (
    transactionIds: string[],
    clusterId: string,
  ) => {
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
  };

  public updateCategoryByTransactionIds = async (
    transactionIds: string[],
    categoryId: string,
  ) => {
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
  };

  public getSumExpenseByCategoryAndDate = async (
    userId: string,
    categoryId: string,
    startDate: Date,
    endDate: Date,
  ) => {
    return prisma.transaction.aggregate({
      where: {
        userId,
        categoryId,
        type: "EXPENSE",
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      _sum: { amount: true },
    });
  };

  public getMonthlyAggregates = async (
    userId: string,
    categoryId: string,
    monthsLimit = 6,
  ) => {
    const { windowStart, windowEnd } = this.monthlyWindow(monthsLimit);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        categoryId,
        type: "EXPENSE",
        date: { gte: windowStart, lt: windowEnd },
      },
      select: {
        amount: true,
        date: true,
      },
    });

    return this.aggregateByMonth(transactions, monthsLimit);
  };

  public getMonthlyAggregatesByCategories = async (
    userId: string,
    categoryIds: string[],
    monthsLimit = 6,
  ) => {
    const empty = new Map<
      string,
      Array<{ monthKey: string; total: number }>
    >();
    if (!categoryIds.length) return empty;

    const { windowStart, windowEnd } = this.monthlyWindow(monthsLimit);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        categoryId: { in: categoryIds },
        type: "EXPENSE",
        date: { gte: windowStart, lt: windowEnd },
      },
      select: {
        categoryId: true,
        amount: true,
        date: true,
      },
    });

    const grouped = new Map<string, Array<{ amount: number; date: Date }>>();
    transactions.forEach((t) => {
      if (!t.categoryId) return;
      const list = grouped.get(t.categoryId) || [];
      list.push({ amount: t.amount, date: t.date });
      grouped.set(t.categoryId, list);
    });

    const result = new Map<
      string,
      Array<{ monthKey: string; total: number }>
    >();
    grouped.forEach((list, categoryId) => {
      result.set(categoryId, this.aggregateByMonth(list, monthsLimit));
    });

    return result;
  };

  private monthlyWindow = (monthsLimit: number) => {
    const windowEnd = new Date();
    windowEnd.setDate(1);
    windowEnd.setHours(0, 0, 0, 0);

    const windowStart = new Date(
      windowEnd.getFullYear(),
      windowEnd.getMonth() - monthsLimit,
      1,
    );

    return { windowStart, windowEnd };
  };

  private aggregateByMonth = (
    transactions: Array<{ amount: number; date: Date }>,
    monthsLimit: number,
  ) => {
    const { windowEnd } = this.monthlyWindow(monthsLimit);

    const monthKeys: string[] = [];
    for (let i = 1; i <= monthsLimit; i++) {
      const d = new Date(windowEnd.getFullYear(), windowEnd.getMonth() - i, 1);
      monthKeys.push(
        `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`,
      );
    }

    const aggregates = new Map<string, number>();
    transactions.forEach((t) => {
      const key = `${t.date.getFullYear()}-${(t.date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;
      aggregates.set(key, (aggregates.get(key) || 0) + Math.abs(Number(t.amount)));
    });

    if (aggregates.size === 0) return [];

    return monthKeys.map((monthKey) => ({
      monthKey,
      total: aggregates.get(monthKey) || 0,
    }));
  };

  public getAllForExport = async (
    userId: string,
    month?: number,
    year?: number,
  ) => {
    const where: any = { userId };

    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      where.date = { gte: startDate, lte: endDate };
    } else if (year) {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);
      where.date = { gte: startDate, lte: endDate };
    }

    return prisma.transaction.findMany({
      where,
      include: { category: true },
      orderBy: [{ date: "asc" }, { createdAt: "asc" }],
    });
  };

  public getNeedsReview = async (userId: string) => {
    return prisma.transaction.findMany({
      where: {
        userId,
        needsReview: true,
        type: "EXPENSE",
      },
      include: { category: true },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });
  };

  public batchClearNeedsReview = async (
    userId: string,
    transactionIds: string[],
  ) => {
    if (!transactionIds.length) return { count: 0 };

    return prisma.transaction.updateMany({
      where: {
        userId,
        id: { in: transactionIds },
        needsReview: true,
      },
      data: {
        needsReview: false,
      },
    });
  };
}

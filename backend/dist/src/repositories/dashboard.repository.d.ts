export declare class DashboardRepository {
    getAllTimeStats: (userId: string) => Promise<(import("../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../generated/prisma/models").TransactionGroupByOutputType, "type"[]> & {
        _sum: {
            amount: number | null;
        };
    })[]>;
    getMonthlyStats: (userId: string, start: Date, end: Date) => Promise<(import("../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../generated/prisma/models").TransactionGroupByOutputType, "type"[]> & {
        _sum: {
            amount: number | null;
        };
    })[]>;
    getTopCategories: (userId: string, start: Date, end: Date, limit?: number) => Promise<(import("../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../generated/prisma/models").TransactionGroupByOutputType, "categoryId"[]> & {
        _sum: {
            amount: number | null;
        };
    })[]>;
}
//# sourceMappingURL=dashboard.repository.d.ts.map
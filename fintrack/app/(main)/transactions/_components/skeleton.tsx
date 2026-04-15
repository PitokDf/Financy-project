import { Skeleton } from "@/components/ui/skeleton";

const TransactionCardSkeleton = () => (
    <div className="bg-background rounded-xl border border-border/50 p-3 mb-2">
        <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
                <Skeleton className="w-3/4 h-4" />
                <Skeleton className="w-1/2 h-3" />
            </div>
            <div className="text-right space-y-1">
                <Skeleton className="w-16 h-4 ml-auto" />
                <Skeleton className="w-10 h-3 ml-auto" />
            </div>
        </div>
    </div>
);

export const TransactionsSkeleton = () => (
    <div className="flex flex-col h-screen max-w-md mx-auto space-y-4">
        {/* Header Stats */}
        <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="rounded-2xl bg-muted/20 border border-border/50 p-3">
                <Skeleton className="w-16 h-3 mb-2" />
                <Skeleton className="w-24 h-6" />
            </div>
            <div className="rounded-2xl bg-muted/20 border border-border/50 p-3">
                <Skeleton className="w-16 h-3 mb-2" />
                <Skeleton className="w-24 h-6" />
            </div>
        </div>

        {/* Search & Filter */}
        <div className="space-y-3 shrink-0">
            <Skeleton className="w-full h-11 rounded-xl" />
            <div className="flex gap-2">
                <Skeleton className="flex-1 h-9 rounded-xl" />
                <Skeleton className="flex-1 h-9 rounded-xl" />
                <Skeleton className="flex-1 h-9 rounded-xl" />
            </div>
        </div>

        {/* List Skeleton */}
        <div className="flex-1 space-y-4 mt-2">
            <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="w-24 h-3" />
                    <div className="flex-1 h-px bg-border/50" />
                </div>
                {[1, 2, 3, 4].map(i => <TransactionCardSkeleton key={i} />)}
            </div>
        </div>
    </div>
);
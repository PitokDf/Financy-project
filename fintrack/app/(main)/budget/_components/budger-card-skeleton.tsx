import { Skeleton } from "@/components/ui/skeleton";

export function BudgetCardSkeleton() {
    return (
        <div className="border border-border/50 rounded-xl p-4 bg-card">
            {/* Icon and Header */}
            <div className="flex items-start gap-3 mb-4">
                <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <Skeleton className="w-24 h-4" />
                        <Skeleton className="w-4 h-4 rounded-lg" />
                    </div>
                    <div className="flex items-center justify-between">
                        <Skeleton className="w-20 h-4 rounded-full" />
                        <Skeleton className="w-16 h-3" />
                    </div>
                </div>
            </div>

            {/* Progress Bar and Amounts */}
            <div className="space-y-3">
                <Skeleton className="w-full h-2 rounded-full" />
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <Skeleton className="w-12 h-2" />
                        <Skeleton className="w-20 h-4" />
                    </div>
                    <div className="space-y-1 flex flex-col items-end">
                        <Skeleton className="w-12 h-2" />
                        <Skeleton className="w-20 h-4" />
                    </div>
                </div>
            </div>
        </div>
    );
}
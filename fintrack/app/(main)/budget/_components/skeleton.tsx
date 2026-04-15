import { Skeleton } from "@/components/ui/skeleton";
import { BudgetCardSkeleton } from "./budger-card-skeleton";

export function BudgetPageSkeleton() {
    return (
        <div className="animate-fade-in space-y-4 max-w-md mx-auto">
            {/* Top Summary Card Skeleton */}
            <div className="rounded-2xl bg-muted/30 border border-border/50 p-5 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded" />
                            <Skeleton className="w-32 h-3" />
                        </div>
                        <Skeleton className="w-10 h-4" />
                    </div>
                    <Skeleton className="w-40 h-8 mb-2" />
                    <Skeleton className="w-28 h-3 mb-4" />

                    <Skeleton className="w-full h-2 rounded-full mb-4" />

                    <div className="flex gap-3">
                        <Skeleton className="w-24 h-6 rounded-full" />
                        <Skeleton className="w-24 h-6 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Title and Button Section */}
            <div className="flex items-center justify-between py-2">
                <Skeleton className="w-32 h-5" />
                <Skeleton className="w-20 h-8 rounded-xl" />
            </div>

            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <BudgetCardSkeleton key={i} />
                ))}
            </div>

            {/* Add New Placeholder Skeleton */}
            <div className="border-dashed border-2 rounded-2xl p-8 flex flex-col items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-xl" />
                <Skeleton className="w-32 h-3" />
            </div>
        </div>
    );
}
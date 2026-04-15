import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
    return (
        <div className="text-foreground max-w-md mx-auto">
            {/* Top Header Stats */}
            <div className="mb-5">
                <div className="flex items-center justify-end gap-1 mb-4">
                    <div className="p-2 mr-1">
                        <Skeleton className="w-5 h-5 rounded-full" />
                    </div>
                    <div className="bg-muted/50 border border-border/50 flex items-center gap-2 rounded-2xl px-3 py-1.5">
                        <Skeleton className="w-3.5 h-3.5 rounded-full" />
                        <Skeleton className="w-12 h-4" />
                    </div>
                </div>

                {/* Main Balance Card Skeleton */}
                <div className="bg-muted/30 border border-border/50 rounded-2xl p-5 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <Skeleton className="w-4 h-4 rounded" />
                            <Skeleton className="w-20 h-3" />
                        </div>
                        <Skeleton className="w-48 h-10 mb-5" />
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-muted/50 rounded-xl p-3">
                                <div className="flex items-center gap-1 mb-2">
                                    <Skeleton className="w-3 h-3 rounded" />
                                    <Skeleton className="w-16 h-2" />
                                </div>
                                <Skeleton className="w-24 h-5" />
                            </div>
                            <div className="bg-muted/50 rounded-xl p-3">
                                <div className="flex items-center gap-1 mb-2">
                                    <Skeleton className="w-3 h-3 rounded" />
                                    <Skeleton className="w-16 h-2" />
                                </div>
                                <Skeleton className="w-24 h-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Forecast Skeleton */}
            <div className="mb-5 bg-muted/20 border border-border/50 rounded-2xl p-4 relative overflow-hidden">
                <div className="flex items-center gap-1.5 mb-2">
                    <Skeleton className="w-20 h-4 rounded" />
                </div>
                <Skeleton className="w-32 h-8 mb-2" />
                <Skeleton className="w-full h-3 mb-1" />
                <Skeleton className="w-2/3 h-3" />
            </div>

            {/* Top Categories Skeleton */}
            <div className="pt-4 mb-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                        <Skeleton className="w-32 h-6" />
                        <Skeleton className="w-5 h-5 rounded-full" />
                    </div>
                    <Skeleton className="w-20 h-4" />
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Skeleton className="w-8 h-8 rounded-xl shrink-0" />
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-2">
                                    <Skeleton className="w-24 h-4" />
                                    <Skeleton className="w-20 h-4" />
                                </div>
                                <Skeleton className="w-full h-1.5 rounded-full" />
                            </div>
                            <Skeleton className="w-8 h-4 shrink-0" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Transactions Skeleton */}
            <div className="pb-4">
                <div className="flex items-center justify-between mb-4">
                    <Skeleton className="w-40 h-6" />
                    <Skeleton className="w-24 h-4" />
                </div>
                <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-muted/10 border border-border/40 rounded-2xl">
                            <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                            <div className="flex-1">
                                <Skeleton className="w-32 h-4 mb-2" />
                                <Skeleton className="w-24 h-3" />
                            </div>
                            <div className="text-right">
                                <Skeleton className="w-20 h-4 mb-1" />
                                <Skeleton className="w-12 h-3 ml-auto" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAB Skeleton Placeholder */}
            <div className="fixed bottom-24 right-4 z-30">
                <div className="w-14 h-14 rounded-2xl bg-muted animate-pulse shadow-lg" />
            </div>
        </div>
    );
}
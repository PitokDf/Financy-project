import { Skeleton } from "@/components/ui/skeleton";

export function MenuSectionSkeleton() {
    return (
        <div className="space-y-6">
            {[1, 2, 3].map((section) => (
                <div key={section}>
                    <Skeleton className="w-24 h-3 mb-3 ml-1" />
                    <div className="border border-border/50 rounded-xl bg-card overflow-hidden divide-y divide-border/50">
                        {[1, 2].map((item) => (
                            <div key={item} className="flex items-center gap-3 p-4">
                                <Skeleton className="w-9 h-9 rounded-xl shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="w-24 h-4" />
                                    <Skeleton className="w-40 h-3" />
                                </div>
                                <Skeleton className="w-4 h-4 rounded shrink-0" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function ProfileSkeleton() {
    return (
        <div className="animate-fade-in space-y-5 max-w-md mx-auto">
            {/* Profile Header Card Skeleton */}
            <div className="border border-border/50 rounded-xl overflow-hidden bg-card">
                <div className="bg-muted/30 h-20 relative" />
                <div className="px-4 pb-4 -mt-10 relative z-10">
                    <div className="flex items-center gap-3">
                        <Skeleton className="w-16 h-16 rounded-full  border-4 border-background shrink-0 shadow-lg" />
                        <div className="flex-1 pt-8 space-y-2">
                            <Skeleton className="w-32 h-5" />
                            <Skeleton className="w-48 h-3" />
                        </div>
                    </div>

                    <Skeleton className="w-40 h-3 mt-4" />

                    {/* Stats Grid Skeleton */}
                    <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-border/50">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <div className="flex items-center gap-1">
                                    <Skeleton className="w-3 h-3 rounded-full" />
                                    <Skeleton className="w-8 h-5" />
                                </div>
                                <Skeleton className="w-10 h-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Menu Sections Skeleton */}
            <MenuSectionSkeleton />

            {/* Logout Button Skeleton */}
            <Skeleton className="w-full h-12 rounded-xl" />

            {/* Footer Skeleton */}
            <div className="flex justify-center pb-2">
                <Skeleton className="w-20 h-3" />
            </div>
        </div>
    );
}
'use client';

export function AnalysisDashboardSkeleton() {
    return (
        <div className="animate-pulse space-y-3 text-foreground">
            {/* Sticky Filter Header */}
            <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md pb-2 pt-1 -mx-4 px-4">
                <div className="flex items-center gap-1 bg-muted p-1 rounded-xl w-max min-w-full">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-7 min-w-18 rounded-lg bg-muted"
                        />
                    ))}
                </div>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-20 rounded-xl bg-muted"
                    />
                ))}
            </div>

            {/* AI Lab Banner */}
            <div className="relative overflow-hidden p-5 rounded-xl bg-muted shadow-xl shadow-black/5">
                <div className="absolute -top-6 -right-6 opacity-20 h-24 w-24 rounded-full bg-muted" />
                <div className="relative z-10 space-y-3">
                    <div className="h-4 w-40 rounded-full bg-muted" />
                    <div className="h-3 w-3/4 rounded-full bg-muted" />
                    <div className="h-8 w-16 rounded-full bg-muted" />
                </div>
            </div>

            {/* Chart */}
            <div className="h-64 rounded-xl bg-muted" />

            {/* Category breakdown */}
            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between gap-3 rounded-xl bg-muted p-3"
                    >
                        <div className="h-4 w-1/3 rounded-full bg-muted" />
                        <div className="h-4 w-1/4 rounded-full bg-muted" />
                    </div>
                ))}
            </div>
        </div>
    );
}
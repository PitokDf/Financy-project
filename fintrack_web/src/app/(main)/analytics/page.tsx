import { AnalyticsHeader } from "@/components/pages/analytics/analytics-header";
import { SpendingChart } from "@/components/pages/analytics/spending-chart";
import { ClusterList } from "@/components/pages/analytics/cluster-list";
import { ForecastCard } from "@/components/pages/analytics/forecast-card";

export default function AnalyticsPage() {
    return (
        <div className="pb-6 bg-background min-h-full">
            <AnalyticsHeader />

            {/* Period Selector (Horizontal Scroll) */}
            <div className="flex overflow-x-auto hide-scrollbar gap-2 px-5 py-4 mt-2">
                <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-sm ring-2 ring-emerald-600 ring-offset-1 dark:ring-offset-background transition-all">
                    Maret 2025
                </button>
                <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-muted/50 border border-border text-muted-foreground text-[11px] font-semibold hover:bg-muted transition-all">
                    Februari 2025
                </button>
                <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-muted/50 border border-border text-muted-foreground text-[11px] font-semibold hover:bg-muted transition-all">
                    Januari 2025
                </button>
                <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-muted/50 border border-border text-muted-foreground text-[11px] font-semibold hover:bg-muted transition-all">
                    Desember 2024
                </button>
            </div>

            <SpendingChart />
            <ClusterList />
            <ForecastCard />
        </div>
    )
}

import { HistoryHeader } from "@/components/pages/history/history-header";
import { HistoryFilters } from "@/components/pages/history/history-filters";
import { HistoryList } from "@/components/pages/history/history-list";

export default function HistoryPage() {
    return (
        <div className="pb-6 bg-background min-h-full">
            <HistoryHeader />
            <HistoryFilters />
            <HistoryList />
        </div>
    )
}

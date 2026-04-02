import { AddHeader } from "@/components/pages/transactions/add/add-header";
import { CategoryGrid } from "@/components/pages/transactions/add/category-grid";

export default function AddTransactionPage() {
    return (
        <div className="pb-8 bg-muted/10 min-h-dvh">
            <AddHeader />
            <CategoryGrid />
        </div>
    )
}

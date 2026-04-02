import { BudgetHeader } from "@/components/pages/budget/budget-header";
import { BudgetSummary } from "@/components/pages/budget/budget-summary";
import { BudgetList } from "@/components/pages/budget/budget-list";

export default function BudgetPage() {
    return (
        <div className="pb-6 bg-muted/20 min-h-full">
            <BudgetHeader />
            <div className="bg-background rounded-t-[2.5rem] -mt-6 relative z-20 pb-4 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] border-t border-white/10">
                <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mt-3 mb-1" />
                <BudgetSummary />
                <BudgetList />
            </div>
        </div>
    )
}

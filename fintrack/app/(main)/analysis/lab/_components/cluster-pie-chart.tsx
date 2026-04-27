import { AnalysisRunResult } from "@/hooks/use-analysis";
import { CLUSTER_COLORS } from "./constant";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "@/lib/utils";

export function ClusterPieChart({ clusters }: { clusters: AnalysisRunResult['clusters'] }) {
    const data = clusters
        .filter(c => c.index !== -1)
        .map((c, i) => ({
            name: c.suggestedName || `Kategori ${c.index + 1}`,
            value: c.totalAmount,
            color: CLUSTER_COLORS[i % CLUSTER_COLORS.length],
        }));

    return (
        <div className="w-full h-44">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={48}
                        outerRadius={72}
                        paddingAngle={3}
                        dataKey="value"
                        strokeWidth={0}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value, name) => {
                            if (value == null) return ['', name];
                            return [formatCurrency(value.toString()), name];
                        }}
                        contentStyle={{
                            background: 'var(--card)',
                            border: '1px solid var(--border)',
                            borderRadius: '12px',
                            fontSize: '11px',
                            padding: '6px 10px',
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
import { AnalysisRunResult } from "@/hooks/use-analysis";
import { CLUSTER_COLORS } from "./constant";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "@/lib/utils";

interface ClusterPieChartProps {
    clusters: AnalysisRunResult['clusters'];
    mappings?: Record<number, string>;
}

export function ClusterPieChart({ clusters, mappings = {} }: ClusterPieChartProps) {
    const data = clusters
        .filter(c => c.index !== -1 && c.totalAmount > 0)
        .map((c, i) => ({
            name: mappings[c.index] || c.suggestedName || `Kategori ${c.index + 1}`,
            value: c.totalAmount,
            color: CLUSTER_COLORS[i % CLUSTER_COLORS.length],
            index: c.index,
        }));

    const total = data.reduce((s, d) => s + d.value, 0);

    return (
        <div className="flex items-center gap-4">
            {/* Donut */}
            <div className="w-32 h-32 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={38}
                            outerRadius={58}
                            paddingAngle={2}
                            dataKey="value"
                            strokeWidth={0}
                            startAngle={90}
                            endAngle={-270}
                        >
                            {data.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: any, name: any) => [formatCurrency(value.toString()), name]}
                            contentStyle={{
                                background: 'var(--card)',
                                border: '1px solid var(--border)',
                                borderRadius: '14px',
                                fontSize: '11px',
                                padding: '6px 10px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                            }}
                            cursor={false}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex-1 space-y-2 min-w-0">
                {data.map((entry) => {
                    const pct = total > 0 ? ((entry.value / total) * 100).toFixed(0) : '0';
                    return (
                        <div key={entry.index} className="flex items-center gap-2 min-w-0">
                            <div
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ background: entry.color }}
                            />
                            <p className="text-xs text-foreground font-medium truncate flex-1">{entry.name}</p>
                            <span
                                className="text-[10px] font-bold shrink-0 tabular-nums px-1.5 py-0.5 rounded-md"
                                style={{ background: entry.color + '18', color: entry.color }}
                            >
                                {pct}%
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
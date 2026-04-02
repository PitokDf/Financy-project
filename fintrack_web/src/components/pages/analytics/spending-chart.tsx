"use client"

import { Pie, PieChart, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
    { name: "Jajan Kopi", value: 960000, fill: "#10b981" },
    { name: "Mobilitas", value: 620000, fill: "#34d399" },
    { name: "Hiburan Digital", value: 480000, fill: "#fbbf24" },
    { name: "Buku & Kuliah", value: 310000, fill: "#60a5fa" }
]

const chartConfig = {
    jajankopi: { label: "Jajan Kopi", color: "#10b981" },
    mobilitas: { label: "Mobilitas", color: "#34d399" },
    hiburan: { label: "Hiburan", color: "#fbbf24" },
    buku: { label: "Buku", color: "#60a5fa" },
}

export function SpendingChart() {
    return (
        <div className="py-2 flex flex-col items-center justify-center relative">
            <div className="w-[200px] h-[200px] relative">
                <ChartContainer config={chartConfig} className="w-full h-full">
                    <PieChart>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={65}
                            outerRadius={85}
                            stroke="none"
                            cornerRadius={8}
                            paddingAngle={4}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>

                {/* Center Text overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                    <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Total</span>
                    <span className="text-xl font-bold text-[#064e3b] dark:text-emerald-500 font-mono tracking-tighter">
                        Rp 3.22M
                    </span>
                </div>
            </div>
        </div>
    )
}

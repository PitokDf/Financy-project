"use client";

import { useState, useRef, memo, Ref } from "react";
import { ArrowDownRight, ArrowUpRight, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";
import { TransactionType } from "@/types";

interface TransactionCardProps {
    id: string;
    description: string;
    amount: number;
    type: TransactionType;
    date: string;
    category: string;
    categoryColor: string;
    onDelete?: (id: string) => void;
    ref?: Ref<HTMLDivElement>;
}

export const TransactionCard = memo(
    function TransactionCard({
        ref,
        id,
        description,
        amount,
        type,
        date,
        category,
        categoryColor,
        onDelete
    }: TransactionCardProps) {
        const [translateX, setTranslateX] = useState(0);
        const [isDragging, setIsDragging] = useState(false);

        const startXRef = useRef(0);
        const ACTION_WIDTH = 80;

        const handleDragStart = (clientX: number) => {
            startXRef.current = clientX;
            setIsDragging(true);
        };

        const handleDragMove = (clientX: number) => {
            if (!isDragging) return;
            const diff = clientX - startXRef.current;

            if (diff < 0) {
                setTranslateX(Math.max(diff, -ACTION_WIDTH - 20));
            } else {
                setTranslateX(0);
            }
        };

        const handleDragEnd = () => {
            setIsDragging(false);
            if (translateX < -(ACTION_WIDTH / 2)) {
                setTranslateX(-ACTION_WIDTH);
            } else {
                setTranslateX(0);
            }
        };

        const handleDelete = () => {
            if (onDelete) onDelete(id);
            setTranslateX(0);
        };

        return (
            <div ref={ref} className="relative overflow-hidden rounded-xl bg-destructive">
                <div className="absolute inset-y-0 right-0 flex items-center justify-center" style={{ width: ACTION_WIDTH }}>
                    <button
                        onClick={handleDelete}
                        className="w-full h-full flex flex-col items-center justify-center text-destructive-foreground hover:bg-destructive/90 transition-colors"
                        aria-label="Hapus transaksi"
                    >
                        <Trash2 className="w-5 h-5 mb-1" />
                        <span className="text-[10px] font-medium">Hapus</span>
                    </button>
                </div>

                <div
                    className={cn(
                        "relative bg-background w-full h-full touch-pan-y z-10",
                        !isDragging && "transition-transform duration-200 ease-in-out"
                    )}
                    style={{ transform: `translateX(${translateX}px)` }}
                    onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                    onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                    onTouchEnd={handleDragEnd}
                    onMouseDown={(e) => handleDragStart(e.clientX)}
                    onMouseMove={(e) => handleDragMove(e.clientX)}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                >
                    <Card className="border-border/50 py-0 shadow-none rounded-none md:rounded-xl">
                        <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: categoryColor + '15' }}
                                >
                                    {type === 'INCOME' ? (
                                        <ArrowUpRight className="w-4 h-4" style={{ color: categoryColor }} />
                                    ) : (
                                        <ArrowDownRight className="w-4 h-4" style={{ color: categoryColor }} />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0 pointer-events-none">
                                    <p className="text-sm font-semibold text-foreground truncate">{description}</p>
                                    <p className="text-xs text-muted-foreground">{category}</p>
                                </div>
                                <div className="text-right shrink-0 pointer-events-none">
                                    <p
                                        className={cn(
                                            'text-sm font-bold',
                                            type === 'INCOME' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'
                                        )}
                                    >
                                        {type === 'INCOME' ? '+' : '-'}{formatCurrency(amount)}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground">
                                        {new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    })
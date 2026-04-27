'use client';

import { MlClusterResponse } from "@/hooks/use-analysis";
import { cn, formatCurrency } from "@/lib/utils";
import { ChevronDown, ChevronUp, FolderInput, Trash2, Check, AlertCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ExistingCategory { id: string; name: string; }

export function ClusterCard({
    cluster, index, color, mapping, onNameChange, transactions,
    onExcludeTransaction, onMoveTransaction, clusterOptions, existingCategories = []
}: {
    cluster: MlClusterResponse; index: number; color: string; mapping: string;
    onNameChange: (v: string) => void; transactions: MlClusterResponse['members'];
    onExcludeTransaction: (id: string) => void; onMoveTransaction: (id: string, targetIndex: number) => void;
    clusterOptions: { index: number; name: string }[]; existingCategories?: ExistingCategory[];
}) {
    const [open, setOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    const isLainLain = index === -1;
    const currentTotal = transactions.reduce((s, t) => s + Math.abs(t.amount || 0), 0);
    const suggestions = existingCategories.filter(cat =>
        mapping.trim().length > 0 &&
        cat.name.toLowerCase().includes(mapping.toLowerCase()) &&
        cat.name.toLowerCase() !== mapping.toLowerCase()
    ).slice(0, 5);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!inputRef.current?.contains(e.target as Node) && !suggestionsRef.current?.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div className={cn(
            "rounded-2xl border overflow-hidden transition-all duration-200",
            isLainLain
                ? "border-amber-500/20 bg-amber-500/4"
                : "border-border/50 bg-card"
        )}>
            {/* ── Header ── */}
            <div className={cn("flex items-center gap-3 p-4", open && "pb-3")}>
                <div className="shrink-0 flex flex-col items-center gap-1">
                    <div
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ background: color, boxShadow: `0 2px 6px ${color}50` }}
                    />
                </div>

                {/* Name input */}
                <div className="flex-1 min-w-0 relative">
                    <div className="relative">
                        <input
                            ref={inputRef}
                            value={mapping}
                            onChange={e => { onNameChange(e.target.value); setShowSuggestions(true); }}
                            onFocus={() => setShowSuggestions(true)}
                            readOnly={isLainLain}
                            placeholder={isLainLain ? 'Lain-lain' : `Nama kategori`}
                            className={cn(
                                "w-full text-sm font-semibold bg-transparent text-foreground outline-none truncate",
                                "border-b border-transparent transition-colors pb-0.5 placeholder:text-muted-foreground/50",
                                !isLainLain && "focus:border-primary/60"
                            )}
                        />

                        {/* Autocomplete suggestions */}
                        {showSuggestions && suggestions.length > 0 && !isLainLain && (
                            <div
                                ref={suggestionsRef}
                                className="absolute left-0 right-0 top-full mt-2 bg-popover border border-border rounded-2xl shadow-xl z-50 overflow-hidden"
                            >
                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider px-3.5 pt-2.5 pb-1">
                                    Kategori kamu
                                </p>
                                {suggestions.map(cat => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onMouseDown={() => { onNameChange(cat.name); setShowSuggestions(false); }}
                                        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left hover:bg-muted transition-colors"
                                    >
                                        <div className="w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                                            <Check className="w-2.5 h-2.5 text-primary" />
                                        </div>
                                        <span className="text-sm">{cat.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Meta */}
                    <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1.5">
                        <span>{transactions.length} transaksi</span>
                        <span className="opacity-40">·</span>
                        <span className="font-medium">{formatCurrency(currentTotal)}</span>
                        {isLainLain && (
                            <>
                                <span className="opacity-40">·</span>
                                <span className="text-amber-500 font-medium flex items-center gap-0.5">
                                    <AlertCircle className="w-2.5 h-2.5" />
                                    Tidak dikategorikan
                                </span>
                            </>
                        )}
                    </p>
                </div>

                {/* Toggle */}
                <button
                    onClick={() => setOpen(v => !v)}
                    className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center transition-colors shrink-0",
                        open ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"
                    )}
                >
                    {open
                        ? <ChevronUp className="w-3.5 h-3.5" />
                        : <ChevronDown className="w-3.5 h-3.5" />
                    }
                </button>
            </div>

            {/* ── Representative tags ── */}
            {!open && cluster.representativeDescriptions?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 px-4 pb-3.5">
                    {cluster.representativeDescriptions.slice(0, 4).map((desc, i) => (
                        <span
                            key={i}
                            className="px-2 py-0.5 rounded-lg text-[9px] font-semibold uppercase tracking-wide"
                            style={{ background: color + '14', color }}
                        >
                            {desc}
                        </span>
                    ))}
                </div>
            )}

            {/* ── Expanded: transactions ── */}
            {open && (
                <div className="border-t border-border/40 px-4 pb-4 pt-3 space-y-2 animate-in slide-in-from-top-1 duration-150">
                    {/* Tags row */}
                    {cluster.representativeDescriptions?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pb-1">
                            {cluster.representativeDescriptions.slice(0, 5).map((desc, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-0.5 rounded-lg text-[9px] font-semibold uppercase tracking-wide"
                                    style={{ background: color + '14', color }}
                                >
                                    {desc}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Transaction list */}
                    <div className="space-y-1.5 max-h-60 overflow-y-auto -mx-1 px-1">
                        {transactions.length === 0 && (
                            <p className="text-center text-[11px] text-muted-foreground py-6 italic">Kosong</p>
                        )}
                        {transactions.map(t => (
                            <div
                                key={t.id}
                                className="flex items-center gap-3 py-2.5 px-3 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors"
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium truncate text-foreground">{t.description}</p>
                                    <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">
                                        {formatCurrency(Math.abs(t.amount))}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-0.5 shrink-0">
                                        <div className="relative">
                                            <select
                                                onChange={e => onMoveTransaction(t.id, parseInt(e.target.value))}
                                                defaultValue=""
                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                            >
                                                <option value="" disabled>Pindah ke...</option>
                                                {clusterOptions
                                                    .filter(o => o.index !== index)
                                                    .map(opt => (
                                                        <option key={opt.index} value={opt.index}>{opt.name}</option>
                                                    ))}
                                            </select>
                                            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-primary hover:bg-primary/10 transition-colors">
                                                <FolderInput className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    {!isLainLain && (
                                        <button
                                            onClick={() => onExcludeTransaction(t.id)}
                                            className="w-7 h-7 flex items-center justify-center rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
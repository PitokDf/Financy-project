'use client';

import { MlClusterResponse } from "@/hooks/use-analysis";
import { cn, formatCurrency } from "@/lib/utils";
import { ChevronDown, ChevronUp, FolderInput, Trash2, Check, AlertCircle, AlertTriangle } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { CATEGORIES } from "./constant";

interface ExistingCategory { id: string; name: string; }

export function ClusterCard({
    cluster, index, color, mapping, onNameChange, transactions,
    onExcludeTransactions, onMoveTransactions, clusterOptions, existingCategories = []
}: {
    cluster: MlClusterResponse; index: number; color: string; mapping: string;
    onNameChange: (v: string) => void; transactions: MlClusterResponse['members'];
    onExcludeTransactions: (ids: string[]) => void; onMoveTransactions: (ids: string[], targetIndex: number) => void;
    clusterOptions: { index: number; name: string }[]; existingCategories?: ExistingCategory[];
}) {
    const [open, setOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const categoriesMerged = [...existingCategories, ...CATEGORIES.map(cat => ({ name: cat, id: cat.toLocaleLowerCase() }))]

    const isLainLain = index === -1;
    const currentTotal = transactions.reduce((s, t) => s + Math.abs(t.amount || 0), 0);
    const reviewCount = transactions.filter(t => t.reviewRequired).length;
    const suggestions = categoriesMerged.filter(cat =>
        mapping.trim().length > 0 &&
        cat.name.toLowerCase().includes(mapping.toLowerCase()) &&
        cat.name.toLowerCase() !== mapping.toLowerCase()
    ).slice(0, 5);

    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const sortedTransactions = useMemo(() => {
        return [...transactions].sort((a, b) => (b.reviewRequired ? 1 : 0) - (a.reviewRequired ? 1 : 0));
    }, [transactions]);

    useEffect(() => {
        setSelectedIds(prev => {
            const currentIds = new Set(transactions.map(t => t.id));
            const next = new Set<string>();
            prev.forEach(id => currentIds.has(id) && next.add(id));
            return next;
        });
    }, [transactions]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!inputRef.current?.contains(e.target as Node) && !suggestionsRef.current?.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) setSelectedIds(new Set(transactions.map(t => t.id)));
        else setSelectedIds(new Set());
    };

    const handleToggleSelect = (id: string) => {
        const next = new Set(selectedIds);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        setSelectedIds(next);
    };

    return (
        <div className={cn(
            "rounded-2xl border transition-all duration-200",
            showSuggestions ? "relative z-50" : "relative",
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
                                className="absolute left-0 right-0 top-full mt-2 bg-popover border border-border rounded-2xl shadow-xl overflow-hidden z-50"
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
                        {reviewCount > 0 && !isLainLain && (
                            <>
                                <span className="opacity-40">·</span>
                                <span className="text-amber-500 font-semibold flex items-center gap-0.5" title="Ada transaksi dengan confidence AI rendah">
                                    <AlertTriangle className="w-2.5 h-2.5" />
                                    {reviewCount} butuh cek
                                </span>
                            </>
                        )}
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

                    {/* Bulk Actions */}
                    {transactions.length > 0 && (
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/40 px-1">
                            <label className="flex items-center gap-2.5 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedIds.size === transactions.length && transactions.length > 0}
                                        onChange={handleSelectAll}
                                        className="peer sr-only"
                                    />
                                    <div className="w-4 h-4 rounded border border-muted-foreground/40 bg-background peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                                <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                    {selectedIds.size > 0 ? `${selectedIds.size} dipilih` : 'Pilih Semua'}
                                </span>
                            </label>

                            {selectedIds.size > 0 && (
                                <div className="flex items-center gap-1.5 animate-in fade-in duration-200">
                                    <select
                                        onChange={e => {
                                            onMoveTransactions(Array.from(selectedIds), parseInt(e.target.value));
                                            setSelectedIds(new Set());
                                        }}
                                        value=""
                                        className="h-7 text-[10px] bg-primary/10 text-primary border border-primary/20 rounded-lg px-2 cursor-pointer outline-none hover:bg-primary/15 transition-colors font-medium max-w-[120px]"
                                    >
                                        <option value="" disabled>Pindahkan ke...</option>
                                        {clusterOptions
                                            .filter(o => o.index !== index)
                                            .map(opt => (
                                                <option key={opt.index} value={opt.index} className="truncate">{opt.name}</option>
                                            ))}
                                    </select>
                                    {!isLainLain && (
                                        <button
                                            onClick={() => {
                                                onExcludeTransactions(Array.from(selectedIds));
                                                setSelectedIds(new Set());
                                            }}
                                            className="h-7 px-2.5 flex items-center justify-center rounded-lg text-destructive bg-destructive/10 hover:bg-destructive/15 transition-colors text-[10px] font-medium"
                                        >
                                            <Trash2 className="w-3 h-3 mr-1" />
                                            Keluarkan
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Transaction list */}
                    <div className="space-y-1.5 max-h-[300px] overflow-y-auto -mx-1 px-1">
                        {transactions.length === 0 && (
                            <p className="text-center text-[11px] text-muted-foreground py-6 italic">Kosong</p>
                        )}
                        {sortedTransactions.map(t => {
                            const isSelected = selectedIds.has(t.id);
                            return (
                                <div
                                    key={t.id}
                                    className={cn(
                                        "flex items-center gap-3 py-2 px-3 rounded-xl transition-colors cursor-pointer border border-transparent",
                                        isSelected ? "bg-primary/10 border-primary/20" :
                                        t.reviewRequired
                                            ? "bg-amber-500/6 border-amber-500/15 hover:bg-amber-500/10"
                                            : "bg-muted/50 hover:bg-muted/80"
                                    )}
                                    onClick={() => handleToggleSelect(t.id)}
                                >
                                    {/* Checkbox */}
                                    <div className="relative flex items-center justify-center shrink-0">
                                        <input 
                                            type="checkbox" 
                                            checked={isSelected}
                                            readOnly
                                            className="peer sr-only"
                                        />
                                        <div className={cn(
                                            "w-4 h-4 rounded border transition-colors flex items-center justify-center",
                                            isSelected ? "bg-primary border-primary" : "border-muted-foreground/40 bg-background"
                                        )}>
                                            <Check className={cn("w-3 h-3 text-white transition-opacity", isSelected ? "opacity-100" : "opacity-0")} />
                                        </div>
                                    </div>

                                    {/* Confidence indicator dot */}
                                    {t.reviewRequired && !isSelected && (
                                        <div className="shrink-0" title="Confidence AI rendah">
                                            <AlertTriangle className="w-3 h-3 text-amber-500" />
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium truncate text-foreground">{t.description}</p>
                                        <p className="text-[10px] text-muted-foreground mt-0.5 font-medium flex items-center gap-1.5">
                                            <span>{formatCurrency(Math.abs(t.amount))}</span>
                                            {t.reviewRequired && (
                                                <>
                                                    <span className="opacity-40">·</span>
                                                    <span className="text-amber-500 font-semibold">Perlu dicek</span>
                                                </>
                                            )}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-0.5 shrink-0" onClick={e => e.stopPropagation()}>
                                        <div className="relative">
                                            <select
                                                onChange={e => onMoveTransactions([t.id], parseInt(e.target.value))}
                                                defaultValue=""
                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                            >
                                                <option value="" disabled>Pindah ke...</option>
                                                {clusterOptions
                                                    .filter(o => o.index !== index)
                                                    .map(opt => (
                                                        <option key={opt.index} value={opt.index} className="truncate">{opt.name}</option>
                                                    ))}
                                            </select>
                                            <div className="w-7 h-7 flex items-center justify-center rounded-lg text-primary hover:bg-primary/10 transition-colors">
                                                <FolderInput className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                        {!isLainLain && (
                                            <button
                                                onClick={() => onExcludeTransactions([t.id])}
                                                className="w-7 h-7 flex items-center justify-center rounded-lg text-destructive hover:bg-destructive/10 transition-colors"
                                                title="Keluarkan dari grup"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
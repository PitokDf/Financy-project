'use client';

import { MlClusterResponse } from "@/hooks/use-analysis";
import { formatCurrency } from "@/lib/utils";
import { ChevronDown, ChevronUp, FolderInput, Trash2, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ExistingCategory {
    id: string;
    name: string;
}

export function ClusterCard({
    cluster,
    index,
    color,
    mapping,
    onNameChange,
    transactions,
    onExcludeTransaction,
    onMoveTransaction,
    clusterOptions,
    existingCategories = [],
}: {
    cluster: MlClusterResponse;
    index: number;
    color: string;
    mapping: string;
    onNameChange: (v: string) => void;
    transactions: MlClusterResponse['members'];
    onExcludeTransaction: (id: string) => void;
    onMoveTransaction: (id: string, targetIndex: number) => void;
    clusterOptions: { index: number, name: string }[];
    existingCategories?: ExistingCategory[];
}) {
    const [open, setOpen] = useState(false);

    // Combobox state
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    const suggestions = existingCategories.filter(
        (cat) =>
            mapping.trim().length > 0 &&
            cat.name.toLowerCase().includes(mapping.toLowerCase()) &&
            cat.name.toLowerCase() !== mapping.toLowerCase()
    ).slice(0, 5);

    // Close suggestions on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (
                inputRef.current && !inputRef.current.contains(e.target as Node) &&
                suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Recalculate total amount based on current transactions in this cluster
    const currentTotal = transactions.reduce((sum: number, t) => sum + Math.abs(t.amount || 0), 0);
    const totalFmt = formatCurrency(currentTotal);

    const isLainLain = index === -1;

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300">
            {/* Header row */}
            <div className="flex items-center gap-3 p-4">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: color }} />
                <div className="flex-1 min-w-0">
                    {/* Combobox */}
                    <div className="relative">
                        <div className="flex items-center gap-1 relative">
                            <input
                                ref={inputRef}
                                value={mapping}
                                onChange={e => {
                                    onNameChange(e.target.value);
                                    setShowSuggestions(true);
                                }}
                                onFocus={() => setShowSuggestions(true)}
                                className="w-full font-semibold text-sm bg-transparent text-foreground outline-none truncate border-b border-transparent focus:border-primary transition-colors pb-0.5 pr-4"
                                placeholder={isLainLain ? 'Lain-lain' : `Kategori ${index + 1}`}
                                readOnly={isLainLain}
                            />
                            {!isLainLain && (
                                <div className="text-muted-foreground opacity-40 absolute right-0 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                                </div>
                            )}
                        </div>

                        {/* Suggestions dropdown */}
                        {showSuggestions && suggestions.length > 0 && !isLainLain && (
                            <div
                                ref={suggestionsRef}
                                className="absolute left-0 right-0 top-full mt-1 bg-popover border border-border rounded-xl shadow-lg z-50 overflow-hidden"
                            >
                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider px-3 pt-2 pb-1">
                                    Kategori Kamu
                                </p>
                                {suggestions.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onMouseDown={() => {
                                            onNameChange(cat.name);
                                            setShowSuggestions(false);
                                        }}
                                        className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-muted transition-colors"
                                    >
                                        <Check className="w-3 h-3 text-primary shrink-0" />
                                        <span className="text-sm text-foreground">{cat.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                        {transactions.length} transaksi · {totalFmt}
                        {isLainLain && (
                            <span className="ml-1.5 text-amber-500 font-medium">· Tidak dikategorikan</span>
                        )}
                    </p>
                </div>
                <button onClick={() => setOpen(v => !v)} className="text-muted-foreground hover:bg-muted p-1.5 rounded-full transition-colors shrink-0">
                    {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
            </div>

            {/* Transaction List - collapsible */}
            {open && (
                <div className="px-4 pb-4 pt-0 space-y-2 animate-in slide-in-from-top-2 duration-200">
                    {cluster.representativeDescriptions && cluster.representativeDescriptions.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {cluster.representativeDescriptions.slice(0, 5).map((desc, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-0.5 rounded-md text-[10px] font-medium text-foreground opacity-70"
                                    style={{ background: color + '22', borderColor: color + '55', color: color + '99', border: '1px solid' }}
                                >
                                    {desc}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                        {transactions.map((t) => (
                            <div key={t.id} className="flex items-center justify-between py-2 px-3 bg-muted/40 rounded-xl group">
                                <div className="min-w-0 flex-1">
                                    <p className="text-[12px] font-medium truncate leading-tight">{t.description}</p>
                                    <p className="text-[10px] text-muted-foreground">{formatCurrency(Math.abs(t.amount))}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    {!isLainLain && (
                                        <div className="relative" title="Pindah ke kategori lain">
                                            <select
                                                onChange={(e) => onMoveTransaction(t.id, parseInt(e.target.value))}
                                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                                defaultValue=""
                                            >
                                                <option value="" disabled>Pindah ke...</option>
                                                {clusterOptions.filter(o => o.index !== index).map(opt => (
                                                    <option key={opt.index} value={opt.index}>{opt.name}</option>
                                                ))}
                                            </select>
                                            <div className="p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                                <FolderInput className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => onExcludeTransaction(t.id)}
                                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                        title={isLainLain ? "Hapus permanen" : "Pindahkan ke Lain-lain"}
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {transactions.length === 0 && (
                            <p className="text-center text-[11px] text-muted-foreground py-4 italic">Kosong</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
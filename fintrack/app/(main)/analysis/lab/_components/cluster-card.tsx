import { MlClusterResponse } from "@/hooks/use-analysis";
import { formatCurrency } from "@/lib/utils";
import { ChevronDown, ChevronUp, FolderInput, Trash2 } from "lucide-react";
import { useState } from "react";

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
}) {
    const [open, setOpen] = useState(false);

    // Recalculate total amount based on current transactions in this cluster
    const currentTotal = transactions.reduce((sum: number, t) => sum + Math.abs(t.amount || 0), 0);
    const totalFmt = formatCurrency(currentTotal);

    return (
        <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300">
            {/* Header row */}
            <div className="flex items-center gap-3 p-4">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ background: color }} />
                <div className="flex-1 min-w-0">
                    <input
                        value={mapping}
                        onChange={e => onNameChange(e.target.value)}
                        className="w-full font-semibold text-sm bg-transparent text-foreground outline-none truncate border-b border-transparent focus:border-primary transition-colors pb-0.5"
                        placeholder={`Klaster ${index + 1}`}
                    />
                    <p className="text-[11px] text-muted-foreground mt-0.5">{transactions.length} transaksi · {totalFmt}</p>
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
                                    style={{ background: color + '22', borderColor: color + '55', border: '1px solid' }}
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
                                    <div className="relative">
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
                                    <button
                                        onClick={() => onExcludeTransaction(t.id)}
                                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                        title="Hapus dari klaster"
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
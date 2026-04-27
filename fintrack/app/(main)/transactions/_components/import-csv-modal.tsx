import React, { useEffect, useState } from "react";
import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/use-transactions";
import { UploadCloud, FileText, X, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ImportCsvModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ImportCsvModal({ isOpen, onOpenChange }: ImportCsvModalProps) {
    const { importCsvAsync, isImporting } = useTransactions();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file?.name.endsWith('.csv')) setSelectedFile(file);
        else toast.error('Hanya file .CSV yang diterima');
    };

    useEffect(() => {
        const fetchShared = async () => {
            const cache = await caches.open('shared-target');
            const resp = await cache.match('/shared-file');
            if (!resp) return;
            const blob = await resp.blob();
            await cache.delete('/shared-file');
            const file = new File([blob], 'transactions.csv', { type: 'text/csv' });
            setSelectedFile(file);
            toast.info(`File diterima: ${file.name}`);
        };
        fetchShared();
    }, []);

    // Reset file when modal closes
    useEffect(() => {
        if (!isOpen) setSelectedFile(null);
    }, [isOpen]);

    const handleImport = async () => {
        if (!selectedFile) return;
        try {
            await importCsvAsync(selectedFile);
            onOpenChange(false);
        } catch { /* Error handled in hook via sonner */ }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        return `${(bytes / 1024).toFixed(1)} KB`;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[400px] p-0 gap-0 overflow-hidden border-border/60">

                {/* Header */}
                <DialogHeader className="px-5 pt-5 pb-4 border-b border-border/40">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-sm shadow-primary/20 shrink-0">
                            <UploadCloud className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-base font-bold leading-none mb-0.5">
                                Import CSV
                            </DialogTitle>
                            <DialogDescription className="text-[11px] text-muted-foreground leading-none mt-0">
                                Tanggal · Deskripsi · Nominal · Tipe
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                {/* Body */}
                <div className="px-5 py-5">
                    {!selectedFile ? (
                        <label
                            className={cn(
                                "relative flex flex-col items-center justify-center w-full h-36 rounded-2xl cursor-pointer",
                                "border-2 border-dashed transition-all duration-200",
                                isDragging
                                    ? "border-primary bg-primary/8 scale-[0.99]"
                                    : "border-border/60 bg-muted/40 hover:border-primary/50 hover:bg-muted/70"
                            )}
                            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all",
                                isDragging ? "bg-primary/20" : "bg-muted"
                            )}>
                                <UploadCloud className={cn(
                                    "w-5 h-5 transition-colors",
                                    isDragging ? "text-primary" : "text-muted-foreground"
                                )} />
                            </div>
                            <p className="text-sm font-semibold text-foreground">
                                {isDragging ? 'Lepaskan di sini' : 'Pilih atau seret file'}
                            </p>
                            <p className="text-[11px] text-muted-foreground mt-1">Format .CSV</p>
                            <input
                                type="file"
                                accept=".csv"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    ) : (
                        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/50 border border-border/50">
                            {/* File icon */}
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5 text-primary" />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground truncate">
                                    {selectedFile.name}
                                </p>
                                <p className="text-[11px] text-muted-foreground mt-0.5">
                                    {formatFileSize(selectedFile.size)}
                                </p>
                            </div>

                            {/* Ready badge */}
                            <div className="flex items-center gap-1.5 shrink-0">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <button
                                    onClick={() => setSelectedFile(null)}
                                    className="w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors ml-1"
                                    aria-label="Hapus file"
                                >
                                    <X className="w-3 h-3 text-muted-foreground" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Format hint */}
                    <div className="mt-3 flex items-start gap-2">
                        <div className="flex gap-1.5 flex-wrap">
                            {['Tanggal', 'Deskripsi', 'Nominal'].map(col => (
                                <span key={col} className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-medium text-muted-foreground border border-border/50">
                                    {col}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-5 pb-5 flex gap-2.5">
                    <Button
                        type="button"
                        variant="ghost"
                        className="flex-1 h-11 font-semibold text-sm text-muted-foreground"
                        onClick={() => onOpenChange(false)}
                        disabled={isImporting}
                    >
                        Batal
                    </Button>
                    <Button
                        type="button"
                        className="flex-1 h-11 gradient-primary font-semibold text-white text-sm border-0 shadow-md shadow-primary/20 disabled:opacity-50"
                        onClick={handleImport}
                        disabled={!selectedFile || isImporting}
                    >
                        {isImporting
                            ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Mengimpor…</>
                            : <><UploadCloud className="w-4 h-4 mr-2" />Mulai Import</>
                        }
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
import React, { cache, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/use-transactions";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";

interface ImportCsvModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ImportCsvModal({ isOpen, onOpenChange }: ImportCsvModalProps) {
    const { importCsvAsync, isImporting } = useTransactions();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        const fetchShared = async () => {
            const cache = await caches.open('shared-target');
            const resp = await cache.match('/shared-file');
            console.log(`'[Page] cache resp:', ${resp}`); // null = tidak ketemu

            if (!resp) return;

            const blob = await resp.blob();
            console.log(`'[Page] blob size:', ${blob.size}`); // 0 = file kosong

            await cache.delete('/shared-file');

            const file = new File([blob], 'transactions.csv', { type: 'text/csv' });
            console.log(`'[Page] file:', file`);
            setSelectedFile(file);
            toast.info(`File diterima: ${file.name}`);
        };
        fetchShared();
    }, []);

    const handleImport = async () => {
        if (!selectedFile) return;
        try {
            await importCsvAsync(selectedFile);
            onOpenChange(false);
            setSelectedFile(null);
        } catch (e) {
            // Error managed by sonner in hook
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Import CSV Transaksi</DialogTitle>
                    <DialogDescription>
                        Unggah file .csv kamu yang berisi Tanggal, Deskripsi, Nominal, dan Tipe untuk ditambahkan secara masal.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-emerald-500 border-dashed rounded-lg cursor-pointer bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-8 h-8 mb-2 text-emerald-600 dark:text-emerald-400" />
                                <p className="mb-2 text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                                    <span className="font-semibold">Klik untuk memilih file</span>
                                </p>
                                <p className="text-xs text-muted-foreground">{selectedFile ? selectedFile.name : `Hanya menerima file format .CSV`}</p>
                            </div>
                            <input type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" className="h-10 cursor-pointer" onClick={() => onOpenChange(false)} disabled={isImporting}>Batal</Button>
                    <Button type="button" className="h-10 cursor-pointer" onClick={handleImport} disabled={!selectedFile || isImporting}>
                        {isImporting ? "Mengimpor..." : "Mulai Import"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

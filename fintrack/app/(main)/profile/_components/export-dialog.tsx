'use client';

import { useState } from 'react';
import { FileText, FileSpreadsheet, File, Loader2, Download, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useExport, ExportFormat } from '@/hooks/use-export';
import { cn } from '@/lib/utils';
import { SelectOption } from '@/components/ui/select-option';

interface ExportDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const FORMAT_OPTIONS: { value: ExportFormat; label: string; icon: React.ElementType; description: string }[] = [
    { value: 'csv', label: 'CSV', icon: FileText, description: 'Kompatibel dengan Excel & Sheets' },
    { value: 'xlsx', label: 'Excel', icon: FileSpreadsheet, description: 'Format Microsoft Excel (.xlsx)' },
    { value: 'pdf', label: 'PDF', icon: File, description: 'Laporan siap cetak & dibagikan' },
];

const MONTHS = [
    { value: 1, label: 'Januari' }, { value: 2, label: 'Februari' }, { value: 3, label: 'Maret' },
    { value: 4, label: 'April' }, { value: 5, label: 'Mei' }, { value: 6, label: 'Juni' },
    { value: 7, label: 'Juli' }, { value: 8, label: 'Agustus' }, { value: 9, label: 'September' },
    { value: 10, label: 'Oktober' }, { value: 11, label: 'November' }, { value: 12, label: 'Desember' },
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => currentYear - i);


export function ExportDialog({ isOpen, onClose }: ExportDialogProps) {
    const [format, setFormat] = useState<ExportFormat>('csv');
    const [allData, setAllData] = useState(false);
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [year, setYear] = useState<number>(currentYear);
    const { exportData, isExporting } = useExport();

    if (!isOpen) return null;

    const handleDownload = async () => {
        await exportData({
            format,
            month: allData ? undefined : month,
            year: allData ? undefined : year,
        });
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Sheet from bottom */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl p-5 pb-8 shadow-2xl border-t border-border/50 animate-in slide-in-from-bottom-5 duration-300">
                {/* Handle */}
                <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-5" />

                <h2 className="text-base font-bold text-foreground mb-1">Ekspor Data</h2>
                <p className="text-xs text-muted-foreground mb-5">Pilih format dan periode laporan keuangan Anda</p>

                {/* Format Selector */}
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Format</p>
                <div className="grid grid-cols-3 gap-2 mb-5">
                    {FORMAT_OPTIONS.map((opt) => {
                        const Icon = opt.icon;
                        return (
                            <button
                                key={opt.value}
                                onClick={() => setFormat(opt.value)}
                                className={cn(
                                    'flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all text-center',
                                    format === opt.value
                                        ? 'border-primary bg-primary/10 text-primary'
                                        : 'border-border bg-muted/40 text-muted-foreground'
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-xs font-bold">{opt.label}</span>
                                <span className="text-[9px] leading-tight line-clamp-2">{opt.description}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Period Selector */}
                <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Periode</p>
                    <button
                        onClick={() => setAllData(!allData)}
                        className={cn(
                            'flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all',
                            allData
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border text-muted-foreground'
                        )}
                    >
                        <CalendarDays className="w-3 h-3" />
                        Semua Data
                    </button>
                </div>

                {!allData && (
                    <div className="grid grid-cols-2 gap-2 mb-5">
                        <SelectOption
                            placeholder="Bulan"
                            value={month.toString()}
                            onValueChange={(v) => setMonth(Number(v))}
                            options={MONTHS.map((m) => ({ label: m.label, value: m.value.toString() }))}
                        />
                        <SelectOption
                            placeholder="Tahun"
                            value={year.toString()}
                            onValueChange={(v) => setYear(Number(v))}
                            options={YEARS.map((y) => ({ label: y.toString(), value: y.toString() }))}
                        />
                    </div>
                )}
                {allData && <div className="mb-5" />}

                {/* Download Button */}
                <Button
                    onClick={handleDownload}
                    disabled={isExporting}
                    className="w-full h-12 rounded-xl gradient-primary text-white font-bold text-sm border-0 shadow-lg shadow-primary/20"
                >
                    {isExporting
                        ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Memproses...</>
                        : <><Download className="w-4 h-4 mr-2" /> Download {format.toUpperCase()}</>
                    }
                </Button>
            </div>
        </>
    );
}

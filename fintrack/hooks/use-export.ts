import axiosClient from '@/lib/api/client';
import { useState } from 'react';
import { toast } from 'sonner';

export type ExportFormat = 'csv' | 'xlsx' | 'pdf';

interface ExportOptions {
    format: ExportFormat;
    month?: number;
    year?: number;
}

const MONTH_NAMES = [
    'januari', 'februari', 'maret', 'april', 'mei', 'juni',
    'juli', 'agustus', 'september', 'oktober', 'november', 'desember'
];

const MIME_TYPES: Record<ExportFormat, string> = {
    csv: 'text/csv',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    pdf: 'application/pdf',
};

function buildFilename(options: ExportOptions): string {
    const { format, month, year } = options;
    if (month && year) return `financy-${MONTH_NAMES[month - 1]}-${year}.${format}`;
    if (year) return `financy-${year}.${format}`;
    return `financy-semua-data.${format}`;
}

export function useExport() {
    const [isExporting, setIsExporting] = useState(false);

    const exportData = async (options: ExportOptions) => {
        setIsExporting(true);
        try {
            const params: Record<string, any> = { format: options.format };
            if (options.month) params.month = options.month;
            if (options.year) params.year = options.year;

            const res = await axiosClient.get('/export', {
                params,
                responseType: 'blob',
            });

            const filename = buildFilename(options);
            const blob = new Blob([res as any], { type: MIME_TYPES[options.format] });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);

            toast.success(`File berhasil diunduh: ${filename}`);
        } catch (err: any) {
            console.error(err);
            toast.error('Gagal mengekspor data. Silakan coba lagi.');
        } finally {
            setIsExporting(false);
        }
    };

    return { exportData, isExporting };
}
import * as XLSX from 'xlsx';
import { TransactionRepository } from '@/repositories/transaction.repository';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const PDFDocument = require('pdfkit');

export type ExportFormat = 'csv' | 'xlsx' | 'pdf';

export interface ExportResult {
    content: Buffer | string;
    mimeType: string;
    filename: string;
}

const MONTH_NAMES_ID = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export class ExportService {
    private transactionRepo: TransactionRepository;

    constructor(transactionRepo: TransactionRepository) {
        this.transactionRepo = transactionRepo;
    }

    private formatCurrency(amount: number): string {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0
        }).format(amount);
    }

    private getPeriodLabel(month?: number, year?: number): string {
        if (month && year) return `${MONTH_NAMES_ID[month - 1]} ${year}`;
        if (year) return `Tahun ${year}`;
        return 'Semua Data';
    }

    private getFilename(format: ExportFormat, month?: number, year?: number): string {
        const dateTag = month && year
            ? `${year}-${String(month).padStart(2, '0')}`
            : year ? `${year}` : 'all';
        return `financy-${dateTag}.${format}`;
    }

    async generate(userId: string, exportFormat: ExportFormat, month?: number, year?: number): Promise<ExportResult> {
        const transactions = await this.transactionRepo.getAllForExport(userId, month, year);
        const period = this.getPeriodLabel(month, year);
        const filename = this.getFilename(exportFormat, month, year);

        const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((s, t) => s + Number(t.amount), 0);
        const totalExpense = transactions.filter(t => t.type === 'EXPENSE').reduce((s, t) => s + Number(t.amount), 0);
        const balance = totalIncome - totalExpense;

        if (exportFormat === 'csv') {
            return {
                content: this.buildCsv(transactions, period, totalIncome, totalExpense, balance),
                mimeType: 'text/csv; charset=utf-8',
                filename
            };
        }

        if (exportFormat === 'xlsx') {
            return {
                content: this.buildXlsx(transactions, period, totalIncome, totalExpense, balance),
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                filename
            };
        }

        return {
            content: await this.buildPdf(transactions, period, totalIncome, totalExpense, balance),
            mimeType: 'application/pdf',
            filename
        };
    }

    private buildCsv(transactions: any[], period: string, income: number, expense: number, balance: number): string {
        const rows: string[] = [
            `Laporan Keuangan Financy`,
            `Periode: ${period}`,
            `Total Pemasukan: ${this.formatCurrency(income)}`,
            `Total Pengeluaran: ${this.formatCurrency(expense)}`,
            `Saldo Bersih: ${this.formatCurrency(balance)}`,
            ``,
            `No,Tanggal,Deskripsi,Kategori,Tipe,Jumlah (IDR)`,
        ];

        transactions.forEach((t, i) => {
            const tanggal = format(new Date(t.date), 'dd MMM yyyy', { locale: idLocale });
            const kategori = t.category?.name ?? '-';
            const tipe = t.type === 'INCOME' ? 'Pemasukan' : 'Pengeluaran';
            rows.push(`${i + 1},"${tanggal}","${t.description}","${kategori}","${tipe}",${Number(t.amount)}`);
        });

        return '\uFEFF' + rows.join('\n');
    }

    private buildXlsx(transactions: any[], period: string, income: number, expense: number, balance: number): Buffer {
        const wb = XLSX.utils.book_new();

        const sheetData = [
            ['Laporan Keuangan Financy'],
            [`Periode: ${period}`],
            [],
            ['Total Pemasukan', income],
            ['Total Pengeluaran', expense],
            ['Saldo Bersih', balance],
            [],
            ['No', 'Tanggal', 'Deskripsi', 'Kategori', 'Tipe', 'Jumlah (IDR)'],
            ...transactions.map((t, i) => [
                i + 1,
                format(new Date(t.date), 'dd MMM yyyy', { locale: idLocale }),
                t.description,
                t.category?.name ?? '-',
                t.type === 'INCOME' ? 'Pemasukan' : 'Pengeluaran',
                Number(t.amount),
            ]),
        ];

        const ws = XLSX.utils.aoa_to_sheet(sheetData);
        ws['!cols'] = [{ wch: 5 }, { wch: 15 }, { wch: 35 }, { wch: 18 }, { wch: 14 }, { wch: 18 }];
        XLSX.utils.book_append_sheet(wb, ws, 'Laporan');

        return Buffer.from(XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' }));
    }

    private buildPdf(transactions: any[], period: string, income: number, expense: number, balance: number): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            try {
                const { Writable } = require('stream');
                const doc = new PDFDocument({ margin: 40, size: 'A4' });

                const chunks: Buffer[] = [];
                const sink = new Writable({
                    write(chunk: Buffer, _encoding: string, callback: () => void) {
                        chunks.push(Buffer.from(chunk));
                        callback();
                    }
                });

                sink.on('finish', () => resolve(Buffer.concat(chunks)));
                sink.on('error', reject);
                doc.on('error', reject);
                doc.pipe(sink);

                const PAGE_WIDTH = doc.page.width - 80;
                const GREEN = '#10b77f';
                const GRAY = '#6b7280';
                const RED = '#dc2626';

                doc.save();
                doc.roundedRect(40, 40, PAGE_WIDTH, 70, 6).fill(GREEN);
                doc.restore();

                doc.fillColor('white').fontSize(22).font('Helvetica-Bold')
                    .text('FinTrack', 60, 55);
                doc.fillColor('#bbf7d0').fontSize(11).font('Helvetica')
                    .text('Laporan Keuangan', 60, 82);

                doc.moveDown(3);

                doc.fillColor(GRAY).fontSize(9).font('Helvetica')
                    .text(`Periode: ${period}`, 40, 125);

                const boxY = 145;
                const boxW = (PAGE_WIDTH - 16) / 3;

                const summaryItems = [
                    { label: 'Total Pemasukan', value: this.formatCurrency(income), color: '#10b77f', bg: '#f0fdf4' },
                    { label: 'Total Pengeluaran', value: this.formatCurrency(expense), color: RED, bg: '#fef2f2' },
                    { label: 'Saldo Bersih', value: this.formatCurrency(balance), color: balance >= 0 ? GREEN : RED, bg: '#f8fafc' },
                ];

                summaryItems.forEach((item, idx) => {
                    const x = 40 + idx * (boxW + 8);
                    doc.save().roundedRect(x, boxY, boxW, 52, 4).fill(item.bg).restore();
                    doc.fillColor(GRAY).fontSize(8).font('Helvetica').text(item.label, x + 8, boxY + 8);
                    doc.fillColor(item.color).fontSize(12).font('Helvetica-Bold').text(item.value, x + 8, boxY + 22, { width: boxW - 16 });
                });

                const tableY = boxY + 70;
                const COL_WIDTHS = [25, 70, 175, 90, 65, 65];
                const COLS = ['No', 'Tanggal', 'Deskripsi', 'Kategori', 'Tipe', 'Jumlah (IDR)'];
                const ROW_H = 18;
                const TABLE_X = 40;
                let curX = TABLE_X;
                doc.save().rect(TABLE_X, tableY, PAGE_WIDTH, ROW_H).fill(GREEN).restore();
                COLS.forEach((col, i) => {
                    doc.fillColor('white').fontSize(8).font('Helvetica-Bold')
                        .text(col, curX + 4, tableY + 5, { width: COL_WIDTHS[i] - 8, align: i === 5 ? 'right' : 'left' });
                    curX += COL_WIDTHS[i];
                });

                // Data rows
                let currentY = tableY + ROW_H;
                transactions.forEach((t, i) => {
                    const isEven = i % 2 === 0;
                    if (isEven) {
                        doc.save().rect(TABLE_X, currentY, PAGE_WIDTH, ROW_H).fill('#f9fafb').restore();
                    }

                    // Horizontal line
                    doc.save().moveTo(TABLE_X, currentY).lineTo(TABLE_X + PAGE_WIDTH, currentY)
                        .lineWidth(0.3).strokeColor('#e5e7eb').stroke().restore();

                    const rowData = [
                        { text: `${i + 1}`, align: 'center' as const },
                        { text: format(new Date(t.date), 'dd MMM yyyy', { locale: idLocale }), align: 'left' as const },
                        { text: t.description, align: 'left' as const },
                        { text: t.category?.name ?? '-', align: 'left' as const },
                        { text: t.type === 'INCOME' ? 'Pemasukan' : 'Pengeluaran', align: 'left' as const, color: t.type === 'INCOME' ? '#16a34a' : RED },
                        { text: this.formatCurrency(Number(t.amount)), align: 'right' as const },
                    ];

                    curX = TABLE_X;
                    rowData.forEach((cell, ci) => {
                        doc.fillColor(cell.color ?? '#111827').fontSize(7.5).font('Helvetica')
                            .text(cell.text, curX + 4, currentY + 5, {
                                width: COL_WIDTHS[ci] - 8,
                                align: cell.align,
                                lineBreak: false,
                                ellipsis: true
                            });
                        curX += COL_WIDTHS[ci];
                    });

                    currentY += ROW_H;

                    // Add new page if needed
                    if (currentY > doc.page.height - 80) {
                        doc.addPage();
                        currentY = 40;
                    }
                });

                doc.fillColor(GRAY).fontSize(7.5).font('Helvetica')
                    .text('Digenerate oleh FinTrack • financy.app', 40, doc.page.height - 40, {
                        align: 'center', width: PAGE_WIDTH
                    });

                doc.end();
            } catch (err) {
                reject(err);
            }
        });
    }
}

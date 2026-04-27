import { Request, Response } from 'express';
import { asyncHandler } from '@/middleware/error.middleware';
import { ExportService, ExportFormat } from '@/service/export.service';
import { TransactionRepository } from '@/repositories/transaction.repository';
import { GamificationQueue } from '@/queue/gamification.queue';

const exportService = new ExportService(new TransactionRepository());

export class ExportController {
    public static exportData = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const formatParam = (req.query.format as string) || 'csv';
        const month = req.query.month ? parseInt(req.query.month as string) : undefined;
        const year = req.query.year ? parseInt(req.query.year as string) : undefined;

        const validFormats: ExportFormat[] = ['csv', 'xlsx', 'pdf'];
        const exportFormat: ExportFormat = validFormats.includes(formatParam as ExportFormat)
            ? (formatParam as ExportFormat)
            : 'csv';

        const { content, mimeType, filename } = await exportService.generate(userId, exportFormat, month, year);

        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Cache-Control', 'no-cache');
        
        // Trigger gamification
        const gamificationQueue = new GamificationQueue();
        await gamificationQueue.add('export-created', {
            userId,
            action: 'EXPORT_CREATED'
        });

        res.send(content);
    });
}

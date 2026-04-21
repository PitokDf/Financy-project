import { Router } from 'express';
import authMiddleware from '@/middleware/auth.middleware';
import { ExportController } from '@/controller/export.controller';

const exportRouter = Router();

exportRouter.use(authMiddleware);
exportRouter.get('/', ExportController.exportData);

export default exportRouter;

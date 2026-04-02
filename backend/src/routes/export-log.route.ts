import { ExportLogController } from "@/controller/export-log.controller";
import authMiddleware from "@/middleware/auth.middleware";
import { ExportLogRepository } from "@/repositories/export-log.repository";
import { ExportLogService } from "@/service/export-log.service";
import { Router } from "express";

const exportLogRouter = Router();
const exportLogService = new ExportLogService(ExportLogRepository);
const exportLogController = new ExportLogController(exportLogService);

exportLogRouter.use(authMiddleware);

exportLogRouter.get("/", exportLogController.getExportLogs);
exportLogRouter.get("/:exportLogId", exportLogController.getExportLogById);
exportLogRouter.post("/", exportLogController.createExportLog);
exportLogRouter.patch("/:exportLogId/status", exportLogController.updateExportLogStatus);

export default exportLogRouter;

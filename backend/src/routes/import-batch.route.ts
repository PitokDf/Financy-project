import { ImportBatchController } from "@/controller/import-batch.controller";
import authMiddleware from "@/middleware/auth.middleware";
import { CategoryRepository } from "@/repositories/category.repository";
import { ImportBatchRepository } from "@/repositories/import-batch.repository";
import { TransactionRepository } from "@/repositories/transaction.repository";
import { ImportBatchService } from "@/service/import-batch.service";
import { fileUploadService } from "@/utils/file-upload";
import { Router } from "express";

const importBatchRouter = Router();
const importBatchService = new ImportBatchService(
    ImportBatchRepository,
    TransactionRepository,
    CategoryRepository
);
const importBatchController = new ImportBatchController(importBatchService);

const csvUpload = fileUploadService.single("file", {
    destination: "imports",
    maxSize: 5 * 1024 * 1024,
    allowedTypes: ["text/csv", "application/vnd.ms-excel", "application/csv"],
    allowedExtensions: [".csv"],
});

importBatchRouter.use(authMiddleware);

importBatchRouter.get("/", importBatchController.getImportBatches);
importBatchRouter.get("/:importBatchId", importBatchController.getImportBatchById);
importBatchRouter.post("/upload", csvUpload, importBatchController.importTransactions);

export default importBatchRouter;

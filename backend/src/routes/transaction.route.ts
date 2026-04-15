import { TransactionController } from "@/controller/transaction.controller";
import { TransactionRepository } from "@/repositories/transaction.repository";
import { TransactionService } from "@/service/transaction.service";
import { GamificationService } from "@/service/gamification.service";
import { GamificationRepository } from "@/repositories/gamification.repository";
import { Router } from "express";
import authMiddleware from "@/middleware/auth.middleware";
import { fileUploadService } from "@/utils/file-upload";

const transactionRepo = new TransactionRepository();
const gamificationRepo = new GamificationRepository();
const gamificationService = new GamificationService(gamificationRepo);
const service = new TransactionService(transactionRepo, gamificationService);
const controller = new TransactionController(service);

const transactionRouter = Router();

transactionRouter.use(authMiddleware)
transactionRouter.get('/', controller.getAll)
transactionRouter.post('/', controller.create)
transactionRouter.post('/import-csv', fileUploadService.csvUpload('file'), controller.importCsv)
transactionRouter.delete('/:trxId', controller.delete)

export default transactionRouter;
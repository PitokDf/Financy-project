import { TransactionController } from "@/controller/transaction.controller";
import authMiddleware from "@/middleware/auth.middleware";
import { TransactionRepository } from "@/repositories/transaction.repository";
import { TransactionService } from "@/service/transaction.service";
import { Router } from "express";

const transactionRouter = Router();
const transactionService = new TransactionService(TransactionRepository);
const transactionController = new TransactionController(transactionService);

transactionRouter.use(authMiddleware);

transactionRouter.get("/", transactionController.getTransactions);
transactionRouter.post("/analyze", transactionController.analyzeTransactions);
transactionRouter.get("/:transactionId", transactionController.getTransactionById);
transactionRouter.post("/", transactionController.createTransaction);
transactionRouter.patch("/:transactionId", transactionController.updateTransaction);
transactionRouter.delete("/:transactionId", transactionController.deleteTransaction);

export default transactionRouter;

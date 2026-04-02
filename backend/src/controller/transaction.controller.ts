import { HttpStatus } from "@/constants/http-status";
import { MessageCodes } from "@/constants/message";
import { asyncHandler } from "@/middleware/error.middleware";
import { TransactionService } from "@/service/transaction.service";
import {
    analyzeTransactionsSchema,
    createTransactionSchema,
    getTransactionsQuerySchema,
    transactionIdParamSchema,
    updateTransactionSchema,
} from "@/schemas/transaction.schema";
import { ResponseUtil } from "@/utils";
import { Request, Response } from "express";

export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    public getTransactions = asyncHandler(async (req: Request, res: Response) => {
        const query = getTransactionsQuerySchema.parse(req.query);
        const userId = String(req.auth_user?.user_id);

        const result = await this.transactionService.getTransactions(userId, query);

        return ResponseUtil.success(res, result, HttpStatus.OK, MessageCodes.SUCCESS);
    });

    public getTransactionById = asyncHandler(async (req: Request, res: Response) => {
        const { transactionId } = transactionIdParamSchema.parse(req.params);
        const userId = String(req.auth_user?.user_id);

        const transaction = await this.transactionService.getTransactionById(userId, transactionId);

        return ResponseUtil.success(res, transaction, HttpStatus.OK, MessageCodes.SUCCESS);
    });

    public createTransaction = asyncHandler(async (req: Request, res: Response) => {
        const payload = createTransactionSchema.parse(req.body);
        const userId = String(req.auth_user?.user_id);

        const transaction = await this.transactionService.createTransaction(userId, payload);

        return ResponseUtil.success(res, transaction, HttpStatus.CREATED, MessageCodes.CREATED);
    });

    public updateTransaction = asyncHandler(async (req: Request, res: Response) => {
        const { transactionId } = transactionIdParamSchema.parse(req.params);
        const payload = updateTransactionSchema.parse(req.body);
        const userId = String(req.auth_user?.user_id);

        const transaction = await this.transactionService.updateTransaction(userId, transactionId, payload);

        return ResponseUtil.success(res, transaction, HttpStatus.OK, MessageCodes.UPDATED);
    });

    public deleteTransaction = asyncHandler(async (req: Request, res: Response) => {
        const { transactionId } = transactionIdParamSchema.parse(req.params);
        const userId = String(req.auth_user?.user_id);

        const deleted = await this.transactionService.deleteTransaction(userId, transactionId);

        return ResponseUtil.success(res, deleted, HttpStatus.OK, MessageCodes.DELETED);
    });

    public analyzeTransactions = asyncHandler(async (req: Request, res: Response) => {
        const payload = analyzeTransactionsSchema.parse(req.body);
        const userId = String(req.auth_user?.user_id);

        const result = await this.transactionService.analyzeTransactions(userId, payload);

        return ResponseUtil.success(res, result, HttpStatus.OK, MessageCodes.SUCCESS);
    });
}

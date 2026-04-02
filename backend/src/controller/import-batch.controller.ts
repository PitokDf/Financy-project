import { HttpStatus } from "@/constants/http-status";
import { MessageCodes } from "@/constants/message";
import { asyncHandler } from "@/middleware/error.middleware";
import { ImportBatchService } from "@/service/import-batch.service";
import {
    getImportBatchesQuerySchema,
    importBatchIdParamSchema,
    importTransactionsSchema,
} from "@/schemas/import-batch.schema";
import { ResponseUtil } from "@/utils";
import { Request, Response } from "express";

export class ImportBatchController {
    constructor(private readonly importBatchService: ImportBatchService) { }

    public getImportBatches = asyncHandler(async (req: Request, res: Response) => {
        const query = getImportBatchesQuerySchema.parse(req.query);
        const userId = String(req.auth_user?.user_id);

        const result = await this.importBatchService.getImportBatches(userId, query);

        return ResponseUtil.success(res, result, HttpStatus.OK, MessageCodes.SUCCESS);
    });

    public getImportBatchById = asyncHandler(async (req: Request, res: Response) => {
        const { importBatchId } = importBatchIdParamSchema.parse(req.params);
        const userId = String(req.auth_user?.user_id);

        const batch = await this.importBatchService.getImportBatchById(userId, importBatchId);

        return ResponseUtil.success(res, batch, HttpStatus.OK, MessageCodes.SUCCESS);
    });

    public importTransactions = asyncHandler(async (req: Request, res: Response) => {
        const payload = importTransactionsSchema.parse(req.body);
        const userId = String(req.auth_user?.user_id);
        const file = req.file as Express.Multer.File | undefined;

        if (!file) {
            return ResponseUtil.error(res, "File CSV wajib diupload", undefined, HttpStatus.BAD_REQUEST);
        }

        const result = await this.importBatchService.importTransactionsFromCsv(
            userId,
            file.path,
            file.originalname,
            payload
        );

        return ResponseUtil.success(res, result, HttpStatus.CREATED, MessageCodes.CREATED);
    });
}

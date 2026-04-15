import { asyncHandler } from "@/middleware/error.middleware";
import { TransactionService } from "@/service/transaction.service";
import { ResponseUtil } from "@/utils";
import { Request, Response } from 'express';
import { HttpStatus } from "@/constants/http-status";

export class TransactionController {
    constructor(private readonly service: TransactionService) { }

    public getAll = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;
        const cursor = req.query.cursor as string | undefined;
        const search = req.query.search as string | undefined;
        const type = req.query.type as string | undefined;

        const result = await this.service.getAllPaginated(userId, cursor, limit, search, type);
        return res.status(HttpStatus.OK).json(result);
    })

    public create = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const result = await this.service.create(userId, req.body);
        return ResponseUtil.success(res, result, HttpStatus.CREATED);
    })

    public delete = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const result = await this.service.delete(userId, req.params.trxId as string);
        return ResponseUtil.success(res, result);
    })

    public importCsv = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        if (!req.file) {
            return ResponseUtil.error(res, "Tidak ada file CSV yang diunggah", [], HttpStatus.BAD_REQUEST);
        }
        const result = await this.service.importCsv(userId, req.file);
        return ResponseUtil.success(res, result, HttpStatus.CREATED, "CSV berhasil diimpor");
    })
}
import { TransactionService } from "../service/transaction.service";
import { Request, Response } from 'express';
export declare class TransactionController {
    private readonly service;
    constructor(service: TransactionService);
    getAll: (req: Request, res: Response, next: import("express").NextFunction) => void;
    create: (req: Request, res: Response, next: import("express").NextFunction) => void;
    delete: (req: Request, res: Response, next: import("express").NextFunction) => void;
    importCsv: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=transaction.controller.d.ts.map
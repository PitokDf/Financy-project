import { asyncHandler } from "@/middleware/error.middleware";
import { ScheduledExpenseService } from "@/service/scheduled-expense.service";
import { ResponseUtil } from "@/utils";
import { Request, Response } from 'express';
import { HttpStatus } from "@/constants/http-status";
import { CreateScheduledExpenseSchema, UpdateScheduledExpenseSchema } from "@/schemas/scheduled-expense.schema";

const service = new ScheduledExpenseService();

export class ScheduledExpenseController {
    public getAll = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const expenses = await service.getAll(userId);
        return res.status(HttpStatus.OK).json({ data: expenses });
    })

    public getById = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const id = req.params.id as string;
        const expense = await service.getById(id, userId);
        if (!expense) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'Scheduled expense not found' });
        }
        return res.status(HttpStatus.OK).json({ data: expense });
    })

    public create = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const payload = CreateScheduledExpenseSchema.parse({ ...req.body, userId });
        const expense = await service.create(payload);
        return res.status(HttpStatus.CREATED).json({ data: expense });
    })

    public update = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const id = req.params.id as string;
        const payload = UpdateScheduledExpenseSchema.parse(req.body);
        const expense = await service.update(id, userId, payload);
        if (!expense) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'Scheduled expense not found' });
        }
        return res.status(HttpStatus.OK).json({ data: expense });
    })

    public delete = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const id = req.params.id as string;
        const deleted = await service.delete(id, userId);
        if (!deleted) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'Scheduled expense not found' });
        }
        return res.status(HttpStatus.OK).json({ message: 'Scheduled expense deleted' });
    })

    public approve = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const id = req.params.id as string;
        const transaction = await service.approve(id, userId);
        if (!transaction) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'Scheduled expense not found' });
        }
        return res.status(HttpStatus.CREATED).json({ data: transaction });
    })
}

import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/error.middleware";
import { CategoryService } from "@/service/category.service";
import { ResponseUtil } from "@/utils";

export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    public getAll = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const result = await this.categoryService.getAll(userId);
        return ResponseUtil.success(res, result);
    });

    public create = asyncHandler(async (req: Request, res: Response) => {
        const userId = req.auth_user!.user_id;
        const result = await this.categoryService.create(userId, req.body);
        return ResponseUtil.success(res, result, 201);
    });
}

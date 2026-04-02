import { HttpStatus } from "@/constants/http-status";
import { MessageCodes } from "@/constants/message";
import { asyncHandler } from "@/middleware/error.middleware";
import { CategoryService } from "@/service/category.service";
import {
    categoryIdParamSchema,
    createCategorySchema,
    getCategoriesQuerySchema,
    updateCategorySchema,
} from "@/schemas/category.schema";
import { ResponseUtil } from "@/utils";
import { Request, Response } from "express";

export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    public getCategories = asyncHandler(async (req: Request, res: Response) => {
        const query = getCategoriesQuerySchema.parse(req.query);
        const userId = String(req.auth_user?.user_id);

        const result = await this.categoryService.getCategories(userId, query);

        return ResponseUtil.success(res, result, HttpStatus.OK, MessageCodes.SUCCESS);
    });

    public getCategoryById = asyncHandler(async (req: Request, res: Response) => {
        const { categoryId } = categoryIdParamSchema.parse(req.params);
        const userId = String(req.auth_user?.user_id);

        const category = await this.categoryService.getCategoryById(userId, categoryId);

        return ResponseUtil.success(res, category, HttpStatus.OK, MessageCodes.SUCCESS);
    });

    public createCategory = asyncHandler(async (req: Request, res: Response) => {
        const payload = createCategorySchema.parse(req.body);
        const userId = String(req.auth_user?.user_id);

        const category = await this.categoryService.createCategory(userId, payload);

        return ResponseUtil.success(res, category, HttpStatus.CREATED, MessageCodes.CREATED);
    });

    public updateCategory = asyncHandler(async (req: Request, res: Response) => {
        const { categoryId } = categoryIdParamSchema.parse(req.params);
        const payload = updateCategorySchema.parse(req.body);
        const userId = String(req.auth_user?.user_id);

        const category = await this.categoryService.updateCategory(userId, categoryId, payload);

        return ResponseUtil.success(res, category, HttpStatus.OK, MessageCodes.UPDATED);
    });

    public deleteCategory = asyncHandler(async (req: Request, res: Response) => {
        const { categoryId } = categoryIdParamSchema.parse(req.params);
        const userId = String(req.auth_user?.user_id);

        const category = await this.categoryService.deleteCategory(userId, categoryId);

        return ResponseUtil.success(res, category, HttpStatus.OK, MessageCodes.DELETED);
    });
}

import { Request, Response } from "express";
import { CategoryService } from "../service/category.service";
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getAll: (req: Request, res: Response, next: import("express").NextFunction) => void;
    create: (req: Request, res: Response, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=category.controller.d.ts.map
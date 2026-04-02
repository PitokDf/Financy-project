import { CategoryController } from "@/controller/category.controller";
import authMiddleware from "@/middleware/auth.middleware";
import { CategoryRepository } from "@/repositories/category.repository";
import { CategoryService } from "@/service/category.service";
import { Router } from "express";

const categoryRouter = Router();
const categoryService = new CategoryService(CategoryRepository);
const categoryController = new CategoryController(categoryService);

categoryRouter.use(authMiddleware);

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.get("/:categoryId", categoryController.getCategoryById);
categoryRouter.post("/", categoryController.createCategory);
categoryRouter.patch("/:categoryId", categoryController.updateCategory);
categoryRouter.delete("/:categoryId", categoryController.deleteCategory);

export default categoryRouter;

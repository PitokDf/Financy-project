import { Router } from "express";
import { CategoryController } from "@/controller/category.controller";
import { CategoryService } from "@/service/category.service";
import { CategoryRepository } from "@/repositories/category.repository";
import authMiddleware from "@/middleware/auth.middleware";

const categoryRepo = new CategoryRepository();
const categoryService = new CategoryService(categoryRepo);
const controller = new CategoryController(categoryService);

const categoryRouter = Router();

categoryRouter.use(authMiddleware);
categoryRouter.get("/", controller.getAll);
categoryRouter.post("/", controller.create);

export default categoryRouter;

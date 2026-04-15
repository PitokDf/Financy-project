"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controller/category.controller");
const category_service_1 = require("../service/category.service");
const category_repository_1 = require("../repositories/category.repository");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const categoryRepo = new category_repository_1.CategoryRepository();
const categoryService = new category_service_1.CategoryService(categoryRepo);
const controller = new category_controller_1.CategoryController(categoryService);
const categoryRouter = (0, express_1.Router)();
categoryRouter.use(auth_middleware_1.default);
categoryRouter.get("/", controller.getAll);
categoryRouter.post("/", controller.create);
exports.default = categoryRouter;
//# sourceMappingURL=category.route.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const utils_1 = require("../utils");
class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
        this.getAll = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const userId = req.auth_user.user_id;
            const result = await this.categoryService.getAll(userId);
            return utils_1.ResponseUtil.success(res, result);
        });
        this.create = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const userId = req.auth_user.user_id;
            const result = await this.categoryService.create(userId, req.body);
            return utils_1.ResponseUtil.success(res, result, 201);
        });
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map
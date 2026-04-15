"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
class CategoryService {
    constructor(categoryRepo) {
        this.categoryRepo = categoryRepo;
        this.getAll = async (userId) => {
            return this.categoryRepo.getAll(userId);
        };
        this.create = async (userId, data) => {
            if (!data.name)
                throw new Error("Category name is required");
            return this.categoryRepo.create({
                userId,
                name: data.name,
                type: data.type,
                color: data.color,
                icon: data.icon
            });
        };
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map
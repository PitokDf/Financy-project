"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
class UserRepository {
    static async findById(id) {
        return prisma_1.default.user.findUnique({
            where: { id }
        });
    }
    static async findUserProfile(id) {
        return prisma_1.default.user.findUnique({
            where: { id },
            include: {
                userStats: true,
                _count: {
                    select: { userBadges: true }
                }
            }
        });
    }
    static async findByEmail(email, ignoreUserId) {
        return prisma_1.default.user.findFirst({
            where: {
                email,
                ...(ignoreUserId ?
                    { NOT: { id: ignoreUserId } }
                    : {}),
            }
        });
    }
    static async create(data) {
        return prisma_1.default.user.create({
            data,
        });
    }
    static async update(id, data) {
        return prisma_1.default.user.update({
            where: { id },
            data,
        });
    }
    static async delete(id) {
        return prisma_1.default.user.delete({
            where: { id },
        });
    }
    static async findAll() {
        return prisma_1.default.user.findMany();
    }
    static async findAllOptimized(options) {
        return prisma_1.default.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
            skip: options?.skip,
            take: options?.take,
        });
    }
    static async count() {
        return prisma_1.default.user.count();
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map
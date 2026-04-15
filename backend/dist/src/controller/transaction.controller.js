"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const utils_1 = require("../utils");
const http_status_1 = require("../constants/http-status");
class TransactionController {
    constructor(service) {
        this.service = service;
        this.getAll = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const userId = req.auth_user.user_id;
            const limit = req.query.limit ? parseInt(req.query.limit, 10) : 20;
            const cursor = req.query.cursor;
            const search = req.query.search;
            const type = req.query.type;
            const result = await this.service.getAllPaginated(userId, cursor, limit, search, type);
            return res.status(http_status_1.HttpStatus.OK).json(result);
        });
        this.create = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const userId = req.auth_user.user_id;
            const result = await this.service.create(userId, req.body);
            return utils_1.ResponseUtil.success(res, result, http_status_1.HttpStatus.CREATED);
        });
        this.delete = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const userId = req.auth_user.user_id;
            const result = await this.service.delete(userId, req.params.trxId);
            return utils_1.ResponseUtil.success(res, result);
        });
        this.importCsv = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const userId = req.auth_user.user_id;
            if (!req.file) {
                return utils_1.ResponseUtil.error(res, "Tidak ada file CSV yang diunggah", [], http_status_1.HttpStatus.BAD_REQUEST);
            }
            const result = await this.service.importCsv(userId, req.file);
            return utils_1.ResponseUtil.success(res, result, http_status_1.HttpStatus.CREATED, "CSV berhasil diimpor");
        });
    }
}
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map
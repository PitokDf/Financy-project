"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisController = void 0;
const error_middleware_1 = require("../middleware/error.middleware");
const utils_1 = require("../utils");
const http_status_1 = require("../constants/http-status");
const analysis_schema_1 = require("../schemas/analysis.schema");
class AnalysisController {
    constructor(service) {
        this.service = service;
        this.run = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const payload = analysis_schema_1.runAnalysisSchema.parse({ ...req.body });
            const result = await this.service.run(payload, req.auth_user.user_id);
            return utils_1.ResponseUtil.success(res, result, http_status_1.HttpStatus.OK, "Analysis berhasil dijalankan");
        });
        this.confirm = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const payload = analysis_schema_1.confirmAnalysisSchema.parse({ ...req.body, userId: req.auth_user.user_id });
            const result = await this.service.confirm(payload);
            return utils_1.ResponseUtil.success(res, result, http_status_1.HttpStatus.OK, "Analysis berhasil dikonfirmasi");
        });
        this.getLatestRun = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const result = await this.service.getLatestRun(req.auth_user.user_id);
            return utils_1.ResponseUtil.success(res, result, http_status_1.HttpStatus.OK, "Status analysis terakhir berhasil diambil");
        });
        this.getStats = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const { startDate, endDate } = req.query;
            const result = await this.service.getStats(req.auth_user.user_id, startDate, endDate);
            return utils_1.ResponseUtil.success(res, result, http_status_1.HttpStatus.OK, "Statistik analysis berhasil diambil");
        });
        this.getCategoryBreakdown = (0, error_middleware_1.asyncHandler)(async (req, res) => {
            const { startDate, endDate } = req.query;
            const result = await this.service.getCategoryBreakdown(req.auth_user.user_id, startDate, endDate);
            return utils_1.ResponseUtil.success(res, result, http_status_1.HttpStatus.OK, "Breakdown kategori berhasil diambil");
        });
    }
}
exports.AnalysisController = AnalysisController;
//# sourceMappingURL=analysis.controller.js.map
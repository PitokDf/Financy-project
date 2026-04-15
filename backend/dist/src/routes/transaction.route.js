"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_controller_1 = require("../controller/transaction.controller");
const transaction_repository_1 = require("../repositories/transaction.repository");
const transaction_service_1 = require("../service/transaction.service");
const gamification_service_1 = require("../service/gamification.service");
const gamification_repository_1 = require("../repositories/gamification.repository");
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const file_upload_1 = require("../utils/file-upload");
const transactionRepo = new transaction_repository_1.TransactionRepository();
const gamificationRepo = new gamification_repository_1.GamificationRepository();
const gamificationService = new gamification_service_1.GamificationService(gamificationRepo);
const service = new transaction_service_1.TransactionService(transactionRepo, gamificationService);
const controller = new transaction_controller_1.TransactionController(service);
const transactionRouter = (0, express_1.Router)();
transactionRouter.use(auth_middleware_1.default);
transactionRouter.get('/', controller.getAll);
transactionRouter.post('/', controller.create);
transactionRouter.post('/import-csv', file_upload_1.fileUploadService.csvUpload('file'), controller.importCsv);
transactionRouter.delete('/:trxId', controller.delete);
exports.default = transactionRouter;
//# sourceMappingURL=transaction.route.js.map
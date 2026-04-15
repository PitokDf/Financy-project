"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const file_upload_1 = require("../utils/file-upload");
class TransactionService {
    constructor(repo, gamificationService) {
        this.repo = repo;
        this.gamificationService = gamificationService;
        this.getAllPaginated = async (userId, cursor, limit = 20, search, type) => {
            const { transactions, totalIncome, totalExpense } = await this.repo.getAllPaginated(userId, cursor, limit, search, type);
            let nextCursor = undefined;
            if (transactions.length > limit) {
                transactions.pop();
                nextCursor = transactions[transactions.length - 1]?.id;
            }
            return { data: transactions, nextCursor, totalIncome, totalExpense };
        };
        this.importCsv = async (userId, file) => {
            const results = [];
            return new Promise((resolve, reject) => {
                fs_1.default.createReadStream(file.path)
                    .pipe((0, csv_parser_1.default)())
                    .on('data', (data) => results.push(data))
                    .on('end', async () => {
                    try {
                        const rowCount = results.length;
                        const csvImport = await this.repo.createCsvImport(userId, file.originalname, rowCount);
                        const transactionsToCreate = results.map(row => {
                            const typeRaw = (row.Tipe || row.TIPE || row.type || row.kategori || row.Kategori || row.Type || '').toUpperCase();
                            const type = typeRaw.includes('INCOME') || typeRaw.includes('PEMASUKAN') ? 'INCOME' : 'EXPENSE';
                            const amountRaw = String(row.Nominal || row.NOMINAL || row.amount || row.Amount || row.Jumlah || row.jumlah || row.JUMLAH || '0');
                            const amount = parseInt(amountRaw.replace(/\D/g, '')) || 0;
                            const desc = row.Catatan || row.CATATAN || row.deskripsi || row.Deskripsi || row.description || row.Description || 'Imported via CSV';
                            const dateRaw = row.Tanggal || row.TANGGAL || row.tanggal || row.date || row.Date;
                            let date = new Date().toISOString();
                            if (dateRaw) {
                                const parsedDate = new Date(dateRaw);
                                if (!isNaN(parsedDate.getTime())) {
                                    date = parsedDate.toISOString();
                                }
                            }
                            return {
                                userId,
                                description: desc,
                                amount: amount,
                                type: type,
                                date: date,
                                source: 'CSV_IMPORT',
                                csvImportId: csvImport.id
                            };
                        });
                        await this.repo.createMany(transactionsToCreate);
                        await this.repo.updateCsvImportSuccessCount(csvImport.id, transactionsToCreate.length);
                        await file_upload_1.fileUploadService.deleteFile(file.path);
                        await this.gamificationService.updateStreak(userId);
                        await this.gamificationService.updateChallengeProgress(userId, 'WEEKLY_TRANSACTIONS', transactionsToCreate.length);
                        resolve({
                            importId: csvImport.id,
                            successCount: transactionsToCreate.length
                        });
                    }
                    catch (error) {
                        reject(error);
                    }
                })
                    .on('error', async (error) => {
                    await file_upload_1.fileUploadService.deleteFile(file.path);
                    reject(error);
                });
            });
        };
        this.create = async (userId, data) => {
            const transaction = await this.repo.create(userId, data);
            await this.gamificationService.updateStreak(userId);
            await this.gamificationService.updateChallengeProgress(userId, 'WEEKLY_TRANSACTIONS', 1);
            return transaction;
        };
        this.delete = async (userId, trxId) => {
            const transaction = await this.repo.delete(userId, trxId);
            return transaction;
        };
    }
}
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map
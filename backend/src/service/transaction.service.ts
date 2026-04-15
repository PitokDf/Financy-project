import { TransactionRepository } from "@/repositories/transaction.repository";
import { GamificationService } from "./gamification.service";
import csv from 'csv-parser';
import fs from 'fs';
import { fileUploadService } from "@/utils/file-upload";

export class TransactionService {
    constructor(
        private readonly repo: TransactionRepository,
        private readonly gamificationService: GamificationService
    ) { }

    public getAllPaginated = async (userId: string, cursor?: string, limit: number = 20, search?: string, type?: string) => {
        const { transactions, totalIncome, totalExpense } = await this.repo.getAllPaginated(userId, cursor, limit, search, type);
        let nextCursor: string | undefined = undefined;

        if (transactions.length > limit) {
            transactions.pop();
            nextCursor = transactions[transactions.length - 1]?.id;
        }

        return { data: transactions, nextCursor, totalIncome, totalExpense };
    }

    public importCsv = async (userId: string, file: Express.Multer.File): Promise<any> => {
        const results: any[] = [];
        return new Promise((resolve, reject) => {
            fs.createReadStream(file.path)
                .pipe(csv())
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
                                type: type as "INCOME" | "EXPENSE",
                                date: date,
                                source: 'CSV_IMPORT' as any,
                                csvImportId: csvImport.id
                            };
                        });
                        await this.repo.createMany(transactionsToCreate);
                        await this.repo.updateCsvImportSuccessCount(csvImport.id, transactionsToCreate.length);

                        await fileUploadService.deleteFile(file.path);
                        await this.gamificationService.updateStreak(userId);
                        await this.gamificationService.updateChallengeProgress(userId, 'WEEKLY_TRANSACTIONS', transactionsToCreate.length);

                        resolve({
                            importId: csvImport.id,
                            successCount: transactionsToCreate.length
                        });
                    } catch (error) {
                        reject(error);
                    }
                })
                .on('error', async (error) => {
                    await fileUploadService.deleteFile(file.path);
                    reject(error);
                });
        });
    }

    public create = async (userId: string, data: any) => {
        const transaction = await this.repo.create(userId, data);

        await this.gamificationService.updateStreak(userId);
        await this.gamificationService.updateChallengeProgress(userId, 'WEEKLY_TRANSACTIONS', 1);

        return transaction;
    }

    public delete = async (userId: string, trxId: string) => {
        const transaction = await this.repo.delete(userId, trxId);
        return transaction;
    }
}
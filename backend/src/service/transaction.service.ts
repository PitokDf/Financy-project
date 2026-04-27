import { TransactionRepository } from "@/repositories/transaction.repository";
import { GamificationService } from "./gamification.service";
import csv from 'csv-parser';
import fs from 'fs';
import { fileUploadService } from "@/utils/file-upload";
import { GamificationQueue } from "@/queue/gamification.queue";
import { ReminderBadgeQueue } from "@/queue/reminder-badge.queue";
import { redisClient } from "@/config/redis";

export class TransactionService {
    private gamificationQueue: GamificationQueue;
    private reminderBudgetQueue: ReminderBadgeQueue;

    constructor(
        private readonly repo: TransactionRepository,
        private readonly gamificationService: GamificationService
    ) {
        this.gamificationQueue = new GamificationQueue();
        this.reminderBudgetQueue = new ReminderBadgeQueue();
    }

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
                        await this.gamificationQueue.add('update-gamification', {
                            userId: userId,
                            action: 'TRANSACTION_CREATED',
                            value: transactionsToCreate.length
                        });

                        await this.reminderBudgetQueue.add('cek-budget', { userId });

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
        if (data.type === 'INCOME' && !data.categoryId) {
            const { default: prisma } = await import("@/config/prisma");
            const categories = await prisma.category.findMany({
                where: { userId, type: 'INCOME' }
            });
            const descLower = (data.description || '').toLowerCase();
            
            let matchedCategory = null;
            for (const cat of categories) {
                if (descLower.includes(cat.name.toLowerCase())) {
                    matchedCategory = cat;
                    break;
                }
                const keywords = (cat.aiKeywords as string[]) || [];
                if (keywords.some(kw => descLower.includes(kw.toLowerCase()))) {
                    matchedCategory = cat;
                    break;
                }
            }
            
            if (matchedCategory) {
                data.categoryId = matchedCategory.id;
            } else {
                let newCatName = 'Pemasukan Lainnya';
                if (descLower.includes('gaji')) newCatName = 'Gaji';
                else if (descLower.includes('bonus')) newCatName = 'Bonus';
                else if (descLower.includes('hadiah') || descLower.includes('dikasih')) newCatName = 'Hadiah';
                
                const newCat = await prisma.category.upsert({
                    where: {
                        userId_name: {
                            userId,
                            name: newCatName
                        }
                    },
                    update: {},
                    create: {
                        userId,
                        name: newCatName,
                        type: 'INCOME',
                        color: '#10b981',
                        icon: 'Wallet',
                        isAutoGenerated: true,
                        aiKeywords: [newCatName.toLowerCase()]
                    }
                });
                data.categoryId = newCat.id;
            }
        }

        const transaction = await this.repo.create(userId, data);

        redisClient.del(`dashboard:${userId}`);
        await this.gamificationQueue.add('update-gamification', {
            userId: userId,
            action: 'TRANSACTION_CREATED',
            value: 1
        });

        await this.reminderBudgetQueue.add('cek-budget', { userId })

        return transaction;
    }

    public delete = async (userId: string, trxId: string) => {
        const transaction = await this.repo.delete(userId, trxId);
        redisClient.del(`dashboard:${userId}`);
        return transaction;
    }
}
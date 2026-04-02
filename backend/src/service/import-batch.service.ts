import { HttpStatus } from "@/constants/http-status";
import { Messages } from "@/constants/message";
import { AppError } from "@/errors/app-error";
import { CategoryRepository } from "@/repositories/category.repository";
import { ImportBatchRepository } from "@/repositories/import-batch.repository";
import { TransactionRepository } from "@/repositories/transaction.repository";
import { ImportTransactionsInput } from "@/schemas/import-batch.schema";
import fs from "fs";

type ImportBatchRecord = Awaited<ReturnType<typeof ImportBatchRepository.create>>;

export type ImportBatchResponse = Omit<ImportBatchRecord, never>;

export interface PaginatedImportBatchesResponse {
    data: ImportBatchResponse[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

type ParsedCsvRow = {
    type: string;
    amount: string;
    description: string;
    date: string;
    categoryId?: string;
};

type ImportErrorDetail = {
    row: number;
    reason: string;
};

const parseCsvLine = (line: string): string[] => {
    const values: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let index = 0; index < line.length; index += 1) {
        const char = line[index];
        const nextChar = line[index + 1];

        if (char === '"' && inQuotes && nextChar === '"') {
            current += '"';
            index += 1;
            continue;
        }

        if (char === '"') {
            inQuotes = !inQuotes;
            continue;
        }

        if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = "";
            continue;
        }

        current += char;
    }

    values.push(current.trim());
    return values;
};

const parseCsvContent = (content: string, hasHeader: boolean): ParsedCsvRow[] => {
    const lines = content
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    if (lines.length === 0) {
        return [];
    }

    const dataLines = hasHeader ? lines.slice(1) : lines;

    return dataLines.map((line) => {
        const [type = "", amount = "", description = "", date = "", categoryId = ""] = parseCsvLine(line);

        return {
            type,
            amount,
            description,
            date,
            ...(categoryId ? { categoryId } : {}),
        };
    });
};

export class ImportBatchService {
    constructor(
        private readonly importBatchRepository: typeof ImportBatchRepository,
        private readonly transactionRepository: typeof TransactionRepository,
        private readonly categoryRepository: typeof CategoryRepository
    ) { }

    public getImportBatches = async (userId: string, query: { page: number; limit: number; sortBy: "createdAt" | "fileName" | "totalRows" | "successCount" | "errorCount"; sortOrder: "asc" | "desc"; }) => {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const skip = (page - 1) * limit;

        const [batches, total] = await Promise.all([
            this.importBatchRepository.findManyByUser({
                userId,
                skip,
                take: limit,
                sortBy: query.sortBy,
                sortOrder: query.sortOrder,
            }),
            this.importBatchRepository.countByUser(userId),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: batches,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        };
    };

    public getImportBatchById = async (userId: string, importBatchId: string) => {
        const batch = await this.importBatchRepository.findByIdAndUser(importBatchId, userId);

        if (!batch) {
            throw new AppError(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return batch;
    };

    public importTransactionsFromCsv = async (userId: string, filePath: string, fileName: string, payload: ImportTransactionsInput) => {
        if (!fs.existsSync(filePath)) {
            throw new AppError("File CSV tidak ditemukan", HttpStatus.BAD_REQUEST);
        }

        const csvContent = fs.readFileSync(filePath, "utf-8");
        const rows = parseCsvContent(csvContent, payload.hasHeader);

        if (rows.length === 0) {
            throw new AppError("File CSV kosong", HttpStatus.BAD_REQUEST);
        }

        const batch = await this.importBatchRepository.create({
            userId,
            fileName,
            totalRows: rows.length,
            successCount: 0,
            errorCount: 0,
            errorDetails: [],
            columnMapping: {
                type: "type",
                amount: "amount",
                description: "description",
                date: "date",
                categoryId: "categoryId",
            },
        });

        const errorDetails: ImportErrorDetail[] = [];
        let successCount = 0;

        for (let index = 0; index < rows.length; index += 1) {
            const rowNumber = payload.hasHeader ? index + 2 : index + 1;
            const row = rows[index];

            try {
                const type = row.type?.trim().toUpperCase();
                if (type !== "INCOME" && type !== "EXPENSE") {
                    throw new Error("Tipe harus INCOME atau EXPENSE");
                }

                const amount = Number(row.amount);
                if (!Number.isFinite(amount) || amount <= 0) {
                    throw new Error("Nominal tidak valid");
                }

                const description = row.description?.trim();
                if (!description) {
                    throw new Error("Deskripsi tidak boleh kosong");
                }

                const date = new Date(row.date);
                if (Number.isNaN(date.getTime())) {
                    throw new Error("Tanggal tidak valid");
                }

                let categoryId = row.categoryId?.trim() || payload.defaultCategoryId || null;

                if (categoryId) {
                    const category = await this.categoryRepository.findByIdAndUser(categoryId, userId);
                    if (!category) {
                        throw new Error("Kategori tidak ditemukan");
                    }
                }

                await this.transactionRepository.create({
                    userId,
                    type,
                    amount,
                    description,
                    date,
                    categoryId,
                    embedding: [],
                    isImported: true,
                    importBatch: batch.id,
                });

                successCount += 1;
            } catch (error) {
                errorDetails.push({
                    row: rowNumber,
                    reason: error instanceof Error ? error.message : "Baris tidak valid",
                });
            }
        }

        const updatedBatch = await this.importBatchRepository.updateById(batch.id, {
            successCount,
            errorCount: errorDetails.length,
            errorDetails,
        });

        return {
            batch: updatedBatch,
            summary: {
                totalRows: rows.length,
                successCount,
                errorCount: errorDetails.length,
            },
        };
    };
}

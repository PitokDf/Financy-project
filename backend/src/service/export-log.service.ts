import { HttpStatus } from "@/constants/http-status";
import { Messages } from "@/constants/message";
import { AppError } from "@/errors/app-error";
import { ExportLogRepository } from "@/repositories/export-log.repository";
import {
    CreateExportLogInput,
    GetExportLogsQueryInput,
    UpdateExportLogStatusInput,
} from "@/schemas/export-log.schema";

type ExportLogRecord = Awaited<ReturnType<typeof ExportLogRepository.create>>;

export type ExportLogResponse = Omit<ExportLogRecord, never>;

export interface PaginatedExportLogsResponse {
    data: ExportLogResponse[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export class ExportLogService {
    constructor(private readonly exportLogRepository: typeof ExportLogRepository) { }

    public createExportLog = async (userId: string, payload: CreateExportLogInput) => {
        return this.exportLogRepository.create({
            userId,
            format: payload.format,
            month: payload.month,
            year: payload.year,
            options: payload.options ?? undefined,
            status: "PENDING",
        });
    };

    public getExportLogById = async (userId: string, exportLogId: string) => {
        const exportLog = await this.exportLogRepository.findByIdAndUser(exportLogId, userId);

        if (!exportLog) {
            throw new AppError(Messages.NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return exportLog;
    };

    public getExportLogs = async (userId: string, query: GetExportLogsQueryInput): Promise<PaginatedExportLogsResponse> => {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const skip = (page - 1) * limit;

        const [exportLogs, total] = await Promise.all([
            this.exportLogRepository.findManyByUser({
                userId,
                skip,
                take: limit,
                format: query.format,
                status: query.status,
                month: query.month,
                year: query.year,
                sortBy: query.sortBy,
                sortOrder: query.sortOrder,
            }),
            this.exportLogRepository.countByUser({
                userId,
                format: query.format,
                status: query.status,
                month: query.month,
                year: query.year,
            }),
        ]);

        const totalPages = Math.ceil(total / limit);

        return {
            data: exportLogs,
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

    public updateExportLogStatus = async (userId: string, exportLogId: string, payload: UpdateExportLogStatusInput) => {
        await this.getExportLogById(userId, exportLogId);

        return this.exportLogRepository.updateById(exportLogId, {
            ...(payload.status !== undefined ? { status: payload.status } : {}),
            ...(payload.fileUrl !== undefined ? { fileUrl: payload.fileUrl } : {}),
            ...(payload.fileSize !== undefined ? { fileSize: payload.fileSize } : {}),
            ...(payload.errorMessage !== undefined ? { errorMessage: payload.errorMessage } : {}),
            ...(payload.status === "DONE" ? { completedAt: new Date() } : {}),
            ...(payload.status === "FAILED" ? { completedAt: new Date() } : {}),
            ...(payload.status === "PROCESSING" || payload.status === "PENDING" ? { completedAt: null } : {}),
        });
    };
}

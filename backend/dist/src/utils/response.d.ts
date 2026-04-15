import { Response } from "express";
import { ApiResponse, PaginatedResponse } from "../types/response";
import { HttpStatus } from "../constants/http-status";
import { MessageCode } from "../constants/message";
export declare class ResponseUtil {
    private static base;
    private static _resolveMessageAndCode;
    static success<T>(res: Response, data: T, statusCode?: HttpStatus, message?: string): Response<ApiResponse<T>>;
    static success<T>(res: Response, data: T, statusCode: HttpStatus, messageCode: MessageCode): Response<ApiResponse<T>>;
    static error(res: Response, message?: string, errors?: any[], statusCode?: HttpStatus): Response<ApiResponse<null>>;
    static error(res: Response, messageCode: MessageCode, errors?: any[], statusCode?: HttpStatus): Response<ApiResponse<null>>;
    static notFound(res: Response, message?: string): Response<ApiResponse<null>>;
    static notFound(res: Response, messageCode: MessageCode): Response<ApiResponse<null>>;
    static created<T>(res: Response, data: T, message?: string): Response<ApiResponse<T>>;
    static created<T>(res: Response, data: T, messageCode: MessageCode): Response<ApiResponse<T>>;
    static validationError(res: Response, errors: any[], message?: string): Response<ApiResponse<null>>;
    static unprocessableEntity(res: Response, message?: string, errors?: any[]): Response<ApiResponse<null>>;
    static unauthorized(res: Response, message?: string): Response<ApiResponse<null>>;
    static forbidden(res: Response, message?: string): Response<ApiResponse<null>>;
    static noContent(res: Response, message?: string): Response<ApiResponse<null>>;
    static tooManyRequests(res: Response, message?: string, retryAfter?: number): Response<ApiResponse<null>>;
    static serviceUnavailable(res: Response, message?: string): Response<ApiResponse<null>>;
    static paginated<T>(res: Response, data: T[], page: number, limit: number, total: number, message?: string): Response<PaginatedResponse<T>>;
}
//# sourceMappingURL=response.d.ts.map
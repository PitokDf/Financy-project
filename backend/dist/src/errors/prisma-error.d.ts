import { HttpStatus } from '../constants/http-status';
export type PrismaErrorInfo = {
    code: string;
    message: string;
    commonCause?: string;
    httpStatus?: number;
    suggestion?: string;
};
export declare const prismaErrorCodes: PrismaErrorInfo[];
export declare function findErrorDetails(errorCode?: string): PrismaErrorInfo | undefined;
export declare function mapPrismaError(err: any): {
    readonly code: string;
    readonly message: string;
    readonly commonCause: string | undefined;
    readonly suggestion: string | undefined;
    readonly httpStatus: number;
    readonly meta: any;
} | {
    readonly code: string;
    readonly message: any;
    readonly httpStatus: HttpStatus.INTERNAL_SERVER_ERROR;
    readonly meta: any;
    readonly commonCause?: undefined;
    readonly suggestion?: undefined;
};
export declare function isPrismaError(err: any): boolean;
//# sourceMappingURL=prisma-error.d.ts.map
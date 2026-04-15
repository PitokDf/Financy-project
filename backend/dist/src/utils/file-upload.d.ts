import multer from 'multer';
export interface FileUploadOptions {
    destination?: string;
    maxSize?: number;
    allowedTypes?: string[];
    allowedExtensions?: string[];
    preserveOriginalName?: boolean;
}
export interface UploadedFileInfo {
    originalName: string;
    filename: string;
    path: string;
    size: number;
    mimetype: string;
    extension: string;
    url?: string;
}
declare class FileUploadService {
    private uploadDir;
    constructor();
    private ensureUploadDir;
    private generateFilename;
    private createStorage;
    private createFileFilter;
    createUploadMiddleware(options?: FileUploadOptions): multer.Multer;
    single(fieldName: string, options?: FileUploadOptions): import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    multiple(fieldName: string, maxCount?: number, options?: FileUploadOptions): import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    fields(fields: multer.Field[], options?: FileUploadOptions): import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    imageUpload(fieldName: string, options?: Partial<FileUploadOptions>): import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    documentUpload(fieldName: string, options?: Partial<FileUploadOptions>): import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    csvUpload(fieldName: string, options?: Partial<FileUploadOptions>): import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    getFileInfo(file: Express.Multer.File): UploadedFileInfo;
    deleteFile(filePath: string): Promise<boolean>;
    deleteFiles(filePaths: string[]): Promise<{
        deleted: number;
        failed: number;
    }>;
    formatFileSize(bytes: number): string;
    isValidFileType(mimetype: string, allowedTypes: string[]): boolean;
    isValidFileExtension(filename: string, allowedExtensions: string[]): boolean;
    getUploadStats(): {
        totalFiles: number;
        totalSize: number;
        directories: string[];
    };
    private getDirectoryStats;
}
export declare const fileUploadService: FileUploadService;
export {};
//# sourceMappingURL=file-upload.d.ts.map
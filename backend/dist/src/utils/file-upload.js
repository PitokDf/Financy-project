"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploadService = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const winston_logger_1 = __importDefault(require("./winston.logger"));
const config_1 = require("../config");
class FileUploadService {
    constructor() {
        this.uploadDir = path_1.default.join(process.cwd(), 'uploads');
        this.ensureUploadDir();
    }
    ensureUploadDir() {
        if (!fs_1.default.existsSync(this.uploadDir)) {
            fs_1.default.mkdirSync(this.uploadDir, { recursive: true });
            winston_logger_1.default.info(`Created upload directory: ${this.uploadDir}`);
        }
    }
    generateFilename(originalName, preserveOriginal = false) {
        if (preserveOriginal) {
            return originalName;
        }
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 15);
        const extension = path_1.default.extname(originalName);
        const baseName = path_1.default.basename(originalName, extension);
        return `${baseName}_${timestamp}_${randomString}${extension}`;
    }
    createStorage(options = {}) {
        return multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                const destination = options.destination
                    ? path_1.default.join(this.uploadDir, options.destination)
                    : this.uploadDir;
                if (!fs_1.default.existsSync(destination)) {
                    fs_1.default.mkdirSync(destination, { recursive: true });
                }
                cb(null, destination);
            },
            filename: (req, file, cb) => {
                const filename = this.generateFilename(file.originalname, options.preserveOriginalName);
                cb(null, filename);
            }
        });
    }
    createFileFilter(options = {}) {
        return (req, file, cb) => {
            if (options.allowedTypes && !options.allowedTypes.includes(file.mimetype)) {
                const error = new Error(`File type ${file.mimetype} not allowed`);
                return cb(error, false);
            }
            if (options.allowedExtensions) {
                const extension = path_1.default.extname(file.originalname).toLowerCase();
                if (!options.allowedExtensions.includes(extension)) {
                    const error = new Error(`File extension ${extension} not allowed`);
                    return cb(error, false);
                }
            }
            cb(null, true);
        };
    }
    createUploadMiddleware(options = {}) {
        const storage = this.createStorage(options);
        const fileFilter = this.createFileFilter(options);
        return (0, multer_1.default)({
            storage,
            fileFilter,
            limits: {
                fileSize: options.maxSize || 10 * 1024 * 1024,
            },
        });
    }
    single(fieldName, options = {}) {
        return this.createUploadMiddleware(options).single(fieldName);
    }
    multiple(fieldName, maxCount = 10, options = {}) {
        return this.createUploadMiddleware(options).array(fieldName, maxCount);
    }
    fields(fields, options = {}) {
        return this.createUploadMiddleware(options).fields(fields);
    }
    imageUpload(fieldName, options = {}) {
        const imageOptions = {
            destination: 'images',
            maxSize: 5 * 1024 * 1024,
            allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
            allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
            ...options
        };
        return this.single(fieldName, imageOptions);
    }
    documentUpload(fieldName, options = {}) {
        const documentOptions = {
            destination: 'documents',
            maxSize: 10 * 1024 * 1024,
            allowedTypes: [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'text/plain'
            ],
            allowedExtensions: ['.pdf', '.doc', '.docx', '.txt'],
            ...options
        };
        return this.single(fieldName, documentOptions);
    }
    csvUpload(fieldName, options = {}) {
        const csvOptions = {
            destination: 'csv',
            maxSize: 10 * 1024 * 1024,
            allowedTypes: ['text/csv', 'application/vnd.ms-excel'],
            allowedExtensions: ['.csv'],
            ...options
        };
        return this.single(fieldName, csvOptions);
    }
    getFileInfo(file) {
        const extension = path_1.default.extname(file.originalname);
        const baseUrl = config_1.config.BASE_URL || 'http://localhost:3000';
        const relativePath = path_1.default.relative(process.cwd(), file.path);
        return {
            originalName: file.originalname,
            filename: file.filename,
            path: file.path,
            size: file.size,
            mimetype: file.mimetype,
            extension,
            url: `${baseUrl}/${relativePath.replace(/\\/g, '/')}`
        };
    }
    async deleteFile(filePath) {
        try {
            if (fs_1.default.existsSync(filePath)) {
                fs_1.default.unlinkSync(filePath);
                winston_logger_1.default.info(`File deleted: ${filePath}`);
                return true;
            }
            return false;
        }
        catch (error) {
            winston_logger_1.default.error('Error deleting file:', error);
            return false;
        }
    }
    async deleteFiles(filePaths) {
        let deleted = 0;
        let failed = 0;
        for (const filePath of filePaths) {
            const success = await this.deleteFile(filePath);
            if (success) {
                deleted++;
            }
            else {
                failed++;
            }
        }
        return { deleted, failed };
    }
    formatFileSize(bytes) {
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        let size = bytes;
        let unitIndex = 0;
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        return `${size.toFixed(2)} ${units[unitIndex]}`;
    }
    isValidFileType(mimetype, allowedTypes) {
        return allowedTypes.includes(mimetype);
    }
    isValidFileExtension(filename, allowedExtensions) {
        const extension = path_1.default.extname(filename).toLowerCase();
        return allowedExtensions.includes(extension);
    }
    getUploadStats() {
        try {
            const stats = this.getDirectoryStats(this.uploadDir);
            return stats;
        }
        catch (error) {
            winston_logger_1.default.error('Error getting upload stats:', error);
            return { totalFiles: 0, totalSize: 0, directories: [] };
        }
    }
    getDirectoryStats(dirPath) {
        let totalFiles = 0;
        let totalSize = 0;
        const directories = [];
        const items = fs_1.default.readdirSync(dirPath);
        for (const item of items) {
            const itemPath = path_1.default.join(dirPath, item);
            const stat = fs_1.default.statSync(itemPath);
            if (stat.isDirectory()) {
                directories.push(item);
                const subStats = this.getDirectoryStats(itemPath);
                totalFiles += subStats.totalFiles;
                totalSize += subStats.totalSize;
            }
            else {
                totalFiles++;
                totalSize += stat.size;
            }
        }
        return { totalFiles, totalSize, directories };
    }
}
exports.fileUploadService = new FileUploadService();
//# sourceMappingURL=file-upload.js.map
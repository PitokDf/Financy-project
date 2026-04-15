"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodeByMessage = exports.getMessageByCode = exports.Messages = exports.MessageCodes = void 0;
exports.MessageCodes = {
    SUCCESS: 'SUCCESS',
    CREATED: 'CREATED',
    UPDATED: 'UPDATED',
    DELETED: 'DELETED',
    ACCEPTED: 'ACCEPTED',
    BAD_REQUEST: 'BAD_REQUEST',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    CONFLICT: 'CONFLICT',
    VALIDATION_FAILED: 'VALIDATION_FAILED',
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
    UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
};
exports.Messages = {
    SUCCESS: "Berhasil",
    CREATED: "Berhasil dibuat",
    UPDATED: "Berhasil diperbarui",
    DELETED: "Berhasil dihapus",
    ACCEPTED: "Permintaan diterima",
    BAD_REQUEST: "Permintaan tidak valid",
    UNAUTHORIZED: "Tidak memiliki otorisasi",
    FORBIDDEN: "Akses ditolak",
    NOT_FOUND: "Data tidak ditemukan",
    CONFLICT: "Terjadi konflik",
    VALIDATION_FAILED: "Validasi gagal",
    INVALID_CREDENTIALS: "Email atau kata sandi salah",
    TOO_MANY_REQUESTS: "Terlalu banyak permintaan",
    UNPROCESSABLE_ENTITY: "Permintaan tidak dapat diproses",
    INTERNAL_ERROR: "Terjadi kesalahan pada server",
    SERVICE_UNAVAILABLE: "Layanan tidak tersedia",
};
const getMessageByCode = (code) => {
    return exports.Messages[code] || exports.Messages.INTERNAL_ERROR;
};
exports.getMessageByCode = getMessageByCode;
const getCodeByMessage = (message) => {
    const entries = Object.entries(exports.Messages);
    const found = entries.find(([_, msg]) => msg === message);
    return found ? found[0] : null;
};
exports.getCodeByMessage = getCodeByMessage;
//# sourceMappingURL=message.js.map
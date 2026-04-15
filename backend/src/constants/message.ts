// Message Codes for API responses
export const MessageCodes = {
    // Success
    SUCCESS: 'SUCCESS',
    CREATED: 'CREATED',
    UPDATED: 'UPDATED',
    DELETED: 'DELETED',
    ACCEPTED: 'ACCEPTED',

    // Client Errors
    BAD_REQUEST: 'BAD_REQUEST',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    CONFLICT: 'CONFLICT',
    VALIDATION_FAILED: 'VALIDATION_FAILED',
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',

    // Server Errors
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
    UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
} as const;

export type MessageCode = typeof MessageCodes[keyof typeof MessageCodes];

// Message mapping for actual text
export const Messages = {
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
} as const;

// Helper function to get message by code
export const getMessageByCode = (code: MessageCode): string => {
    return Messages[code] || Messages.INTERNAL_ERROR;
};

// Helper function to get code by message (reverse lookup)
export const getCodeByMessage = (message: string): MessageCode | null => {
    const entries = Object.entries(Messages) as [MessageCode, string][];
    const found = entries.find(([_, msg]) => msg === message);
    return found ? found[0] : null;
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSequential = exports.generateRandomNumber = exports.generateRandomString = exports.generateTimeString = exports.generateDateString = exports.validateCodeFormat = void 0;
const generateDateString = (date, format) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    switch (format) {
        case 'YYYYMMDD':
            return `${year}${month}${day}`;
        case 'YYMMDD':
            return `${String(year).slice(-2)}${month}${day}`;
        case 'MMDDYY':
            return `${month}${day}${String(year).slice(-2)}`;
        case 'DDMMYY':
            return `${day}${month}${String(year).slice(-2)}`;
        default:
            return `${String(year).slice(-2)}${month}${day}`;
    }
};
exports.generateDateString = generateDateString;
const generateTimeString = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}${minutes}${seconds}`;
};
exports.generateTimeString = generateTimeString;
const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};
exports.generateRandomString = generateRandomString;
const generateRandomNumber = (length) => {
    const chars = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};
exports.generateRandomNumber = generateRandomNumber;
const generateSequential = (counter, padding = 4) => {
    return String(counter).padStart(padding, '0');
};
exports.generateSequential = generateSequential;
const validateCodeFormat = (code, expectedParts) => {
    if (!code || typeof code !== 'string')
        return false;
    const parts = code.split('-');
    return parts.length === expectedParts && parts.every(part => part.length > 0);
};
exports.validateCodeFormat = validateCodeFormat;
//# sourceMappingURL=code-generator.js.map
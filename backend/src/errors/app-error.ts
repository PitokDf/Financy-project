export class AppError extends Error {
    public errors?: any[];
    public statusCode?: number;
    public messageCode?: string;

    constructor(messsage: string, statusCode?: number, errors?: any[], messageCode?: string) {
        super(messsage)
        this.errors = errors;
        this.statusCode = statusCode;
        this.messageCode = messageCode;

        Object.setPrototypeOf(this, AppError.prototype)
        Error.captureStackTrace(this, this.constructor)
    }
}
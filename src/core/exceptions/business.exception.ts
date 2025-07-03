export class BusinessException extends Error {
    code: string;
    status: number;
    error?: any;
    constructor(code: string, message: string, status: number, error?: any) {
        super(message);
        this.code = code;
        this.message = message;
        this.status = status;
        if (error !== undefined && error !== null) {
            this.error = error;
        }

        Error.captureStackTrace(this, BusinessException);
    }
}
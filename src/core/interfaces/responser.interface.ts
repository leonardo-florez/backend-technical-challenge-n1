export interface SuccessPayload<T> {
    code: string;
    message: string;
    data: T;
}

export interface SuccessResponse<T> {
    status: number;
    code: string;
    message: string;
    data: T;
}

export interface ErrorPayload {
    code: string;
    message: string;
    status: number;
    error?: any;
}
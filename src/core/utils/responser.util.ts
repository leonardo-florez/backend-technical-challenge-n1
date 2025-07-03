import { BusinessException } from "../exceptions/business.exception";
import { ErrorPayload, SuccessPayload, SuccessResponse } from "../interfaces/responser.interface";

export class Responser {
    static success<T>(payload: SuccessPayload<T>): SuccessResponse<T> {
        return {
            status: 200,
            code: payload.code,
            message: payload.message,
            data: payload.data
        };
    }

    static error(payload: ErrorPayload): BusinessException {
        return new BusinessException(payload.code, payload.message, payload.status, payload.error);
    }
}   

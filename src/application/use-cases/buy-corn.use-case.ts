import { ONE_MINUTE } from "@/core/constants/time.constant";
import { BusinessException } from "@/core/exceptions/business.exception";
import { Responser } from "@/core/utils/responser.util";
import { CodesEnum } from "@/domain/constants/codes.enum";
import { CodesList } from "@/domain/constants/codes.list";
import { CustomerRepository } from "@/domain/repositories/customer.repository";
import { PurchaseRepository } from "@/domain/repositories/purchase.repository";

export class BuyCornUseCase {
    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly purchaseRepository: PurchaseRepository
    ) { }

    async execute(customerId: string) {
        try {
            const customer = await this.customerRepository.findById(customerId);
            if (!customer) {
                throw Responser.error({
                    code: CodesEnum.BUY_CORN_NOT_FOUND_CUSTOMER,
                    status: CodesList[CodesEnum.BUY_CORN_NOT_FOUND_CUSTOMER].status,
                    message: CodesList[CodesEnum.BUY_CORN_NOT_FOUND_CUSTOMER].message,
                });
            }

            const purchase = await this.purchaseRepository.getLast(customerId);
            if (purchase) {
                const now = new Date();
                const lastPurchaseDate = new Date(purchase.purchasedAt);

                if (now.getTime() - lastPurchaseDate.getTime() < ONE_MINUTE) {
                    throw Responser.error({
                        code: CodesEnum.BUY_CORN_RATE_LIMIT_EXCEEDED,
                        status: CodesList[CodesEnum.BUY_CORN_RATE_LIMIT_EXCEEDED].status,
                        message: CodesList[CodesEnum.BUY_CORN_RATE_LIMIT_EXCEEDED].message,
                    });
                }
            }

            const newPurchase = await this.purchaseRepository.create(customerId);
            return Responser.success({
                code: CodesEnum.BUY_CORN_SUCCESS_BUY,
                message: CodesList[CodesEnum.BUY_CORN_SUCCESS_BUY].message,
                data: newPurchase
            });
        } catch (error: any) {
            if (error instanceof BusinessException) {
                throw error;
            }

            throw Responser.error({
                code: CodesEnum.BUY_CORN_SERVER_ERROR,
                status: CodesList[CodesEnum.BUY_CORN_SERVER_ERROR].status,
                message: CodesList[CodesEnum.BUY_CORN_SERVER_ERROR].message,
                error: error.message
            });
        }
    }
}

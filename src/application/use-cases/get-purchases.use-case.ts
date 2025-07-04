import { BusinessException } from "@/core/exceptions/business.exception";
import { Responser } from "@/core/utils/responser.util";
import { CodesEnum } from "@/domain/constants/codes.enum";
import { CodesList } from "@/domain/constants/codes.list";
import { CustomerRepository } from "@/domain/repositories/customer.repository";
import { PurchaseRepository } from "@/domain/repositories/purchase.repository";

export class GetPurchasesUseCase {
    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly purchaseRepository: PurchaseRepository
    ) { }

    async execute(customerId: string) {
        try {
            const customer = await this.customerRepository.findById(customerId);
            if (!customer) {
                throw new BusinessException(
                    CodesEnum.GET_PURCHASES_NOT_FOUND_CUSTOMER,
                    CodesList[CodesEnum.GET_PURCHASES_NOT_FOUND_CUSTOMER].message,
                    CodesList[CodesEnum.GET_PURCHASES_NOT_FOUND_CUSTOMER].status
                );
            }

            const purchases = await this.purchaseRepository.findByCustomerId(customerId);

            return Responser.success({
                code: CodesEnum.GET_PURCHASES_SUCCESS,
                message: CodesList[CodesEnum.GET_PURCHASES_SUCCESS].message,
                data: purchases
            });
        } catch (error) {
            if (error instanceof BusinessException) {
                throw error;
            }

            throw new BusinessException(
                CodesEnum.GET_PURCHASES_SERVER_ERROR,
                CodesList[CodesEnum.GET_PURCHASES_SERVER_ERROR].message,
                CodesList[CodesEnum.GET_PURCHASES_SERVER_ERROR].status,
                error
            );
        }
    }
}

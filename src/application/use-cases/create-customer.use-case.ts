import { CustomerRepository } from "@/domain/repositories/customer.repository";
import { CreateCustomerDto } from "../dtos/create-customer.dto";
import { BusinessException } from "@/core/exceptions/business.exception";
import { Responser } from "@/core/utils/responser.util";
import { CodesEnum } from "@/domain/constants/codes.enum";
import { CodesList } from "@/domain/constants/codes.list";
import { EncryptionService } from "@/domain/services/encryption.service";

export class CreateCustomerUseCase {
    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly encryptionService: EncryptionService
    ) { }

    async execute(dto: CreateCustomerDto) {
        try {
            const existingCustomer = await this.customerRepository.findByEmail(dto.email);
            if (existingCustomer) {
                throw Responser.error({
                    code: CodesEnum.CREATE_CUSTOMER_ALREADY_EXISTS,
                    status: CodesList[CodesEnum.CREATE_CUSTOMER_ALREADY_EXISTS].status,
                    message: CodesList[CodesEnum.CREATE_CUSTOMER_ALREADY_EXISTS].message,
                });
            }

            const hashedPassword = await this.encryptionService.hashPassword(dto.password);

            const newCustomer = await this.customerRepository.create({
                name: dto.name,
                email: dto.email,
                passwordHash: hashedPassword,
            });

            const { passwordHash, ...rest } = newCustomer;

            return Responser.success({
                code: CodesEnum.CREATE_CUSTOMER_SUCCESS,
                message: CodesList[CodesEnum.CREATE_CUSTOMER_SUCCESS].message,
                data: rest
            });
        } catch (error) {
            if (error instanceof BusinessException) {
                throw error;
            }

            throw Responser.error({
                code: CodesEnum.CREATE_CUSTOMER_SERVER_ERROR,
                status: CodesList[CodesEnum.CREATE_CUSTOMER_SERVER_ERROR].status,
                message: CodesList[CodesEnum.CREATE_CUSTOMER_SERVER_ERROR].message,
            });
        }
    }
}
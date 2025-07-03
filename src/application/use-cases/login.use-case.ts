import { CustomerRepository } from "@/domain/repositories/customer.repository";
import { LoginDto } from "../dtos/login.dto";
import { BusinessException } from "@/core/exceptions/business.exception";
import { Responser } from "@/core/utils/responser.util";
import { CodesEnum } from "@/domain/constants/codes.enum";
import { CodesList } from "@/domain/constants/codes.list";
import { EncryptionService } from "@/domain/services/encryption.service";
import { JwtService } from "@/domain/services/jwt.service";

export class LoginUseCase {
    constructor(
        private readonly customerRepository: CustomerRepository,
        private readonly encryptionService: EncryptionService,
        private readonly jwtService: JwtService
    ) { }

    async execute(dto: LoginDto) {
        try {
            const customer = await this.customerRepository.findByEmail(dto.email);
            if (!customer) {
                throw Responser.error({
                    code: CodesEnum.LOGIN_INVALID_CREDENTIALS,
                    status: CodesList[CodesEnum.LOGIN_INVALID_CREDENTIALS].status,
                    message: CodesList[CodesEnum.LOGIN_INVALID_CREDENTIALS].message,
                });
            }

            const isPasswordValid = await this.encryptionService.comparePassword(
                dto.password,
                customer.passwordHash
            );

            if (!isPasswordValid) {
                throw Responser.error({
                    code: CodesEnum.LOGIN_INVALID_CREDENTIALS,
                    status: CodesList[CodesEnum.LOGIN_INVALID_CREDENTIALS].status,
                    message: CodesList[CodesEnum.LOGIN_INVALID_CREDENTIALS].message,
                });
            }

            const { passwordHash, ...customerData } = customer;

            const tokenPayload = {
                customerId: customer.id,
                email: customer.email,
                name: customer.name
            };

            const token = this.jwtService.generateToken(tokenPayload);

            return Responser.success({
                code: CodesEnum.LOGIN_SUCCESS,
                message: CodesList[CodesEnum.LOGIN_SUCCESS].message,
                data: {
                    customer: customerData,
                    tokenType: 'Bearer',
                    token: token,
                }
            });

        } catch (error) {
            if (error instanceof BusinessException) {
                throw error;
            }

            throw Responser.error({
                code: CodesEnum.LOGIN_SERVER_ERROR,
                status: CodesList[CodesEnum.LOGIN_SERVER_ERROR].status,
                message: CodesList[CodesEnum.LOGIN_SERVER_ERROR].message,
            });
        }
    }
}

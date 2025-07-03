import { BuyCornUseCase } from "@/application/use-cases/buy-corn.use-case";
import { CreateCustomerUseCase } from "@/application/use-cases/create-customer.use-case";
import { LoginUseCase } from "@/application/use-cases/login.use-case";
import { EncryptionService } from "@/domain/services/encryption.service";
import { JwtService } from "@/domain/services/jwt.service";
import { FastifyInstance } from "fastify";
import { CustomerRepositoryImp } from "./repositories/customer.repository";
import { PurchaseRepositoryImp } from "./repositories/purchase.repository";
import routes from "./routes/routes";
import { Plugins, UseCases } from "./types";
import { AuthPlugin } from "./plugins/auth.plugin";

export const registerModule = async (app: FastifyInstance, jwtService: JwtService, encryptionService: EncryptionService) => {
    const customerRepository = new CustomerRepositoryImp();
    const purchaseRepository = new PurchaseRepositoryImp();

    const useCases: UseCases = {
        createCustomer: new CreateCustomerUseCase(customerRepository, encryptionService),
        login: new LoginUseCase(customerRepository, encryptionService, jwtService),
        buyCorn: new BuyCornUseCase(customerRepository, purchaseRepository)
    };

    const plugins: Plugins = {
        auth: new AuthPlugin(jwtService)
    }

    app.decorate('useCases', useCases);
    app.decorate('plugins', plugins);

    await app.register(routes, { prefix: '/api/v1' });
}
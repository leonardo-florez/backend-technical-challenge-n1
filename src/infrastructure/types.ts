import { BuyCornUseCase } from "@/application/use-cases/buy-corn.use-case";
import { CreateCustomerUseCase } from "@/application/use-cases/create-customer.use-case";
import { GetPurchasesUseCase } from "@/application/use-cases/get-purchases.use-case";
import { LoginUseCase } from "@/application/use-cases/login.use-case";
import { AuthPlugin } from "./plugins/auth.plugin";

export interface UseCases {
    createCustomer: CreateCustomerUseCase;
    login: LoginUseCase;
    buyCorn: BuyCornUseCase;
    getPurchases: GetPurchasesUseCase;
}

export interface Plugins {
    auth: AuthPlugin;
}

declare module 'fastify' {
    interface FastifyInstance {
        useCases: UseCases;
        plugins: Plugins;
    }
}
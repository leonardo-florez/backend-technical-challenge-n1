import { CreateCustomerDto } from "@/application/dtos/create-customer.dto";
import { CreateCustomerUseCase } from "@/application/use-cases/create-customer.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export class CreateCustomerController {
    constructor(
        private readonly useCase: CreateCustomerUseCase
    ) { }

    handle(request: FastifyRequest<{ Body: CreateCustomerDto }>, reply: FastifyReply) {
        return this.useCase.execute(request.body)
    }
}
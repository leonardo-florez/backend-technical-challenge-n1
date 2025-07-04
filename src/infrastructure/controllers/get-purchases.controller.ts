import { GetPurchasesUseCase } from "@/application/use-cases/get-purchases.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export class GetPurchasesController {
    constructor(
        private readonly useCase: GetPurchasesUseCase
    ) { }

    handle(request: FastifyRequest, reply: FastifyReply) {
        return this.useCase.execute(request.customer!.id);
    }
}

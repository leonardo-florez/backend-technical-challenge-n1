import { BuyCornUseCase } from "@/application/use-cases/buy-corn.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export class BuyCornController {
    constructor(
        private readonly useCase: BuyCornUseCase
    ) { }

    handle(request: FastifyRequest, reply: FastifyReply) {
        return this.useCase.execute(request.customer!.id);
    }
}
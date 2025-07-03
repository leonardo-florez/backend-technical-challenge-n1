import { LoginDto } from "@/application/dtos/login.dto";
import { LoginUseCase } from "@/application/use-cases/login.use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export class LoginController {
    constructor(
        private readonly useCase: LoginUseCase
    ) { }

    handle(request: FastifyRequest<{ Body: LoginDto }>, reply: FastifyReply) {
        return this.useCase.execute(request.body);
    }
}
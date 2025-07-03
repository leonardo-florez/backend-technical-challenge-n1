import { Responser } from "@/core/utils/responser.util";
import { CodesEnum } from "@/domain/constants/codes.enum";
import { CodesList } from "@/domain/constants/codes.list";
import { JwtService } from "@/domain/services/jwt.service";
import { FastifyReply, FastifyRequest } from "fastify";

declare module 'fastify' {
    interface FastifyRequest {
        customer?: {
            id: string;
            email: string;
            name: string;
        }
    }
}

export class AuthPlugin {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    async authenticate(request: FastifyRequest, reply: FastifyReply) {
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            const response = Responser.error({
                code: CodesEnum.AUTH_UNAUTHORIZED,
                status: CodesList[CodesEnum.AUTH_UNAUTHORIZED].status,
                message: CodesList[CodesEnum.AUTH_UNAUTHORIZED].message,
                error: 'Authorization token is missing',
            })

            return reply.status(response.status).send(response);
        }

        try {
            const customer = await this.jwtService.verifyToken(token);
            request.customer = customer;
        } catch (error) {
            const response = Responser.error({
                code: CodesEnum.AUTH_UNAUTHORIZED,
                status: CodesList[CodesEnum.AUTH_UNAUTHORIZED].status,
                message: CodesList[CodesEnum.AUTH_UNAUTHORIZED].message,
                error: error instanceof Error ? error.message : 'Invalid token',
            });

            return reply.status(response.status).send(response);
        }
    }
}
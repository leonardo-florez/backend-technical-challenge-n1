import fastify from "fastify";
import { CodesList } from "./domain/constants/codes.list";
import { CodesEnum } from "./domain/constants/codes.enum";
import { JsonWebTokenService } from "./infrastructure/services/json-web-token.service";
import { Md5EncryptionService } from "./infrastructure/services/md5-encryption.service";
import { registerModule } from "./infrastructure/module";

export const buildServer = async () => {
    const app = fastify();

    app.setErrorHandler((error: any, request, reply) => {
        const status = error.status || CodesList[CodesEnum.GENERAL_SERVER_ERROR].status;
        reply.status(status).send({
            status: status,
            code: error.code || CodesEnum.GENERAL_SERVER_ERROR,
            message: error.message || CodesList[CodesEnum.GENERAL_SERVER_ERROR].message,
            error: error.error || error,
        });
    });

    const jwtService = new JsonWebTokenService();
    const encryptionService = new Md5EncryptionService();

    await registerModule(app, jwtService, encryptionService);

    return app;
};
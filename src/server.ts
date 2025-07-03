import fastify from "fastify";
import { Logger } from "./core/utils/logger.util";
import { CodesEnum } from "./domain/constants/codes.enum";
import { CodesList } from "./domain/constants/codes.list";
import { registerModule } from "./infrastructure/module";
import { JsonWebTokenService } from "./infrastructure/services/json-web-token.service";
import { Md5EncryptionService } from "./infrastructure/services/md5-encryption.service";

export const buildServer = async () => {
    const logger = new Logger('Server');

    logger.info('Starting server...');

    const app = fastify();

    app.setErrorHandler((error: any, request, reply) => {
        logger.error(`Error occurred: ${error.message}`, error);

        const status = error.status || error.statusCode || CodesList[CodesEnum.GENERAL_SERVER_ERROR].status;

        const response: any = {
            status: status,
            code: error.code || CodesEnum.GENERAL_SERVER_ERROR,
            message: error.message || CodesList[CodesEnum.GENERAL_SERVER_ERROR].message,
        }

        if (error.error) {
            response['error'] = error.error;
        }

        reply.status(status).send(response);
    });

    const jwtService = new JsonWebTokenService();
    const encryptionService = new Md5EncryptionService();

    await registerModule(app, jwtService, encryptionService);

    logger.info('Server started successfully.');

    return app;
};
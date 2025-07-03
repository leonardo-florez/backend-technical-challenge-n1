import { Envs } from "./core/config/envs";
import { Logger } from "./core/utils/logger.util";
import { buildServer } from "./server";

const bootstrap = async () => {
    const logger = new Logger('Bootstrap');
    logger.info('Starting application...');
    const app = await buildServer();
    await app.listen({ port: Envs.port, host: '0.0.0.0' });
    logger.info(`Application started successfully on port ${Envs.port}`);
}

bootstrap();
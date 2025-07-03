import { Logger } from "@/core/utils/logger.util";
import { FastifyInstance } from "fastify";
import { BuyCornController } from "../controllers/buy-corn.controller";
import { CreateCustomerController } from "../controllers/create-customer.controller";
import { LoginController } from "../controllers/login.controller";
import { createCustomerSchema } from "../schemas/create-customer.schema";
import { loginSchema } from "../schemas/login.schema";

const routes = async (app: FastifyInstance) => {
    const logger = new Logger('routes');

    logger.info('Registering /api/v1 routes...');

    /* Login Route */
    const loginController = new LoginController(app.useCases.login);

    app.post(
        '/auth/login',
        {
            schema: loginSchema
        },
        loginController.handle.bind(loginController)
    );

    logger.info('POST /api/v1/auth/login route registered successfully.');

    /* Create Customer */
    const createCustomerController = new CreateCustomerController(app.useCases.createCustomer);

    app.post(
        '/customers',
        {
            schema: createCustomerSchema
        },
        createCustomerController.handle.bind(createCustomerController)
    );

    logger.info('POST /api/v1/customers route registered successfully.');

    /* Buy Corn */
    const buyCornController = new BuyCornController(app.useCases.buyCorn);

    app.get(
        '/purchases/corn',
        {
            preHandler: app.plugins.auth.authenticate.bind(app.plugins.auth)
        },
        buyCornController.handle.bind(buyCornController)
    );

    logger.info('GET /api/v1/purchases/corn route registered successfully.');
}

export default routes;
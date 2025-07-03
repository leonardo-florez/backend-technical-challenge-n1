import { FastifySchema } from 'fastify';

export const createCustomerSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
            name: {
                type: 'string',
                minLength: 2,
                maxLength: 100,
                description: 'Customer full name'
            },
            email: {
                type: 'string',
                format: 'email',
                description: 'Customer email address'
            },
            password: {
                type: 'string',
                minLength: 6,
                maxLength: 128,
                description: 'Customer password'
            }
        },
        additionalProperties: false
    }
};

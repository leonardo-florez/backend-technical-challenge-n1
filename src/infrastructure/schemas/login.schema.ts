import { FastifySchema } from 'fastify';

export const loginSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: {
                type: 'string',
                format: 'email',
                description: 'User email address'
            },
            password: {
                type: 'string',
                minLength: 6,
                description: 'User password'
            }
        },
        additionalProperties: false
    }
};

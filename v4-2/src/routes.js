export async function routes(fastify) {

    // This route should return a "Bad Request" error, when header property "Client-Locale" is missing
    // You can find related test requests in root/test/requests.http
    fastify.route({
        method: 'GET',
        url: '/tests/option-1',
        schema: {
            headers: {
                type: 'object',
                required: ['Client-Locale'],
                properties: {
                    'Client-Locale': { type: 'string' }
                }
            }
        },
        handler: async function (request, reply) {
            reply.send({ hello: 'world' });
            return reply;
        }
    })

    fastify.route({
        method: 'GET',
        url: '/tests/option-2',
        schema: {
            headers: {
                type: 'object',
                required: ['Client-Locale'],
                properties: {
                    'Client-Locale': { type: 'string' }
                }
            }
        },
        handler: function (request, reply) {
            reply.send({ hello: 'world' });
        }
    })
}
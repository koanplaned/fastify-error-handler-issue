export async function routes(fastify) {

    // This route should return a "Bad Request" error, when header property "Client-Locale" is missing
    // You can find related test requests in root/test/requests.http
    fastify.route({
        method: 'GET',
        url: '/tests',
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
        }
    })
}
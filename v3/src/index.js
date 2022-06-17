import Fastify from 'fastify';
import { routes } from './routes.js';

const fastify = Fastify({
    logger: true
});

fastify.setErrorHandler(function (error, request, reply) {
    reply.send(error);

    /* 
        Previous error handler logic with fastify v3.
        Test request for GET /tests route without mandatory header property "Client-Locale" returns:

        HTTP/1.1 400 Bad Request
        content-type: application/json; charset=utf-8
        content-length: 106
        Date: Fri, 17 Jun 2022 12:53:29 GMT
        Connection: close

        {
        "statusCode": 400,
        "error": "Bad Request",
        "message": "headers should have required property 'client-locale'"
        }
    */
});

fastify.register(routes);

fastify.listen('3000', (err, address) => {

    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
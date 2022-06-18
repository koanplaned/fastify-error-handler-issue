import Fastify from 'fastify';
import { routes } from './routes.js';

const fastify = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: true,
                ignore: 'pid,hostname,request-id,responseTime,req,res'
            }
        }
    }
});

fastify.setErrorHandler(function (error, request, reply) {
    const toSend = {
        message: error.message,
        error: error.error,
        statusCode: error.statusCode || 500
    };

    reply.code(toSend.statusCode).send(toSend);
    /* 
    New error handler logic with fastify v4.
    Logic changed based on https://github.com/fastify/help/issues/695
    Test request for GET /tests route without mandatory header property "Client-Locale" returns:
    
    HTTP/1.1 500 Internal Server Error
    content-type: application/json; charset=utf-8
    content-length: 82
    Date: Fri, 17 Jun 2022 12:55:02 GMT
    Connection: close

    {
    "message": "headers must have required property 'client-locale'",
    "statusCode": 500
    }
    */

});

fastify.register(routes);

fastify.listen({ port: 3000 }, (err, address) => {

    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
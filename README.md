# Getting Started

Repository to demonstrate differences between error handler logic in fastify v3/v4, which was initially reported at https://github.com/fastify/help/issues/695

It contains two exact fastify applications, except for the setErrorHandler-logic in index.js (and a slightly different configuration logic for the fastify startup that is necessary for v4 migration).

The applications offers a testing endpoint **GET /tests**, that expects the mandatory header property "Client-Locale" (due to route schema configuration).

In fastify v3, the endpoint returns

```javascript
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
```

In fastify v4, the endpoint returns

```javascript
HTTP/1.1 500 Internal Server Error
content-type: application/json; charset=utf-8
content-length: 82
Date: Fri, 17 Jun 2022 12:55:02 GMT
Connection: close

{
"message": "headers must have required property 'client-locale'",
"statusCode": 500
}
```

Issue: v4-application should return also with 400 and property "error", as it was before in v3-application.

## Update

After more discussions in https://github.com/fastify/help/issues/695, an additional folder v4-2 was added to the repository to test possible solutions by changing the route handler implementation in routes.js

The previous /test-route was split up into two routes:

- GET /tests/option-1 -> async route handler with additional return statement
- GET /tests/option-2 -> route handler without async option and without return statement

# Setup

You can install each application separately by switching to their respective folders and executing **npm install**

Each application can be started with **npm run start**

```bash
# Install v3
cd v3
npm install

# Install v4
cd v4
npm install

# Run applications
npm run start
```

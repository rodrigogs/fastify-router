# fastify-router

[![Build Status](https://travis-ci.org/rodrigogs/fastify-router.svg?branch=master)](https://travis-ci.org/rodrigogs/fastify-router)
[![Code Climate](https://codeclimate.com/github/rodrigogs/fastify-router/badges/gpa.svg)](https://codeclimate.com/github/rodrigogs/fastify-router)
[![Test Coverage](https://codeclimate.com/github/rodrigogs/fastify-router/badges/coverage.svg)](https://codeclimate.com/github/rodrigogs/fastify-router/coverage)
[![Dependency Status](https://david-dm.org/rodrigogs/fastify-router/status.svg)](https://david-dm.org/rodrigogs/fastify-router#info=dependencies)
[![devDependency Status](https://david-dm.org/rodrigogs/fastify-router/dev-status.svg)](https://david-dm.org/rodrigogs/fastify-router#info=devDependencies)

Simple fastify router.

Install
-------
>```$ npm install fastify-router```

Example
-------
```javascript
const fastify = require('fastify')();
const fastifyRouter = require('fastify-router');

fastify.register(fastifyRouter);

const Router = fastify.Router;

const example = [
  { // Router
    prefix: '/home',
    routes: [
      { // Route /
        method: 'GET',
        url: '/',
        schema: {
          response: {
            200: { type: 'string' },
          },
        },
        handler: (request, reply) => reply.view('/example.pug'),
      },
    ],
  },
  { // Router
    prefix: '/users',
    routes: [
      { // Route /users/
        method: 'GET',
        url: '/',
        schema: {
          response: {
            200: {
              type: 'object',
              properties: [{
                name: { type: 'string' },
              }],
            },
          },
        },
        handler: (request, reply) => reply.send([{ name: 'Example' }]),
      },
      { // Route /users/:id
        method: 'GET',
        url: '/:id',
        schema: {
          response: {
            200: {
              type: 'object',
              properties: {
                name: { type: 'string' },
              },
            },
          },
        },
        handler: (request, reply) => reply.send({ name: 'Example' }),
      },
    ],
    routers: [
      { // Router
        prefix: '/register',
        routes: [
          { // Route /users/register
            method: 'POST',
            url: '/',
            schema: {
              response: {
                200: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                  },
                },
              },
            },
            handler: (request, reply) => reply.send({ name: 'Example' }),
          },
        ],
      },
    ],
  },
];

Router.route(example);
```

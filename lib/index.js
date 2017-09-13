const debug = require('debug')('fastify-router:index');
const fp = require('fastify-plugin');

const pkg = require('../package.json');

module.exports = fp((fastify, opts, next) => {
  debug('executing plugin');

  fastify.decorate('route', (routers) => {
    routers.forEach(router => router.routes.forEach((route) => {
      debug('registering route', `${router.prefix || ''}${route.url}`);

      fastify.register(route, { prefix: router.prefix });
    }));
  });

  next();
}, pkg.peerDependencies.fastify);

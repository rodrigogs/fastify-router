const fp = require('fastify-plugin');

const pkg = require('./package.json');
const Router = require('./lib/router');

function init(fastify, opts, next) {
  fastify.decorate('Router', Router(fastify));
  next();
}

module.exports = fp(init, pkg.peerDependencies.fastify);

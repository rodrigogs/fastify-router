/**
 * @param {string} [previous='']
 * @param {string} [current='']
 * @return {string}
 * @private
 */
function _normalizePath(previous = '', current = '') {
  if (previous && !previous.startsWith('/')) previous = `/${previous}`;
  if (previous && previous.endsWith('/')) previous = previous.slice(0, previous.length - 1);
  if (current && !current.startsWith('/')) current = `/${previous}`;
  if (current && previous.endsWith('/')) current = current.slice(0, current.length - 1);

  return `${previous}${current}`;
}

const Router = fastify => ({
  /**
   * @param {object[]} routers
   * @param {string} routers.prefix
   * @param {object[]} routers.routes
   * @param {object[]} routers.routers
   * @param {string} [prefix='']
   */
  route: (routers, prefix = '') => routers.forEach((router) => {
    if (router.routers instanceof Array) {
      Router(fastify).route(router.routes, router.prefix);
    }

    if (router.routes instanceof Function) {
      fastify.register(router.routes, { prefix: _normalizePath(prefix, router.prefix) });
    }

    if (router.routes instanceof Array) {
      fastify.register((fastify, opts, next) => router.routes.forEach((route) => {
        fastify.route(route);
        next();
      }), { prefix: _normalizePath(prefix, router.prefix) });
    }
  }),
});

module.exports = Router;

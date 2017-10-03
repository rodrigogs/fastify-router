/**
 * @param {string} [previousPrefix='']
 * @param {string} [currentPrefix='']
 * @param {string} [path='']
 * @return {string}
 * @private
 */
function _normalizePath(previousPrefix = '', currentPrefix = '', path = '') {
  const previousPrefixPaths = previousPrefix.split('/');
  const currentPrefixPaths = currentPrefix.split('/');
  const currentPaths = path.split('/');

  const result = previousPrefixPaths
    .concat(currentPrefixPaths)
    .concat(currentPaths)
    .filter(path => path !== '')
    .join('/');

  return `/${result}`;
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
      Router(fastify).route(router.routers, router.prefix);
    }

    if (router.routes instanceof Function) {
      fastify.register(router.routes, { prefix: _normalizePath(prefix, router.prefix) });
    }

    if (router.routes instanceof Array) {
      fastify.register((fastify, opts, next) => router.routes.forEach((route) => {
        route.url = _normalizePath(prefix, router.prefix, route.url);
        fastify.route(route);
        next();
      }));
    }
  }),
});

module.exports = Router;

const chai = require('chai');

chai.should();

const fastify = require('fastify')();

const Router = require('./lib/router');

describe('fastify-router', () => {
  describe('Router', () => {
    it('should return an object from the Router function', (done) => {
      Router(fastify).should.be.an('object');
      done();
    });
  });
});

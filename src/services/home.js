export default async function (fastify, opts, next) {
  fastify.get('/', async function (request, reply) {
    return { message: 'Hello Fastify!' }
  })

  fastify.route({
    method: 'GET',
    url: '/no-auth',
    handler: (req, reply) => {
      req.log.info('Auth free route')
      reply.send({ hello: 'world' })
    }
  })

  fastify.route({
    method: 'GET',
    url: '/auth',
    preHandler: fastify.auth([fastify.verifyJWTandLevelDB]),
    handler: (req, reply) => {
      req.log.info('Auth route')
      reply.send({ hello: 'world' })
    }
  })
  next()
}

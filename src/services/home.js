export default async function (fastify, opts, next) {
  fastify.get('/', async function (request, reply) {
    return { message: 'Hello Fastify!' }
  })
  next()
}

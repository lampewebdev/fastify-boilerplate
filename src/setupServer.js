import Fastify from 'fastify'
import AutoLoad from 'fastify-autoload'
import path from 'path'

export default async (opts) => {
  const fastify = Fastify(opts)

  await fastify
    .register(require('fastify-cors'))
    .register(require('fastify-helmet'))
    .register(require('fastify-jwt'), { secret: 'supersecret' })
    .register(require('fastify-leveldb'), { name: 'db/authdb' })
    .register(require('fastify-auth'))

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({ prefix: '/api' }, opts)
  })

  return Promise.resolve(fastify)
}

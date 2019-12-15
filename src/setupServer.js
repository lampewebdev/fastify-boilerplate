import Fastify from 'fastify'
import AutoLoad from 'fastify-autoload'
import path from 'path'

export default async (opts) => {
  const fastify = Fastify(opts)

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services')
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins')
  })

  await fastify
    .register(require('fastify-jwt'), { secret: 'supersecret' })
    .register(require('fastify-leveldb'), { name: 'db/authdb' })
    .register(require('fastify-auth'))
    // .after(routes)

  return Promise.resolve(fastify)
}

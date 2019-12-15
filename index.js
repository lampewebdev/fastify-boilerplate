const Fastify = require('fastify')
const AutoLoad = require('fastify-autoload')
const path = require('path')

const build = async (opts) => {
  const fastify = Fastify(opts)

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services')
  })
  await fastify
    .register(require('fastify-jwt'), { secret: 'supersecret' })
    .register(require('fastify-leveldb'), { name: 'db/authdb' })
    .register(require('fastify-auth'))
  // .after(routes)

  return Promise.resolve(fastify)
}
const start = async () => {
  const fastify = await build({
    logger: true
  })

  fastify.listen(3000, err => {
    if (err) throw err
    console.log(`Server listening at http://localhost:${fastify.server.address().port}`)
  })
}
start()

export default async function (fastify, opts, next) {
  fastify.route({
    method: 'POST',
    url: '/register',
    schema: {
      body: {
        type: 'object',
        properties: {
          user: { type: 'string' },
          password: { type: 'string' }
        },
        required: ['user', 'password']
      }
    },
    handler: (req, reply) => {
      req.log.info('Creating new user')
      fastify.level.put(req.body.user, req.body.password, onPut)

      function onPut (err) {
        if (err) return reply.send(err)
        fastify.jwt.sign(req.body, onToken)
      }

      function onToken (err, token) {
        if (err) return reply.send(err)
        req.log.info('User created')
        reply.send({ token })
      }
    }
  })

  fastify.route({
    method: 'POST',
    url: '/token',
    schema: {
      body: {
        type: 'object',
        properties: {
          user: { type: 'string' },
          password: { type: 'string' }
        },
        required: ['user', 'password']
      }
    },
    handler: (req, reply) => {
      req.log.info('Getting token')
      fastify.level.get(req.body.user, onGet)
      function onGet (err, value) {
        if (err) {
          req.log.info('Invalid username or password')
          reply.status(401).send({ message: 'Invalid username or password' })
        }
        if (value === req.body.password) {
          const token = fastify.jwt.sign(
            req.body,
            { expiresIn: '1h' }
          )
          reply.send({ token })
        } else {
          req.log.info('Wrong password')
          reply.status(401).send({ message: 'wrong password' })
        }
      }
    }
  })
  next()
}

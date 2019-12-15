
function verifyJWTandLevelDB (request, reply, done) {
  const jwt = this.jwt
  const level = this.level

  if (request.body && request.body.failureWithReply) {
    reply.code(401).send({ error: 'Unauthorized' })
    return done(new Error())
  }

  if (!request.req.headers.auth) {
    return done(new Error('Missing token header'))
  }

  jwt.verify(request.req.headers.auth, onVerify)

  function onVerify (err, decoded) {
    if (err || !decoded.user || !decoded.password) {
      return done(new Error('Token not valid'))
    }

    level.get(decoded.user, onUser)

    function onUser (err, password) {
      if (err) {
        if (err.notFound) {
          return done(new Error('Token not valid'))
        }
        return done(err)
      }

      if (!password || password !== decoded.password) {
        return done(new Error('Token not valid'))
      }

      done()
    }
  }
}

function verifyUserAndPassword (request, reply, done) {
  const level = this.level

  if (!request.body || !request.body.user) {
    return done(new Error('Missing user in request body'))
  }

  level.get(request.body.user, onUser)

  function onUser (err, password) {
    if (err) {
      if (err.notFound) {
        return done(new Error('Password not valid'))
      }
      return done(err)
    }

    if (!password || password !== request.body.password) {
      return done(new Error('Password not valid'))
    }

    done()
  }
}

export default (fastify) => {
  fastify.decorate('verifyJWTandLevelDB', verifyJWTandLevelDB)
  fastify.decorate('verifyUserAndPassword', verifyUserAndPassword)
}

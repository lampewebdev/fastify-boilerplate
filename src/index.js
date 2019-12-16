import setupServer from './setupServer.js'

const start = async () => {
  const server = await setupServer()
  server.listen(process.env.PORT, err => {
    if (err) throw err
  })
}
start()

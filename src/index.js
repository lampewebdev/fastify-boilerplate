import setupServer from './setupServer.js'

const start = async () => {
  const server = await setupServer({
    logger: true
  })
  server.listen(process.env.PORT, err => {
    if (err) throw err
    console.log(`Server listening at http://localhost:${server.server.address().port}`)
  })
}
start()

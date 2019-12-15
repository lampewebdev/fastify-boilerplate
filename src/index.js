import setupServer from './setupServer'

const start = async () => {
  const server = await setupServer({
    logger: true
  })

  server.listen(3000, err => {
    if (err) throw err
    console.log(`Server listening at http://localhost:${server.server.address().port}`)
  })
}
start()

import express from 'express'
import { connect } from './database'
import routes from './src/routes/api'

const server = express()

server.use(routes)

server.listen(8000, '', async () => {
  await connect()
})

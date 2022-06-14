import express from 'express'
import bodyParser from 'body-parser'
import { connect } from './database'
import routes from './src/routes/api'

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(routes)

server.listen(8000, '', async () => {
  await connect()
})

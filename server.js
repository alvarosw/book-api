import express from 'express'
import routes from './src/routes/api'

const server = express()

server.use(routes)

server.listen(8000)

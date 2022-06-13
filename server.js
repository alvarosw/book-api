const express = require('express')
const routes = require('./src/routes/api')

const server = express()

server.use(routes)

server.listen(8000)

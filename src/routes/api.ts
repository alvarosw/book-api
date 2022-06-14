import { Router } from 'express'
import { UserController } from '../controllers/index'

const api = Router()

api.post('/login', UserController.login)
api.post('/user', UserController.create)

export default api

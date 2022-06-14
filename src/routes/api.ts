import { Router } from 'express'
import { UserController } from '../controllers/index'
import Auth from '../middlewares/Auth'

const api = Router()

api.post('/login', UserController.login)
api.post('/user', UserController.create)

api.all('*', Auth)

export default api

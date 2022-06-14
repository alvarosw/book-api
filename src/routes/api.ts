import { Router } from 'express'
import { UserController } from '../controllers/index'
const userController = new UserController()

const api = Router()

api.post('/login', userController.login)

export default api

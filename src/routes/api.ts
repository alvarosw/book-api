import { Router } from 'express'
import { UserController, BookController } from '../controllers/index'
import Auth from '../middlewares/Auth'

const api = Router()

api.post('/login', UserController.login)
api.post('/user', UserController.create)

api.all('*', Auth)

api.get('/book', BookController.get)
api.get('/book/:id', BookController.getById)
api.post('/book', BookController.create)
api.put('/book/:id', BookController.update)
api.delete('/book/:id', BookController.remove)

api.post('/book/rent/:id', BookController.rent)

export default api

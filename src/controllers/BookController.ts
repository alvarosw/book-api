import { Request, Response } from 'express'
import BookService from '../services/BookService'
import UserService from '../services/UserService'

const bookService = new BookService()
export default class BookController {
  static async get(req: Request, res: Response) {
    return bookService.get(Object(req.query))
      .then(response => res.send(response))
      .catch(e => res.status(500).send({ message: e.message }))
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params
    return bookService.getById(Number(id))
      .then(response => res.send(response))
      .catch(e => res.status(500).send({ message: e.message }))
  }

  static async create(req: Request, res: Response) {
    return bookService.create(req.body)
      .then(response => res.send(response))
      .catch(e => res.status(400).send({ message: e.message }))
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params
    return bookService.update(Number(id), req.body)
      .then(response => res.send(response))
      .catch(e => res.status(400).send({ message: e.message }))
  }

  static async remove(req: Request, res: Response) {
    const { id } = req.params
    return bookService.remove(Number(id))
      .then(response => res.send(response))
      .catch(e => res.status(500).send({ message: e.message }))
  }

  static async rent(req: Request, res: Response) {
    const { id } = req.params
    const { locatario } = req.body
    const user = await new UserService().getById(locatario)
    
    if (!locatario || !user) 
      return res.status(400).send({ message: 'Um locatário existente deve ser especificado' })
    
    return bookService.rent(Number(id), user)
      .then(response => res.send(response))
      .catch(e => res.status(400).send({ message: e.message }))
  }
}

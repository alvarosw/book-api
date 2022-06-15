import { Request, Response } from 'express'
import BookService from '../services/BookService'

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
}

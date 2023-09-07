import { Request, Response } from 'express';
import BookService from '../services/BookService';
import UserService from '../services/UserService';
import { DELETE, GET, PATCH, POST, PUT, before, route } from 'awilix-express';
import Auth from '../middlewares/Auth';

@route('/book')
@before([Auth])
export default class BookController {
  bookService: BookService;
  userService: UserService;

  constructor(bookService: BookService, userService: UserService) {
    this.bookService = bookService;
    this.userService = userService;
  }

  @GET()
  async get(req: Request, res: Response) {
    try {
      const response = await this.bookService.get(Object(req.query));
      return res.send(response);
    } catch (e) {
      const error = e as Error;
      return res.status(500).send({ message: error.message });
    }
  }

  @GET()
  @route('/:id')
  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const response = await this.bookService.getById(Number(id));
      return res.send(response);
    } catch (e) {
      const error = e as Error;
      return res.status(500).send({ message: error.message });
    }
  }

  @POST()
  async create(req: Request, res: Response) {
    try {
      const response = await this.bookService.create(req.body);
      return res.send(response);
    } catch (e) {
      const error = e as Error;
      return res.status(400).send({ message: error.message });
    }
  }

  @PUT()
  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const response = await this.bookService.update(Number(id), req.body);
      return res.send(response);
    } catch (e) {
      const error = e as Error;
      return res.status(400).send({ message: error.message });
    }
  }

  @DELETE()
  @route('/:id')
  async remove(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const response = await this.bookService.remove(Number(id));
      return res.send(response);
    } catch (e) {
      const error = e as Error;
      return res.status(500).send({ message: error.message });
    }
  }

  @PATCH()
  @route('/:id')
  async rent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { locatario } = req.body;
      const user = await this.userService.getById(locatario);

      if (!locatario || !user)
        return res.status(400).send({ message: 'Um locatário existente deve ser especificado' });

      const response = this.bookService.rent(Number(id), user);
      return res.send(response);
    } catch (e) {
      const error = e as Error;
      return res.status(400).send({ message: error.message });
    }
  }
}

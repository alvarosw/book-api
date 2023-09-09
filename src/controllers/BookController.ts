import { Request, Response } from 'express';
import { DELETE, GET, PATCH, POST, PUT, before, route } from 'awilix-express';

import { HttpException } from '../helpers';
import BookService from '../services/BookService';
import UserService from '../services/UserService';
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
      if (e instanceof HttpException)
        return res.status(e.status).send({ message: e.message });
      return res.status(500).send({ message: 'Something went wrong. Try again later.' });
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
      if (e instanceof HttpException)
        return res.status(e.status).send({ message: e.message });
      return res.status(500).send({ message: 'Something went wrong. Try again later.' });
    }
  }

  @POST()
  async create(req: Request, res: Response) {
    try {
      const response = await this.bookService.create(req.body);
      return res.status(201).send(response);
    } catch (e) {
      if (e instanceof HttpException)
        return res.status(e.status).send({ message: e.message });
      return res.status(500).send({ message: 'Something went wrong. Try again later.' });
    }
  }

  @PUT()
  @route('/:id')
  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const response = await this.bookService.update(Number(id), req.body);
      return res.send(response);
    } catch (e) {
      if (e instanceof HttpException)
        return res.status(e.status).send({ message: e.message });
      return res.status(500).send({ message: 'Something went wrong. Try again later.' });
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
      if (e instanceof HttpException)
        return res.status(e.status).send({ message: e.message });
      return res.status(500).send({ message: 'Something went wrong. Try again later.' });
    }
  }

  @PATCH()
  @route('/rent/:id')
  async rent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { renter }: RentBookDTO = req.body;
      if (!renter)
        throw new HttpException(400, 'Property "renter" should not be empty.');

      const user = await this.userService.getById(renter);
      if (!user)
        throw new HttpException(404, 'An existing renter must be specified.');

      const response = await this.bookService.rent(Number(id), user);
      return res.send(response);
    } catch (e) {
      if (e instanceof HttpException)
        return res.status(e.status).send({ message: e.message });
      return res.status(500).send({ message: 'Something went wrong. Try again later.' });
    }
  }
}

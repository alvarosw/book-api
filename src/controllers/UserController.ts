import { Request, Response } from 'express';
import { POST, route } from 'awilix-express';

import { HttpException } from '../helpers';
import UserService from '../services/UserService';

export default class UserController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @POST()
  @route('/login')
  async login(req: Request, res: Response) {
    try {
      const response = await this.userService.login(req.body);
      return res.send(response);
    } catch (e) {
      if (e instanceof HttpException)
        return res.status(e.status).send(e);
      return res.status(500).send({ message: 'Something went wrong. Try again later.' });
    }
  }

  @POST()
  @route('/user')
  async create(req: Request, res: Response) {
    try {
      const response = await this.userService.create(req.body);
      return res.send(response);
    } catch (e) {
      if (e instanceof HttpException)
        return res.status(e.status).send(e);
      return res.status(500).send({ message: 'Something went wrong. Try again later.' });
    }
  }
}

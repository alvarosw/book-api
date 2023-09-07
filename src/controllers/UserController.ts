import { Request, Response } from 'express';
import { POST, route } from 'awilix-express';
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
      const error = e as Error;
      return res.status(401).send({ message: error.message });
    }
  }

  @POST()
  @route('/user')
  async create(req: Request, res: Response) {
    try {
      const response = await this.userService.create(req.body);
      return res.send(response);
    } catch (e) {
      const error = e as Error;
      return res.status(400).send({ message: error.message });
    }
  }
}

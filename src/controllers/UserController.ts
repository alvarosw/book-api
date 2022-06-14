import { Request, Response } from 'express'
import UserService from '../services/UserService'

const userService = new UserService()
export default class UserController {
  async login(req: Request, res: Response) {
    return userService.login(req.body)
      .then(response => res.send(response))
      .catch(e => res.status(401).send({ message: e.message }))
  }
}

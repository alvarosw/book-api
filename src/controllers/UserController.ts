import { Request, Response } from 'express'
import UserService from '../services/UserService'

const userService = new UserService()
export default class UserController {
  async login(req: Request, res: Response) {
    try {
      return res.send(await userService.login(req.body))
    } catch (error) {
      return res.status(401).send(error)
    }
  }
}

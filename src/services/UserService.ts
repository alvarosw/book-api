import User from "../entities/User"
import jwt from "jsonwebtoken"
import { comparePassword } from "../helpers/PasswordHandler"

export default class UserService {
  async login({ email, password }: Record<string, string>) {
    const user = await User.findOne({ where: { email } })
    if (!user) throw new Error('Email não cadastrado')

    const isPasswordValid = comparePassword({
      unhashed: password,
      hashed: user.password
    })

    if(!isPasswordValid) throw new Error('Senha incorreta')

    return jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email
    }, 'superSecretKeyThatWouldBeInDotenvFile', { expiresIn: '1d' })
  }
}

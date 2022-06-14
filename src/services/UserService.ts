import User from '../entities/User'
import TokenHandler from '../helpers/TokenHandler'
import PasswordHandler from '../helpers/PasswordHandler'

export default class UserService {
  async login({ email, password }: Record<string, string>) {
    const user = await User.findOne({ where: { email } })
    if (!user) throw new Error('Email não cadastrado')

    const isPasswordValid = PasswordHandler.compare({
      unhashed: password,
      hashed: user.password
    })

    if(!isPasswordValid) throw new Error('Senha incorreta')

    const token = TokenHandler.generate(user)

    const { id, name } = user
    return { id, name, email, token }
  }

  async create({ name, email, password }: Record<string, string>) {
    if(!name || !email || !password) throw new Error('Todos os campos são obrigatórios')
    return User.create({ 
      name,
      email, 
      password: await PasswordHandler.toHash({ password }) 
    }).save()
  }
}

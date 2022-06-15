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

    const { id, nome } = user
    return { id, nome, email, token }
  }

  async create({ nome, email, password }: Record<string, string>) {
    if(!nome || !email || !password) throw new Error('Todos os campos são obrigatórios')
    return User.create({ 
      nome,
      email, 
      password: await PasswordHandler.toHash({ password }) 
    }).save()
  }
}

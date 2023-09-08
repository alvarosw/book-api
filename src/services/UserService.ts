import User from '../entities/User';
import { TokenHandler, PasswordHandler, HttpException } from '../helpers';
import AbstractService from './AbstractsService';

export default class UserService extends AbstractService {
  async login({ email, password }: Record<string, string>) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new HttpException(401, 'Email não cadastrado');

    const isPasswordValid = PasswordHandler.compare({
      unhashed: password,
      hashed: user.password
    });

    if (!isPasswordValid) throw new HttpException(401, 'Senha incorreta');

    const token = TokenHandler.generate(user);

    const { id, nome } = user;
    return { id, nome, email, token };
  }

  async getById(id: number) {
    return User.findOne({ where: { id } });
  }

  async create({ nome, email, password }: Record<string, string>) {
    const user = User.create({
      nome,
      email,
      password: await PasswordHandler.toHash({ password })
    });

    await this.validateAs<User>(user);
    return user.save();
  }
}

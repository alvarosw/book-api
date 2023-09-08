import User from '../entities/User';
import { TokenHandler, PasswordHandler, HttpException } from '../helpers';
import AbstractService from './AbstractsService';

export default class UserService extends AbstractService {
  async login({ email, password }: Record<string, string>) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new HttpException(401, 'Email not registered.');

    const isPasswordValid = PasswordHandler.compare({
      unhashed: password,
      hashed: user.password
    });

    if (!isPasswordValid) throw new HttpException(401, 'Incorrect password.');

    const token = TokenHandler.generate(user);

    const { id, name } = user;
    return { id, name, email, token };
  }

  async getById(id: number) {
    return User.findOne({ where: { id } });
  }

  async create({ name, email, password }: Record<string, string>) {
    const user = User.create({
      name,
      email,
      password: await PasswordHandler.toHash({ password })
    });

    await this.validateAs<User>(user);
    return user.save();
  }
}

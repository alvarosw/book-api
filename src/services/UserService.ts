import User from '../entities/User';
import { TokenHandler, PasswordHandler, HttpException } from '../helpers';
import AbstractService from './AbstractsService';

export default class UserService extends AbstractService {
  async login({ email, password }: LoginUserDTO) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new HttpException(401, 'Email not registered.');

    const isPasswordValid = await PasswordHandler.compare({
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

  async create(userData: CreateUserDTO) {
    const user = User.create({ ...userData });
    await this.validateAs<User>(user);
    user.password = await PasswordHandler.toHash(userData.password);

    return user.save();
  }
}

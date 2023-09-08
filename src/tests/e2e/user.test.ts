import { db } from '../../../database';
import User from '../../entities/User';
import UserService from '../../services/UserService';
import mock from '../mock/userMock';

const userService = new UserService();
const {
  validUser,
  invalidUser,
  successfulLogin,
  unsuccessfulLogin
} = mock;

describe('User - create, login and getById', () => {
  beforeAll(async () => {
    await db.initialize();
    await db.query(`delete from books; delete from users`);
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should create user -- success case', async () => {
    const user = await userService.create(validUser);

    expect(user).toBeInstanceOf(User);
  });

  it('should create user -- fail case', async () => {
    try {
      await userService.create(invalidUser);
    } catch (error) {
      const parsedError = Object(error);

      expect(parsedError.message).toBe('Todos os campos são obrigatórios');
    }
  });

  it('should login -- success case', async () => {
    const operation = await userService.login(successfulLogin);

    expect(operation.name).toBe('Usuário Teste');
    expect(operation.email).toBe('jestuser@node.com');
    expect(operation.token).not.toBeNull();
  });

  it('should login -- fail case', async () => {
    try {
      await userService.login(unsuccessfulLogin);
    } catch (error) {
      const parsedError = Object(error);

      expect(parsedError.message).toBe('Senha incorreta');
    }
  });
});
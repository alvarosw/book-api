import request from 'supertest';
import { DataSource } from 'typeorm';
import { createTestInstance } from '../../../config/database';

import User from '../../entities/User';
import UserService from '../../services/UserService';
import mock from '../mock/userMock';
import { app } from '../config/jest-server-setup';

const userService = new UserService();
const {
  validUser,
  invalidUser,
  successfulLogin,
  unsuccessfulLogin
} = mock;

describe('User endpoints', () => {
  const makeRequest = () => request(app);
  let dataSource: DataSource;
  beforeAll(async () => {
    dataSource = await createTestInstance();
    await dataSource.initialize();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('POST /user -- should register user successfully', async () => {
    const res = await makeRequest()
      .post('/user')
      .send(validUser);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ name: validUser.name, email: validUser.email });
  });

  it('POST /user -- should return BadRequest Error when trying to register user but a property is missing', async () => {
    const res = await makeRequest()
      .post('/user')
      .send(invalidUser);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Property "email" is not a valid email.');

  });

  it('POST /login -- should log user in successfully', async () => {
    const res = await makeRequest()
      .post('/login')
      .send(successfulLogin);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('email');
    expect(res.body).toHaveProperty('token');
  });

  it('POST /login -- should return Unauthorized Error when trying to login with an invalid password', async () => {
    const res = await makeRequest()
      .post('/login')
      .send(unsuccessfulLogin);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Incorrect password.');
  });
});
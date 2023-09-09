import request from 'supertest';

import { DataSource } from 'typeorm';
import { createTestInstance } from '../../../config/database';
import { TokenHandler } from '../../helpers';
import { app } from '../config/jest-server-setup';
import Book from '../../entities/Book';
import User from '../../entities/User';
import mock from '../mock/bookMock';

const {
  validBook,
  validBook2,
  invalidBook,
} = mock;

let existentBookId: number;
let deletableBookId: number;
let user: User;
describe('Book endpoints /book', () => {
  const makeRequest = () => request(app);
  let dataSource: DataSource;
  let bearerToken = 'Bearer ';
  beforeAll(async () => {
    dataSource = await createTestInstance();
    await dataSource.initialize();
    user = await User.save({
      name: 'admin',
      email: 'test@admin.com',
      password: '123456'
    });
    bearerToken += TokenHandler.generate(user);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('POST / -- should create book successfully', async () => {
    const res = await makeRequest()
      .post('/book')
      .set({ authorization: bearerToken })
      .send(validBook);

    existentBookId = res.body.id;

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(validBook);
  });

  it('POST / -- should return BadRequest Error when sending invalid book payload', async () => {
    const res = await makeRequest()
      .post('/book')
      .set({ authorization: bearerToken })
      .send(invalidBook);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Property "author" should be of type string.');
  });

  it('GET / -- should list book successfully', async () => {
    const res = await makeRequest()
      .get('/book')
      .set({ authorization: bearerToken });

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toBeInstanceOf(Object);
  });

  it('GET /{id} -- should get a book successfully', async () => {
    const res = await makeRequest()
      .get(`/book/${existentBookId}`)
      .set({ authorization: bearerToken });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('author');
  });

  it('PATCH /rent/{id} -- should rent book successfully', async () => {
    const res = await makeRequest()
      .patch(`/book/rent/${existentBookId}`)
      .set({ authorization: bearerToken })
      .send({ renter: user.id });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('title');
    expect(res.body).toHaveProperty('author');
    expect(res.body).toHaveProperty('renter');
  });

  it('PATCH /rent/{id} -- should return Conflict Error when trying to rent a book that is already rented', async () => {
    const res = await makeRequest()
      .patch(`/book/rent/${existentBookId}`)
      .set({ authorization: bearerToken })
      .send({ renter: user.id });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('This book was already rented by someone.');
  });

  it('PUT /{id} -- should update book successfully', async () => {
    const updatable = await Book.create({ ...validBook2 }).save();
    deletableBookId = updatable.id;

    const res = await makeRequest()
      .put(`/book/${updatable.id}`)
      .set({ authorization: bearerToken })
      .send({ ...validBook2, synopsis: 'new synopsis' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ ...validBook2, synopsis: 'new synopsis' });
  });

  it('PUT /{id} -- should return Conflict Error when trying to update a rented book', async () => {
    const res = await makeRequest()
      .put(`/book/${existentBookId}`)
      .set({ authorization: bearerToken })
      .send({ ...validBook, synopsis: 'new synopsis' });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('It is not possible to update a rented book.');
  });

  it('DELETE /{id} -- should delete a book successfully', async () => {
    const res = await makeRequest()
      .delete(`/book/${deletableBookId}`)
      .set({ authorization: bearerToken });

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({ deleted: true });
  });

  it('DELETE /{id} -- should return Conflict Error when trying to delete a rented book', async () => {
    const res = await makeRequest()
      .delete(`/book/${existentBookId}`)
      .set({ authorization: bearerToken });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('It is not possible to delete a rented book.');
  });
});
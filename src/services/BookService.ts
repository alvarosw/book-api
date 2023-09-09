import { Raw } from 'typeorm';
import Book from '../entities/Book';
import { HttpException } from '../helpers';
import AbstractService from './AbstractsService';

export default class BookService extends AbstractService {
  async get({ title, author, search }: Record<string, string>) {
    return Book.find({
      where: {
        title,
        author,
        ...(search && {
          title: Raw(
            () => `(title like '%${search}%' or author like '%${search}%')`
          )
        })
      }
    });
  }

  async getById(id: number) {
    return Book.findOne({ where: { id }, relations: { renter: true } });
  }

  async create(bookData: CreateBookDTO) {
    const book = Book.create({ ...bookData });

    await this.validateAs<Book>(book);
    return book.save();
  }

  async update(id: number, bookData: UpdateBookDTO) {
    const book = await this.getByIdOrFail(id);
    if (book.renter)
      throw new HttpException(409, 'It is not possible to update a rented book.');

    const newBook = Book.create({ ...bookData });
    await this.validateAs<Book>(newBook);

    await Book.update({ id }, newBook);
    return this.getById(id);
  }

  async remove(id: number) {
    await this.getByIdOrFail(id);
    const operation = await Book.delete({
      id,
      renter: Raw(() => `user_id is null`)
    });

    if (!operation.affected) throw new HttpException(409, 'It is not possible to delete a rented book.');
    return { deleted: true };
  }

  async rent(id: number, user: UserDTO) {
    const operation = await Book.update({
      id,
      renter: Raw(() => `user_id is null`)
    }, { renter: user });

    if (!operation.affected) throw new HttpException(409, 'This book was already rented by someone.');

    return this.getById(id);
  }

  async getByIdOrFail(id: number) {
    try {
      const book = await this.getById(id);
      if (!book) throw new Error('Not Found');

      return book;
    } catch (error) {
      throw new HttpException(404, 'Book not found.');
    }
  }
}

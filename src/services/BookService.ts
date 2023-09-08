import { Raw } from 'typeorm';
import Book from '../entities/Book';
import User from '../entities/User';
import { HttpException } from '../helpers';
import AbstractService from './AbstractsService';

export default class BookService extends AbstractService {
  async get({ titulo, autor, search }: Record<string, string>) {
    return Book.find({
      where: {
        titulo,
        autor,
        ...(search && {
          titulo: Raw(
            () => `(titulo like '%${search}%' or autor like '%${search}%')`
          )
        })
      }
    });
  }

  async getById(id: number) {
    return Book.findOne({ where: { id }, relations: { locatario: true } });
  }

  async create({ titulo, autor, sinopse }: Record<string, string>) {
    const book = Book.create({ titulo, autor, sinopse });

    await this.validateAs<Book>(book);
    return book.save();
  }

  async update(id: number, { titulo, autor, sinopse }: Record<string, string>) {
    const book = await this.getByIdOrFail(id);
    if (book.locatario)
      throw new HttpException(409, 'Não é possível editar um livro alugado');

    const newBook = Book.create({ titulo, autor, sinopse });
    await this.validateAs<Book>(newBook);

    await Book.update({ id }, newBook);
    return this.getById(id);
  }

  async remove(id: number) {
    await this.getByIdOrFail(id);
    const operation = await Book.delete({
      id,
      locatario: Raw(() => `user_id is null`)
    });

    if (!operation.affected) throw new HttpException(409, 'Não é possível deletar um livro alugado');
    return { deleted: true };
  }

  async rent(id: number, user: User) {
    const operation = await Book.update({
      id,
      locatario: Raw(() => `user_id is null`)
    }, { locatario: user });

    if (!operation.affected) throw new HttpException(409, 'O livro já foi alugado');

    return this.getById(id);
  }

  async getByIdOrFail(id: number) {
    return Book.findOneOrFail({ where: { id } })
      .catch(() => { throw new HttpException(404, 'Livro não encontrado'); });
  }
}

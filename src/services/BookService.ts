import { Raw } from 'typeorm';
import Book from '../entities/Book';

export default class BookService {
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
    })
  }

  async getById(id: number) {
    return Book.findOne({ where: { id } })
  }

  async create({ titulo, autor, sinopse }: Record<string, string>) {
    if (!titulo || !autor) throw new Error('Título e autor são obrigatórios')
    return Book.create({ titulo, autor, sinopse }).save()
  }

  async update(id: number, { titulo, autor, sinopse }: Record<string, string>) {
    await Book.update({ id }, { titulo, autor, sinopse })
    return Book.findOne({ where: { id } })
  }

  async remove(id: number) {
    const operation = await Book.delete(id) 
    return { deleted: Boolean(operation.affected) }
  }
}

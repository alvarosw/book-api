import { db } from '../../../database'
import Book from '../../entities/Book'
import User from '../../entities/User'
import BookService from '../../services/BookService'
import mock from '../mock/book\Mock'

const bookService = new BookService()
const {
  validBook,
  validBook2,
  invalidBook,
  bookTenant
} = mock

let existentBookId: number
let deletableBookId: number
let user: User

describe('Book - create, read, getOne, update, rent and delete', () => {
  beforeAll(async () => {
    await db.initialize()
    await db.query(`delete from livros; delete from users`)
  })

  afterAll(async () => {
    await db.destroy()
  })

  it('should create book -- success case', async () => {
    const book = await bookService.create(validBook)
    existentBookId = book.id

    expect(book).toBeInstanceOf(Book)
  })

  it('should create book -- fail case', async () => {
    try {
      await bookService.create(invalidBook)
    } catch (error) {
      const parsedError = Object(error)

      expect(parsedError.message).toBe('Título e autor são obrigatórios')
    }
  })
 
  it('should list book -- success case', async () => {
    const bookList = await bookService.get({})
    
    expect(bookList.length).toBeGreaterThan(0)
    expect(bookList[0]).toBeInstanceOf(Object)
  })

  it('should get book by id -- success case', async () => {
    const book = await bookService.getById(existentBookId)

    expect(book).not.toBe(null)
  })

  it('should rent a book -- success case', async () => {
    user = await User.create({ ...bookTenant }).save()
    const book = await bookService.rent(existentBookId, user)

    expect(book).toBeInstanceOf(Book)
    expect(book?.locatario).not.toBe(null)
  })

  it('should rent a book -- fail case', async () => {
    try {
      await bookService.rent(existentBookId, user)
    } catch (error) {
      const parsedError = Object(error)

      expect(parsedError.message).toBe('O livro já foi alugado') 
    }
  })

  it('should update book -- success case', async () => {
    const updatable = await Book.create({ ...validBook2 }).save()
    deletableBookId = updatable.id

    const book = await bookService.update(updatable.id, {
      sinopse: 'Sinopse nova'
    })

    expect(book).toBeInstanceOf(Book)
    expect(book?.sinopse).toBe('Sinopse nova')
  })

  it('should update book -- fail case', async () => {
    try {
      await bookService.update(existentBookId, { sinopse: 'Sinopse nova'})
    } catch (error) {
      const parsedError = Object(error)

      expect(parsedError.message).toBe('Não é possível editar um livro alugado')
    }
  })

  it('should delete book -- success case', async () => {
      const operation = await bookService.remove(deletableBookId)

      expect(operation.deleted).toBe(true)
  })

  it('should delete book -- fail case', async () => {
    try {
      await bookService.remove(existentBookId)
    } catch (error) {
      const parsedError = Object(error)

      expect(parsedError.message).toBe('Não é possível deletar um livro alugado')
    }
  })
})
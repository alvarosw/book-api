import { validate } from 'class-validator';
import { HttpException } from '../helpers';

export default class AbstractService {
  protected async validateAs<T extends object>(model: T) {
    const [error] = await validate(model);
    if (error) {
      const [errorMessage]: string[] = Object.values(error.constraints || {});
      throw new HttpException(400, errorMessage);
    }
  }
}
import { asClass, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express';

import UserService from '../src/services/UserService';
import BookService from '../src/services/BookService';

const container = createContainer({
  injectionMode: 'CLASSIC',
});

// Service registering block
container.register({
  userService: asClass(UserService),
  bookService: asClass(BookService),
});

export const dependencyInjectionRequestScope = scopePerRequest(container);

interface UserDTO {
  id: number,
  name: string,
  email: string,
  password: string;
  books: BookDTO[];
}

interface CreateUserDTO {
  name: string,
  email: string,
  password: string;
}

interface LoginUserDTO {
  email: string,
  password: string;
}
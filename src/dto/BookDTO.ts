interface BookDTO {
  id: number;
  title: string;
  author: string;
  synopsis: string;
  renter: UserDTO;
}

interface CreateBookDTO {
  title: string;
  author: string;
  synopsis?: string;
}

interface UpdateBookDTO {
  title: string;
  author: string;
  synopsis?: string;
}

interface RentBookDTO {
  renter: number;
}
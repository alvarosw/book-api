import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsEmail, IsString, Validate, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import Book from './Book';

@ValidatorConstraint({ name: 'isUniqueEmail', async: true })
class UniqueEmailValidator implements ValidatorConstraintInterface {
  async validate(email: string) {
    const user = await User.findOneBy({ email });
    return !user;
  }

  defaultMessage() {
    return 'Property "email" is already in use.';
  }
}

@Entity({ name: 'users' })
export default class User extends BaseEntity implements UserDTO {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  @IsNotEmpty({ message: 'Property "name" should not be empty.' })
  @IsString({ message: 'Property "name" should be of type string.' })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  @IsNotEmpty({ message: 'Property "email" should not be empty.' })
  @IsEmail({}, { message: 'Property "email" is not a valid email.' })
  @Validate(UniqueEmailValidator)
  @IsString({ message: 'Property "email" should be of type string.' })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  @IsNotEmpty({ message: 'Property "password" should not be empty.' })
  @IsString({ message: 'Property "password" should be of type string.' })
  password: string;

  @OneToMany(() => Book, (book) => book.renter)
  books: Book[];
}


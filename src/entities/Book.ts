import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import User from './User';

@Entity({ name: 'books' })
export default class Book extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  @IsNotEmpty({ message: 'Property "title" should not be empty.' })
  @IsString({ message: 'Property "title" should be of type string.' })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  @IsNotEmpty({ message: 'Property "author" should not be empty.' })
  @IsString({ message: 'Property "author" should be of type string.' })
  author: string;

  @Column('text')
  synopsis: string;

  @ManyToOne(() => User, (user) => user.books)
  @JoinColumn({ name: 'user_id' })
  renter: User;
}

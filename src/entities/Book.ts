import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import User from './User';

@Entity({ name: 'livros' })
export default class Book extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  @IsNotEmpty({ message: 'Property "titulo" should not be empty.' })
  @IsString({ message: 'Property "titulo" should be of type string.' })
  titulo: string;

  @Column({ type: 'varchar', nullable: false })
  @IsNotEmpty({ message: 'Property "autor" should not be empty.' })
  @IsString({ message: 'Property "autor" should be of type string.' })
  autor: string;

  @Column('text')
  sinopse: string;

  @ManyToOne(() => User, (user) => user.livros)
  @JoinColumn({ name: 'user_id' })
  locatario: User;
}

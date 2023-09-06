import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

@Entity({ name: 'livros' })
export default class Book extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  titulo: string;

  @Column({ type: 'varchar', nullable: false })
  autor: string;

  @Column('text')
  sinopse: string;

  @ManyToOne(() => User, (user) => user.livros)
  @JoinColumn({ name: 'user_id' })
  locatario: User;
}
